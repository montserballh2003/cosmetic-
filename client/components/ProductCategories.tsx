import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Fragrance",
    subtitle: "Luxury Scents",
    description: "Discover premium perfumes and colognes",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/cc48d7b380898eb60bc8bf7beaeee6c1527031d6?width=626",
    link: "/category/fragrance",
    color: "from-purple-500/80 to-pink-500/80",
  },
  {
    title: "Hair Care",
    subtitle: "Professional Care",
    description: "Nourish and style your hair",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/4f224e0c512bb7392301a3c8e63d39b2bcfc0ff9?width=626",
    link: "/category/hair",
    color: "from-emerald-500/80 to-teal-500/80",
  },
  {
    title: "Skincare",
    subtitle: "Healthy Glow",
    description: "Advanced skincare solutions",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ef11688abb3689c338fcd1a549a6c87028c7676c?width=626",
    link: "/category/skincare",
    color: "from-blue-500/80 to-cyan-500/80",
  },
  {
    title: "Makeup",
    subtitle: "Express Yourself",
    description: "Professional cosmetics & tools",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/47900329e45430d8e5aca29b804c8b92e751e022?width=626",
    link: "/category/makeup",
    color: "from-rose-500/80 to-pink-500/80",
  },
];

export default function ProductCategories() {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark">
            Shop by Category
          </h2>
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <p className="text-lg text-anoohe-gray font-body max-w-2xl mx-auto">
          Explore our curated collection of premium beauty products across all categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="group relative h-64 lg:h-80 rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={`${category.title} - ${category.description}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="text-white transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                <p className="text-xs lg:text-sm font-body font-medium opacity-90 mb-1">
                  {category.subtitle}
                </p>
                <h3 className="text-lg lg:text-xl font-display font-bold mb-2">
                  {category.title}
                </h3>
                <p className="text-xs lg:text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-body font-medium">Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View All Categories
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
