import Link from "next/link";
import {
  Utensils,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Utensils className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-background to-primary bg-clip-text text-transparent">
                FoodOrder
              </span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Leading online food ordering system, bringing you the best dishes
              from trusted restaurants with fast delivery service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors duration-200" />
              <Instagram className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors duration-200" />
              <Twitter className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/food-items"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  All Dishes
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Track Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-background/80 hover:text-primary transition-colors text-sm duration-200 hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-background/80 text-sm group-hover:text-background transition-colors duration-200">
                  123 ABC Street, District 1, Ho Chi Minh City
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-background/80 text-sm group-hover:text-background transition-colors duration-200">
                  +84 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-background/80 text-sm group-hover:text-background transition-colors duration-200">
                  support@foodorder.vn
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2 text-primary">
                Working Hours
              </h4>
              <div className="text-background/80 text-xs space-y-1">
                <div>Monday - Friday: 8:00 AM - 10:00 PM</div>
                <div>Saturday - Sunday: 9:00 AM - 11:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              © 2025 FoodOrder. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-background/60 hover:text-primary transition-colors text-sm duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-background/60 hover:text-primary transition-colors text-sm duration-200"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-background/60 hover:text-primary transition-colors text-sm duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
