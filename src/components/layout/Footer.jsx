import { UserPen, Film, Bird, Rabbit, Volleyball } from "lucide-react";

const Footer = () => {
  const navLinks = [
    "About Us",
    "FAQ",
    "Privacy Policy",
    "Contact",
    "Blog",
    "Terms of Service",
  ];

  const socialLinks = [
    { name: "Facebook", icon: UserPen },
    { name: "Instagram", icon: Film },
    { name: "Twitter", icon: Bird },
    { name: "GitHub", icon: Rabbit },
    { name: "Dribbble", icon: Volleyball },
  ];

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Top Section: Logo & Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-2xl font-bold tracking-tight text-gray-900">
            pixabay
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Pixabay Clone. All rights reserved.
          </p>
        </div>

        {/* Middle Section: Navigation Links */}
        <nav className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section: Social Icons */}
        <div className="flex justify-center gap-4 mt-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all duration-300 bg-gray-200 rounded-full hover:bg-gray-900 hover:text-white hover:-translate-y-1"
              >
                <Icon size={18} strokeWidth={2} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
