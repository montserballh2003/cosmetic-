import { ChevronLeft, ChevronRight, Clock, Star, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Jordan Skin Renewal Cream",
    brand: "Jordan Beauty",
    originalPrice: 89.99,
    discountPrice: 62.99,
    discount: 30,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ea3ca3ebb0db28f9c76b22e3dd5abebebdb89851?width=192",
    rating: 4.8,
    reviews: 124,
    timer: { hours: 22, minutes: 13, seconds: 10, days: 2 },
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Hydrating Face Serum",
    brand: "Pure Glow",
    originalPrice: 75.50,
    discountPrice: 52.85,
    discount: 30,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/704d2f4a5abf90dc1c600885c89de703c25e03f0?width=354",
    rating: 4.6,
    reviews: 89,
    timer: { hours: 22, minutes: 13, seconds: 10, days: 2 },
    badge: "Limited Time",
  },
  {
    id: 3,
    name: "Complete 5-in-1 Sulfate-Free Shampoo",
    brand: "Hair Luxe",
    originalPrice: 45.00,
    discountPrice: 36.00,
    discount: 20,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/8ea5551b55aad5205ea6422c54cf67e8c48d2bde?width=141",
    rating: 4.7,
    reviews: 156,
    timer: { hours: 22, minutes: 13, seconds: 10, days: 2 },
    badge: "New",
  },
  {
    id: 4,
    name: "Setria Volumizing Mascara #22",
    brand: "Setria",
    originalPrice: 32.00,
    discountPrice: 27.20,
    discount: 15,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/3612987da929c7fe035a06e254791a83c51bc3ac?width=139",
    rating: 4.9,
    reviews: 203,
    timer: { hours: 22, minutes: 13, seconds: 10, days: 2 },
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "Matte & Moisturizing Lipstick",
    brand: "Note Cosmetics",
    originalPrice: 28.50,
    discountPrice: 24.23,
    discount: 15,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d4eb823c86d97b9ce02a5be100331013b493be75?width=116",
    rating: 4.5,
    reviews: 78,
    timer: { hours: 22, minutes: 13, seconds: 10, days: 2 },
    badge: "Trending",
  },
];

export default function SpecialOffers() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark mb-4">
          Limited Time Offers
        </h2>
        <p className="text-lg text-anoohe-gray font-body">
          Don't miss out on these amazing deals - limited time only!
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary via-primary/95 to-anoohe-secondary rounded-3xl p-6 lg:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Offer Highlight */}
          <div className="w-full lg:w-80 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-white rounded-2xl relative py-12 lg:py-16 border border-white/20">
            <div className="text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-12 h-12 lg:w-16 lg:h-16" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                Flash Sale
              </h3>
              <p className="text-lg lg:text-xl font-body opacity-90 mb-4">
                Up to 40% OFF
              </p>
              <div className="text-sm font-body opacity-75">
                Ends in 2 days, 22 hours
              </div>
            </div>
          </div>

          {/* Right Side - Products Carousel */}
          <div className="flex-1">
            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setCurrentSlide(Math.min(products.length - 3, currentSlide + 1))}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-white/80 text-sm font-body">
                {currentSlide + 1} - {Math.min(currentSlide + 3, products.length)} of {products.length}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(currentSlide, currentSlide + 3).map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-anoohe-secondary text-white px-2 py-1 rounded-full text-xs font-body font-semibold z-10">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-10">
                    <Heart className="w-4 h-4 text-anoohe-gray hover:text-primary" />
                  </button>

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-body font-bold">
                    -{product.discount}%
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center mb-4 pt-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 lg:h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <p className="text-xs text-anoohe-gray font-body mb-1">
                      {product.brand}
                    </p>
                    <h3 className="font-display font-bold text-sm text-anoohe-dark mb-2 leading-tight line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-body text-anoohe-gray">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-3">
                      <p className="font-body text-sm text-gray-400 line-through mb-1">
                        ${product.originalPrice}
                      </p>
                      <p className="font-body text-lg text-primary font-bold">
                        ${product.discountPrice}
                      </p>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-1 text-xs mb-4">
                      <Clock className="w-3 h-3 text-anoohe-gray" />
                      <span className="bg-anoohe-gray/20 px-2 py-1 rounded text-anoohe-dark font-body font-medium">
                        {product.timer.days}d
                      </span>
                      <span className="text-anoohe-gray">:</span>
                      <span className="bg-anoohe-gray/20 px-2 py-1 rounded text-anoohe-dark font-body font-medium">
                        {product.timer.hours}h
                      </span>
                      <span className="text-anoohe-gray">:</span>
                      <span className="bg-anoohe-gray/20 px-2 py-1 rounded text-anoohe-dark font-body font-medium">
                        {product.timer.minutes}m
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-full font-body font-semibold text-sm transition-colors">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-body font-semibold text-lg transition-all duration-300 bg-transparent"
          >
            View All Sale Items
          </Button>
        </div>
      </div>
    </section>
  );
}
