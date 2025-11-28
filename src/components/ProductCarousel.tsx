import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductCarousel = ({ products, onProductClick }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-background/50" />
      
      <div className="relative h-full flex items-center justify-center px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl w-full animate-fade-in">
          <div className="relative h-[400px] md:h-[500px] group cursor-pointer" onClick={() => onProductClick(currentProduct)}>
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="space-y-6 text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-primary font-medium">Destacado</p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {currentProduct.name}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              {currentProduct.description}
            </p>
            <p className="text-3xl font-serif font-semibold text-primary">
              ${currentProduct.price.toLocaleString()}
            </p>
            <Button
              onClick={() => onProductClick(currentProduct)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Producto
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur hover:bg-card transition-all duration-300 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur hover:bg-card transition-all duration-300 shadow-lg"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
