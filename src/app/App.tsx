import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProductsSection } from "./components/ProductsSection";
import { Cart, CartItem } from "./components/Cart";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Product } from "./components/ProductCard";

const PRODUCTS: Product[] = [
  {
    id: "SKU 0183",
    name: "Pingente Hamsa Vazada",
    price: 75.90,
    description: "Ping Hamsa Vazada em Prata – Proteção com Elegância.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/3d7813bc-39a5-4fe9-a477-40b5d0ec7cbf.webp",
      "data:image/jpeg;base64,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",
    ]
  },
  {
    id: "SKU 0197",
    name: "Pingente Coração Prata",
    price: 53.00,
    description: "Pingente de Coração Médio Prata - Amor prateado.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7e630112-8777-43b2-a094-f2b3f18ba6c7.webp",
      "data:image/jpeg;base64,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",
    ]
  },
  {
    id: "SKU 192 / 180",
    name: "Pingente Coração Pet",
    price: 63.00,
    description: "Pingente de prata de coração com animal vazado - Gato e Cachorro.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/34aab753-715f-4c34-9dee-cf87cae7d9ff.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/2ac1e03b-71a6-423d-b8f3-387836454170.webp",
    ]
  },
  {
    id: "SKU 3068",
    name: "Pingente Lua Vazada Prata",
    price: 68.00,
    description: "Pingente de Lua crescente Trabalhada, vazada e detalhada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/53073a2f-c0d9-4ae0-bf50-a6e477b9be75.webp",
      "data:image/jpeg;base64,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",
    ]
  },
  {
    id: "SKU 0225004",
    name: "Conjunto Coração Prata",
    price: 76.80,
    description: "Conjunto completo com colar e brincos em prata 925, perfeito para ocasiões especiais.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/55169153-2c01-45ea-b89b-7bee6d014851.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5b960b8e-7744-4a6b-acf1-7584d3e5cfd6.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0093e040-6c90-4562-b80e-a806d2732229.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/532bc6a2-c257-42e5-8cdf-93ae837db723.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/08113eb3-6d0b-49dd-abb9-d63b4dfc28d1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6de588ca-c862-4414-beca-07caf4aa2131.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/412188cb-5b48-4f2c-b3b7-2ee3e4d51863.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/85aa1ce7-346f-494f-a0a6-73a48f6a6613.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/bda714ee-131e-4934-9148-24acde2ebfc4.webp",
    ]
  },
  {
    id: "SKU 3588",
    name: "Conjunto Quadrado prata",
    price: 75.00,
    description: "Conjunto completo com colar e brincos em prata 925, ótimo para qualquer lugar.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/565abf24-bbb2-42d3-bbcc-869a60e379d1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/38da6ce9-6abd-423d-a86f-284e9161b153.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/136500a5-19d7-4f7f-ba2c-8a151e7b27f3.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/a1166120-7c84-42e3-bf0b-bef2969d7de1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/bfb9045a-f4f0-40b9-a889-d5be1df99769.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5c061703-cd98-4aee-a3c8-93a0253d590c.webp",
    ]
  },
    {
    id: "SKU 7660 / 2574 / 7659",
    name: "Conjunto Gota vazada",
    price: 226.50,
    description: "Conjunto completo com colar e brincos gota vazada em prata 925 e cravejada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/46f3af8d-f721-4652-a60a-34237c0ca6d6.webp",
    ]
  },
    {
    id: "SKU 4001954 / 8001114",
    name: "Conjunto Gota",
    price: 70.10,
    description: "Conjunto completo com colar e brincos gota em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c51a38a5-adcd-40c9-8cb8-7a2b97c2d92d.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6a56caec-5395-4a8f-9cd1-008dad5756af.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/f22fce36-0400-41a0-89d4-88fcc9966757.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/45466b54-99be-4099-ac3f-820b47c99146.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/b500459b-3758-48b1-a710-1c020954fe54.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/511d42e9-bb24-453b-890c-93c72f264837.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/fc863bec-6730-4c72-8a41-d0f06467df32.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/d8879d8c-998a-414e-86f6-bcce8ad56e05.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/465ba3f5-0d53-4293-bcee-9c190c96e5f6.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/040acdb5-9221-4a1e-b57c-6f1400f87891.webp",
    ]
  },
    {
    id: "SKU 1273",
    name: "Corrente Grumet Dupla",
    price: 285.60,
    description: "Corrente dupla em prata 925, com design elegante.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/52a540ea-894f-4f76-adb2-36bc10689917.webp",
    ]
  },
    {
    id: "SKU 1275",
    name: "Corrente Singapura",
    price: 62.70,
    description: "Corrente Singapura MD em prata 925, com design sofisticado.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c6ccb43a-75ac-4f91-a514-1a9c36357383.webp",
    ]
  },
    {
    id: "SKU 2 FIOS",
    name: "Corrente 2 Fios",
    price: 142.00,
    description: "Corrente trançada 2 Fios 40Cm.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d5a2ee45-9b4e-48db-aea7-3b245b2b8d96.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6bf9cdb8-8d7e-4c59-ab38-8ae4c79f4b2b.webp",
    ]
  }, 
    {
    id: "SKU 2065067",
    name: "Corrente Rabo de Rato",
    price: 159.00,
    description: "Corrente rabo de rato em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d2e7b59d-f676-4521-8649-1bc108955977.webp",
    ]
  },
    {
    id: "SKU 0054",
    name: "Anel Feminino Aparador",
    price: 90.00,
    description: "Anel Aparador de Zirc. prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7d8efff9-9708-4f77-8dc8-5c7a337126a1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/53d01f56-6a3a-4abe-8bb5-110e48080bed.webp",
    ]
  },
    {
    id: "SKU 1961",
    name: "Anel Feminino Ponta Dupla",
    price: 46.80,
    description: "Anel ponta Dupla V Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/16097ba2-6d5a-4548-be96-1179bab4039d.webp",
    ]
  }, 
    {
    id: "SKU 3067027",
    name: "Anel Feminino Solitário 6 Garras",
    price: 39.60,
    description: "Anel Solitário 6 Garras c/ Zirc. Laterais",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/20a0b08c-6e4f-4bcb-9774-d4f277bebea7.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/e2b08bc7-8759-4e18-bce1-572c821d530d.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/86c13215-113e-4f97-9d16-bf54eb29e946.webp",
    ]
  },  
    {
    id: "SKU 3437",
    name: "Anel Feminino Solitário Coração",
    price: 70.00,
    description: "Anel Solitário 6 Coração Rubi Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cf06f52d-cf8b-425c-9f81-1401ee32f681.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/072d7765-1bee-4679-952a-35052a52072f.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6b750092-64fd-4eeb-9650-b7f526b0c407.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/e1053517-b50e-43d7-a4f9-6995d1832c98.webp",
    ]
  }, 
    {
    id: "SKU 1642",
    name: "Tornozeleira Feminina Corações",
    price: 78.00,
    description: "Tornozeleira Zirc. 5 Corações Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7de74bb6-7249-49cf-8c95-6f2f8bfab79b.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/fd1ada36-0e73-4520-af96-97df4b029a76.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/39dbb82a-b4a8-4895-a9ed-81695e66d736.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/11b7ed03-bd52-42d1-b08d-79a60b571278.webp",
    ]
  },  
    {
    id: "SKU 2698",
    name: "Tornozeleira Feminina Sol",
    price: 106.20,
    description: "Tornozeleira Elos C/ 5 Sóis Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c6a7dd66-65a4-490b-983c-c9890898ac49.webp",
    ]
  },
    {
    id: "SKU 4361",
    name: "Tornozeleira Feminina Coração",
    price: 47.00,
    description: "Tornozeleira Elos Corações Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/3079b29d-7a5e-40e9-bbc0-86e6f696fae4.webp",
    ]
  },  
    {
    id: "SKU 5509",
    name: "Tornozeleira Feminina Tartarugas",
    price: 225.00,
    description: "Tornozeleira com Mini Tartarugas ",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d812dbbe-64a2-4d42-b1f1-5a0a9e5e97ef.webp",
    ]
  },
    {
    id: "SKU 1060",
    name: "Pulseira Feminina Coração",
    price: 80.30,
    description: "Pulseira com Elos e Corações Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/858363d1-7ebd-4348-9451-2a84b6bd8a96.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0e4a761b-0d8d-426f-9a2f-e68981168ef3.webp",
    ]
  },
    {
    id: "SKU 0516",
    name: "Pulseira Feminina Olho Grego",
    price: 90.00,
    description: "Pulseira Olho Grego de MadrePerola",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/166f6357-d320-41fd-a760-e5d9393a3e2d.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/3cef4b8d-0c26-43e0-97ad-28d6204b68bb.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/1977a482-7ae9-4905-82bf-f3c318632163.webp",
    ]
  },
    {
    id: "SKU 6039",
    name: "Pulseira Feminina Veneziana Trevo",
    price: 135.00,
    description: "Pulseira Veneziana com Trevo Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6aa215c2-c21b-4ed8-a0ed-6c957829443e.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/4df9612f-9e4c-4d22-9e16-7fce588a74e8.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/d0c782dd-4f89-4741-a249-608d369f6d50.webp",
    ]
  },
    {
    id: "SKU 5723",
    name: "Pulseira Feminina Trevo 3 Folhas",
    price: 78.00,
    description: "Pulseira Trevo 3 Folhas com Zirc. Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6c13d069-3032-4c85-a6d0-8f0c66b9ff00.webp",
    ]
  },
    {
    id: "SKU 6788",
    name: "Pulseira Feminina Lacraia Fina",
    price: 115.40,
    description: "Pulseira Lacraia Fina",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/4cbcbcdc-00d8-4e08-85af-eec5c05cac69.webp",
    ]
  },
    {
    id: "SKU 6727",
    name: "Pulseira Feminina Rabo de Rato",
    price: 77.00,
    description: "Pulseira Rabo de Rato",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/0a2e1073-a2b7-4691-b0e8-8be0c4a1bf84.webp",
    ]
  },
    {
    id: "SKU 1294",
    name: "Pulseira Feminina mini corações",
    price: 37.00,
    description: "Pulseira mini corações prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/5dc854a2-9d3d-4b91-a13e-852b930de195.webp",
    ]
  },
    {
    id: "SKU 6872",
    name: "Pulseira Feminina Infinito",
    price: 75.00,
    description: "Pulseira Infinito com coração prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/1db7fc6f-9261-44c0-96cb-2e45c1edf365.webp",
    ]
  },
    {
    id: "SKU 1065028",
    name: "Pulseira Masculino Cartie",
    price: 66.00,
    description: "Pulseira Masculino Cartie Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/e57310cd-caee-4ea4-a15c-bfb448c86326.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0771983f-ce9e-4666-a755-24619f8b5f6e.webp",
    ]
  },
    {
    id: "SKU 1065083",
    name: "Pulseira Masculino Grumet Dupla",
    price: 74.10,
    description: "Pulseira Masculino Grumet Dupla Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/2c064cd2-7edc-4246-82cb-39a6ae20d3c1.webp",
    ]
  },
    {
    id: "SKU 1065087",
    name: "Pulseira Masculino Grumezinha",
    price: 102.60,
    description: "Pulseira Masculino Grumezinha Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/a0c29cd4-36d9-4465-871d-5e4e7eb579af.webp",
    ]
  },
    {
    id: "SKU 7910",
    name: "Pulseira Masculino Cordão Bahiano",
    price: 126.00,
    description: "Pulseira Masculino Cordão Bahiano Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c21b6e75-8568-411e-bec1-c41d6a87cf56.webp",
    ]
  },
               
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Smooth scroll
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <HeroSection />
        <ProductsSection products={PRODUCTS} onAddToCart={handleAddToCart} />
        <About />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </motion.div>
  );
}