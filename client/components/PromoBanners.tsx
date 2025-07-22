import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export default function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summer Fragrance Banner */}
        <div className="group relative bg-gradient-to-br from-anoohe-dark to-anoohe-dark/80 rounded-3xl h-64 lg:h-80 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4ab925c484f8cbf9e074101183b28df34ba96eaa?width=1292"
            alt="Summer fragrance collection"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

          <div className="relative h-full flex flex-col justify-center px-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-anoohe-secondary" />
              <span className="text-sm font-body font-semibold text-anoohe-secondary uppercase tracking-wider">
                Summer Collection
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4 leading-tight">
              Embrace Summer
              <span className="block text-anoohe-secondary">Fragrances</span>
            </h3>
            <p className="text-sm lg:text-base font-body opacity-90 mb-6 max-w-sm">
              Discover refreshing scents that capture the essence of summer. Perfect for warm days and balmy nights.
            </p>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-anoohe-dark w-fit px-6 py-3 rounded-full font-body font-semibold bg-transparent group-hover:scale-105 transition-all"
            >
              Shop Summer Scents
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Luxury Makeup Banner */}
        <div className="group relative bg-gradient-to-br from-primary to-anoohe-secondary rounded-3xl h-64 lg:h-80 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/86321135ce2505ec49d99622cfdbdf6fac42ea22?width=1292"
            alt="Luxury makeup collection"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/60 to-transparent"></div>

          <div className="relative h-full flex flex-col justify-center px-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-body font-semibold text-white uppercase tracking-wider">
                Luxury Collection
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4 leading-tight">
              Glamorous
              <span className="block">Makeup</span>
            </h3>
            <p className="text-sm lg:text-base font-body opacity-90 mb-6 max-w-sm">
              Elevate your look with our premium makeup collection. Shimmer and shine with professional-grade cosmetics.
            </p>
            <Button
              className="bg-white text-primary hover:bg-white/90 w-fit px-6 py-3 rounded-full font-body font-semibold group-hover:scale-105 transition-all"
            >
              Explore Makeup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
