"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  badge?: string;
  stats?: {
    rating: number;
    time: string;
    served: string;
  };
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Fresh Food Delivered Fast",
    subtitle: "Order Now",
    description:
      "Experience the finest culinary creations delivered to your door. Quality ingredients, expert preparation, unmatched flavor.",
    image: "/placeholder.jpg",
    cta: "Order Now",
    ctaLink: "/food-items",
    badge: "Free Delivery",
    stats: {
      rating: 4.8,
      time: "25 min",
      served: "10K+",
    },
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    subtitle: "Excellence",
    description:
      "We partner with top chefs who use only the freshest ingredients to create exceptional dining experiences you'll remember.",
    image: "/placeholder.jpg",
    cta: "Explore Menu",
    ctaLink: "/food-items",
    badge: "Premium",
    stats: {
      rating: 4.9,
      time: "30 min",
      served: "5K+",
    },
  },
  {
    id: 3,
    title: "Special Offers Available",
    subtitle: "Save More",
    description:
      "Enjoy exclusive discounts on your favorite meals. Limited time offers for both new and returning customers.",
    image: "/placeholder.jpg",
    cta: "View Offers",
    ctaLink: "/food-items",
    badge: "Special Deal",
    stats: {
      rating: 4.7,
      time: "20 min",
      served: "15K+",
    },
  },
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl carousel-container shadow-lg mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 carousel-slide ${
            index === currentSlide
              ? "carousel-slide-active"
              : index < currentSlide
              ? "carousel-slide-prev"
              : "carousel-slide-next"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Content Side */}
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6 carousel-content">
              {/* Badge */}
              {slide.badge && (
                <Badge className="w-fit carousel-badge text-sm font-medium px-3 py-1">
                  {slide.badge}
                </Badge>
              )}

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight carousel-title">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl carousel-subtitle font-medium">
                  {slide.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
                {slide.description}
              </p>

              {/* Stats */}
              {slide.stats && (
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 md:h-4 md:w-4 carousel-star" />
                    <span className="font-medium text-foreground">
                      {slide.stats.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 carousel-icon-primary" />
                    <span>{slide.stats.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 md:h-4 md:w-4 carousel-icon-primary" />
                    <span>{slide.stats.served} served</span>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-2 md:pt-4">
                <Link href={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="carousel-cta px-6 md:px-8 py-2 md:py-3 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg text-sm md:text-base font-medium"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 carousel-image-overlay rounded-l-xl" />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-l-xl"
                priority={index === 0}
              />
              <div className="absolute inset-0 carousel-image-gradient rounded-l-xl" />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 carousel-nav-button shadow-lg hover:shadow-xl transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 carousel-nav-button shadow-lg hover:shadow-xl transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${
              index === currentSlide ? "carousel-dot-active" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 carousel-progress">
        <div
          className="h-full carousel-progress-bar"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
