/*
 * Real3D FlipBook [https://real3dflipbook.com]
 * @author creativeinteractivemedia [https://codecanyon.net/user/creativeinteractivemedia/portfolio]
 * @version 4.12
 * @date 2025-08-12
 */
'use strict';

FLIPBOOK.Book3 = class extends FLIPBOOK.Book {
    constructor(el, main, options) {
        super(main, options);

        // Set up the wrapper and parent container
        this.wrapper = el;
        this.wrapper.classList.add('flipbook-book3');
        this.bookLayer = this.wrapper.parentNode;

        this.flipEasing = 'easeOutQuad';
        this.translateZ = '';

        // Initialize IScroll with options
        this.iscroll = new FLIPBOOK.IScroll(this.bookLayer, {
            zoom: true,
            scrollX: true,
            scrollY: true,
            scrollbars: true,
            keepInCenterV: true,
            keepInCenterH: true,
            freeScroll: true,
            preventDefault: false,
        });

        // Event listeners for enabling/disabling IScroll
        main.on('disableIScroll', this.disableIscroll.bind(this));
        main.on('enableIScroll', this.enableIscroll.bind(this));

        // Handle zoom end event
        this.iscroll.on('zoomEnd', () => {
            if (isNaN(this.iscroll.scale)) {
                return this.zoomTo(options.zoomMin);
            }

            options.main.onZoom(this.iscroll.scale / this.ratio);
            this.updateVisiblePages();

            const zoomed = options.main.zoom > 1;

            if (this.zoomed !== zoomed) {
                const scrollOptions = this.iscroll.options;
                scrollOptions.eventPassthrough = zoomed ? '' : 'vertical';
                scrollOptions.freeScroll = zoomed;
                this.iscroll.refresh();
                this.zoomed = zoomed;
            }
        });

        // Set wrapper and center container dimensions
        this.wrapper.style.width = `${2 * this.pageWidth}px`;
        this.wrapper.style.height = `${this.pageHeight}px`;

        this.centerContainer = document.createElement('div');
        this.centerContainer.className = 'flipbook-center-container3';
        this.centerContainer.style.width = `${2 * this.pageWidth}px`;
        this.centerContainer.style.height = `${this.pageHeight}px`;
        this.wrapper.appendChild(this.centerContainer);

        // Set perspective based on options or view mode
        const perspective = this.options.perspective || (this.options.viewMode === '3d' ? 3 * this.pageHeight : 200000);
        this.centerContainer.style.perspective = `${perspective}px`;

        // Initialize pages
        this.pagesArr = [];
        this.animating = false;

        var p = this.options.pages;
        var evenPages = p.length % 2 == 0;
        var numSheets = evenPages ? p.length / 2 : (p.length + 1) / 2;
        if (!this.options.cover && evenPages) {
            numSheets += 1;
        }
        if (this.options.singlePageMode) numSheets = p.length;
        this.numSheets = numSheets;

        // for (let i = 0; i < numSheets; i++) {
        for (let i = 0; i < p.length; i++) {
            const page = new FLIPBOOK.Page3(this, i);
            this.pagesArr.push(page);
            this.centerContainer.appendChild(page.wrapper);
        }
    }

    enableIscroll() {
        if (this.iscrollDisabled) {
            this.iscroll.enable();
            this.iscrollDisabled = false;
        }
    }

    disableIscroll() {
        if (!this.iscrollDisabled) {
            this.iscroll.disable();
            this.iscroll.initiated = false;
            this.iscrollDisabled = true;
        }
    }

    enableMouseWheelZoom() {
        this.iscroll.options.eventPassthrough = 'vertical';
        this.iscroll.refresh();
    }

    disableMouseWheelZoom() {
        this.iscroll.options.eventPassthrough = '';
        this.iscroll.refresh();
    }

    enablePrev(val) {
        this.prevEnabled = val;
    }

    enablePan() {
        this.iscroll.enable();
    }

    disablePan() {
        this.iscroll.disable();
    }

    setRightIndex(val) {
        this.rightIndex = val;
    }

    enableNext(val) {
        this.nextEnabled = val;
    }

    isZoomed() {
        return this.options.main.zoom > this.options.zoomMin && this.options.main.zoom > 1;
    }

    getNumPages() {}

    move(direction) {
        if (this.zoom <= 1) {
            return;
        }

        var iscroll = this.iscroll;
        var offset2 = 0;

        if (iscroll) {
            var posX = iscroll.x;
            var posY = iscroll.y;
            var offset = 20 * this.zoom;
            switch (direction) {
                case 'left':
                    posX += offset;
                    break;
                case 'right':
                    posX -= offset;
                    break;
                case 'up':
                    posY += offset;
                    break;
                case 'down':
                    posY -= offset;
                    break;
            }

            if (posX > 0) {
                posX = offset2;
            }
            if (posX < iscroll.maxScrollX) {
                posX = iscroll.maxScrollX - offset2;
            }
            if (posY > 0) {
                posY = offset2;
            }
            if (posY < iscroll.maxScrollY) {
                posY = iscroll.maxScrollY - offset2;
            }

            iscroll.scrollTo(posX, posY, 0);
        }
    }

    zoomTo(zoom, time, x, y) {
        if (!this.enabled) {
            return;
        }

        x = x || 0;
        y = y || 0;
        time = time || 0;
        this.zoom = zoom;

        time = 0;

        var iscroll = this.iscroll;
        if (iscroll) {
            iscroll.zoom(zoom * this.ratio, x, y, time);
        }
    }

    setWrapperW(w) {
        if (this.wrapperW != w) {
            this.wrapper.style.width = w + 'px';
            this.wrapperW = w;
        }
    }

    updateBookPosition() {
        if (this.singlePage) {
            this.setWrapperW(this.pageWidth);
            if (this.iscroll) {
                this.iscroll.refresh();
            }
            this.view = 1;
            this.focusRight();
            return;
        }

        if (this.view == 1) {
            this.setWrapperW(this.pageWidth);
        } else {
            this.setWrapperW(2 * this.pageWidth);
        }
        if (this.iscroll) {
            this.iscroll.refresh();
        }

        if (this.view == 2) {
            if (this.isCover()) {
                this.focusRight();
            } else if (this.isBackCover()) {
                if (!this.options.cover) {
                    this.focusBoth();
                } else {
                    this.focusLeft();
                }
            } else {
                this.focusBoth();
            }
        } else if (this.view == 1) {
            if (this.isCover()) {
                this.focusRight();
            } else if (this.isBackCover()) {
                this.focusLeft();
            }
        }
    }

    focusLeft(time, delay) {
        var pos = this.view == 1 || this.singlePage ? 0 : this.pageWidth / 2;

        this.setBookPosition(pos, time, delay);
    }

    focusRight(time, delay, updatePageNumber) {
        var pos = this.view == 1 || this.singlePage ? -this.pageWidth : -this.pageWidth / 2;

        this.setBookPosition(pos, time, delay, updatePageNumber);
    }

    focusBoth(time, delay) {
        var pos = this.view == 1 ? -this.pageWidth / 2 : 0;

        this.setBookPosition(pos, time, delay);
    }

    setBookPosition(pos, time, delay, updatePageNumber) {
        if (this.centerContainerPosition == pos) {
            return;
        }
        var start = this.centerContainerPosition;

        if (time) {
            var self = this;
            delay = delay || 0;

            const animationParams = {
                from: start,
                to: pos,
                delay,
                duration: time,
                step(now) {
                    self.centerContainer.style.transform = 'translateX(' + now + 'px) ' + self.translateZ;
                },
                complete() {
                    self.centerContainerPosition = pos;
                    if (updatePageNumber) {
                        self.updateFlipped();
                        self.options.main.turnPageComplete();
                    }
                },
            };

            this.animate(animationParams);
        } else if (this.centerContainerPosition != pos) {
            this.centerContainerPosition = pos;
            this.centerContainer.style.transform = 'translateX(' + pos + 'px) ' + this.translateZ;

            this.updateFlipped();
            this.options.main.turnPageComplete();
        }
    }

    updateSinglePage(singlePage) {
        if (singlePage == this.singlePage) return;
        this.singlePage = singlePage;

        var p = this.options.pages;
        var evenPages = p.length % 2 == 0;
        var numSheets = evenPages ? p.length / 2 : (p.length + 1) / 2;
        if (!this.options.cover && evenPages) {
            numSheets += 1;
        }
        if (this.options.singlePageMode || this.singlePage) numSheets = p.length;
        this.numSheets = numSheets;

        let ri = this.rightIndex;
        if (ri > 0) {
            if (this.singlePage) {
                ri--;
            } else if (ri % 2 == 1) {
                ri++;
            }
            this.setRightIndex(ri);
        }
        this.resetLoadedPages();
        this.onResize();
        this.updateVisiblePages();
    }

    resetLoadedPages() {
        this.pagesArr.forEach(function (page) {
            if (page.bgFront) page.bgFront.replaceChildren();
            if (page.bgBack) page.bgBack.replaceChildren();
            page.sizeFront = 0;
            page.sizeBack = 0;

            if (page.html.front) page.html.front.replaceChildren();
            if (page.html.back) page.html.back.replaceChildren();
            if (page.htmlContent) {
                page.htmlContent.front = null;
                page.htmlContent.back = null;
            }
            if (page.htmlLoaded) {
                page.htmlLoaded.front = null;
                page.htmlLoaded.back = null;
            }
            page._sidePromises = null;
            page._sideHTMLPromises = null;
        });
    }

    async updateVisiblePages(loadNextPrev) {
        if (typeof loadNextPrev == 'undefined') {
            loadNextPrev = true;
        }
        var self = this;

        var index = this.rightIndex;
        if (!this.singlePage) {
            index /= 2;
        }

        // let numSheets = this.pagesArr.length;

        var p = this.options.pages;
        var evenPages = p.length % 2 == 0;
        var numSheets = evenPages ? p.length / 2 : (p.length + 1) / 2;
        if (!this.options.cover && evenPages) {
            numSheets += 1;
        }
        if (this.options.singlePageMode || this.singlePage) numSheets = p.length;

        this.visibleSheets = [];
        for (let i = 0; i < numSheets; i++) {
            this.visibleSheets.push(this.pagesArr[i]);
        }

        var right = this.visibleSheets[index];
        var next = this.visibleSheets[index + 1];
        var left = this.visibleSheets[index - 1];
        var prev = this.visibleSheets[index - 2];

        if (left) {
            left._setAngle(180);
        }
        if (right) {
            right._setAngle(0);
        }

        for (var i = 0; i < this.pagesArr.length; i++) {
            if (this.pagesArr[i] == right) {
                this.pagesArr[i].show();
                this.pagesArr[i].unpauseHtml('front');
                this.pagesArr[i].pauseHtml('back');
            } else if (this.pagesArr[i] == left && !this.singlePage) {
                this.pagesArr[i].show();
                this.pagesArr[i].unpauseHtml('back');
                this.pagesArr[i].pauseHtml('front');
            } else {
                this.pagesArr[i].hide();
            }

            this.pagesArr[i]._setZIndex(0);
        }
        this.updateBookPosition();

        this.options.main.setLoadingProgress(0.1);
        if (left && !this.singlePage) await this.loadPageAsync(left, 'back');
        if (right) this.loadPageAsync(right, 'front');
        this.options.main.setLoadingProgress(1);
        if (left && !this.singlePage) await this.loadHTMLAsync(left, 'back');
        if (right) await this.loadHTMLAsync(right, 'front');

        if (next) await this.loadPageAsync(next, 'front');
        if (right) await this.loadPageAsync(right, 'back');

        if (prev) await this.loadPageAsync(prev, 'back');
        if (left) await this.loadPageAsync(left, 'front');
    }

    enable() {
        this.onResize();
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    getLeftPage() {
        return this.pagesArr[this.flippedleft - 1];
    }

    getRightPage() {
        return this.pagesArr[this.flippedleft];
    }

    getLeftBackPage() {
        return this.pagesArr[this.flippedleft - 2];
    }

    getRightBackPage() {
        return this.pagesArr[this.flippedleft + 1];
    }

    getNextPage() {
        return this.pagesArr[this.flippedleft + 2];
    }

    getPrevPage() {
        return this.pagesArr[this.flippedleft - 3];
    }

    nextPage() {
        if (!this.nextEnabled) {
            return;
        }

        if (this.view == 1 && this.isFocusedLeft() && !this.singlePage) {
            var duration = 700;
            var d = (this.options.pageFlipDuration * duration) / 2;
            this.focusRight(d, 0, true);
            return;
        }
        this.goToPage(this.rightIndex + 2);
    }

    prevPage() {
        if (!this.prevEnabled) {
            return;
        }

        if (this.view == 1 && this.isFocusedRight() && !this.singlePage) {
            var duration = 700;
            var d = (this.options.pageFlipDuration * duration) / 2;
            this.focusLeft(d, 0, true);
            return;
        }
        var target = this.singlePage ? this.rightIndex : this.rightIndex - 2;
        this.goToPage(target);
    }

    goToPage(index, instant) {
        if (!this.enabled || this.flipping || isNaN(index)) {
            return;
        }

        if (this.singlePage || index % 2 != 0) {
            index--;
        }

        if (index < 0) {
            index = 0;
        }

        if (index > this.numSheets * 2) {
            index = this.numSheets * 2;
        }

        if (index == this.rightIndex) {
            return;
        }

        if (instant || this.options.instantFlip) {
            this.setRightIndex(index);
            this.updateFlipped();
            this.updateVisiblePages();
            this.options.main.turnPageComplete();
        } else {
            var self = this;
            var end;
            var duration = 600;
            var d = this.options.pageFlipDuration * duration;
            var easing = this.flipEasing;

            if (index > this.rightIndex) {
                end = 180;
                if (self.angle <= 0 || self.angle >= 180 || !self.angle) {
                    self.angle = 1;
                }
            } else if (index < this.rightIndex) {
                end = -180;
                if (self.angle >= 0 || self.angle <= -180 || !self.angle) {
                    self.angle = -1;
                }
            }

            this.flipping = true;

            if (!this.singlePage) {
                if (this.view == 1) {
                    if (index < this.rightIndex) {
                        this.focusRight(d);
                    } else {
                        this.focusLeft(d);
                    }
                } else {
                    if (index == 0) {
                        this.focusRight(d);
                    } else if (index == this.visibleSheets.length * 2) {
                        this.focusLeft(d);
                    } else {
                        this.focusBoth(d);
                    }
                }
            }

            this.goingToPage = index;

            if (this.singlePage) {
                d /= 2;
            }

            const animationParams = {
                from: self.angle,
                to: end,
                duration: d,
                easing: easing,
                step(now) {
                    self._setPageAngle(now);
                },
                complete() {
                    self.setRightIndex(self.goingToPage);
                    self.angle = 0;
                    self.flipping = false;

                    self.updateFlipped();
                    self.updateVisiblePages();
                    self.options.main.turnPageComplete();
                },
            };
            this.animate(animationParams);

            this.options.main.turnPageStart();
        }
    }

    animate(params) {
        FLIPBOOK.animate(params);
    }

    updateFlipped() {
        if (this.singlePage) {
            this.flippedleft = this.rightIndex;
        } else {
            this.flippedleft = (this.rightIndex + (this.rightIndex % 2)) / 2;
        }
        this.flippedright = this.numSheets - this.flippedleft;
    }

    onSwipe(event, phase, distanceX, distanceY, duration, fingerCount) {
        if (this.isZoomed() || event.target.className === 'flipbook-page-link' || this.flipping) {
            return;
        }

        const angle = (-distanceX * 180) / this.main.wrapperW;
        const threshold = 5;
        const distance = Math.abs(distanceX);

        if (phase === 'start') {
            this.dragging = true;
            return;
        }

        if ((phase === 'end' || phase === 'cancel') && fingerCount <= 1 && distance > threshold) {
            angle > 0 ? this.nextPage() : this.prevPage();
            this.dragging = false;
            return;
        }

        if (phase === 'move' && fingerCount <= 1 && this.dragging && distance > threshold) {
            let increment = angle > 0 ? (this.singlePage ? 1 : 2) : this.singlePage ? -1 : -2;
            if ((angle > 0 && !this.nextEnabled) || (angle < 0 && !this.prevEnabled)) {
                return;
            }

            this.goingToPage = this.rightIndex + increment;

            if (
                this.goingToPage !== this.rightIndex &&
                this.goingToPage >= 0 &&
                this.goingToPage <= this.pagesArr.length * 2 &&
                !this.options.instantFlip
            ) {
                this._setPageAngle(angle);
            }
        }
    }

    pauseHtml() {
        for (var i = 0; i < this.pagesArr.length; i++) {
            this.pagesArr[i].pauseHtml();
        }
    }

    _setPageAngle(angle) {
        if (this.angle == angle) {
            return;
        }

        this.angle = angle;

        var prev;
        var next;
        var left;
        var right;
        this.angle = angle;
        // this.pauseHtml();

        var ri = this.rightIndex;
        var ri2 = this.goingToPage;
        // if (this.options.rightToLeft && !this.options.backCover) {
        //     ri--;
        //     ri2--;
        // }

        var flippping;

        if (this.singlePage) {
            right = this.visibleSheets[ri];
            left = this.visibleSheets[ri - 1];
            if (angle > 0) {
                right._setAngle(angle / 2);
                next = this.visibleSheets[ri2];
                if (next) {
                    next.show();
                    this.loadPageAsync(next, 'front');
                }
            } else {
                left = this.visibleSheets[ri2];
                left.show();
                this.loadPageAsync(left, 'front');
                left._setAngle(angle / 2 + 90);
            }

            if (next) {
                next._setAngle(0);
            }
            if (prev) {
                prev._setAngle(90);
            }
        } else {
            right = this.visibleSheets[ri / 2];
            left = this.visibleSheets[ri / 2 - 1];
            var newRight = this.visibleSheets[ri2 / 2 - 1];
            var newLeft = this.visibleSheets[ri2 / 2];
            if (angle > 0) {
                if (this.view == 1 && this.isFocusedLeft()) {
                    return;
                }
                //flipping from right to left
                //angle 0 -> 180

                if (angle < 90) {
                    flippping = right;
                    if (newRight) newRight.hide();
                } else {
                    flippping = newRight;
                    right.hide();
                }
                flippping.show();
                flippping._setAngle(angle);
                next = this.visibleSheets[ri2 / 2];
                if (next) {
                    next.show();
                    this.loadPageAsync(next, 'fornt');
                }

                this.loadPageAsync(flippping, 'back');
            } else {
                if (this.view == 1 && this.isFocusedRight()) {
                    return;
                }
                //flipping from left to right
                //angle 0 -> -180

                if (angle > -90) {
                    flippping = left;
                    if (newLeft) newLeft.hide();
                } else {
                    flippping = newLeft;
                    left.hide();
                }
                flippping.show();
                flippping._setAngle(180 + angle);
                prev = this.visibleSheets[ri2 / 2 - 1];
                if (prev) {
                    prev.show();
                    this.loadPageAsync(prev, 'back');
                }
                this.loadPageAsync(flippping, 'front');
            }

            if (next) {
                next._setAngle(0);
            }
            if (prev) {
                prev._setAngle(180);
            }
        }
    }

    isCover() {
        return this.rightIndex == 0;
    }

    isBackCover() {
        return this.rightIndex == this.numSheets * 2;
    }

    onPageUnloaded(index) {
        var pageIndex = index;

        if (this.options.rightToLeft) {
            pageIndex = this.pagesArr.length * 2 - index - 1;
        }

        if (this.pagesArr[pageIndex]) {
            this.pagesArr[pageIndex].unload();
        }
    }

    onResize() {
        var self = this;

        var main = this.main;
        var w = main.wrapperW;
        var h = main.wrapperH;
        var bw = main.bookW;
        var bh = main.bookH;
        var pw = main.pageW;
        var ph = main.pageH;
        var r1 = w / h;
        var r2 = pw / ph;
        var options = this.options;

        function fitToHeight() {
            self.ratio = h / bh;
            fit();
        }

        function fitToWidth() {
            self.ratio = self.view == 1 ? w / pw : w / bw;
            fit();
        }

        function fit() {
            if (self.iscroll) {
                self.iscroll.options.zoomMin = self.ratio * options.zoomMin;
            }
            if (self.iscroll) {
                self.iscroll.options.zoomMax = self.ratio * options.zoomMax;
            }

            self.updateBookPosition();
            if (self.iscroll) {
                self.iscroll.zoom(self.ratio * options.main.zoom, w / 2, h / 2, 0);
            }

            self.bookScale = self.iscroll.scale;
        }

        var s = Math.min(this.zoom, 1);

        var zoomMin = Number(this.options.zoomMin);

        if (
            this.singlePage ||
            (this.options.responsiveView &&
                w <= this.options.responsiveViewTreshold &&
                r1 < 2 * r2 &&
                r1 < this.options.responsiveViewRatio)
        ) {
            this.view = 1;

            if (r2 > r1) {
                this.sc = (zoomMin * r1) / (r2 * s);
            } else {
                this.sc = 1;
            }

            if (w / h > pw / ph) {
                fitToHeight();
            } else {
                fitToWidth();
            }
        } else {
            this.view = 2;

            if (r1 < 2 * r2) {
                this.sc = (zoomMin * r1) / (2 * r2 * s);
            } else {
                this.sc = 1;
            }

            if (w / h >= bw / bh) {
                fitToHeight();
            } else {
                fitToWidth();
            }
        }

        this.updateBookPosition();
        this.updateFlipped();
        this.options.main.turnPageComplete();
    }

    isFocusedRight() {
        var center = this.view == 1 ? -this.pageWidth / 2 : 0;
        if (this.singlePage) {
            return this.rightIndex % 2 == 0;
        } else {
            return this.centerContainerPosition < center;
        }
    }

    isFocusedLeft() {
        var center = this.view == 1 ? -this.pageWidth / 2 : 0;

        if (this.singlePage) {
            return this.rightIndex % 2 == 1;
        } else {
            return this.centerContainerPosition > center;
        }
    }
};

FLIPBOOK.Page3 = class {
    constructor(book, index) {
        this.book = book;
        this.main = book.main;
        this.options = book.options;

        this.index = index;

        this.wrapper = document.createElement('div');
        this.wrapper.className = 'flipbook-page3';
        this.wrapper.style.width = book.options.pageWidth + 'px';
        this.wrapper.style.height = book.options.pageHeight + 'px';
        this.angle = 0;
        this.wrapper.dataset.sheet = index;

        var options = book.options;

        let preloaderSrc = options.pagePreloader || options.assets.spinner;
        let preloaderClass = options.pagePreloader ? 'flipbook-page-preloader-image' : 'flipbook-page-preloader';

        this.front = document.createElement('div');
        this.wrapper.appendChild(this.front);
        this.front.className = 'flipbook-page3-inner flipbook-page3-inner-front';

        this.bgFront = document.createElement('div');
        this.front.appendChild(this.bgFront);
        this.bgFront.className = 'flipbook-page3-bg';

        this.htmlFront = document.createElement('div');
        this.front.appendChild(this.htmlFront);
        this.htmlFront.className = 'flipbook-page3-html page_' + String(2 * index);
        this.htmlFront.style.width = (1000 * options.pageWidth) / options.pageHeight + 'px';

        var transform = 'scale(' + this.options.pageHeight / 1000 + ')';
        if (this.options.doublePage && this.index > 0) {
            this.htmlFront.style.transform = transform + ' translateX(-100%)';
        } else {
            this.htmlFront.style.transform = transform;
        }

        this.html = { front: this.htmlFront };

        this.frontHtmlContentVisible = false;

        this.preloaderFront = new Image();
        this.preloaderFront.src = preloaderSrc;
        this.preloaderFront.className = preloaderClass;
        this.front.appendChild(this.preloaderFront);

        if (!book.singlePage) {
            this.back = document.createElement('div');
            this.wrapper.appendChild(this.back);
            this.back.className = 'flipbook-page3-inner flipbook-page3-inner-back';
            this._setVisibility(this.back, false);

            this.bgBack = document.createElement('div');
            this.back.appendChild(this.bgBack);
            this.bgBack.className = 'flipbook-page3-bg';

            this.htmlBack = document.createElement('div');
            this.back.appendChild(this.htmlBack);
            this.htmlBack.className = 'flipbook-page3-html page_' + String(2 * index + 1);
            this.htmlBack.style.width = (1000 * options.pageWidth) / options.pageHeight + 'px';

            this.htmlBack.style.transform = transform;

            this.html.back = this.htmlBack;

            this.backHtmlContentVisible = false;

            this.preloaderBack = new Image();
            this.preloaderBack.src = preloaderSrc;
            this.preloaderBack.className = preloaderClass;
            this.back.appendChild(this.preloaderBack);
        }

        this.htmlPaused = { front: false, back: false };

        this.hide();
        this.zIndex = 0;

        if (this.options.rightToLeft && !this.options.backCover) {
            index++;
        }
        this.wrapper.style.left = String(this.book.options.pageWidth - 1) + 'px';
    }

    load(side, size, callback) {
        // var pageSize = this.book.pageHeight * this.book.iscroll.scale * window.devicePixelRatio;
        var o = this.options;
        // var size = pageSize < o.pageTextureSizeSmall ? o.pageTextureSizeSmall : o.pageTextureSize;
        var isFront = side == 'front' || this.book.singlePage;

        var pageIndex = this.book.singlePage ? this.index : isFront ? this.index * 2 : this.index * 2 + 1;
        var index = o.rightToLeft ? this.book.pagesArr.length * 2 - pageIndex - 1 : pageIndex;

        if (
            (this.sizeFront == size && isFront && this.indexFront == index) ||
            (this.sizeBack == size && !isFront && this.indexBack == index)
        ) {
            if (callback) {
                callback.call(this);
            }
        } else {
            if (isFront) {
                this.sizeFront = size;
            } else {
                this.sizeBack = size;
            }

            var self = this;

            if (!o.cover) index--;
            if (isFront) this.indexFront = index;
            else this.indexBack = index;

            o.main.loadPage(index, size, function (page) {
                if (page && page.image) {
                    var img = page.image[size] || page.image;
                    var page = o.pages[index];
                    if (
                        (isFront && page && page.side == 'right') ||
                        (o.rightToLeft && isFront && page && page.side == 'left')
                    ) {
                        if (!img.clone) {
                            img.clone = new Image();
                            img.clone.src = img.src;
                        }
                        img = img.clone;
                        img.style.transform = 'translateX(-50%)';
                    }

                    if (isFront) {
                        if (self.bgFront) self.bgFront.replaceChildren(img);
                        if (self.preloaderFront) self.preloaderFront.style.display = 'none';
                    } else {
                        if (self.bgBack) self.bgBack.replaceChildren(img);
                        if (self.preloaderBack) self.preloaderBack.style.display = 'none';
                    }
                }

                if (callback) {
                    callback.call(self);
                }
            });
        }
    }

    loadHTML(side, callback) {
        var self = this;

        var isFront = side == 'front';

        var pageIndex = this.book.singlePage ? this.index : isFront ? this.index * 2 : this.index * 2 + 1;

        var o = this.options;
        var index = o.rightToLeft ? this.book.pagesArr.length * 2 - pageIndex - 1 : pageIndex;

        if (index < 0) {
            callback.call(self);
            return;
        }

        if (!o.cover) index--;

        if (this.htmlContent && this.htmlContent[side]) {
            this.updateHtmlContent(side);
            callback.call(this);
        } else {
            this.options.main.loadPageHTML(index, function (html) {
                self.htmlContent = this.htmlContent || {};
                self.htmlContent[side] = html;
                self.updateHtmlContent(side);
                callback.call(self);
            });
        }
    }

    startHTML(side) {
        this.book.startPageItems(this.html[side]);
    }

    unload() {
        this.size = null;
        this.mat = false;
        this.pageSize = null;
    }

    pauseHtml(side) {
        if (!this.htmlPaused[side]) {
            this.htmlPaused[side] = true;
        }
    }

    unpauseHtml(side) {
        this.htmlPaused[side] = false;
        if (this.removedIframes && this.removedIframes.length) {
            this.removedIframes.forEach(function (obj) {
                obj.parentNode.appendChild(obj.iframe);
            });
        }
        this.removedIframes = [];
    }

    showHtml() {
        if (!this.htmlContentVisible) {
            this.htmlContentVisible = true;
        }
    }

    updateHtmlContent(side) {
        this.htmlLoaded = this.htmlLoaded || {};
        if (!this.htmlLoaded[side]) {
            var c = this.htmlContent[side];
            if (c.jquery) {
                c = c[0];
            }

            this.htmlLoaded[side] = true;
            var container = this.html[side];
            if (container) container.appendChild(c);

            this.main.trigger('showpagehtml', { page: this });
        }
        this.startHTML(side);
    }

    show() {
        if (this.hidden) {
            this.wrapper.style.display = 'block';
            this.setShadowOpacity(0);
            this.showHtml();
        }
        this.hidden = false;
    }

    setShadowOpacity(val) {
        if (this.shadowOpacity != val && !this.hidden) {
            this.wrapper.style.setProperty('--page3-shadow-opacity', val);
            this.shadowOpacity = val;
        }
    }

    hide() {
        if (!this.hidden) {
            this.wrapper.style.display = 'none';
            this.setShadowOpacity(0);

            this.pauseHtml('front');
            this.pauseHtml('back');
        }

        this.hidden = true;
    }

    _setVisibility(div, visible) {
        if (div && div.dataset.visible != visible) {
            div.dataset.visible = visible;
            div.style.opacity = visible ? '1' : '0';
            div.style.pointerEvents = visible ? 'auto' : 'none';
        }
    }

    _setAngle(angle) {
        angle = -angle;

        // console.log(this.index, angle);

        if (angle != this.angle) {
            this.setShadowOpacity((1 - Math.abs(angle + 90) / 90) * 0.2);
            this.wrapper.style.setProperty('--page3-rotate-y', String(angle + 'deg'));
            this._setVisibility(this.front, angle > -90);
            this._setVisibility(this.back, angle < -90);
            this.angle = angle;
            var i;
            var max = 0;
            for (i = 0; i < this.book.pagesArr.length; i++) {
                if (i != this.index && this.book.pagesArr[i].zIndex > max) {
                    max = this.book.pagesArr[i].zIndex;
                }
            }
            this._setZIndex(max + 1);
        }
    }

    _setZIndex(val) {
        if (this.zIndex != val) {
            this.wrapper.style['z-index'] = val;
        }
        this.zIndex = val;
    }
};
