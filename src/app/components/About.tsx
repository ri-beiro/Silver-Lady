import { Crown, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="sobre" className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-64 h-64 border-4 border-purple-200 rounded-full opacity-20"
      ></motion.div>
      
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-48 h-48 border-4 border-purple-300 opacity-20"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="mb-6 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "38px", fontWeight: 500 }}
            >
              Sobre a{" "}
              <span className="text-purple-700">Silver Lady</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-6">
              A Silver Lady é uma marca digital especializada em pratas e joias de alta qualidade, 
              criada para celebrar a força, elegância e realeza feminina.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8">
              Cada peça é cuidadosamente selecionada para refletir sofisticação e exclusividade, 
              inspirada em símbolos de poder como coroas, cartas de baralho e elementos reais que 
              representam a majestade de cada mulher.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-3 gap-6"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Crown className="w-8 h-8 text-purple-700" />
                </motion.div>
                <h3 
                  className="mb-1 text-gray-900"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 600 }}
                >
                  Realeza
                </h3>
                <p className="text-sm text-gray-600">Você merece o melhor</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Sparkles className="w-8 h-8 text-purple-700" />
                </motion.div>
                <h3 
                  className="mb-1 text-gray-900"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 600 }}
                >
                  Exclusividade
                </h3>
                <p className="text-sm text-gray-600">Peças únicas</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Heart className="w-8 h-8 text-purple-700" />
                </motion.div>
                <h3 
                  className="mb-1 text-gray-900"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 600 }}
                >
                  Qualidade
                </h3>
                <p className="text-sm text-gray-600">Alta durabilidade</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/Coroa.png"
                alt="Luxury Crown"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-32 h-32 border-4 border-purple-300 rounded-lg"
              ></motion.div>
              <motion.div
                animate={{ rotate: [360, 180, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-24 h-24 border-4 border-purple-200"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}