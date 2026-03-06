import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Início" },
    { to: "/sobre-o-projeto", label: "Sobre o Projeto" },
    { to: "/felipe-costa", label: "Felipe Costa" },
    { to: "/workshops", label: "Workshops" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Kuka Cast
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  location.pathname === link.to
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login-participante"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/area-do-participante"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Área do Participante
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm ${
                  location.pathname === link.to
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/area-do-participante"
              onClick={() => setIsMenuOpen(false)}
              className="block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-center text-sm"
            >
              Área do Participante
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}