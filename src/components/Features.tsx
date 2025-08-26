import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center p-4 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-[#886a4e] mb-2">7-10</div>
            <div className="text-sm md:text-base text-gray-700 leading-tight">APARTMENTS PER FLOOR</div>
          </div>
          <div className="text-center p-4 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-[#886a4e] mb-2">2 – 6</div>
            <div className="text-sm md:text-base text-gray-700 leading-tight">ROOMS PER APARTMENT</div>
          </div>
          <div className="text-center p-4 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-[#886a4e] mb-2">63м² – 279м²</div>
            <div className="text-sm md:text-base text-gray-700 leading-tight">APARTMENT SIZES</div>
          </div>
          <div className="text-center p-4 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-[#886a4e] mb-2">7</div>
            <div className="text-sm md:text-base text-gray-700 leading-tight">DUPLEX APARTMENTS</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
