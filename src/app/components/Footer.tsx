import { Instagram, MessageCircle, Mail, Crown } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Crown className="w-8 h-8 text-purple-400" fill="currentColor" />
              </motion.div>
              <span 
                className="text-2xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Silver Lady
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Joias e pratas que celebram a realeza feminina. 
              Elegância, sofisticação e exclusividade em cada peça.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#colecao" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Coleção
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Sobre
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-medium mb-4">Contato</h3>
            <div className="space-y-4">
              <motion.a
                whileHover={{ x: 5 }}
                href="https://www.instagram.com/pratasilverlady?igsh=MWZkN3A4MDl0czJ6bQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@pratasilverlady</span>
              </motion.a>
              
              <motion.a
                whileHover={{ x: 5 }}
                href="https://wa.me/5511939500787"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </motion.a>
              
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:contato.silverlady@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>contato.silverlady@gmail.com</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400">
            © 2026 Silver Lady. Todas as peças são dignas de uma rainha. 👑
          </p>
        </motion.div>
      </div>
    </footer>
  );
}