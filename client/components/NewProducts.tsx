import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const newProducts = [
  {
    id: 1,
    name: "Laguna Liquid Concealer",
    brand: "Laguna Beauty",
    price: 24.99,
    originalPrice: null,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d6898197dae43be4df432caceee6e45b0b5d3645?width=122",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    badge: "New Arrival",
  },
  {
    id: 2,
    name: "Laguna Waterproof Double-Ended Eyeliner",
    brand: "Laguna Beauty",
    originalPrice: 32.00,
    price: 22.40,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/5106182bce6c9c7bb0aa5a1b237fcac973b154ff?width=348",
    rating: 4.8,
    reviews: 156,
    isNew: true,
    badge: "30% Off",
  },
  {
    id: 3,
    name: "Brightening Face Wash Gel",
    brand: "Pure Glow",
    price: 18.50,
    originalPrice: null,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/e76d51a84e83cc604be581db966a85658e9bf310?width=173",
    rating: 4.6,
    reviews: 203,
    isNew: true,
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Tinted Sunscreen for Combination to Oily Skin",
    brand: "SunShield",
    price: 28.75,
    originalPrice: null,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a4233a9ab405bdf142f54db6c432d20257f48873?width=168",
    rating: 4.9,
    reviews: 124,
    isNew: true,
    badge: "SPF 50+",
  },
  {
    id: 5,
    name: "Onde Son Évodie Eau de Parfum",
    brand: "Évodie Paris",
    price: 89.99,
    originalPrice: null,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/010f4512c00849560ec0c4106566ef661309ff62?width=151",
    rating: 4.5,
    reviews: 67,
    isNew: true,
    badge: "Limited Edition",
  },
];

export default function NewProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark">
            New Arrivals
          </h2>
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <p className="text-lg text-anoohe-gray font-body">
          Discover the latest additions to our premium beauty collection
        </p>
      </div>

      <div className="bg-gradient-to-br from-anoohe-primary-light via-white to-anoohe-cream rounded-3xl p-6 lg:p-8 overflow-hidden shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {newProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-body font-semibold z-10">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-10 opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4 text-anoohe-gray hover:text-primary" />
                  </button>

                  {/* Product Image */}
                  <div className="flex justify-center mb-4 pt-4">
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
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-xs font-body text-anoohe-gray">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-3">
                      {product.originalPrice && (
                        <p className="font-body text-xs text-gray-400 line-through mb-1">
                          ${product.originalPrice}
                        </p>
                      )}
                      <p className="font-body text-lg text-primary font-bold">
                        ${product.price}
                      </p>
                    </div>

                    {/* Quick Add Button */}
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-full font-body font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Quick Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => setCurrentSlide(Math.min(newProducts.length - 5, currentSlide + 1))}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Banner */}
          <div className="w-full lg:w-80 flex items-center justify-center relative">
            <div className="relative bg-gradient-to-br from-primary to-anoohe-secondary rounded-2xl p-8 text-white text-center shadow-xl">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-white/60" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Sparkles className="w-4 h-4 text-white/40" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4">
                  New Arrivals
                </h3>
                <p className="font-body text-white/90 mb-6">
                  Be the first to discover our latest beauty innovations
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 py-3 rounded-full font-body font-semibold bg-transparent"
                >
                  Shop New Products
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
            View All New Arrivals
          </Button>
        </div>
      </div>
    </section>
  );
}
