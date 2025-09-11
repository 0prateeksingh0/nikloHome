/*
 * Real3D FlipBook [https://real3dflipbook.com]
 * @author creativeinteractivemedia [https://codecanyon.net/user/creativeinteractivemedia/portfolio]
 * @version 4.12
 * @date 2025-08-12
 */
'use strict';

FLIPBOOK.BookSwipe = class extends FLIPBOOK.Book {
    constructor(el, wrapper, main, options) {
        super(main, options);

        if (this.singlePage) {
            this.view = 1;
        }

        this.slides = [];
        this.pagesArr = [];
        this.leftPage = 0;
        this.rightPage = 0;
        this.rotation = 0;

        this.prevPageEnabled = false;

        this.setRightIndex(options.rightToLeft ? options.pages.length : 0);
        this.currentSlide = 0;
        this.flipping = false;

        this.wrapper = wrapper;

        this.scroller = el;
        this.scroller.classList.remove('book');
        this.scroller.classList.add('flipbook-carousel-scroller');

        this.iscroll = new IScroll(this.wrapper, {
            snap: true,
            snapSpeed: 200 * this.options.pageFlipDuration,
            freeScroll: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            eventPassthrough: 'vertical',
        });

        var self = this;

        this.zoomDisabled = false;

        this.iscroll.on('scrollStart', function () {
            self.zoomDisabled = true;
        });

        this.iscroll.on('scrollEnd', function () {
            self.zoomDisabled = false;
        });

        for (var i = 0; i < 3; i++) {
            var slide = document.createElement('div');
            slide.className = 'flipbook-carousel-slide';

            var slideInner = document.createElement('div');
            slideInner.className = 'slide-inner';

            slide.appendChild(slideInner);
            this.scroller.appendChild(slide);

            this.slides.push(slide);
        }

        this.slides[0].iscroll = new IScroll(this.slides[0], {
            zoom: true,
            scrollX: true,
            scrollY: true,
            freeScroll: true,
            keepInCenterV: true,
            keepInCenterH: true,
            preventDefault: false,
        });

        this.slides[2].iscroll = new IScroll(this.slides[2], {
            zoom: true,
            scrollX: true,
            scrollY: true,
            freeScroll: true,
            keepInCenterV: true,
            keepInCenterH: true,
            preventDefault: false,
        });

        this.slides[1].iscroll = new IScroll(this.slides[1], {
            zoom: true,
            scrollX: true,
            scrollY: true,
            freeScroll: true,
            keepInCenterV: true,
            keepInCenterH: true,
            preventDefault: false,
        });

        // eslint-disable-next-line no-redeclare
        for (var i = 0; i < 3; i++) {
            this.slides[i].iscroll.on('zoomEnd', function () {
                var scale = options.main.zoom;
                this.options.eventPassthrough = scale > 1 ? '' : 'vertical';
                this.options.freeScroll = scale > 1;
                this.refresh();
            });
        }

        this.resizeInnerSlides();

        var page;

        options.pages.forEach((page, index) => {
            if (!page.empty) {
                const newPage = new FLIPBOOK.PageSwipe(this, index, page.src, page.htmlContent);
                this.pagesArr.push(newPage);
                if (options.loadAllPages) {
                    newPage.load();
                }
            }
        });

        // if (!options.cover) {
        //     page = new FLIPBOOK.PageSwipe(this, options.numPages);
        //     this.pagesArr.push(page);
        // }

        this.iscroll.on('scrollStart', function () {
            if (this.distX < 0) {
                self.loadNextSpread();
            } else {
                self.loadPrevSpread();
            }
        });

        this.iscroll.on('scrollEnd', function () {
            var sliderPage = this.currentPage.pageX;

            if (self.currentSlide == sliderPage) {
                return;
            }

            if (self.singlePage) {
                if (sliderPage > self.currentSlide) {
                    self.setRightIndex(self.rightIndex + 1);
                } else if (sliderPage < self.currentSlide) {
                    self.setRightIndex(self.rightIndex - 1);
                }
            } else {
                if (sliderPage > self.currentSlide) {
                    self.setRightIndex(self.rightIndex + 2);
                } else if (sliderPage < self.currentSlide) {
                    self.setRightIndex(self.rightIndex - 2);
                }
            }

            self.currentSlide = sliderPage;

            self.updateVisiblePages();

            self.flipping = false;

            self.wrapper.style.pointerEvents = '';
        });

        this.flipEnabled = true;
        this.nextEnabled = true;
        this.prevEnabled = true;

        main.on('enableIScroll', () => {
            this.enableIscroll();
        });

        main.on('disableIScroll', () => {
            this.disableIscroll();
        });

        main.on('pageLoaded', function (_) {});
    }

    enableIscroll() {
        if (this.iscrollDisabled) {
            if (this.zoom > 1) {
                if (this.slides[0].iscroll) {
                    this.slides[0].iscroll.enable();
                }
                if (this.slides[1].iscroll) {
                    this.slides[1].iscroll.enable();
                }
                if (this.slides[2].iscroll) {
                    this.slides[2].iscroll.enable();
                }
            } else {
                this.iscroll.enable();
            }

            this.iscrollDisabled = false;
        }
    }

    disableIscroll() {
        if (!this.iscrollDisabled) {
            if (this.zoom > 1) {
                if (this.slides[0].iscroll) {
                    this.slides[0].iscroll.disable();
                    this.slides[0].iscroll.initiated = false;
                }
                if (this.slides[1].iscroll) {
                    this.slides[1].iscroll.disable();
                    this.slides[1].iscroll.initiated = false;
                }
                if (this.slides[2].iscroll) {
                    this.slides[2].iscroll.disable();
                    this.slides[2].iscroll.initiated = false;
                }
            } else {
                this.iscroll.disable();
                this.iscroll.initiated = false;
            }

            this.iscrollDisabled = true;
        }
    }

    goToPage(value, instant) {
        if (!this.enabled) {
            return;
        }

        if (!this.flipEnabled) {
            return;
        }

        if (value > this.numSheets * 2) {
            value = this.numSheets * 2;
        }

        if (this.singlePage || value % 2 != 0) {
            value--;
        }

        if (isNaN(value) || value < 0) {
            value = 0;
        }

        if (instant) {
            this.setRightIndex(value);
            this.updateVisiblePages();
            return;
        }

        if (this.singlePage) {
            if (value > this.rightIndex) {
                this.setSlidePages(this.currentSlide + 1, [value]);
                this.setRightIndex(value - 1);
                this.nextPage(instant);
            } else if (value < this.rightIndex) {
                this.setSlidePages(this.currentSlide - 1, [value]);
                this.setRightIndex(value + 1);
                this.prevPage(instant);
            }
        } else {
            if (this.options.rightToLeft && !this.options.backCover && value < 2) {
                value = 2;
            }

            if (value > this.rightIndex) {
                if (value >= this.pagesArr.length) {
                    this.setSlidePages(2, [value - 1, value]);
                    this.setRightIndex(value - 2);
                    this.goToSlide(2, instant);
                } else {
                    this.setSlidePages(this.currentSlide + 1, [value - 1, value]);
                    this.setRightIndex(value - 2);
                    this.nextPage(instant);
                }
            } else if (value < this.rightIndex) {
                if (value == 0) {
                    this.setRightIndex(value + 2);
                    this.setSlidePages(0, [value]);
                    this.goToSlide(0, instant);
                } else {
                    this.setRightIndex(value + 2);
                    this.setSlidePages(this.currentSlide - 1, [value - 1, value]);
                    this.prevPage(instant);
                }
            }
        }
    }

    setRightIndex(value) {
        this.rightIndex = value;
    }

    nextPage = function (instant) {
        if (this.currentSlide == 2) {
            return;
        }

        this.goToSlide(this.currentSlide + 1, instant);

        this.loadNextSpread();
    };

    prevPage(instant) {
        if (this.currentSlide == 0) {
            return;
        }

        this.goToSlide(this.currentSlide - 1, instant);

        this.loadPrevSpread();
    }

    enablePrev(val) {
        this.prevEnabled = val;
    }

    enableNext(val) {
        this.nextEnabled = val;
    }

    setSlidePages(slide, pages) {
        var self = this;
        var arr = [];
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]) {
                arr.push(pages[i].index);
            }
        }

        if (this.slides[slide].pages && this.slides[slide].pages.length > 0) {
            if (arr.join('') === this.slides[slide].pages.join('')) {
                return;
            }
        }

        this.clearSlidePages(slide);

        var slideInner = this.slides[slide].firstChild;

        pages.forEach((page) => {
            if (typeof page !== 'undefined') {
                let pageIndex;

                if (typeof page === 'number') {
                    pageIndex = page;
                } else {
                    pageIndex = page.index;
                }

                if (self.pagesArr[pageIndex]) {
                    slideInner.appendChild(self.pagesArr[pageIndex].wrapper);
                    self.slides[slide].pages.push(pageIndex);
                }
            }
        });

        this.resizeInnerSlides();

        if (this.slides[slide].iscroll) {
            this.slides[slide].iscroll.refresh();
        }
    }

    clearSlidePages(slide) {
        this.slides[slide].firstChild.innerHTML = '';
        this.slides[slide].pages = [];
    }

    loadNextSpread() {
        var index = this.rightIndex;

        if (this.options.rightToLeft && !this.options.backCover) {
            index--;
        }

        var next = this.pagesArr[index + 1];
        if (next) {
            next.load();
        }
        if (!this.singlePage) {
            var afterNext = this.pagesArr[index + 2];
            if (afterNext) {
                afterNext.load();
            }
        }
    }

    loadPrevSpread() {
        var index = this.rightIndex;
        var prev;

        if (this.options.rightToLeft && !this.options.backCover) {
            index--;
        }

        if (this.singlePage) {
            prev = this.pagesArr[index - 1];
            if (prev) {
                prev.load();
            }
        } else {
            prev = this.pagesArr[index - 2];
            if (prev) {
                prev.load();
            }
            var beforePrev = this.pagesArr[index - 3];
            if (beforePrev) {
                beforePrev.load();
            }
        }
    }

    loadVisiblePages() {
        var main = this.options.main;
        var index = this.rightIndex;

        if (this.options.rightToLeft && !this.options.backCover && !this.singlePage) {
            index--;
        }

        var right = this.pagesArr[index];
        var left = this.pagesArr[index - 1];
        var next = this.pagesArr[index + 1];
        var afterNext = this.pagesArr[index + 2];
        var prev = this.pagesArr[index - 2];
        var beforePrev = this.pagesArr[index - 3];

        if (this.singlePage) {
            if (right) {
                right.load(function () {
                    main.setLoadingProgress(1);
                    if (left) {
                        left.load(null, true);
                    }
                    if (next) {
                        next.load(null, true);
                    }
                });
            } else if (left) {
                left.load();
            }
        } else {
            if (left) {
                left.load(function () {
                    if (right) {
                        right.load(function () {
                            main.setLoadingProgress(1);
                            if (prev) {
                                prev.load(null, true);
                            }
                            if (beforePrev) {
                                beforePrev.load(null, true);
                            }
                            if (next) {
                                next.load(null, true);
                            }
                            if (afterNext) {
                                afterNext.load(null, true);
                            }
                        });
                    } else {
                        main.setLoadingProgress(1);
                        if (prev) {
                            prev.load(null, true);
                        }

                        if (beforePrev) {
                            beforePrev.load(null, true);
                        }
                    }
                });
            } else {
                if (right) {
                    right.load(function () {
                        main.setLoadingProgress(1);
                        if (next) {
                            next.load(null, true);
                        }
                        if (afterNext) {
                            afterNext.load(null, true);
                        }
                    });
                }
            }
        }
    }

    updateVisiblePages() {
        if (this.visiblePagesRightIndex === this.rightIndex) {
            return;
        }

        this.visiblePagesRightIndex = this.rightIndex;

        var index = this.rightIndex;

        if (this.options.rightToLeft && !this.options.backCover && !this.singlePage) {
            index--;
        } else if (!this.options.cover) index--;

        var right = this.pagesArr[index];
        var left = this.pagesArr[index - 1];
        var next = this.pagesArr[index + 1];
        var afterNext = this.pagesArr[index + 2];
        var prev = this.pagesArr[index - 2];
        var beforePrev = this.pagesArr[index - 3];

        if (next) {
            next.hideHTML();
        }
        if (afterNext) {
            afterNext.hideHTML();
        }
        if (prev) {
            prev.hideHTML();
        }
        if (beforePrev) {
            beforePrev.hideHTML();
        }

        if (this.singlePage) {
            if (right) {
                right.startHTML();
            }

            if (!left) {
                //cover
                this.setSlidePages(0, [right]);

                if (next) {
                    this.setSlidePages(1, [next]);
                } else {
                    this.clearSlidePages(1);
                }
                this.goToSlide(0, true);

                this.clearSlidePages(2);
            } else {
                if (next) {
                    this.setSlidePages(1, [right]);
                    if (left) {
                        this.setSlidePages(0, [left]);
                    }
                    this.setSlidePages(2, [next]);
                    this.goToSlide(1, true);
                } else {
                    if (right) {
                        this.setSlidePages(2, [right]);
                    }
                    if (left) {
                        this.setSlidePages(1, [left]);
                    }
                    this.goToSlide(2, true);

                    this.clearSlidePages(0);
                }
            }

            if (left) {
                left.hideHTML();
            }
        } else {
            if (!left) {
                if (right) {
                    right.startHTML();
                }
                //cover
                this.setSlidePages(0, [right]);

                this.setSlidePages(1, [next, afterNext]);

                this.goToSlide(0, true);

                this.clearSlidePages(2);
            } else {
                left.startHTML();

                if (right) {
                    right.startHTML();

                    //L R

                    if (!next) {
                        this.setSlidePages(2, [left, right]);

                        this.setSlidePages(1, [beforePrev, prev]);

                        this.goToSlide(2, true);

                        this.clearSlidePages(0);
                    } else {
                        if (prev && !(this.rightIndex == 2 && !this.options.cover)) {
                            this.setSlidePages(1, [left, right]);

                            this.setSlidePages(0, [beforePrev, prev]);

                            this.setSlidePages(2, [next, afterNext]);

                            this.goToSlide(1, true);
                        } else {
                            this.setSlidePages(0, [left, right]);

                            this.setSlidePages(1, [next, afterNext]);

                            this.clearSlidePages(2);
                            this.goToSlide(0, true);
                        }
                    }
                } else {
                    this.setSlidePages(2, [left]);

                    this.setSlidePages(1, [beforePrev, prev]);

                    this.goToSlide(2, true);
                    this.clearSlidePages(0);
                }
            }
        }

        this.loadVisiblePages();

        this.flippedleft = (this.rightIndex + (this.rightIndex % 2)) / 2;
        this.flippedright = this.numSheets - this.flippedleft;

        this.options.main.turnPageComplete();
    }

    loadPage(index) {
        if (this.pagesArr[index]) {
            this.pagesArr[index].load();
        }
    }

    disable() {
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
        this.onResize();
    }

    resize() {}

    updateSinglePage(singlePage) {
        this.singlePageView = singlePage;
        this.onResize(true);
    }

    onResize(force) {
        var w = this.main.wrapperW;
        var h = this.main.wrapperH;

        if (w == 0 || h == 0) {
            return;
        }

        if (!force && this.w === w && this.h === h) {
            return;
        }

        this.w = w;
        this.h = h;

        var pw = this.pageWidth;
        var ph = this.pageHeight;

        var portrait = (2 * this.options.zoomMin * pw) / ph > w / h;
        var doublePage =
            !this.options.singlePageMode &&
            (!this.options.responsiveView ||
                w > this.options.responsiveViewTreshold ||
                !portrait ||
                w / h >= this.options.responsiveViewRatio);

        if (typeof this.singlePageView != 'undefined') {
            doublePage = !this.singlePageView;
        }

        var bw = doublePage ? 2 * pw : pw;
        var bh = ph;
        this.bw = bw;
        this.bh = bh;

        var scale;
        if (h / w > bh / bw) {
            //fit to width
            scale = ((bh / bw) * w) / this.options.pageHeight;
        } else {
            scale = h / this.options.pageHeight;
        }

        var spaceBetweenSlides = 0;

        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.width = w + spaceBetweenSlides + 'px';
            this.slides[i].style.height = h + 'px';
            this.slides[i].style.left = i * w + i * spaceBetweenSlides + 'px';

            if (this.slides[i].iscroll) {
                this.slides[i].iscroll.options.zoomMin = this.options.zoomMin * scale;
                this.slides[i].iscroll.options.zoomMax = this.options.zoomMax * scale;
                this.slides[i].iscroll.refresh();
            }
        }

        this.scroller.style.width = this.slides.length * (w + spaceBetweenSlides) + 'px';
        this.iscroll.refresh();

        if ((!doublePage || this.options.singlePageMode) && !this.singlePage) {
            if (this.rightIndex % 2 == 0 && this.rightIndex > 0) {
                this.setRightIndex(this.rightIndex - 1);
            }

            this.singlePage = true;
            this.view = 1;

            this.resizeInnerSlides();
        } else if (doublePage && !this.options.singlePageMode && this.singlePage) {
            if (this.rightIndex % 2 != 0) {
                this.setRightIndex(this.rightIndex + 1);
            }

            this.singlePage = false;
            this.view = 2;

            this.resizeInnerSlides();
        }

        this.zoomTo(this.zoom);

        // this.updateVisiblePages();
    }

    isFocusedRight() {
        return this.rightIndex % 2 == 0;
    }

    isFocusedLeft() {
        return this.rightIndex % 2 == 1;
    }

    resizeInnerSlides() {
        var pw = (this.options.pageHeight * this.pageWidth) / this.pageHeight;

        if (this.rotation == 90 || this.rotation == 270) {
            pw = (this.options.pageHeight * this.pageHeight) / this.pageWidth;
        }

        var sw = this.singlePage ? pw : 2 * pw;

        for (var i = 0; i < 3; i++) {
            sw = this.slides[i].pages && this.slides[i].pages.length == 1 ? pw : 2 * pw;
            this.slides[i].firstChild.style.width = `${sw}px`;
        }
    }

    goToSlide(slideIndex, instant) {
        if (this.iscroll.currentPage.pageX == slideIndex) {
            return;
        }

        if (!instant) {
            if (this.flipping) return;

            this.flipping = true;
            this.wrapper.style.pointerEvents = 'none';
            this.disableIscroll();
        }

        this.onResize();

        var time = instant ? 0 : 600 * this.options.pageFlipDuration;
        var slide = this.slides[slideIndex];

        if (slide.pages && slide.pages[0]) {
            this.pagesArr[slide.pages[0]].updateHtmlContent();
        }

        if (this.iscroll.pages.length > 0) {
            this.iscroll.goToPage(slideIndex, 0, time);
        }

        if (instant) {
            this.currentSlide = slideIndex;
        }

        this.zoomTo(this.options.zoomMin);
    }

    zoomIn(value, time, e) {
        if (e && e.type === 'mousewheel') {
            return;
        }
        this.zoomTo(value);
    }

    zoomTo(zoom, time, x, y) {
        if (!this.enabled || this.zoomDisabled) {
            return;
        }

        x = x || 0;
        y = y || 0;

        if (zoom > 1) {
            this.disableFlip();
        }

        if (w == 0 || h == 0) {
            return;
        }

        var m = this.main;
        var w = m.wrapperW;
        var h = m.wrapperH;
        var bw = m.bookW;
        var bh = m.bookH;
        var pw = m.pageW;
        var ph = m.pageH;
        var r1 = w / h;
        var r2 = pw / ph;

        var s = Math.min(this.zoom, 1);

        var zoomMin = Number(this.options.zoomMin);

        var self = this;

        function fitToHeight() {
            self.ratio = h / bh;
            fit();
        }

        function fitToWidth() {
            self.ratio = self.view == 1 ? w / pw : w / bw;
            fit();
        }

        function fit() {
            for (var i = 0; i < 3; i++) {
                if (self.slides[i].iscroll) {
                    self.slides[i].iscroll.options.zoomMin = self.ratio * self.options.zoomMin;
                    self.slides[i].iscroll.options.zoomMax = self.ratio * self.options.zoomMax;
                    self.slides[i].iscroll.zoom(self.ratio * zoom, x, y, 0);
                }
            }
        }

        if (
            !this.options.singlePageMode &&
            this.options.responsiveView &&
            w <= this.options.responsiveViewTreshold &&
            r1 < 2 * r2 &&
            r1 < this.options.responsiveViewRatio
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
        } else if (this.singlePage && r1 < 2 * r2) {
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

        this.zoom = zoom;

        this.onZoom(zoom);
    }

    zoomOut(value) {
        this.zoomTo(value);
    }

    move(direction) {
        if (this.zoom <= 1) {
            return;
        }

        for (var i = 0; i < 3; i++) {
            var iscroll = this.slides[i].iscroll;
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
    }

    onZoom(zoom) {
        if (zoom > 1) {
            this.disableFlip();
            this.enablePan();
        } else {
            this.enableFlip();
            this.disablePan();
        }

        this.options.main.onZoom(zoom);
    }

    rotateLeft() {
        this.rotation = (this.rotation + 360 - 90) % 360;

        for (var i = 0; i < this.pagesArr.length; i++) {
            var page = this.pagesArr[i];
            page.setRotation(this.rotation);
        }

        this.resizeInnerSlides();
        this.onResize();
    }

    rotateRight() {
        this.rotation = (this.rotation + 360 + 90) % 360;

        for (var i = 0; i < this.pagesArr.length; i++) {
            var page = this.pagesArr[i];
            page.setRotation(this.rotation);
        }

        this.resizeInnerSlides();
        this.onResize();
    }

    onSwipe(event, phase, distanceX, distanceY) {
        if (phase == 'start') {
            return;
        }
    }

    onPageUnloaded(i) {
        var index = this.options.rightToLeft ? this.options.numPages - i - 1 : i;

        this.pagesArr[index].unload();
    }

    disableFlip() {
        this.flipEnabled = false;
        this.iscroll.disable();
    }

    enableFlip() {
        if (this.options.numPages == 1) {
            this.disableFlip();
            return;
        }

        this.flipEnabled = true;
        this.iscroll.enable();
    }

    enablePan() {
        if (this.slides[0].iscroll) {
            this.slides[0].iscroll.enable();
        }
        if (this.slides[1].iscroll) {
            this.slides[1].iscroll.enable();
        }
        if (this.slides[2].iscroll) {
            this.slides[2].iscroll.enable();
        }
    }

    disablePan = function () {
        if (this.slides[0].iscroll) {
            this.slides[0].iscroll.disable();
        }
        if (this.slides[1].iscroll) {
            this.slides[1].iscroll.disable();
        }
        if (this.slides[2].iscroll) {
            this.slides[2].iscroll.disable();
        }
    };
};

FLIPBOOK.PageSwipe = class {
    constructor(book, index, texture, html) {
        this.rotation = 0;
        this.index = index;
        this.options = book.options;
        this.texture = texture;
        this.html = html;
        this.index = index;

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('flipbook-carousel-page');
        this.wrapper.dataset.page = index + 1;
        this.main = book.main;
        this.book = book;

        this.inner = document.createElement('div');
        this.inner.classList.add('flipbook-carousel-page-inner');
        this.wrapper.appendChild(this.inner);

        this.bg = document.createElement('div');
        this.bg.classList.add('flipbook-carousel-page-bg');
        this.inner.appendChild(this.bg);

        this.htmlElement = document.createElement('div');
        this.htmlElement.classList.add('flipbook-page3-html');
        this.htmlElement.style.width = (1000 * this.options.pageWidth) / this.options.pageHeight + 'px';
        this.htmlElement.style.transform = 'scale(' + this.options.pageHeight / 1000 + ') translateZ(0)';
        this.inner.appendChild(this.htmlElement);

        if (this.options.doublePage) {
            if (!this.options.rightToLeft && this.index % 2 === 0 && this.index > 0) {
                this.htmlElement.style.left = '-100%';
            } else if (this.options.rightToLeft && this.index % 2 === 1 && this.index > 0) {
                this.htmlElement.style.left = '-100%';
            } else {
                this.htmlElement.style.left = '0';
            }
        }

        if (this.options.pagePreloader) {
            this.preloader = document.createElement('img');
            this.preloader.src = this.options.pagePreloader;
            this.preloader.classList.add('flipbook-page-preloader-image');
            this.inner.appendChild(this.preloader);
        } else {
            this.preloader = document.createElement('img');
            this.preloader.src = this.options.assets.spinner;
            this.preloader.classList.add('flipbook-page-preloader');
            this.inner.appendChild(this.preloader);
        }

        this.setSize(this.pw, this.ph);
    }

    load(callback, thumb) {
        var size = this.options.pageTextureSize;

        if (this.size >= size) {
            if (!thumb) {
                this.loadHTML();
            }
            if (callback) {
                callback.call(this);
            }
            return;
        }

        this.size = size;

        var self = this;

        var index = this.options.rightToLeft ? this.options.numPages - this.index - 1 : this.index;
        var o = this.options;
        var p = o.pages[index];

        this.options.main.loadPage(index, size, function (page) {
            page = page || {};

            if (page && page.image) {
                var img = page.image[size] || page.image;
                img.classList.add('page-carousel-img');

                if (self.index % 2 == 0 && ((p && p.side == 'left') || (p && p.side == 'right'))) {
                    if (!img.clone) {
                        img.clone = new Image();
                        img.clone.src = img.src;
                    }
                    img = img.clone;
                }

                self.bg.appendChild(img);

                if (self.options.rightToLeft) {
                    if (self.options.doublePage && self.index < self.options.numPages - 1 && self.index % 2 == 1) {
                        img.style.left = '-100%';
                    }

                    if (self.options.doublePage) {
                        if (self.index == self.options.numPages - 1 || (self.index == 0 && self.options.backCover)) {
                            img.style.width = '100%';
                        } else {
                            img.style.width = '200%';
                        }
                    } else {
                        img.style.width = '100%';
                    }
                } else {
                    if (self.options.doublePage && self.index > 0 && self.index % 2 == 0) {
                        img.style.left = '-100%';
                    }

                    if (self.options.doublePage) {
                        if (self.index == 0 || (self.index == self.options.numPages - 1 && self.options.backCover)) {
                            img.style.width = '100%';
                        } else {
                            img.style.width = '200%';
                        }
                    } else {
                        img.style.width = '100%';
                    }
                }

                self.preloader.remove();
            }

            self.setRotation();

            if (!thumb) {
                self.loadHTML();
            }

            if (callback) {
                callback.call(self);
            }
        });
    }

    loadHTML() {
        var self = this;

        var index = !this.options.rightToLeft ? this.index : this.options.numPages - this.index - 1;

        if (this.htmlContent) {
            this.updateHtmlContent();
        } else {
            this.options.main.loadPageHTML(index, function (html) {
                self.htmlContent = html;
                self.updateHtmlContent();
            });
        }
    }

    hideHTML() {
        if (this.htmlContentVisible) {
            this.htmlElement.innerHTML = '';
            this.htmlContentVisible = false;
            this.main.trigger('hidepagehtml', { page: this });
        }
    }

    startHTML() {
        this.book.startPageItems(this.wrapper);
    }

    unload() {
        this.pageSize = 0;
        this.size = 0;
        this.inner.appendChild(this.preloader);
    }

    dispose() {
        if (this.pageSize) {
            this.pageSize = null;
            this.bg.innerHTML = '';
        }
    }

    setSize() {
        var w = this.options.pageWidth;
        var h = this.options.pageHeight;

        if (this.rotation === 0 || this.rotation === 180) {
            this.wrapper.style.width = w + 'px';
            this.wrapper.style.height = h + 'px';
            this.pw = w;
            this.ph = h;
        } else {
            this.wrapper.style.width = h + 'px';
            this.wrapper.style.height = w + 'px';
            this.pw = h;
            this.ph = w;
        }

        this.updateHtmlContent();
    }

    setRotation(val) {
        this.setSize();

        if (this.options.doublePage) {
            return;
        }

        if (typeof val != 'undefined') {
            this.rotation = val;
        }
        if (this.img) {
            this.img.style.transform = 'rotate(' + this.rotation + 'deg) translateZ(0)';
            if (this.rotation === 90 || this.rotation === 270) {
                this.img.style.width = this.wrapper.clientHeight + 'px';
                this.img.style.height = this.wrapper.clientWidth + 'px';
            } else {
                this.img.style.width = this.wrapper.clientWidth + 'px';
                this.img.style.height = this.wrapper.clientHeight + 'px';
            }
        }
    }

    updateHtmlContent() {
        var c = this.htmlContent;

        if (c && !this.htmlContentVisible) {
            this.htmlContentVisible = true;

            this.htmlElement.innerHTML = '';
            this.htmlElement.appendChild(this.htmlContent);
            this.main.trigger('showpagehtml', { page: this });
        }
        this.startHTML();
    }
};
