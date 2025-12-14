import { Product } from "@/types/product";

interface Props {
  product: Product;
  onClick: () => void; // Solución al error: definimos que recibimos una función
}

export const ProductCard = ({ product, onClick }: Props) => {
  // 1. Calcular stock total sumando las cantidades de todas las tallas
  const totalStock = product.sizes.reduce((acc, item) => acc + item.stock, 0);

  // 2. Determinar si está disponible
  const isAvailable = totalStock > 0;

  // 3. Formateador de moneda chilena
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(product.price);

  return (
    <div
      onClick={onClick} // Conectamos el evento click
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer group bg-white"
    >
      {/* Imagen */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" // Efecto zoom suave
        />

        {/* Etiqueta de Agotado */}
        {!isAvailable && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
            Agotado
          </span>
        )}

        {/* Etiqueta de Nuevo (si existe en tu data) */}
        {product.isNew && isAvailable && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
            Nuevo
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="font-semibold text-lg text-gray-900 leading-tight">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.category}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-xl text-gray-900">{formattedPrice}</span>
      </div>

      {/* Selectores de Talla (Visualización rápida) */}
      <div className="mt-3 flex gap-1 flex-wrap">
        {product.sizes.map((s) => (
          <span
            key={s.size}
            className={`text-xs px-2 py-1 border rounded ${s.stock === 0
                ? 'text-gray-300 line-through border-gray-200 bg-gray-50'
                : 'border-gray-300 text-gray-600'
              }`}
          >
            {s.size}
          </span>
        ))}
      </div>
    </div>
  );
};