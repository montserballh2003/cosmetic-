import { Button } from "./ui/button";
import {
  Home,
  Mail,
  Instagram,
  Youtube,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useFormValidation } from "../hooks/use-form-validation";
import { useState } from "react";

export default function ContactFooter() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { formState, getFieldProps, validateForm, resetForm, isSubmitting, setIsSubmitting } = useFormValidation(
    {
      email: { value: '', error: null, touched: false },
    },
    {
      email: { required: true, email: true },
    }
  );

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      resetForm();
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailProps = getFieldProps('email');

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-anoohe-dark to-anoohe-dark/90 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Newsletter Signup */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4">
                Stay Updated with Anoohe
              </h3>
              <p className="font-body text-white/90 mb-6 max-w-lg">
                Get exclusive access to new arrivals, special offers, beauty tips, and expert advice delivered straight to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row bg-white rounded-full overflow-hidden shadow-lg">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 text-anoohe-dark text-base focus:outline-none ${
                        emailProps.hasError ? 'border-r-2 border-red-500' : ''
                      }`}
                      value={emailProps.value}
                      onChange={emailProps.onChange}
                      onBlur={emailProps.onBlur}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || emailProps.hasError}
                    className="bg-primary hover:bg-primary/90 px-6 py-4 rounded-none sm:rounded-r-full font-body font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>

                {/* Error Message */}
                {emailProps.hasError && (
                  <div className="flex items-center gap-2 mt-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {emailProps.error}
                  </div>
                )}

                {/* Success Message */}
                {subscriptionStatus === 'success' && (
                  <div className="flex items-center gap-2 mt-2 text-green-300 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Successfully subscribed! Welcome to Anoohe Beauty.
                  </div>
                )}

                {/* Error Message */}
                {subscriptionStatus === 'error' && (
                  <div className="flex items-center gap-2 mt-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>

              <p className="text-xs text-white/70 mt-3 font-body">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center lg:text-right">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-end gap-3">
                  <div>
                    <p className="text-primary font-body font-semibold text-lg">
                      Call Us: +1 (555) ANOOHE
                    </p>
                    <p className="text-sm font-body text-white/80">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                  <Phone className="w-8 h-8 text-primary" />
                </div>

                <div className="flex items-center justify-center lg:justify-end gap-3">
                  <div>
                    <p className="text-white font-body font-medium">
                      support@anoohe.com
                    </p>
                    <p className="text-sm font-body text-white/80">
                      24/7 Email Support
                    </p>
                  </div>
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-anoohe-cream py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 - Brand & Description */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-3xl font-display font-bold text-anoohe-dark">
                  Anoohe
                </h3>
                <span className="text-sm font-body text-anoohe-gray uppercase tracking-wider">
                  Beauty
                </span>
              </div>
              <h4 className="font-display font-bold text-xl text-primary mb-4">
                Stay Beautiful.
              </h4>
              <p className="text-anoohe-gray text-sm font-body leading-relaxed mb-6">
                Anoohe has been providing authentic, high-quality beauty products from prestigious international brands for over 25 years. We continue this legacy by offering premium beauty solutions through our online platform, bringing you the finest cosmetics, skincare, and fragrance products.
              </p>

              {/* Trust Badges */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25+</div>
                  <div className="text-xs text-anoohe-gray font-body">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100K+</div>
                  <div className="text-xs text-anoohe-gray font-body">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-anoohe-gray font-body">Brands</div>
                </div>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="text-left">
              <h4 className="font-display font-bold text-lg text-anoohe-dark mb-6">
                Quick Links
              </h4>
              <div className="space-y-3">
                <a href="/about" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  About Us
                </a>
                <a href="/contact" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Contact Us
                </a>
                <a href="/stores" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Store Locations
                </a>
                <a href="/careers" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Careers
                </a>
                <a href="/gift-cards" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Gift Cards
                </a>
                <a href="/consultation" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Beauty Consultation
                </a>
              </div>
            </div>

            {/* Column 3 - Customer Service */}
            <div className="text-left">
              <h4 className="font-display font-bold text-lg text-anoohe-dark mb-6">
                Customer Service
              </h4>
              <div className="space-y-3">
                <a href="/shipping" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Shipping Info
                </a>
                <a href="/returns" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Returns & Exchanges
                </a>
                <a href="/faq" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  FAQ
                </a>
                <a href="/size-guide" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Size Guide
                </a>
                <a href="/privacy" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-anoohe-gray hover:text-primary transition-colors font-body">
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Column 4 - Contact & Social */}
            <div className="text-left space-y-6">
              <h4 className="font-display font-bold text-lg text-anoohe-dark mb-6">
                Get in Touch
              </h4>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-anoohe-dark text-sm font-body font-semibold mb-1">
                    Headquarters
                  </p>
                  <p className="text-anoohe-gray text-sm font-body leading-relaxed">
                    123 Beauty Boulevard<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-anoohe-dark text-sm font-body font-semibold mb-1">
                    Business Hours
                  </p>
                  <p className="text-anoohe-gray text-sm font-body leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="font-body font-semibold text-anoohe-dark mb-4">
                  Follow Us
                </h5>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Subscribe to our YouTube channel"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-anoohe-gray/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <p className="text-anoohe-gray text-sm font-body">
                  © 2025 Anoohe Beauty. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a href="/privacy" className="text-anoohe-gray hover:text-primary text-sm font-body transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-anoohe-gray hover:text-primary text-sm font-body transition-colors">
                    Terms of Service
                  </a>
                  <a href="/cookies" className="text-anoohe-gray hover:text-primary text-sm font-body transition-colors">
                    Cookie Policy
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                <span className="text-anoohe-gray text-sm font-body mr-3">We Accept:</span>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-anoohe-gray/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-anoohe-gray">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-anoohe-gray/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-anoohe-gray">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-anoohe-gray/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-anoohe-gray">AMEX</span>
                  </div>
                  <div className="w-10 h-6 bg-anoohe-gray/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-anoohe-gray">PP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
