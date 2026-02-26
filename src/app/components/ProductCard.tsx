import { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, ShoppingBag, Hash } from "lucide-react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string; 
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function CustomArrow({ direction, onClick }: { direction: "prev" | "next"; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "prev" ? "left-2" : "right-2"
      } z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all`}
    >
      {direction === "prev" ? (
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    dotsClass: "slick-dots !bottom-4",
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden">
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product ID Badge */}
        <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full mb-3 text-sm font-medium">
          <Hash className="w-3 h-3" />
          <span>{product.id}</span>
        </div>

        <h3 
          className="mb-2 text-gray-900"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500 }}
        >
          {product.name}
        </h3>
        
        <p 
          className="text-gray-600 mb-4 line-clamp-2"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400 }}
        >
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl text-purple-800">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              isAdding
                ? "bg-green-600 text-white scale-95"
                : "bg-purple-700 text-white hover:bg-purple-800 hover:scale-105"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{isAdding ? "Adicionado!" : "Adicionar"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}