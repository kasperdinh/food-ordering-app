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
    title: "Delicious Food Delivered Fast",
    subtitle: "Order Now",
    description:
      "Enjoy the best dishes from top restaurants delivered right to your doorstep in under 30 minutes.",
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
    title: "Fresh Ingredients, Amazing Taste",
    subtitle: "Quality Guaranteed",
    description:
      "We partner with restaurants that use only the freshest ingredients to create memorable dining experiences.",
    image: "/placeholder.jpg",
    cta: "Explore Menu",
    ctaLink: "/food-items",
    badge: "Premium Quality",
    stats: {
      rating: 4.9,
      time: "30 min",
      served: "5K+",
    },
  },
  {
    id: 3,
    title: "Special Offers & Discounts",
    subtitle: "Save More",
    description:
      "Get up to 50% off on your favorite meals. Limited time offers available for new and existing customers.",
    image: "/placeholder.jpg",
    cta: "View Offers",
    ctaLink: "/food-items",
    badge: "50% OFF",
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
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl carousel-container shadow-lg"
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
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 space-y-6 carousel-content">
              {/* Badge */}
              {slide.badge && (
                <Badge className="w-fit carousel-badge transition-colors">
                  {slide.badge}
                </Badge>
              )}

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight carousel-title">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl carousel-subtitle font-medium">
                  {slide.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                {slide.description}
              </p>

              {/* Stats */}
              {slide.stats && (
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 carousel-star" />
                    <span className="font-medium text-foreground">
                      {slide.stats.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 carousel-icon-primary" />
                    <span>{slide.stats.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 carousel-icon-primary" />
                    <span>{slide.stats.served} served</span>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <Link href={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="carousel-cta px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 carousel-image-overlay rounded-l-3xl" />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-l-3xl"
                priority={index === 0}
              />
              <div className="absolute inset-0 carousel-image-gradient rounded-l-3xl" />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-button shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-button shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
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
