import { Clock, ChevronLeft, ChevronRight, BookOpen, User, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const articles = [
  {
    id: 1,
    title: "Professional Tips for Using Shimmer Eyeshadows",
    excerpt:
      "Eyes play a crucial role in facial makeup, and their importance cannot be denied. That's why all types of eye makeup have become popular. Among the latest and most trending types of eyeshadows are shimmer eyeshadows. In this article, you'll learn about this type of eyeshadow and professional tips for using it.",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    category: "Makeup Tips",
    readTime: "5 min read",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/239ff9760d06f1a379942edb94c8d33fcbabef0a?width=328",
  },
  {
    id: 2,
    title: "Complete Guide to False Eyelash Removal",
    excerpt:
      "Getting beautiful and attractive eyes is one of the most important beauty secrets. Today, it's possible to achieve this through false eyelash extensions or application. However, using false eyelashes, whether extensions or adhesive ones, can become tiresome after a while.",
    date: "March 12, 2024",
    author: "Emma Davis",
    category: "Eye Care",
    readTime: "7 min read",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1cb9d048d8e644382fcbe1420282485b64f1d6e8?width=602",
  },
  {
    id: 3,
    title: "The Best Moisturizers for Every Skin Type",
    excerpt:
      "Properly caring for and moisturizing your skin not only maintains its health but also delays the aging process and gives you fresh, youthful skin. If you want to buy the best moisturizers for yourself or your loved ones from the products available in the market.",
    date: "March 10, 2024",
    author: "Dr. Lisa Chen",
    category: "Skincare",
    readTime: "6 min read",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ba7de0841394756b59d395d2daf1e4c1994b819e?width=592",
  },
];

export default function Articles() {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark">
            Beauty Blog
          </h2>
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <p className="text-lg text-anoohe-gray font-body max-w-2xl mx-auto">
          Expert tips, tutorials, and insights from beauty professionals
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <article
            key={article.id}
            className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
              index === 1 ? "lg:scale-105" : ""
            }`}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-body font-semibold">
                {article.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-anoohe-gray font-body mb-3">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-anoohe-dark mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              <p className="text-anoohe-gray font-body text-sm leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-anoohe-gray font-body">
                  {article.date}
                </span>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80 font-body font-semibold p-0 h-auto group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
          View All Articles
        </Button>
      </div>
    </section>
  );
}
