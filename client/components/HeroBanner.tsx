import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="container mx-auto px-4 py-6 lg:py-12">
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-anoohe-secondary rounded-3xl lg:rounded-[2rem] h-80 lg:h-[500px] overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/174996f904ca54ded12d5b12ba0126538cc9db0d?width=2622"
            alt="Beautiful woman with luxury beauty products"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 lg:w-6 lg:h-6 text-anoohe-secondary fill-current" />
            <Star className="w-3 h-3 lg:w-4 lg:h-4 text-white fill-current" />
            <Star className="w-2 h-2 lg:w-3 lg:h-3 text-anoohe-secondary fill-current" />
          </div>
        </div>

        {/* ANOOHE Brand Tag */}
        <div className="absolute top-6 lg:top-8 left-1/2 transform -translate-x-1/2 rotate-3">
          <div className="bg-white/95 backdrop-blur-sm text-primary px-3 lg:px-6 py-2 lg:py-3 rounded-full font-display font-bold text-sm lg:text-xl shadow-xl border border-white/20">
            <Sparkles className="inline w-4 h-4 lg:w-5 lg:h-5 mr-2 text-anoohe-secondary" />
            ANOOHE
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-6 lg:px-12">
          <div className="text-left text-white max-w-lg">
            {/* Main Offer Text */}
            <div className="space-y-3 lg:space-y-6">
              <div className="space-y-2">
                <p className="text-sm lg:text-lg font-body font-medium text-white/90 uppercase tracking-wider">
                  Exclusive Beauty Sale
                </p>
                <h1 className="text-3xl lg:text-6xl font-display font-bold leading-tight text-balance">
                  Discover Your
                  <span className="block text-anoohe-secondary">Perfect Look</span>
                </h1>
              </div>

              <p className="text-lg lg:text-2xl font-body font-medium text-white/95">
                Save up to <span className="font-bold text-anoohe-secondary">40% OFF</span> on premium beauty products
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6">
                <Button className="bg-white text-primary hover:bg-white/90 hover:scale-105 px-6 lg:px-8 py-3 lg:py-4 rounded-full text-base lg:text-lg font-body font-semibold transition-all duration-300 shadow-lg group">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 lg:px-8 py-3 lg:py-4 rounded-full text-base lg:text-lg font-body font-semibold transition-all duration-300 bg-transparent"
                >
                  Free Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 text-sm lg:text-base text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-anoohe-secondary rounded-full"></div>
                  <span className="font-body">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-anoohe-secondary rounded-full"></div>
                  <span className="font-body">Expert Advice</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-anoohe-secondary rounded-full"></div>
                  <span className="font-body">Premium Brands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
