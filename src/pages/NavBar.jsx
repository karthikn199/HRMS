import { useEffect, useState } from "react";
import { FiHome, FiLayers, FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { GiDiamondRing } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FiHome className="mr-1" />,
    },
    {
      name: "Post Details",
      href: "/PostDetails",
      icon: <FiLayers className="mr-1" />,
    },
    {
      name: "Contact Details",
      href: "/PostDetails",
      icon: <FiShoppingBag className="mr-1" />,
    },
    // {
    //   name: "Customers",
    //   href: "/customer",
    //   icon: <FiUsers className="mr-1" />,
    // },
    // {
    //   name: "Reports",
    //   href: "/reports",
    //   icon: <FiPieChart className="mr-1" />,
    // },
    // {
    //   name: "Orders",
    //   href: "/orders",
    //   icon: <FiCalendar className="mr-1" />,
    // },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-amber-900 shadow-lg py-1"
          : "bg-amber-900/95 backdrop-blur-sm py-1 border-b border-amber-800"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/dashboard" className="flex items-center">
              <GiDiamondRing className="h-6 w-6 text-amber-300 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
                Directorate of Minorities
              </span>
              {/* <span className="ml-2 px-2 py-0.5 bg-amber-800/30 text-amber-200 text-xs font-medium rounded-full border border-amber-400/30">
                GST Ready
              </span> */}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center text-amber-100 hover:bg-amber-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-amber-100 hover:text-white space-x-1 px-3 py-2 rounded-md hover:bg-amber-800">
              <FiLogIn className="h-4 w-4" />
              <span className="text-sm font-medium">Admin Login</span>
            </button>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200">
              New Sale
            </button>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-100 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-amber-800 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-3 rounded-md text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white border-b border-amber-700"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
            {/* <div className="pt-2 pb-4 px-3 space-y-2">
              <button className="w-full flex items-center justify-center text-amber-100 hover:text-white space-x-2 px-3 py-2 rounded-md hover:bg-amber-700">
                <FiLogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Admin Login</span>
              </button>
              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-3 rounded-md text-sm font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200">
                New Sale
              </button>
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
