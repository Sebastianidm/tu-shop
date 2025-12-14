import { ShoppingBag, User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
  // Nuevas props requeridas por Index.tsx
  user: { name: string; email: string; } | null;
  onLogin: () => void;
  onLogout: () => void;
  wishlistCount: number;
}

export const Header = ({
  onCartClick,
  cartItemsCount,
  user,
  onLogin,
  onLogout,
  wishlistCount
}: HeaderProps) => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* LOGO */}
        <button
          onClick={() => scrollToSection("hero")}
          className="font-serif text-2xl font-semibold text-[rgb(157,125,72)] hover:opacity-80 transition-opacity"
        >
          Tu-Shop
        </button>

        {/* NAV (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("catalog")} className="text-sm font-medium hover:text-[rgb(157,125,72)] transition-colors">
            Catálogo
          </button>
          <button onClick={() => scrollToSection("confirmation")} className="text-sm font-medium hover:text-[rgb(157,125,72)] transition-colors">
            Confirmación
          </button>
        </nav>

        {/* ACTIONS BAR */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* WISHLIST ICON */}
          <Button variant="ghost" size="icon" className="relative hover:text-[rgb(157,125,72)]">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* USER AUTH */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600 truncate max-w-[100px]">
                {user.name}
              </span>
              <Button variant="ghost" size="icon" onClick={onLogout} title="Cerrar Sesión">
                <LogOut className="h-5 w-5 text-gray-500 hover:text-red-500" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={onLogin} title="Iniciar Sesión">
              <User className="h-5 w-5 hover:text-[rgb(157,125,72)]" />
            </Button>
          )}

          <div className="h-6 w-px bg-gray-200 mx-1"></div>

          {/* CART ICON */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative hover:bg-[rgb(157,125,72)]/10 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[rgb(157,125,72)] text-xs font-semibold text-white flex items-center justify-center animate-bounce-short">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};