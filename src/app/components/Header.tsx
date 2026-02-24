import { Crown, ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Crown className="w-8 h-8 text-purple-700" fill="currentColor" />
            <span className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Silver Lady
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-gray-700 hover:text-purple-700 transition-colors">
              Início
            </a>
            <a href="#colecao" className="text-gray-700 hover:text-purple-700 transition-colors">
              Coleção
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-purple-700 transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-gray-700 hover:text-purple-700 transition-colors">
              Contato
            </a>
          </nav>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-purple-50 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
