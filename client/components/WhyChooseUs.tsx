import React, { useMemo, useCallback } from "react";
import { Headphones, RotateCcw, Truck, Shield, Award, Heart, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

// Types and interfaces
interface Feature {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly color: string;
  readonly bgColor: string;
  readonly ariaLabel?: string;
}

interface WhyChooseUsProps {
  /** Custom features to display instead of default ones */
  features?: readonly Feature[];
  /** Callback when "Start Shopping" button is clicked */
  onStartShopping?: () => void;
  /** Callback when "Book Consultation" button is clicked */
  onBookConsultation?: () => void;
  /** Custom section title */
  title?: string;
  /** Custom section subtitle */
  subtitle?: string;
  /** Custom CTA section title */
  ctaTitle?: string;
  /** Custom CTA section description */
  ctaDescription?: string;
  /** Whether to show the CTA section */
  showCta?: boolean;
  /** Custom CSS class for the section */
  className?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

interface FeatureCardProps {
  feature: Feature;
}

interface CtaSectionProps {
  title: string;
  description: string;
  onStartShopping?: () => void;
  onBookConsultation?: () => void;
}

// Default features configuration - centralized for maintainability
const DEFAULT_FEATURES: readonly Feature[] = [
  {
    id: "expert-consultation",
    icon: Headphones,
    title: "Expert Consultation",
    description: "Free personalized beauty and skincare advice from certified professionals",
    color: "text-primary",
    bgColor: "bg-primary/10",
    ariaLabel: "Expert consultation services",
  },
  {
    id: "easy-returns",
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day money-back guarantee on all products with hassle-free returns",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    ariaLabel: "Easy return policy",
  },
  {
    id: "free-shipping",
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on orders over $75 with fast delivery nationwide",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    ariaLabel: "Free shipping service",
  },
  {
    id: "authentic-products",
    icon: Shield,
    title: "Authentic Products",
    description: "100% genuine products sourced directly from authorized brand partners",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    ariaLabel: "Authentic product guarantee",
  },
  {
    id: "premium-quality",
    icon: Award,
    title: "Premium Quality",
    description: "Curated selection of luxury and professional-grade beauty products",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    ariaLabel: "Premium quality assurance",
  },
  {
    id: "customer-care",
    icon: Heart,
    title: "Customer Care",
    description: "Dedicated support team available 7 days a week for all your needs",
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    ariaLabel: "Customer care support",
  },
] as const;

// Constants
const DEFAULT_TITLE = "Why Choose Anoohe?";
const DEFAULT_SUBTITLE = "Experience the difference with our commitment to quality, service, and your beauty journey";
const DEFAULT_CTA_TITLE = "Ready to Transform Your Beauty Routine?";
const DEFAULT_CTA_DESCRIPTION = "Join thousands of satisfied customers who trust Anoohe for their beauty needs";

/**
 * Enhanced WhyChooseUs component showcasing key features and benefits.
 * Provides a responsive grid layout with animated feature cards and optional CTA section.
 *
 * @param props - Component props
 * @returns JSX element representing the WhyChooseUs section
 */
const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  features = DEFAULT_FEATURES,
  onStartShopping,
  onBookConsultation,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  ctaTitle = DEFAULT_CTA_TITLE,
  ctaDescription = DEFAULT_CTA_DESCRIPTION,
  showCta = true,
  className = "",
}) => {
  // Memoized handlers for performance optimization
  const handleStartShopping = useCallback(() => {
    onStartShopping?.();
  }, [onStartShopping]);

  const handleBookConsultation = useCallback(() => {
    onBookConsultation?.();
  }, [onBookConsultation]);

  // Memoized features for performance when features prop changes
  const memoizedFeatures = useMemo(() => features, [features]);

  return (
    <section
      className={`bg-anoohe-cream py-16 lg:py-20 ${className}`}
      aria-labelledby="why-choose-us-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Key features and benefits"
        >
          {memoizedFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        {showCta && (
          <CtaSection
            title={ctaTitle}
            description={ctaDescription}
            onStartShopping={handleStartShopping}
            onBookConsultation={handleBookConsultation}
          />
        )}
      </div>
    </section>
  );
};

// Sub-components for better organization and reusability

/**
 * Section header component with title and subtitle
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2
      id="why-choose-us-title"
      className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark mb-4"
    >
      {title}
    </h2>
    <p className="text-lg text-anoohe-gray font-body max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

/**
 * Individual feature card component with icon, title, and description
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const IconComponent = feature.icon;

  return (
    <div
      className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
      role="listitem"
      aria-labelledby={`feature-title-${feature.id}`}
      aria-describedby={`feature-desc-${feature.id}`}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        <IconComponent className={`w-8 h-8 ${feature.color}`} />
      </div>

      {/* Content */}
      <div className="text-left">
        <h3
          id={`feature-title-${feature.id}`}
          className="font-display font-bold text-xl text-anoohe-dark mb-3"
        >
          {feature.title}
        </h3>
        <p
          id={`feature-desc-${feature.id}`}
          className="font-body text-anoohe-gray leading-relaxed"
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
};

/**
 * Call-to-action section component with title, description, and action buttons
 */
const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  description,
  onStartShopping,
  onBookConsultation
}) => (
  <div className="text-center mt-16">
    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-display font-bold text-anoohe-dark mb-4">
        {title}
      </h3>
      <p className="text-anoohe-gray font-body mb-6">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onStartShopping}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-body font-semibold transition-colors"
          aria-label="Start shopping for beauty products"
        >
          Start Shopping
        </Button>
        <Button
          variant="outline"
          onClick={onBookConsultation}
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-body font-semibold transition-colors"
          aria-label="Book a beauty consultation"
        >
          Book Consultation
        </Button>
      </div>
    </div>
  </div>
);

// Set display names for better debugging
SectionHeader.displayName = "SectionHeader";
FeatureCard.displayName = "FeatureCard";
CtaSection.displayName = "CtaSection";

export default WhyChooseUs;
