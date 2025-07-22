import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, ShoppingCart, Menu, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

// Types and interfaces
interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly mobileLabel?: string;
  readonly isSpecial?: boolean;
}

interface HeaderProps {
  /** Current cart item count */
  cartCount?: number;
  /** Current wishlist item count */
  wishlistCount?: number;
  /** Callback when cart is clicked */
  onCartClick?: () => void;
  /** Callback when wishlist is clicked */
  onWishlistClick?: () => void;
  /** Callback when account button is clicked */
  onAccountClick?: () => void;
  /** Callback when search is performed */
  onSearch?: (query: string) => void;
}

// Navigation configuration - centralized for maintainability
const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "Skincare", href: "/skincare" },
  { label: "Makeup", href: "/makeup" },
  { label: "Fragrance", href: "/fragrance" },
  { label: "Consultation", href: "/consultation", mobileLabel: "Free Consultation" },
  { label: "Blog", href: "/blog", mobileLabel: "Beauty Blog" },
  { label: "Sale", href: "/sale", mobileLabel: "Sale - Up to 40% Off", isSpecial: true },
] as const;

// Constants
const ESCAPE_KEY = "Escape";

/**
 * Enhanced Header component with improved TypeScript support, accessibility,
 * and maintainability. Provides navigation, search, cart, wishlist, and account functionality.
 */
const Header: React.FC<HeaderProps> = ({
  cartCount = 3,
  wishlistCount = 2,
  onCartClick,
  onWishlistClick,
  onAccountClick,
  onSearch,
}) => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Refs for DOM manipulation and accessibility
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Memoized handlers for performance optimization
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  }, [searchQuery, onSearch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Keyboard and click outside handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === ESCAPE_KEY && isMenuOpen) {
        handleMenuClose();
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        handleMenuClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);

      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, handleMenuClose]);

  // Component rendering
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Search Bar */}
          <SearchBar
            className="hidden md:flex items-center max-w-lg mx-4 lg:mx-8 flex-1 order-2"
            value={searchQuery}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            ref={searchInputRef}
            placeholder="Search for products, brands, or categories..."
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2 lg:gap-4 order-3">
            {/* Wishlist Button */}
            <ActionButton
              icon={<Heart className="w-5 h-5 lg:w-6 lg:h-6 text-anoohe-dark" />}
              label="Wishlist"
              count={wishlistCount}
              countColor="bg-anoohe-secondary"
              onClick={onWishlistClick}
            />

            {/* Shopping Cart Button */}
            <ActionButton
              icon={<ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-anoohe-dark" />}
              label="Shopping cart"
              count={cartCount}
              countColor="bg-primary"
              onClick={onCartClick}
            />

            {/* Account Button */}
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-body text-sm lg:text-base font-medium transition-colors"
              onClick={onAccountClick}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Account</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-6 h-6 text-anoohe-dark" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`md:hidden mt-4 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}
          id="mobile-search"
        >
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            ref={mobileSearchInputRef}
            placeholder="Search products..."
            isMobile
          />
        </div>

        {/* Desktop Navigation Menu */}
        <DesktopNavigation items={NAVIGATION_ITEMS} />

        {/* Mobile Navigation Menu */}
        <MobileNavigation
          ref={menuRef}
          isOpen={isMenuOpen}
          items={NAVIGATION_ITEMS}
          onItemClick={handleMenuClose}
        />
      </div>
    </header>
  );
};

// Sub-components for better organization and reusability

/**
 * Logo component with brand name and tagline
 */
const Logo: React.FC = () => (
  <div className="flex items-center order-1">
    <Link to="/" className="flex items-center">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-anoohe-dark">
        Anoohe
      </h1>
      <span className="ml-2 text-xs lg:text-sm text-anoohe-gray font-body uppercase tracking-wider">
        Beauty
      </span>
    </Link>
  </div>
);

/**
 * Search bar component with form submission
 */
interface SearchBarProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  isMobile?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, value, onChange, onSubmit, placeholder, isMobile = false }, ref) => (
    <div className={className || "relative w-full"}>
      <form onSubmit={onSubmit} className="relative w-full">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pr-12 pl-6 py-3 border border-gray-200 rounded-full text-left font-body text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center"
          aria-label="Submit search"
        >
          <Search className={`text-anoohe-gray ${isMobile ? 'w-5 h-5' : 'w-4 h-4 lg:w-5 lg:h-5'}`} />
        </button>
      </form>
    </div>
  )
);

/**
 * Action button component for cart and wishlist
 */
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  countColor?: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  count = 0,
  countColor = "bg-primary",
  onClick
}) => (
  <button
    className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
    aria-label={label}
    onClick={onClick}
  >
    {icon}
    {count > 0 && (
      <span
        className={`absolute -top-1 -right-1 ${countColor} text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-body font-medium`}
        aria-label={`${count} items`}
      >
        {count}
      </span>
    )}
  </button>
);

/**
 * Desktop navigation menu component
 */
interface DesktopNavigationProps {
  items: readonly NavigationItem[];
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ items }) => (
  <nav className="mt-4 lg:mt-6" role="navigation" aria-label="Main navigation">
    <ul className="flex items-center justify-center gap-2 lg:gap-8 text-anoohe-dark font-body text-sm lg:text-base flex-wrap">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className={`hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 font-medium ${
              item.isSpecial
                ? "hover:text-anoohe-secondary text-anoohe-secondary hover:bg-anoohe-secondary/10"
                : ""
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

/**
 * Mobile navigation menu component
 */
interface MobileNavigationProps {
  isOpen: boolean;
  items: readonly NavigationItem[];
  onItemClick: () => void;
}

const MobileNavigation = React.forwardRef<HTMLDivElement, MobileNavigationProps>(
  ({ isOpen, items, onItemClick }, ref) => (
    <div
      ref={ref}
      className={`md:hidden mt-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
      role="navigation"
      aria-label="Mobile navigation menu"
      aria-expanded={isOpen}
      id="mobile-menu"
    >
      <nav className="bg-gray-50 rounded-lg p-4" role="menu">
        <ul className="space-y-2" role="none">
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                to={item.href}
                className={`block transition-colors px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  item.isSpecial
                    ? "hover:text-anoohe-secondary text-anoohe-secondary hover:bg-anoohe-secondary/10 focus:ring-anoohe-secondary"
                    : "hover:text-primary hover:bg-white focus:ring-primary"
                }`}
                onClick={onItemClick}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
              >
                {item.mobileLabel || item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
);

// Set display names for better debugging
Logo.displayName = "Logo";
SearchBar.displayName = "SearchBar";
ActionButton.displayName = "ActionButton";
DesktopNavigation.displayName = "DesktopNavigation";
MobileNavigation.displayName = "MobileNavigation";

export default Header;
