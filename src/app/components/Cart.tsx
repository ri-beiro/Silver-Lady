import { X, Plus, Minus, Trash2, MessageCircle, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "./ProductCard";
import { useState } from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const [customerName, setCustomerName] = useState("");

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    if (!customerName.trim()) {
      alert("Por favor, informe seu nome antes de finalizar o pedido.");
      return;
    }

    let message = "* 👑 Novo Pedido - Silver Lady*\n\n";
    message += `*Cliente:* ${customerName}\n\n`;
    message += "*Produtos:*\n";

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.product.name}*\n`;
      message += `   ID: ${item.product.id}\n`;
      message += `   Valor unitário: R$ ${item.product.price.toFixed(2)}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Valor Total: R$ ${total.toFixed(2)}*`;
    message += `\n\nQuero finalizar este pedido! 👑`;

    const whatsappUrl = `https://wa.me/5511939500787?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          ></motion.div>

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2
                className="text-gray-900"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "38px",
                  fontWeight: 500,
                }}
              >
                Seu Carrinho
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-12 h-12 text-purple-700" />
                  </div>
                  <p className="text-gray-600 mb-2">Seu carrinho está vazio</p>
                  <p className="text-sm text-gray-500">
                    Adicione produtos para começar
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-gray-50 rounded-xl p-4"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <h3
                              className="mb-1 text-gray-900"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "17px",
                                fontWeight: 500,
                              }}
                            >
                              {item.product.name}
                            </h3>
                            <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium mb-2">
                              <Hash className="w-3 h-3" />
                              <span>{item.product.id}</span>
                            </div>
                            <p className="text-purple-700">
                              R$ {item.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>

                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium text-gray-900">
                              R${" "}
                              {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="border-t border-gray-200 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base text-gray-600">Total:</span>

                  <span className="text-2xl font-bold text-purple-700">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                {/* Campo Nome */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Digite seu nome"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 text-white py-4 rounded-full hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar pedido via WhatsApp</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
