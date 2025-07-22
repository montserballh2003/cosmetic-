import { Play, Clock, Eye, PlayCircle } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Professional Tips for Using Eyeshadows",
    description: "Learn expert techniques for creating stunning eye looks with professional eyeshadow application tips.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/319b334bafe6437ee70699bf405c4c5b0892c145?width=442",
    duration: "8:45",
    views: "12.5K",
    category: "Makeup Tutorial",
    size: "medium",
  },
  {
    id: 2,
    title: "Get Professional Makeup Results at Home!",
    description: "Transform your makeup routine with these professional techniques you can master at home.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/918816a73e5d251b332324d9557913f33a040d90?width=722",
    duration: "12:30",
    views: "8.2K",
    category: "Beauty Tips",
    size: "small",
  },
  {
    id: 3,
    title: "Best Sunscreens for Summer Protection",
    description: "Discover the perfect sunscreen for your skin type and learn proper application techniques for maximum protection.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/beb1d9917b1325e759f0e8ff7bfe9c0b9aeb3b9c?width=808",
    duration: "6:15",
    views: "15.7K",
    category: "Skincare",
    size: "large",
  },
  {
    id: 4,
    title: "Mirror-Like Skin: Skincare Secrets",
    description: "Achieve flawless, mirror-like skin with these proven skincare tips and product recommendations.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/5bbdb9bf3333ff1be9a2a2c43c6d145217254251?width=726",
    duration: "10:20",
    views: "9.8K",
    category: "Skincare Routine",
    size: "small",
  },
  {
    id: 5,
    title: "Essential Skincare Tips for Healthy Skin",
    description: "Master the fundamentals of skincare with these essential tips for maintaining healthy, glowing skin.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/377f3f1fc4938b31bccf39217e4fb1867c49d84b?width=442",
    duration: "7:55",
    views: "11.3K",
    category: "Skincare Basics",
    size: "medium",
  },
];

export default function Videos() {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <PlayCircle className="w-6 h-6 text-primary" />
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark">
            Beauty Tutorials
          </h2>
          <PlayCircle className="w-6 h-6 text-primary" />
        </div>
        <p className="text-lg text-anoohe-gray font-body max-w-2xl mx-auto">
          Watch expert tutorials and learn professional beauty techniques from our specialists
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          const isLarge = video.size === "large";
          const cardClass = isLarge ? "md:col-span-2 lg:col-span-1" : "";

          return (
            <div
              key={video.id}
              className={`group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${cardClass}`}
            >
              {/* Thumbnail */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-body font-semibold">
                  {video.category}
                </div>

                {/* Video Stats */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-body flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-body flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views}
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-6 h-6 text-primary fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-anoohe-dark mb-2 leading-tight group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-anoohe-gray font-body text-sm leading-relaxed line-clamp-2">
                  {video.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-primary to-anoohe-secondary rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Subscribe to Our Channel
          </h3>
          <p className="font-body text-white/90 mb-6 max-w-2xl mx-auto">
            Get notified about new tutorials, tips, and exclusive beauty content delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-body font-semibold transition-colors">
              Subscribe Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-body font-semibold transition-colors bg-transparent">
              View All Videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
