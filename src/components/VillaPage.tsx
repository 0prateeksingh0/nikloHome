import React from 'react';
import { useParams } from 'react-router-dom';

const VillaPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const villaData = {
    'grand-view': {
      title: "GRAND VIEW",
      subtitle: "The new landmark of the city",
      description: "Experience luxury living at its finest in Grand View, the newest landmark of the city. This stunning villa offers breathtaking views and modern amenities.",
      image: "/hero1.jpeg",
      status: "SOLD",
      features: [
        "Premium location with city views",
        "Modern architectural design",
        "High-end finishes throughout",
        "Private parking spaces",
        "24/7 security",
        "Concierge services"
      ],
      specifications: {
        bedrooms: 4,
        bathrooms: 3,
        area: "250 sqm",
        floors: 2
      }
    },
    'grand-thassos': {
      title: "GRAND THASSOS",
      subtitle: "Modern living by the thassos",
      description: "Discover contemporary living in Grand Thassos, where modern design meets natural beauty. This villa offers a perfect blend of comfort and style.",
      image: "/hero2.jpeg",
      status: "AVAILABLE",
      features: [
        "Seaside location with ocean views",
        "Contemporary architectural design",
        "Open-plan living spaces",
        "Private garden and terrace",
        "Modern kitchen with premium appliances",
        "Energy-efficient systems"
      ],
      specifications: {
        bedrooms: 3,
        bathrooms: 2,
        area: "200 sqm",
        floors: 2
      }
    }
  };

  const villa = villaData[slug as keyof typeof villaData];

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Villa Not Found</h1>
          <p className="text-gray-600 mb-8">The villa you're looking for doesn't exist.</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#253747] hover:bg-[#1a2a35] transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src={villa.image} 
          alt={villa.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{villa.title}</h1>
            <p className="text-xl md:text-2xl mb-6">{villa.subtitle}</p>
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
              villa.status === 'SOLD' 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {villa.status}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Villa</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {villa.description}
            </p>
            
            {/* Specifications */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-light">{villa.specifications.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-light">{villa.specifications.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-light">{villa.specifications.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Floors:</span>
                  <span className="font-light">{villa.specifications.floors}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h3>
            <div className="space-y-4">
              {villa.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-[#253747] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <div className="mt-8">
              <button className="w-full bg-[#253747] hover:bg-[#1a2a35] text-white font-light py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
                Contact Us for More Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaPage;
