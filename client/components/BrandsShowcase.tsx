import React, { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { TextureLoader, Vector3 } from 'three';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

// TypeScript interfaces for the 3D carousel
interface Brand {
  name: string;
  logo: string;
  id: string;
}

interface CarouselState {
  isAutoRotating: boolean;
  currentIndex: number;
  hoveredIndex: number | null;
  rotationSpeed: number;
  isAnimationPaused: boolean;
  scrollOffset: number;
}

interface BrandItemProps {
  brand: Brand;
  index: number;
  totalBrands: number;
  isHovered: boolean;
  isCurrent: boolean;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
  scrollOffset?: number;
}



// Enhanced brand data with unique IDs
const brands: Brand[] = [
  {
    id: "golden-rose",
    name: "Golden Rose",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/af2d510288a6c7c750d18bca0f47f2eba9c23282?width=92",
  },
  {
    id: "dafi",
    name: "Dafi",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/c5d400524e7127db55b0339b57ad11819a676445?width=116",
  },
  {
    id: "hydroderm",
    name: "Hydroderm",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/18097d5043ac1706c3710efbd0745405279b9885?width=172",
  },
  {
    id: "servina",
    name: "Servina",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/e5d17178352b0bba7f19c40183e1a5ff886dab81?width=162",
  },
  {
    id: "bio-oil",
    name: "Bio-Oil",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/cf4dba74e389911ec9b59ec296b073fcc76aefeb?width=176",
  },
  {
    id: "seagull",
    name: "Seagull",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/1c4249874f442e813e8dcc8996983af16eafdfa9?width=166",
  },
  {
    id: "logo-footer",
    name: "Logo Footer",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/5bdf3900bbaa95ad2d098ea1b87ca921ba62acad?width=136",
  },
  {
    id: "cerita",
    name: "Cerita",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/2307cb7e7ff0f72a45454c4fdf28fe9d1f833819?width=146",
  },
  {
    id: "dermatique",
    name: "Dermatique",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/1f29cee87011c9b53e8afb29ff372e61e152d80b?width=180",
  },
];

// Configuration type for 3D carousel
interface CarouselConfig {
  radius: number;
  autoRotationSpeed: number;
  hoverScale: number;
  normalScale: number;
  cameraPosition: Vector3;
  brandHeight: number;
  brandWidth: number;
}

// Configuration constants for the horizontal linear layout
const CAROUSEL_CONFIG: CarouselConfig = {
  radius: 4, // Not used in linear layout but kept for compatibility
  autoRotationSpeed: 0.005,
  hoverScale: 1.3,
  normalScale: 1,
  cameraPosition: new Vector3(0, 0, 12), // Moved back to see full horizontal layout
  brandHeight: 1.5,
  brandWidth: 1.8, // Slightly smaller for better spacing
};

const MOBILE_CONFIG: CarouselConfig = {
  radius: 3,
  autoRotationSpeed: 0.005,
  hoverScale: 1.2,
  normalScale: 1,
  cameraPosition: new Vector3(0, 0, 8), // Closer for mobile
  brandHeight: 1.0,
  brandWidth: 1.2, // Smaller for mobile
};

const TABLET_CONFIG: CarouselConfig = {
  radius: 3.5,
  autoRotationSpeed: 0.005,
  hoverScale: 1.25,
  normalScale: 1,
  cameraPosition: new Vector3(0, 0, 10),
  brandHeight: 1.2,
  brandWidth: 1.5,
};

// Hook for responsive 3D configuration
const useResponsiveConfig = (): CarouselConfig => {
  const [config, setConfig] = useState<CarouselConfig>(CAROUSEL_CONFIG);

  React.useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setConfig(MOBILE_CONFIG);
      } else if (width < 1024) {
        setConfig(TABLET_CONFIG);
      } else {
        setConfig(CAROUSEL_CONFIG);
      }
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  return config;
};

// Individual brand item component in 3D space
const BrandItem: React.FC<BrandItemProps & { config: CarouselConfig }> = React.memo(({
  brand,
  index,
  totalBrands,
  isHovered,
  isCurrent,
  onHover,
  onClick,
  config,
  scrollOffset = 0,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasEntryAnimated, setHasEntryAnimated] = useState(false);

  // Calculate position in 3D space (horizontal linear arrangement)
  const spacing = config.brandWidth + 0.5; // Space between brands
  const totalWidth = (totalBrands - 1) * spacing;
  const baseX = (index * spacing) - (totalWidth / 2); // Center the row

  // Apply continuous scroll offset with infinite loop
  const scrollRange = totalWidth + spacing * 2; // Add extra space for seamless loop
  const x = baseX - (scrollOffset % scrollRange);

  const z = 0; // All brands at the same depth
  const y = 0;

  // Load texture for brand logo
  React.useEffect(() => {
    const loader = new TextureLoader();
    setIsLoading(true);
    setHasError(false);

    loader.load(
      brand.logo,
      (loadedTexture) => {
        setTexture(loadedTexture);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture for ${brand.name}:`, error);
        setHasError(true);
        setIsLoading(false);
      }
    );
  }, [brand.logo, brand.name]);

  // Entry animation and scale animation
  useFrame((state) => {
    if (meshRef.current) {
      const currentTime = state.clock.elapsedTime;

      // Entry animation with staggered delay
      const entryDelay = index * 0.15; // 150ms delay between each brand
      const entryDuration = 0.8; // 800ms animation duration
      const entryProgress = Math.min(1, Math.max(0, (currentTime - entryDelay) / entryDuration));

      if (entryProgress < 1 && !hasEntryAnimated) {
        // Smooth easing function (ease-out cubic)
        const easedProgress = 1 - Math.pow(1 - entryProgress, 3);

        // Slide in from left with fade in
        const startX = x - 5; // Start 5 units to the left
        const currentX = startX + (5 * easedProgress);
        meshRef.current.position.x = currentX;

        // Fade in effect
        if (meshRef.current.material && 'opacity' in meshRef.current.material) {
          (meshRef.current.material as any).opacity = easedProgress;
        }
      } else {
        // Normal position after entry animation
        meshRef.current.position.x = x;
        if (meshRef.current.material && 'opacity' in meshRef.current.material) {
          (meshRef.current.material as any).opacity = isHovered || isCurrent ? 1 : 0.7;
        }
        if (!hasEntryAnimated) {
          setHasEntryAnimated(true);
        }
      }

      // Scale animation for hover effect
      const targetScale = isHovered ? config.hoverScale : config.normalScale;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handlePointerOver = useCallback(() => {
    onHover(index);
  }, [index, onHover]);

  const handlePointerOut = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  if (isLoading) {
    return (
      <mesh position={[x, y, z]} ref={meshRef}>
        <planeGeometry args={[config.brandWidth, config.brandHeight]} />
        <meshBasicMaterial color="#f3f4f6" />
        <Html center>
          <div className="w-16 h-16 bg-gray-200 animate-pulse rounded" />
        </Html>
      </mesh>
    );
  }

  if (hasError || !texture) {
    return (
      <mesh position={[x, y, z]} ref={meshRef}>
        <planeGeometry args={[config.brandWidth, config.brandHeight]} />
        <meshBasicMaterial color="#ef4444" />
        <Html center>
          <div className="text-white text-xs text-center p-2">
            Failed to load<br />{brand.name}
          </div>
        </Html>
      </mesh>
    );
  }

  return (
    <mesh
      position={[x, y, z]}
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <planeGeometry args={[config.brandWidth, config.brandHeight]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={isHovered || isCurrent ? 1 : 0.7}
      />
      {isHovered && (
        <Html center>
          <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transform -translate-y-12">
            {brand.name}
          </div>
        </Html>
      )}
    </mesh>
  );
});

BrandItem.displayName = 'BrandItem';

// Main 3D Linear Layout component
const Brands3DCarousel: React.FC = React.memo(() => {
  const config = useResponsiveConfig();
  const [carouselState, setCarouselState] = useState<CarouselState>({
    isAutoRotating: false, // Disabled for linear layout
    currentIndex: 0,
    hoveredIndex: null,
    rotationSpeed: 0, // No rotation needed
    isAnimationPaused: false,
    scrollOffset: 0,
  });

  const animationStartTimeRef = useRef<number>(0);
  // Responsive scroll speed based on screen size
  const scrollSpeedRef = useRef<number>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 0.2 : 0.3
  );

  // Continuous scrolling animation
  useFrame((state) => {
    if (!carouselState.isAnimationPaused) {
      const currentTime = state.clock.elapsedTime;
      if (animationStartTimeRef.current === 0) {
        animationStartTimeRef.current = currentTime;
      }

      const scrollOffset = (currentTime - animationStartTimeRef.current) * scrollSpeedRef.current;
      setCarouselState(prev => ({
        ...prev,
        scrollOffset: scrollOffset,
      }));
    }
  });

  const handleBrandHover = useCallback((index: number | null) => {
    setCarouselState(prev => ({
      ...prev,
      hoveredIndex: index,
      isAnimationPaused: index !== null, // Pause animation on hover
    }));
  }, []);

  const handleBrandClick = useCallback((index: number) => {
    setCarouselState(prev => ({
      ...prev,
      currentIndex: index,
    }));
  }, []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />

      {/* Directional light for better visibility */}
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* Point light for dynamic lighting */}
      <pointLight position={[0, 5, 0]} intensity={0.4} />

      {/* Brand items - render twice for seamless infinite scroll */}
      {[...brands, ...brands].map((brand, index) => (
        <BrandItem
          key={`${brand.id}-${Math.floor(index / brands.length)}`}
          brand={brand}
          index={index}
          totalBrands={brands.length * 2} // Double the total for seamless loop
          isHovered={carouselState.hoveredIndex === (index % brands.length)}
          isCurrent={carouselState.currentIndex === (index % brands.length)}
          onHover={(hoverIndex) => handleBrandHover(hoverIndex !== null ? hoverIndex % brands.length : null)}
          onClick={(clickIndex) => handleBrandClick(clickIndex % brands.length)}
          config={config}
          scrollOffset={carouselState.scrollOffset}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan={true} // Allow panning to see all brands
        enableZoom={true} // Allow zoom for better viewing
        enableRotate={true}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        maxDistance={20} // Limit zoom out
        minDistance={6}  // Limit zoom in
      />
    </>
  );
});

Brands3DCarousel.displayName = 'Brands3DLinearLayout';

// Error boundary for 3D canvas
const Canvas3DErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex-1 h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">3D view not supported</p>
          <p className="text-sm text-gray-500">Fallback to standard view</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Fallback component for non-WebGL browsers
const BrandsFallback: React.FC = React.memo(() => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex items-center gap-8 lg:gap-12"
          animate={{
            x: isPaused ? 0 : [-50, -window.innerWidth - 200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Render brands twice for seamless infinite scroll */}
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.id}-${Math.floor(index / brands.length)}`}
              className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300 grayscale hover:grayscale-0 flex-shrink-0 min-w-[120px]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: (index % brands.length) * 0.15,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] // Smooth ease-out cubic
              }}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} - Premium beauty brand`}
                className="h-8 lg:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

BrandsFallback.displayName = 'BrandsFallback';

// Main BrandsShowcase component
export default function BrandsShowcase() {
  const config = useResponsiveConfig();
  const [use3D, setUse3D] = useState(true);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Check WebGL support
  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
  }, []);

  const toggle3D = useCallback(() => {
    setUse3D(prev => !prev);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        // This would trigger navigation if we had access to the carousel controls
      }
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        toggle3D();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle3D]);

  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-anoohe-dark mb-4">
          Trusted by Leading Brands
        </h2>
        <p className="text-lg text-anoohe-gray font-body max-w-2xl mx-auto">
          We partner with the world's most prestigious beauty brands to bring you authentic, high-quality products
        </p>
      </div>

      <div className="bg-white border-2 border-anoohe-gray/20 rounded-2xl p-8 lg:p-12 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* 3D Brands Carousel or Fallback */}
          {use3D && isWebGLSupported ? (
            <div
              className="flex-1 h-96 relative"
              role="region"
              aria-label="3D Brand Linear Layout"
            >
              <Canvas3DErrorBoundary>
                <Canvas
                  camera={{ position: config.cameraPosition, fov: 50 }}
                  className="rounded-xl"
                  aria-label="Interactive 3D brand linear showcase"
                >
                  <Suspense fallback={
                    <Html center>
                      <div className="flex items-center space-x-2" role="status" aria-label="Loading 3D carousel">
                        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="sr-only">Loading 3D brand carousel...</span>
                      </div>
                    </Html>
                  }>
                    <Brands3DCarousel />
                  </Suspense>
                </Canvas>
              </Canvas3DErrorBoundary>

              {/* 3D Toggle Button */}
              <button
                onClick={toggle3D}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                title="Switch to 2D view (Press Space)"
                aria-label="Switch to 2D view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          ) : (
            <div
              className="flex-1 relative"
              role="region"
              aria-label="Brand Grid"
            >
              <BrandsFallback />

              {/* 2D Toggle Button */}
              {isWebGLSupported && (
                <button
                  onClick={toggle3D}
                  className="absolute top-4 right-4 bg-primary hover:bg-primary/90 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  title="Switch to 3D view (Press Space)"
                  aria-label="Switch to 3D view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Brand Promise */}
          <div className="w-full lg:w-80 text-center lg:text-left">
            <div className="bg-gradient-to-br from-primary to-anoohe-secondary rounded-2xl p-6 text-white">
              <h3 className="text-xl lg:text-2xl font-display font-bold mb-4">
                Premium Brands
              </h3>
              <p className="font-body text-white/90 mb-4">
                Every product in our collection is sourced directly from authorized distributors, ensuring authenticity and quality.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-white/80">Authentic</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-white/80">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-white/80">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
