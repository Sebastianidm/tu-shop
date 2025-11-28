import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

export const Header = ({ onCartClick, cartItemsCount }: HeaderProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <button 
          onClick={() => scrollToSection("hero")}
          className="font-serif text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Tu-Shop
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("catalog")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Catálogo
          </button>
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Destacados
          </button>
          <button
            onClick={() => scrollToSection("confirmation")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Confirmación
          </button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={onCartClick}
          className="relative hover:bg-primary/10 transition-colors"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs font-semibold text-accent-foreground flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};
