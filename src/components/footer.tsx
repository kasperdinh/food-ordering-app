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
    <footer className="relative overflow-hidden footer-container">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 footer-bg-overlay"></div>
      </div>

      <div className="container relative mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl footer-logo-icon">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl footer-logo-text">
                FoodOrder
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bringing you the finest culinary experiences with authentic
              flavors, fresh ingredients, and swift delivery right to your
              doorstep.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 rounded-full footer-social-button footer-social-facebook cursor-pointer group">
                <Facebook className="h-4 w-4 footer-social-icon" />
              </div>
              <div className="p-2 rounded-full footer-social-button footer-social-instagram cursor-pointer group">
                <Instagram className="h-4 w-4 footer-social-icon" />
              </div>
              <div className="p-2 rounded-full footer-social-button footer-social-twitter cursor-pointer group">
                <Twitter className="h-4 w-4 footer-social-icon" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg footer-section-title">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="footer-link text-sm group">
                  <span className="flex items-center space-x-2">
                    <span className="footer-link-dot"></span>
                    <span>Home</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/food-items" className="footer-link text-sm group">
                  <span className="flex items-center space-x-2">
                    <span className="footer-link-dot"></span>
                    <span>All Dishes</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categories" className="footer-link text-sm group">
                  <span className="flex items-center space-x-2">
                    <span className="footer-link-dot"></span>
                    <span>Categories</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link text-sm group">
                  <span className="flex items-center space-x-2">
                    <span className="footer-link-dot"></span>
                    <span>About Us</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link text-sm group">
                  <span className="flex items-center space-x-2">
                    <span className="footer-link-dot"></span>
                    <span>Contact</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-foreground transition-all duration-300 text-sm hover:translate-x-2 inline-block group"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Help Center</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-foreground transition-all duration-300 text-sm hover:translate-x-2 inline-block group"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Track Orders</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-foreground transition-all duration-300 text-sm hover:translate-x-2 inline-block group"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Return Policy</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-foreground transition-all duration-300 text-sm hover:translate-x-2 inline-block group"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Privacy Policy</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-foreground transition-all duration-300 text-sm hover:translate-x-2 inline-block group"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Terms of Service</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 rounded-lg bg-white border border-gray-200 group-hover:bg-red-50 group-hover:border-red-300 transition-all duration-300 shadow-sm">
                  <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                </div>
                <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                  123 Culinary Street
                  <br />
                  District 1, Ho Chi Minh City
                  <br />
                  Vietnam
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-white border border-gray-200 group-hover:bg-muted group-hover:border-foreground transition-all duration-300 shadow-sm">
                  <Phone className="h-4 w-4 text-foreground flex-shrink-0" />
                </div>
                <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  +84 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-white border border-gray-200 group-hover:bg-yellow-50 group-hover:border-yellow-300 transition-all duration-300 shadow-sm">
                  <Mail className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                </div>
                <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  hello@foodorder.vn
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h4 className="font-medium text-sm mb-3 text-foreground flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>We&apos;re Open</span>
              </h4>
              <div className="text-gray-600 text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span className="text-green-600 font-medium">
                    8:00 AM - 10:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Weekends</span>
                  <span className="text-green-600 font-medium">
                    9:00 AM - 11:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm flex items-center space-x-2">
              <span>© 2025 FoodOrder. All rights reserved.</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Made with ❤️ for food lovers</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-foreground transition-colors text-sm duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-foreground transition-colors text-sm duration-300"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-foreground transition-colors text-sm duration-300"
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
