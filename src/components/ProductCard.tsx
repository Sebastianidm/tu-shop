import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-fade-in"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="secondary" className="text-base px-4 py-2">
              Sin Stock
            </Badge>
          </div>
        )}
        {product.inStock && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            En Stock
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-lg font-semibold text-primary">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
