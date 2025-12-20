import Logo from "@/assets/svgs/Logo";
import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12 md:py-20 mt-24 md:mt-28">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo + Description */}
        <div className="flex flex-col items-center mb-6">
          <Logo />

          <p className="text-gray-600 mt-4 max-w-lg mx-auto text-md md:text-lg leading-relaxed">
            মরুর মিষ্টি - প্রিমিয়াম মানের অ্যারাবিয়ান খেজুর -এর নির্ভরযোগ্য
            গন্তব্য। <br></br>গুণগত মানেই আমাদের অঙ্গীকার।
          </p>
        </div>

        <div className="flex justify-center">
          <hr className="my-6 w-3/4 border-gray-300" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-800 font-medium mb-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>

        <p className="text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
