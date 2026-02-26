import { motion } from "framer-motion";
import { ProductCard, Product } from "./ProductCard";

interface ProductsSectionProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductsSection({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
}: ProductsSectionProps) {
  return (
    <section id="colecao" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4 text-gray-900"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "38px",
              fontWeight: 500,
            }}
          >
            Nossa Coleção
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Peças exclusivas que combinam elegância atemporal com design
            contemporâneo
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-purple-700 text-white border-purple-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-purple-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
