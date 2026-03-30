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
    price: 75.9,
    category: "Pingentes",
    description: "Ping Hamsa Vazada em Prata – Proteção com Elegância.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/3d7813bc-39a5-4fe9-a477-40b5d0ec7cbf.webp",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBASEA8WFRUSFRUQFxAVEA8PEBAVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8/ODMvNygtLisBCgoKDg0OFQ8PFiseFRkrLS0tKystLS0tLSstKy0tKy0tLS0tNy0tLS0tMi0tLTctKy0rNys3NzctLTcrLSsrLf/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIEBQYHAwj/xAA9EAABBAEDAQUFBgQDCQAAAAABAAIDBBEFEiEGBxMxQVEiMkJhcRRSgZGhsRUjM8FicoIkQ5KissLR4fD/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQABBQEBAQEBAAAAAAAAAAABAgMRMUESMiFRIv/aAAwDAQACEQMRAD8A4aiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC2Ps/q95fh/wAOX/kMf3WuLeOyavuuPd91n7n/ANK1O4Wo+odmARVotHQ+XkRFi5RERAREQEREBERAREQEREBERAREQEREBERAXT+xyDid+PiDc/QZ/uuYLtvZZS7ukx3m8l/5nj9FejbS1H63RFKK7fL5dREWLkEREBERAREQEREBERAREQEREBERAREQEREBfQ3RlXuqVdvoxv7LgOnQ75omYzue1uPqQvpOjHtY0egAWlDa12VzhERWXfLaIixcwiIgIiICIiAiyml9Pz2YbM8LNzKwDpORuAOeQPPABP4LFoCIiAiIgIiICIiAiIgIiIM70RDvv1h6O3fkCV9CRjgLinZNW33S77jD+ZI/8FdtYFrTpvb+VaIild8soiLFyiIiAiIgIiIN47IeoBU1ARyEd1aHcPBxtDj/AE3H8fZ+jyrvtP7Pv4cBYgJML5CwsPJhLsuZgge5jjnwI88rnoOOQvoHpjU49e0iWtK4d+I+5kBxu3jmKYD03Ac+oKD59Retmu+J7mSNLXNJaWkYII4K8kBERAREQEREBERAREQdO7Ga/Nl/+Vvh6ZP911Zq0DsgrhtNzvN73H8uP7LoDVrGnTT8wlFKhSl8soiLFyiIiAiIgIiIC7L0fojNPq070bnGR8ebAa10mYZsPa5rAfgEZBxz4nHs4XH6td8r2xxsL3vIa1jQXOcT4AAL6B6S0x9SjHp9+7GyabLYWRyNbaiaSXbWvJySDkggcE8E8YC8tVWazFbrW6oY+NkckU454mYXRvaTy1wLSHN9Meq+cJInN95pGfUEZX1JdviKOevp5gkuQsaW1XygOPstxv5BJ2eHI8skDlafT1fqF251mrTiib7zrOIogPTIkJ/HlBwhF2/UqGl3Az7ZDXiMrjEzUKMwfWMuM7JOBseeSA9pBA95c9646Cs6W7c7+ZA44bYaCBn7r2/A79D5FBqSIiAiIgIiICIq4Y9zmtHxEN/M4Qd77PqfdUIARglu8/V3P91tDVY6XHtijb6NA/RXwWzqn8SilQoQ+WERFk5hERAREQEREHYezTQnU6QvMgEty24wVI3YDWDDiXkn3Rhj3E/dYAPeUdOaRVhvy29Q1Rtq3A2S2+KESSMYYWkuLpcYJbjhg24IH0W8avThp16Uk1owV6MToXAMc9zzLCIGHLckEZceASSfJc96e6Xq6bG+3d1KN9a0yai0wRyyiRkjSNxc3ljhtJLcHBGMoNYraJqerWX3YYH/AM6Ynv8APdxxku8n+O1nAyM4wtnvCZ1uPRdVsssh4b3VlhcZ6kz2kR7jwX54Ba/PDwchbL0Fpv2CralGsxyVS10cMhyIIHkk73BxwHbnD2Qecq+03WIZTDMyhNfsRt2/xGOhHWY/xALHzOHkT4ZHJ8M4Qa1oukO0CtqNgW4bE0ccTH1GN3NgldI0RPedwdgbn+TfErP9HdSTarCwX4qza9hj6wYXu763MzJe6NngGBviPEFuQecDD0um5YLkkscVn/aw+Oavfja6C0JDlwNmtvbG7PIL2jnzWx6b03V02KeeOBlWRjXCKe1ZE0ETnjA2nd7IJwDwHHwQca7QukXaXaLMl0MmXwyHxLfNrv8AE3IB+oPmtWXaWaTYu05KF6eOxJKJLtC8yUSxyvYf5sQdgEe94Y4Dj90Y4xIwtJa4EEEgtIIII4II8igpREQEREBZTper3tysz1kafwbyf2WLW09mtbvNRhz8Ac/8hj/uUxtancO7QNwAvcLzjXqAtXRKpFKKFXyqiIsnOIiICIiAiIg+iesNJ+31IJmttzsliiBrV7EUMZa4CQTObICHOBxj6hahpnRVlmlz07GGyXLMDqtdxa98RY7+fM7aSAO68eeNoHiQD5wzS3NI0h8NmSF1eyNOmkjkfH3ccrmtY92CM4b3X4uW1Weo9Sg+0uj0ndFR/kmWWZ7rM8bMnvGvI9sbQHHx97z5QYjqPUKenNrtmiEhhIiqUH8xwRtOHXbMY96R53OAPOCOAdxW/Xb9o3K8MVNstOWMmS1vaQ3IdgBueW4DfI53/JaFJ1PFfjE8uyCOZwjDL+nttUTK0ciG1HtcDgHO/wBOMYws5TOoQ1QWXNLgqMaS2zELU7WtJwNgkfs8eMZPPCDC1tHl025Zf3krmulMOnUDPKWzSPwe8cwO/oxg8k+Q+QzZdZ6hNJZqyWYH2tP097YZpGtYGWrAwyWQsyB7/sgY28EfEts6QZTsi1PDcmnn2/Z36nIzujHuB9muHNDIwPHAHmM5yFgGdOafUp6pCy7O0vkgqzzywktruL90bizDfZJP9TJGHAj5hlIdZ06K3WpyRR130e8tEtsGKCtI/kwsz/XeQ8Atxj3seGFonazoTS9mp1QTXt8v9nb3U3mHj4S7nx+IO+S2Rzn2Ift+ksDr9yeOrNIAyQVHRxu718ZcMMa/YHbz5O8is3pE1gbqd3UaeoPeC19E7WS5Ay5jJfB7gATte0Hjxb4gPntF06XofTb8hGmagIZSS37BZa5sjXgZLGk+0cYOcB/geVovUuhy6fZkrTFpfHtJcwucwhzQ4YJAPg4eSDFoiIC6D2P0t1iaU/A0MH+o5P8A0hc+XYOyCrtqyO49uQ8/5QB+XBVqNr24/wBOhsXq1ebQvVoWkt5SilFCr5UREWTnEREBERAREQdB7I545329NsH+VeiOORlssftAsyCA7G459WNW39V6pYe9sWnwtvxV90Elc07ckkHdgMcH2HHLpCQ73cHGDznJ5l2ctcdVobPHvmn/AEjJf/y7l0franJbszOlvto0K0nctdzmewQJJXNjbgvduLuc/CcfEgripVe5jq3qj2044JNUhD3Tx2ax7wCxWc0YMm10hIJwdpHj4i81zqt9evZghFGJ1YskhglLjFYpGHewwg43ylwxtxxn8Sr6VR1OrXE2pfbBp7nyvkDDHO+Hbnu5Q47sZY32vMNx48rF0Jq2tzvn/grt+HRwTyTTupvfCzcyOZrMCP2QOORnjzUi+6skpW9Kp1zPFQktMbejiwYq5dg7hIWtw1hLjhx82g84wrXRbErLk9yxep92Kx36fUmjtutRVoXbW4JOMAE7ic+I8CVheq4rFNjbmoUWTWppHxDvB3lGnFFtETI4mHbyC7AcfLwJyVluhLkP2f8AiEsMFezPI/TIJGQ93We57Wua98LfZHtAtL244yD6qBd9KdWMkllqs0xmnzXa7pK8kTWgS5jeYnOw1ufiId4ZBHCwnRema5UrMfSrV54bG20ze+B3dPczG8bntLX44Pj4fVZrRacNnWYBPaldeptEkrWxRCiwMyDXh24c3Y6QcnIOHeZVWl6XqzdP1CqY5a0jXPt1XskZlwc4ukr7o3HaTkkc+Lj6ILfpXol2nWHaprFmKMsL5AwOzmR+cucRwT7TsNbnJI9MHmPWmti/fs2WghsjgGg+IYxoYzPocNBI9SsZdvSzu3TTPkd96SR8jvzcSrdAREQF3Xs0rd3p8P8Aiy/wx7xJXCl9GdLw7Kldo8o2eIAPujxAV6OtbXWZYvQKhqrVpaSnKKEQfKyIiycwiIgIiICIiDq/Y9obYobGqvHeuhbKyKCMb5NwblxIHg4g7QPRxPosd072jPY0Mlo/aLDLE1mBzXOZiSxvEgcwAl39R/HzHhgFaj011LZ06UyVZNpdgOYRujkA8A9vn58+IycFbm/tktbcsp1mykYMu2Q5+g3fuSgzPSvRVmhWn1GRpFpoMragPsGEe1NFI0cEvbuAbztIb58COnNIibBct0LFieoWd6NLhsy17LJXEB8cuw5w1o4I5cB8WBu0zQ+u7I1OvbtTukAd3b2nhjYZOJA1g4AAw7AHJaF1e503JWZHV0WaOB0s3f2JCYnzsgeX7HBp5MbcFrQPujn3igw+h61PdFIaZuDIy2hap2v9pjijAc+ORwGMjAkZu9kuLWg+S9NZ1/p+z3dOVhEUL3tjkiZJBWie4+0WlhA8eclpHOV7dHdROjbP/EC0TuufwtlsQMjmldglplAAyGEtOT98Z+eNkt6fqEk+nTwOqtqSuty2AIYI5ZI3COZ0jB7m8HA5PiPoQz3U3Sb4I9QsafITbtxxQAlzGSkNwZu7dxmSQMBOMeBx5Yw3T+pQ6Rpff9/aidLMxjq08LZ3xzR+1O2NnsbQ8H3nEYGPNXFvpmxqNi/I2zXlqXGhsb4p+8+yyQDNZ5AHBBBa4NJ4kcsT1hdnZJBo9SIXfssXezCcd/JPJtLiG5O8bWuyBG7d7WB4chqXaXpEcdhlyrzVvg2I3AcMef6sZ9CHHOPLOPJacu96907XOgTxMhMLoWC93DpHzOqylge6Pc7kezuGPH2/muCICIiD3oRB8sTD4Oe1p+hcAvpSkzaxoHkAPDHkvn/ouv3l+s3Bxv3HAz7oJ/LgL6FiC0o02tal7tCrVLQqlK5hFKIPlRERZOYREQEREBERAREQF1qW5d1DRaL6EsomglFKZkT3MfIAAInvcMEgAt8Tj23E+GVyVbp2YdZjTLDhLk158NkxyYyM7ZAPPGSCPMH1ACDaeoOraksz69/TZLLKB7l92OR7JBK0tjkkIbtDdz2cZcM4H0G1a70zW1KlNPULmOvdxM6Xu3PfI2PAa0xkg44yQPEgHlU6zDp1yOR79TrtrzOZJN3YrRz2O7OWMllzuIB8todx4rDR9qVN1g0wwxUO6FdlhneRSxuHAeMHLGAYAwNwwD8gHl030qKN1txkk1enUrjv5ZWyVzbla1wftif7Xdk7Tgjx4bngrL9eTaNFLXsXasm+yzvWWYd8biGhg9vbI07sOb5FXI7P4pNst3VLNqBuJGxzT/yCPEF7sncPmMZXO+2XqWvdsQR1Xh7KzHNMjf6Zc4jIZ6gBo5HHoguusO0au+m6jpkDo4n8SSye+5pwXAe0SXO83uJJ59crmSIgIiINw7K6+/UGnnDGOdx+AGfzXco1yPsbrky2ZMcBrWZ8skkn9h+a67GtadOij5ewClQiJThFGEQfNU+gTt+Dd/lOf3VhJXe33mOGPVpC63JphCtpdOP3cq02o4TYjkuUqF0a1oUb/eiH1AwfzCxVjpWM+6XN/HI/VUm1Kk2auNORbFN0q8Z2yA+gIIVjLoM7fgz9CP7qs0VfxSbdUcYtF6TQOZw5pH1BC81VQREQEREBERBWZXEBpccDkNycD6BUIiAiIgIiIOr9jcA7mw/nJeG+eMNaCMfmV01i0bsoiDaDSPie9xPPjnHmPkt7YtY06afmFSlFKCEU4RBgnVV5upfJZjuwoMatlbLAyUB6K3k0sei2MwqDAp9J9NUk0keitZNHW4urLzNVT6T6aRNo59M/gsZZ6cjOcwt+oGD+YXRnU/kvGSiPRMwZiduVWOk4/Lc36HP7rF2OlXj3Hg/Igt/VdifpoPkrWXSAfJR5plWaKJ44vPok7f8Adk/MEFWUkDm+80j6ghdqk0Ueis5tEPp+irNuOSpNmOS46i6dZ6YYc5ib/wAIB/RYm10gzyDm/Q5/dVm1Ks2Z40dFsVjpOQe68H6ghY+fQ52/7vPzaQ5VmiY4pNFUcY1FXLC5vDmkfUEKhVUERSB6IO+9AQ7NPrAjGWB2Przn9VtDVrvRIl+xQd/7+0cYwceWR64wtjC2dPFQUqApUCUUIg88KMKpEFOFGFXhFIowmFWigeZYo7sL1QhSl4GMKkwBXGEwmTK0dWC8n1PkshtRzUyZYp9Ieit36cPRZstUFinKctck0oHyVjLorT5LbzGqTAp9J9NDsdOg/wD2VhrnRbHfAB9Mt/ZdRNYKg0x6JmJ2icTtx1/QbieHkfUArNdN9BsjlZJIS8t5DSAGgjwK6OKQ9F7xVgPJRin+I80x+4VVo8AK4UNaqlVCFUFATKCv8EVOERChSihEpwiIgIowpQEwiBATCJlBICFMoUEFMIiCMKcJlEEAJhVBEFACqIU4RAREQCpUIgnhERBQhQphAQoiApREBECIClQiCQoJRCgBEClARQmUEoFClAQJhEDCYRCgEoowpCCEU5RBChQiB5qUREyIVCIJHkqkREShERAKFEQFKIgpVShEAIiIJREQE8kRAChEQSiIg//Z",
    ],
  },
  {
    id: "SKU 0197",
    name: "Pingente Coração Prata",
    price: 53.0,
    category: "Pingentes",
    description: "Pingente de Coração Médio Prata - Amor prateado.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7e630112-8777-43b2-a094-f2b3f18ba6c7.webp",
      "data:image/jpeg;base64,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",
    ],
  },
  {
    id: "SKU 192 / 180",
    name: "Pingente Coração Pet",
    price: 63.0,
    category: "Pingentes",
    description: "Pingente de prata de coração com animal vazado - Gato e Cachorro.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/34aab753-715f-4c34-9dee-cf87cae7d9ff.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/2ac1e03b-71a6-423d-b8f3-387836454170.webp",
    ],
  },
  {
    id: "SKU 3068",
    name: "Pingente Lua Vazada Prata",
    price: 68.0,
    category: "Pingentes",
    description: "Pingente de Lua crescente Trabalhada, vazada e detalhada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/53073a2f-c0d9-4ae0-bf50-a6e477b9be75.webp",
      "data:image/jpeg;base64,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",
    ],
  },
    {
    id: "SKU 0188",
    name: "Pingente Botão Mandala Prata",
    price: 93.0,
    category: "Pingentes",
    description: "Pingente de Mandala estilo Botão.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/1b1ec813-5003-47a6-bc4b-8d373795784d.webp",
    ],
  },
   {
    id: "SKU 0947",
    name: "Pingente Sereia de Prata",
    price: 38.0,
    category: "Pingentes",
    description: "Pingente de Sereia em prata.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/efed7056-0d77-4388-8174-0a9bec8ec8c0.webp",
    ],
  },
   {
    id: "SKU 0972",
    name: "Pingente N Senhora",
    price: 63.0,
    category: "Pingentes",
    description: "Pingente de Nossa Senhora Manto Azul",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/edcbddf5-7514-4be6-b4d3-96f2cd3aaf6d.webp",
    ],
  },
   {
    id: "SKU 1134",
    name: "Pingente Oval N Senhora",
    price: 70.0,
    category: "Pingentes",
    description: "Pingente Oval Nossa Senhora Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d409316b-6ab9-4fc7-b417-b9b292d5963d.webp",
    ],
  },
   {
    id: "SKU 1265",
    name: "Pingente Patua c/ Balança Direito",
    price: 111.3,
    category: "Pingentes",
    description: "Pingente Balança Direito em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/ca278ea5-4f4d-4f41-9b8d-6fc074ad008e.webp",
    ],
  },
   {
    id: "SKU 1277",
    name: "Pingente Olho Grego",
    price: 42.0,
    category: "Pingentes",
    description: "Pingente Olho Grego Madre Pérola.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6abef9a7-581b-4479-9578-490bf4e8f90f.webp",
    ],
  },
   {
    id: "SKU 1582",
    name: "Pingente Pomba da Paz",
    price: 45.6,
    category: "Pingentes",
    description: "Pingente Espirito Santo - Pomba Prata.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6a8eaa14-adf5-4a4a-bb50-1c70d20ca7b3.webp",
    ],
  },
   {
    id: "SKU 1828",
    name: "Pingente Medusa ",
    price: 65.0,
    category: "Pingentes",
    description: "Pingente Medusa em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/2c0bc832-07b8-4286-912a-886b265729c8.webp",
    ],
  },
   {
    id: "SKU 2300",
    name: "Pingente Folha Prata",
    price: 77.0,
    category: "Pingentes",
    description: "Pingente Folha Vazada em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c2ecfb0b-22f2-4e67-9c93-319c04dd886a.webp",
    ],
  },
   {
    id: "SKU 2307",
    name: "Pingente Medalha de Fé",
    price: 81.4,
    category: "Pingentes",
    description: "Pingente Medalha de Fé Vazada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/f016779a-abe9-4cb7-89e5-559024e559a3.webp",
    ],
  },
   {
    id: "SKU 2308",
    name: "Pingente Medalha Hamsa com Borda",
    price: 64.5,
    category: "Pingentes",
    description: "Pingente Medalha Hamsa Vazada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d0271103-3e29-495d-9baf-25b893483e62.webp",
    ],
  },
   {
    id: "SKU 2309",
    name: "Pingente Medalha Fé com Borda",
    price: 64.5,
    category: "Pingentes",
    description: "Pingente Medalha Fé Vazada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/589e185d-7227-45ee-9525-aa4246782a0a.webp",
    ],
  },
  {
    id: "SKU 0225004",
    name: "Conjunto Coração Prata",
    price: 76.8,
    category: "Conjuntos",
    description:
      "Conjunto completo com colar e brincos em prata 925, perfeito para ocasiões especiais.",
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
    ],
  },
  {
    id: "SKU 3588",
    name: "Conjunto Quadrado prata",
    price: 75.0,
    category: "Conjuntos",
    description:
      "Conjunto completo com colar e brincos em prata 925, ótimo para qualquer lugar.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/565abf24-bbb2-42d3-bbcc-869a60e379d1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/38da6ce9-6abd-423d-a86f-284e9161b153.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/136500a5-19d7-4f7f-ba2c-8a151e7b27f3.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/a1166120-7c84-42e3-bf0b-bef2969d7de1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/bfb9045a-f4f0-40b9-a889-d5be1df99769.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5c061703-cd98-4aee-a3c8-93a0253d590c.webp",
    ],
  },
  {
    id: "SKU 7660 / 2574 / 7659",
    name: "Conjunto Gota vazada",
    price: 226.5,
    category: "Conjuntos",
    description:
      "Conjunto completo com colar e brincos gota vazada em prata 925 e cravejada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/46f3af8d-f721-4652-a60a-34237c0ca6d6.webp",
    ],
  },
  {
    id: "SKU 4001954 / 8001114",
    name: "Conjunto Gota",
    price: 70.1,
    category: "Conjuntos",
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
    ],
  },
  {
    id: "SKU 2574 / 7672 / 7671",
    name: "Conjunto Gota vazada Cravejada",
    price: 335.0,
    category: "Conjuntos",
    description:
      "Conjunto Completo com Colar e Brincos Gota Vazada Bojuda Cravejada.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/916e73f0-7ec8-4ae8-8daa-0b71a59e6ffe.webp",
    ],
  },
  {
    id: "SKU 7656",
    name: "Conjunto Palito Riscado/Cravejado",
    price: 242.0,
    category: "Conjuntos",
    description:
      "Conjunto Completo com Colar e Brincos Palito Riscado Cravejado.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d59bfa66-59f1-4b33-ac2d-1cf696ba3acf.webp",
    ],
  },
  {
    id: "SKU 7670 / 7669 / 2574",
    name: "Conjunto Redondo Vaz. Cravejado",
    price: 286.3,
    category: "Conjuntos",
    description:
      "Conjunto Completo com Colar e Brincos Redondo Vazado Cravejado.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/b879c40f-b0b4-490f-b614-ed5d2b22c121.webp",
    ],
  },
  {
    id: "SKU 6013",
    name: "Conjunto Coração Pequeno",
    price: 70.0,
    category: "Conjuntos",
    description:
      "Conjunto Completo com Colar e Brincos Coração Pequeno.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/529050c7-5eb5-4274-bf5d-0cc1f00845e8.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/a112fcca-9042-4f68-88e9-9eebe0d697cf.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/496c7af7-b2b6-4338-8e22-6d740c61f8f0.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/31204a08-23ad-4549-b205-04037290de58.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/e186d7c0-2244-4324-9aa4-c0a0720065f7.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/49802f3b-7219-4c42-bad9-eb9c4ba93bc2.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/68511322-8d5c-4deb-9a70-ec0d47333c56.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/cf159791-5061-47b9-bab4-d370c0bb297b.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/40f0b907-ac46-4587-93e8-4147365f7781.webp",
    ],
  },
  {
    id: "SKU 1273",
    name: "Corrente Grumet Dupla",
    price: 285.6,
    category: "Correntes",
    description: "Corrente dupla em prata 925, com design elegante.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/52a540ea-894f-4f76-adb2-36bc10689917.webp",
    ],
  },
  {
    id: "SKU 1275",
    name: "Corrente Singapura",
    price: 62.7,
    category: "Correntes",
    description: "Corrente Singapura MD em prata 925, com design sofisticado.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c6ccb43a-75ac-4f91-a514-1a9c36357383.webp",
    ],
  },
  {
    id: "SKU 2 FIOS",
    name: "Corrente 2 Fios",
    price: 142.0,
    category: "Correntes",
    description: "Corrente trançada 2 Fios 40Cm.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d5a2ee45-9b4e-48db-aea7-3b245b2b8d96.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6bf9cdb8-8d7e-4c59-ab38-8ae4c79f4b2b.webp",
    ],
  },
  {
    id: "SKU 2065067",
    name: "Corrente Rabo de Rato",
    price: 159.0,
    category: "Correntes",
    description: "Corrente rabo de rato em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d2e7b59d-f676-4521-8649-1bc108955977.webp",
    ],
  },
  {
    id: "SKU 2065066",
    name: "Corrente Cartier Fina",
    price: 148.2,
    category: "Correntes",
    description: "Corrente Cartier Fina em prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/ff1d676b-2a43-4547-b62e-bf94dda95624.webp",
    ],
  },
  {
    id: "SKU 2065069",
    name: "Corrente Elos Portugueses",
    price: 66.0,
    category: "Correntes",
    description: "Corrente Elos Portugueses 0,40.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/41129fab-803b-4db4-87b0-da191e3c85cb.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/78dbc266-739d-499f-90c6-f048374efdff.webp",
    ],
  },
  {
    id: "SKU 2065076",
    name: "Corrente 3x1 Fina Prata",
    price: 567.2,
    category: "Correntes",
    description: "Corrente 3x1 Fina 70Cm 4.5mm.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6311d105-bc2e-44a9-bd8c-76c9461f2a6f.webp",
    ],
  },
  {
    id: "SKU 2065079",
    name: "Corrente 3x1 Fina Prata",
    price: 138.7,
    category: "Correntes",
    description: "Corrente 3x1 Fina 60.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/93cebdf7-86bd-4242-9f5d-b9447234d4fe.webp",
    ],
  },
  {
    id: "SKU 2065080",
    name: "Corrente Grumezinha Prata",
    price: 242.3,
    category: "Correntes",
    description: "Corrente Grumezinha 70cm 3mm .",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/a5087a44-a44b-437a-84eb-e6ffb7633007.webp",
    ],
  },
  {
    id: "SKU 2065085",
    name: "Corrente Losango Dupla",
    price: 227.4,
    category: "Correntes",
    description: "Corrente Losango Dupla em Prata 925.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/95844d64-a74b-46fa-acaf-65704157cc05.webp",
    ],
  },
  {
    id: "SKU 2065096",
    name: "Corrente Grumezinha",
    price: 221.0,
    category: "Correntes",
    description: "Corrente Grumezinha 70cm 2.5mm.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9f20d36e-1f5d-4874-8d69-1a15cab73ca6.webp",
    ],
  },
  {
    id: "SKU 2772",
    name: "Corrente Rabo de Rato c/ Bolinhas",
    price: 143.0,
    category: "Correntes",
    description: "Corrente Rabo de Rato com Bolinhas.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/bedd3784-c643-4162-b4e5-d5d305ca499c.webp",
    ],
  },
  {
    id: "SKU 0054",
    name: "Anel Feminino Aparador",
    price: 90.0,
    category: "Anéis Femininos",
    description: "Anel Aparador de Zirc. prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7d8efff9-9708-4f77-8dc8-5c7a337126a1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/53d01f56-6a3a-4abe-8bb5-110e48080bed.webp",
    ],
  },
  {
    id: "SKU 1961",
    name: "Anel Feminino Ponta Dupla",
    price: 46.8,
    category: "Anéis Femininos",
    description: "Anel ponta Dupla V Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/16097ba2-6d5a-4548-be96-1179bab4039d.webp",
    ],
  },
  {
    id: "SKU 3067027",
    name: "Anel Feminino Solitário 6 Garras",
    price: 39.6,
    category: "Anéis Femininos",
    description: "Anel Solitário 6 Garras c/ Zirc. Laterais",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/20a0b08c-6e4f-4bcb-9774-d4f277bebea7.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/e2b08bc7-8759-4e18-bce1-572c821d530d.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/86c13215-113e-4f97-9d16-bf54eb29e946.webp",
    ],
  },
  {
    id: "SKU 2350",
    name: "Anel Feminino Aparador",
    price: 132.0,
    category: "Anéis Femininos",
    description: "Anel Aparador Pave Largo Zirc. Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/3a222238-cec1-4109-8027-43b4912acfe5.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/c3da6836-4e59-4ef4-a97c-0bb744497243.webp",
    ],
  },
  {
    id: "SKU 3002047",
    name: "Anel Feminino Solitário",
    price: 60.0,
    category: "Anéis Femininos",
    description: "Anel Solitário Laterais Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6746571d-3e2c-41ca-84ca-92bb1a092f05.webp",
    ],
  },
  {
    id: "SKU 3065012",
    name: "Anel Feminino 1/2 Lua Indiana",
    price: 92.0,
    category: "Anéis Femininos",
    description: "Anel 1/2 Lua Indiana Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/1df51346-5366-498a-a9a3-477009c1a9ee.webp",
    ],
  },
  {
    id: "SKU 3065013",
    name: "Anel Feminino Flor De Lótus",
    price: 99.0,
    category: "Anéis Femininos",
    description: "Anel Flor de Lótus Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cce12cd5-f71a-48c1-8c5a-19221c0223c8.webp",
    ],
  },
  {
    id: "SKU 3067007",
    name: "Anel Feminino Solitário 8 Garras",
    price: 35.5,
    category: "Anéis Femininos",
    description: "Anel Solitário 8 Garras Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7e125668-8f4c-432f-8da0-b57761cd8b4f.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/10b0d25b-ac61-4b8c-b6ea-268b7c0562f3.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/95d2e280-5112-4edb-8b1b-15272f06e5d4.webp",
    ],
  },
  {
    id: "SKU 3067016",
    name: "Anel Feminino 1/2 Aliança",
    price: 52.2,
    category: "Anéis Femininos",
    description: "Anel 1/2 Aliança 2 Fileiras Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cae11057-a09a-4191-9bb9-8322050aa809.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/82d4116c-a713-4481-8046-99a78b01b627.webp",
    ],
  },
  {
    id: "SKU 3067031",
    name: "Anel Feminino Solitário 4 Garras",
    price: 87.8,
    category: "Anéis Femininos",
    description: "Anel Solitário 4 Garras Zirc. Lat Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/e0f5d9dd-9112-4a7c-afd6-36509981288f.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/ae2d0e4f-fe5e-4420-93be-dee7af4ebffb.webp",
    ],
  },
  {
    id: "SKU 3067086",
    name: "Anel Feminino Aparador",
    price: 66.0,
    category: "Anéis Femininos",
    description: "Anel Aparador Zirc. Pave Fino Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9ffecb6d-e19d-4537-b577-ac6a509e346c.webp",
    ],
  },
  {
    id: "SKU 3067088",
    name: "Anel Feminino 1/2 Aliança ",
    price: 66.0,
    category: "Anéis Femininos",
    description: "Anel 1/2 Aliança 1 Fileira Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/80cb1f49-828c-434a-a1f0-d7e22ff1ebe1.webp",
    ],
  },
  {
    id: "SKU 3067093",
    name: "Anel Feminino 1/2 Aliança",
    price: 103.2,
    category: "Anéis Femininos",
    description: "Anel 1/2 Aliança Zirc. Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9d96d8d5-3aba-4651-97c1-48bfff88eb92.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/57fe94d6-d648-49e2-8e03-44b1eb964173.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/06d7f050-8f27-499d-8b70-8a68c0ed288b.webp",
    ],
  },
  {
    id: "SKU 3073001",
    name: "Anel Feminino Quadrado Xuxa",
    price: 66.0,
    category: "Anéis Femininos",
    description: "Anel Quadrado Xuxa Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/368408a3-9ea9-47bb-81a6-e827e719b8b1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5b85254e-d1ef-434f-b27a-c020597729f2.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/43a4998e-d118-42d6-b29e-959269fee23f.webp",
    ],
  },
  {
    id: "SKU 3119",
    name: "Anel Feminino Mini Coração",
    price: 50.0,
    category: "Anéis Femininos",
    description: "Anel Mini Coração Esmaltado Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9c14b931-c70b-48ae-aceb-994d571826a4.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5ec4a15b-a879-4b80-bc6e-98822af8ebde.webp",
    ],
  },
  {
    id: "SKU 3121",
    name: "Anel Feminino Quadrado Xuxa",
    price: 75.0,
    category: "Anéis Femininos",
    description: "Anel Quadrado Largo Xuxa Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7103e3fe-9eff-47f6-a380-721803ceafec.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/823da96d-e544-4591-b14e-17f276e5b34e.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/a552cda2-f61b-424e-9d9b-b9cfd80d6d70.webp",
    ],
  },
  {
    id: "SKU 3133",
    name: "Anel Feminino Cartier",
    price: 95.0,
    category: "Anéis Femininos",
    description: "Anel Cartier 3 Fios Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/356331b0-3c97-41c1-9786-f16f08c25467.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/b0aded04-fada-41bd-91e6-b9d9c89ce494.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/ea64c2e8-b194-4716-a70b-28343265eb96.webp",
    ],
  },
  {
    id: "SKU 3437",
    name: "Anel Feminino Solitário Coração",
    price: 70.0,
    category: "Anéis Femininos",
    description: "Anel Solitário Coração Rubi Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cf06f52d-cf8b-425c-9f81-1401ee32f681.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/072d7765-1bee-4679-952a-35052a52072f.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6b750092-64fd-4eeb-9650-b7f526b0c407.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/e1053517-b50e-43d7-a4f9-6995d1832c98.webp",
    ],
  },
  {
    id: "SKU 8541",
    name: "Anel Feminino Coração Cravej.",
    price: 163.0,
    category: "Anéis Femininos",
    description: "Anel Coração Cravejado Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/2c9dded9-1281-4d83-8d8d-07c78b64c2ea.webp",
    ],
  },
  {
    id: "SKU 8035",
    name: "Anel Feminino Losango",
    price: 35.0,
    category: "Anéis Femininos",
    description: "Anel Losango e Bolinhas Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9ce38cf7-bc3c-48ab-bdea-6501e46434a0.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/7f0109a4-72b1-472e-9574-3e2de976d73a.webp",
    ],
  },
  {
    id: "SKU 3172",
    name: "Anel Masculino Aliança",
    price: 175.0,
    category: "Anéis Masculinos",
    description: "Anel Aliança Setas Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/a5f304b5-464d-4186-88cd-2fa088bd336e.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/07602663-ad94-4c16-b25e-c69d2a60c976.webp",
    ],
  },
  {
    id: "SKU 3626",
    name: "Anel Masculino Atlantis",
    price: 120.0,
    category: "Anéis Masculinos",
    description: "Anel Atlantis Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/ad7abf91-5254-4c37-9693-f27e4a6be26a.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/9b6081ec-47de-4303-990d-1d190e6c4eba.webp",
    ],
  },
  {
    id: "SKU 7367",
    name: "Anel Masculino Fio Reto",
    price: 157.5,
    category: "Anéis Masculinos",
    description: "Anel Fio Reto Filetes Cruzados Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c7f65819-2c7e-4cde-a1ee-e8710075ac03.webp",
    ],
  },
  {
    id: "SKU 8442",
    name: "Anel Masculino São Bento",
    price: 185.4,
    category: "Anéis Masculinos",
    description: "Anel São Bento 3D Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/bab3f22c-b7ab-42c0-87ee-6f3fc3f758ec.webp",
    ],
  },
  {
    id: "SKU 3827",
    name: "Anel Masculino Quadriculado",
    price: 225.0,
    category: "Anéis Masculinos",
    description: "Anel Giratório Quadriculado Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/07b9d31f-3a57-4986-a91c-4d8c73cb97da.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/306a4baa-e8e4-46ff-9303-16511e029471.webp",
    ],
  },
  {
    id: "SKU 3830",
    name: "Anel Masculino Trançado",
    price: 220.0,
    category: "Anéis Masculinos",
    description: "Anel Giratório Trançado Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/8c47f649-6e71-4d3b-a783-89357eb1b16b.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/9c7770a6-74a2-4b39-bc2d-b6a0d992a276.webp",
    ],
  },
  {
    id: "SKU 4300",
    name: "Anel Masculino Xadrez",
    price: 275.0,
    category: "Anéis Masculinos",
    description: "Anel Giratório Xadrez Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/88d75a68-235a-4a01-aad0-663126097fde.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/57b56fc5-da31-4c52-82e9-709624b559c8.webp",
    ],
  },
  {
    id: "SKU 3195",
    name: "Anel Masculino Correntes",
    price: 302.4,
    category: "Anéis Masculinos",
    description: "Anel Giratório Correntes Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/fd43a84c-4f88-42a0-876e-9446f8425534.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/67d794cb-7537-4ab5-a4f9-34c46a3b71c4.webp",
    ],
  },
  {
    id: "SKU 0429",
    name: "Brincos Earcuff Losangos",
    price: 31.5,
    category: "Brincos",
    description: "Brincos Losangos Vazados Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9c86bd2d-6aab-4266-815c-064a1fa2d20a.webp",
    ],
  },
  {
    id: "SKU 1284",
    name: "Brincos Argolas Coração",
    price: 122.3,
    category: "Brincos",
    description: "Brincos Argola Coração GG Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/52d10e1b-b9a5-4043-967b-13755176a4cf.webp",
    ],
  },
  {
    id: "SKU 1551",
    name: "Brincos Argolas Infinito",
    price: 86.0,
    category: "Brincos",
    description: "Brincos Argola Infinito Fio Reto",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/87fac2b3-b297-4c57-a58a-c0ca63df0e51.webp",
    ],
  },
  {
    id: "SKU 1705",
    name: "Brincos Pedra Quadrada",
    price: 38.0,
    category: "Brincos",
    description: "Brincos Pedra Quadrada Branca 8mm",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/70de1e2d-0fd9-4498-bc00-02a9c489855b.webp",
    ],
  },
  {
    id: "SKU 1708",
    name: "Brincos Pedra Retangulo",
    price: 36.3,
    category: "Brincos",
    description: "Brincos Pedra Retangulo Branca 7x9mm",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/721a2c5e-5cbf-467f-a3a9-9c3e12595916.webp",
    ],
  },
  {
    id: "SKU 1877",
    name: "Brincos Earcuff Folhas",
    price: 64.8,
    category: "Brincos",
    description: "Brincos Earcuff Folhas Vazadas Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/526f626a-0751-435f-ba66-9db4ae36e52d.webp",
    ],
  },
  {
    id: "SKU 1951",
    name: "Brincos Argolas Redondas",
    price: 21.0,
    category: "Brincos",
    description: "Brincos Argolas Redondas P",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/5f28e9b8-937a-4d1f-a4fd-f84feaae511c.webp",
    ],
  },
  {
    id: "SKU 198",
    name: "Brincos Coração Liso",
    price: 56.5,
    category: "Brincos",
    description: "Brincos Coração Liso/Trabalhado",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/a1280044-6180-47af-b6cb-937fbcc9f286.webp",
    ],
  },
  {
    id: "SKU 207",
    name: "Brincos Botão Liso",
    price: 51.0,
    category: "Brincos",
    description: "Brincos Botão Liso P Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/0a954a77-9b8a-4f40-bc3f-6555d31b5a64.webp",
    ],
  },
  {
    id: "SKU 209",
    name: "Brincos Botão Mandala",
    price: 81.0,
    category: "Brincos",
    description: "Brincos Botão Mandala Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c0276d97-d0a0-49aa-a87c-57e2cb3f9c67.webp",
    ],
  },
  {
    id: "SKU 216",
    name: "Brincos Botão Mandala",
    price: 75.0,
    category: "Brincos",
    description: "Brincos Botão Mandala Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/22170ae8-7e7f-4dd3-a70d-9658e53f3142.webp",
    ],
  },
  {
    id: "SKU 2451",
    name: "Brincos Argola Redondo",
    price: 75.0,
    category: "Brincos",
    description: "Brincos Botão Argola Redonda Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/26c672f3-a316-4187-a7e1-4b2b6c138b5c.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5a2a00f9-5600-49f9-abac-1a8783ed8857.webp",
    ],
  },
  {
    id: "SKU 2595",
    name: "Brincos Argola Redondo",
    price: 22.0,
    category: "Brincos",
    description: "Brincos Botão Argola Redonda M Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cc09f69d-3674-4d73-add9-5f4e98f0c683.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0db3b045-f8b4-4eeb-a115-d5764a521883.webp",
    ],
  },
  {
    id: "SKU 2632",
    name: "Brincos Patinhas Pet",
    price: 30.0,
    category: "Brincos",
    description: "Brincos Patinhas Vazadas Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c074c6dd-76f9-4156-84ec-bb27e38fa103.webp",
    ],
  },
  {
    id: "SKU 2638",
    name: "Brincos Coração Cravejado",
    price: 90.0,
    category: "Brincos",
    description: "Brincos Coração Cravejado Vazado",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/296fd7ac-c6cf-4b3f-9407-c3eb7c09d925.webp",
    ],
  },
  {
    id: "SKU 2725",
    name: "Brincos Gota Dupla",
    price: 36.0,
    category: "Brincos",
    description: "Brincos Gota Dupla - Cores",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9729b482-c829-4125-b538-1ef466e60515.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/42396124-cae1-455b-a793-0ef18d1de5f3.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/751c09da-6c45-46fa-a072-2287a06af5e1.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/521562e7-ced4-48b8-86d1-1e0e91f998a0.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0ed981fb-b132-428f-9a1d-354fd5ae5c9d.webp",
    ],
  },
  {
    id: "SKU 2788",
    name: "Brincos Redondo Cravejado",
    price: 144.0,
    category: "Brincos",
    description: "Brincos Redondo Cravejado - Prata e Cores",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d69d46b4-22ee-4d25-92e1-ae830d260307.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/4211e1ba-5fc9-4d4c-90da-82203295bb93.webp",
    ],
  },
  {
    id: "SKU 2839",
    name: "Brincos Argola Estrela",
    price: 52.0,
    category: "Brincos",
    description: "Brincos Argola Estrela Vazada M Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c20f68bf-bcfd-4703-b784-6034491ea9b2.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6b6c2b5a-1c8b-4a85-ba8e-a356722b6468.webp",
    ],
  },
  {
    id: "SKU 2872",
    name: "Brincos Argola Estrela",
    price: 78.0,
    category: "Brincos",
    description: "Brincos Argola Estrela Vazada G Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cb5de147-1470-492d-b542-0c0d36ea3203.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/184a1493-2388-404b-98ba-7647b36a0c7c.webp",
    ],
  },
  {
    id: "SKU 4002138",
    name: "Brincos Coração",
    price: 29.0,
    category: "Brincos",
    description: "Brincos Coração Pedra 8x8mm Prata/Zirc",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/4b0dc333-fcf0-4408-a44e-5bb6d7addb59.webp",
    ],
  },
  {
    id: "SKU 1642",
    name: "Tornozeleira Feminina Corações",
    price: 78.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Zirc. 5 Corações Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7de74bb6-7249-49cf-8c95-6f2f8bfab79b.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/fd1ada36-0e73-4520-af96-97df4b029a76.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/39dbb82a-b4a8-4895-a9ed-81695e66d736.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/11b7ed03-bd52-42d1-b08d-79a60b571278.webp",
    ],
  },
  {
    id: "SKU 2698",
    name: "Tornozeleira Feminina Sol",
    price: 106.2,
    category: "Tornozeleiras",
    description: "Tornozeleira Elos C/ 5 Sóis Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c6a7dd66-65a4-490b-983c-c9890898ac49.webp",
    ],
  },
  {
    id: "SKU 4361",
    name: "Tornozeleira Feminina Coração",
    price: 47.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Elos Corações Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/3079b29d-7a5e-40e9-bbc0-86e6f696fae4.webp",
    ],
  },
  {
    id: "SKU 5509",
    name: "Tornozeleira Feminina Tartarugas",
    price: 225.0,
    category: "Tornozeleiras",
    description: "Tornozeleira com Mini Tartarugas ",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d812dbbe-64a2-4d42-b1f1-5a0a9e5e97ef.webp",
    ],
  },
  {
    id: "SKU 3299",
    name: "Tornozeleira Feminina Bismark",
    price: 170.1,
    category: "Tornozeleiras",
    description: "Tornozeleira Bismark 0,40 Larga Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/69e9dfe5-50a7-44ea-a88b-aee0d130b8cb.webp",
    ],
  },
  {
    id: "SKU 3826",
    name: "Tornozeleira Feminina Fr. Indiana",
    price: 230.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Franja Indiana Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c5b72ba7-d6b3-497c-a81b-fced750c3c21.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/8f0b28ba-0fd6-45e0-9b91-af54abeb4911.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/6363629e-70a5-46c2-b748-c31a031ef011.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/3d88f8ba-93a8-48f1-9a8f-f1beb0735fff.webp",
    ],
  },
  {
    id: "SKU 5078",
    name: "Tornozeleira Feminina Veneziana",
    price: 35.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Veneziana V15 Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/506b646c-8c63-4ac8-b399-8d1e922381fb.webp",
    ],
  },
  {
    id: "SKU 5102",
    name: "Tornozeleira Feminina Groumet",
    price: 200.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Groumet c/ Pedras Naturais",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6bd46bad-38d9-47fd-a0d8-2a93147bcd56.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/3f9e736c-45de-48e8-b3af-65678ba69c94.webp",
    ],
  },
  {
    id: "SKU 7637",
    name: "Tornozeleira Feminina Pérolas",
    price: 55.0,
    category: "Tornozeleiras",
    description: "Tornozeleira com Pérolas",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c614922f-c23b-485f-8733-167280450b36.webp",
    ],
  },
  {
    id: "SKU 7938",
    name: "Tornozeleira Feminina Cartier",
    price: 59.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Cartier Fina",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/dc8157ca-d8cd-449c-bbdf-6352b0437fb8.webp",
    ],
  },
  {
    id: "SKU 8107",
    name: "Tornozeleira Feminina Coração",
    price: 259.2,
    category: "Tornozeleiras",
    description: "Tornozeleira Coração Cadeado Crav.",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/46737191-9654-41af-ae06-46f71996dfbe.webp",
    ],
  },
  {
    id: "SKU 3284",
    name: "Tornozeleira Feminina Pikun",
    price: 400.0,
    category: "Tornozeleiras",
    description: "Tornozeleira Pikun Fina c/ Extensor",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/4cf52197-6dae-4ec2-b67b-904cdde96eda.webp",
    ],
  },
  {
    id: "SKU 1060",
    name: "Pulseira Feminina Coração",
    price: 80.3,
    category: "Pulseiras Femininas",
    description: "Pulseira com Elos e Corações Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/858363d1-7ebd-4348-9451-2a84b6bd8a96.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0e4a761b-0d8d-426f-9a2f-e68981168ef3.webp",
    ],
  },
  {
    id: "SKU 0516",
    name: "Pulseira Feminina Olho Grego",
    price: 90.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Olho Grego de MadrePerola",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/166f6357-d320-41fd-a760-e5d9393a3e2d.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/3cef4b8d-0c26-43e0-97ad-28d6204b68bb.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/1977a482-7ae9-4905-82bf-f3c318632163.webp",
    ],
  },
  {
    id: "SKU 6039",
    name: "Pulseira Feminina Veneziana Trevo",
    price: 135.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Veneziana com Trevo Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6aa215c2-c21b-4ed8-a0ed-6c957829443e.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/4df9612f-9e4c-4d22-9e16-7fce588a74e8.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/d0c782dd-4f89-4741-a249-608d369f6d50.webp",
    ],
  },
  {
    id: "SKU 5723",
    name: "Pulseira Feminina Trevo 3 Folhas",
    price: 78.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Trevo 3 Folhas com Zirc. Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6c13d069-3032-4c85-a6d0-8f0c66b9ff00.webp",
    ],
  },
  {
    id: "SKU 6788",
    name: "Pulseira Feminina Lacraia Fina",
    price: 115.4,
    category: "Pulseiras Femininas",
    description: "Pulseira Lacraia Fina",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/4cbcbcdc-00d8-4e08-85af-eec5c05cac69.webp",
    ],
  },
  {
    id: "SKU 6727",
    name: "Pulseira Feminina Rabo de Rato",
    price: 77.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Rabo de Rato",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/0a2e1073-a2b7-4691-b0e8-8be0c4a1bf84.webp",
    ],
  },
  {
    id: "SKU 1294",
    name: "Pulseira Feminina mini corações",
    price: 37.0,
    category: "Pulseiras Femininas",
    description: "Pulseira mini corações prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/5dc854a2-9d3d-4b91-a13e-852b930de195.webp",
    ],
  },
  {
    id: "SKU 6872",
    name: "Pulseira Feminina Infinito",
    price: 75.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Infinito com coração prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/1db7fc6f-9261-44c0-96cb-2e45c1edf365.webp",
    ],
  },
  {
    id: "SKU 0627",
    name: "Pulseira Feminina Esteira",
    price: 45.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Esteira Fina Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/6320daab-17b0-4134-b2f4-52763541381f.webp",
    ],
  },
  {
    id: "SKU 1002066",
    name: "Pulseira Feminina Cruz",
    price: 81.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Cruz Deitada Lisa Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/5826cc2a-40dc-4fff-b39e-6ef15e4f724e.webp",
    ],
  },
  {
    id: "SKU 1091",
    name: "Pulseira Feminina Elos Gregos",
    price: 69.1,
    category: "Pulseiras Femininas",
    description: "Pulseira Elos c/ Olhos Gregos",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/4a2281e7-83c4-473e-ba55-b4cd89036280.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/f07f0b5d-7aa3-4085-b9eb-d64af98b62c9.webp",
    ],
  },
  {
    id: "SKU 1158",
    name: "Pulseira Feminina Olhos Gregos",
    price: 95.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Olhos Gregos Colors",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/47293aec-a973-4a1e-b061-733e1338b750.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/d44a2fc5-383d-498c-bd37-5b185e500c23.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/8aa14416-0dae-468f-9ea2-d7d0769a5edc.webp",
    ],
  },
  {
    id: "SKU 1087",
    name: "Pulseira Feminina Esferas de Prata",
    price: 245.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Esferas de Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9ac0edcd-88de-4660-8229-692008bbbd55.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/bd54064b-b37b-4357-944e-e39dca9f0d6b.webp",
    ],
  },
  {
    id: "SKU 1248",
    name: "Pulseira Feminina Olho Grego",
    price: 90.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Olho Grego Navete Madre Perola",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/5cf50116-c827-42c8-bb0f-52009fc3319f.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/5398e796-c4bc-4ac2-b907-f5632ec57baf.webp",
    ],
  },
  {
    id: "SKU 2619",
    name: "Pulseira Feminina Olho Grego",
    price: 135.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Olho Grego Pedra Natural",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/8fe6d8e2-9bdc-46be-8122-8d451c4a6011.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/ddf73a01-4960-4d2d-ba4d-a451c63bf66b.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/92936812-2dc1-49b0-8aab-4763f234c67a.webp",
    ],
  },
  {
    id: "SKU 2653",
    name: "Pulseira Feminina Flores",
    price: 72.2,
    category: "Pulseiras Femininas",
    description: "Pulseira com Flores Vazadas Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/9bdf1734-1e5f-4023-9dca-da26cd3e1449.webp",
    ],
  },
  {
    id: "SKU 2740",
    name: "Pulseira Feminina Trevo",
    price: 75.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Veneziana Trevo Madre Perola",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/e5e1ec26-0c33-4365-b2dd-0f7a6c36ce57.webp",
    ],
  },
  {
    id: "SKU 3348",
    name: "Pulseira Feminina Riviera",
    price: 135.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Riviera Rainbow Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/7e0e3428-8db6-44a8-bf44-e583516899d5.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0902f82d-1bc2-48df-bf7f-b6acf3f1cb1e.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/f55103e4-57b5-4f6c-afcc-96c10f7f3697.webp",
    ],
  },
  {
    id: "SKU 6858",
    name: "Pulseira Feminina Borboletas",
    price: 100.0,
    category: "Pulseiras Femininas",
    description: "Pulseira Borboletas Colors",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/bcdb63a2-278c-45f4-bb70-eae009742136.webp",
    ],
  },
  {
    id: "SKU 6874",
    name: "Pulseira Feminina Trançada",
    price: 121.2,
    category: "Pulseiras Femininas",
    description: "Pulseira Veneziana Trançada 2 Fios",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/ca0bcc9d-75fc-439b-b82d-befb99858922.webp",
    ],
  },
  {
    id: "SKU 1065028",
    name: "Pulseira Masculino Cartier",
    price: 66.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Cartie Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/e57310cd-caee-4ea4-a15c-bfb448c86326.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/0771983f-ce9e-4666-a755-24619f8b5f6e.webp",
    ],
  },
  {
    id: "SKU 1065083",
    name: "Pulseira Masculino Grumet Dupla",
    price: 74.1,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Grumet Dupla Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/2c064cd2-7edc-4246-82cb-39a6ae20d3c1.webp",
    ],
  },
  {
    id: "SKU 1065087",
    name: "Pulseira Masculino Grumezinha",
    price: 102.6,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Grumezinha Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/a0c29cd4-36d9-4465-871d-5e4e7eb579af.webp",
    ],
  },
  {
    id: "SKU 7910",
    name: "Pulseira Masculino Cordão Bahiano",
    price: 126.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Cordão Bahiano Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/c21b6e75-8568-411e-bec1-c41d6a87cf56.webp",
    ],
  },
  {
    id: "SKU 1065054",
    name: "Pulseira Masculino Elos",
    price: 80.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Elos Gutti Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/65d0d880-d681-4be0-aa32-648d179a1026.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/16f86a5e-e87c-4548-b8ba-a987da051f0e.webp",
    ],
  },
  {
    id: "SKU 1065085",
    name: "Pulseira Masculino Grumet Dupla",
    price: 118.2,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Grumet Dupla Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/b6100348-0ba4-4ba0-89e5-a108b42a1556.webp",
    ],
  },
  {
    id: "SKU 1065086",
    name: "Pulseira Masculino Grumezinha",
    price: 61.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Grumezinha Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/a5f8c411-e2eb-474f-8ed5-0f9d073ff0a0.webp",
    ],
  },
  {
    id: "SKU 1269",
    name: "Pulseira Masculino Cartier",
    price: 78.3,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Cartier Alon. Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/648ed3bc-62a3-4b3e-a9ce-ac31a779e809.webp",
    ],
  },
  {
    id: "SKU 2780",
    name: "Pulseira Masculino Veneziana",
    price: 71.3,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Veneziana Alon. Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/cf6096f1-488d-4332-a1cb-022cf4a16d6e.webp",
    ],
  },
  {
    id: "SKU 6733",
    name: "Pulseira Masculino Piastrini",
    price: 98.8,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Piastrini Fio 80 21Cm",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/1ed3a52a-bc5c-486e-93fb-a714a371e377.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/ea40cba7-95d8-4513-8367-8b83c77c4b53.webp",
    ],
  },
  {
    id: "SKU 6741",
    name: "Pulseira Masculino Elos",
    price: 35.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Elos Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d1390963-960d-4363-afc3-957fbff120a9.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/8d06fcc1-3863-4e63-b684-0131185b7c21.webp",
    ],
  },
  {
    id: "SKU 6746",
    name: "Pulseira Masculino Elos",
    price: 55.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Elos Médio Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/78a93952-e053-4320-ba48-c24dd8afb9d2.webp",
      "https://img1.conectavenda.com.br/e_y_mourad/900/f733b5bc-2960-44ec-8beb-a040c69d81d3.webp",
    ],
  },
  {
    id: "SKU 7676",
    name: "Pulseira Masculino Singapura",
    price: 151.1,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Singapura Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/87d76d63-c735-40c9-aea4-b2b62aecbfb2.webp",
    ],
  },
  {
    id: "SKU 7834",
    name: "Pulseira Masculino Pipocão",
    price: 210.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Pipocão Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/4d8003b1-9b19-4668-9f53-e0dbcf9a4e1c.webp",
    ],
  },
  {
    id: "SKU 7745",
    name: "Pulseira Masculino Elos",
    price: 595.7,
    category: "Pulseiras Masculinas",
    description: "Pulseira Elos Grandes 3x1 21.3G 21Cm",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/d2000efe-4467-44ed-948e-217475c1c859.webp",
    ],
  },
  {
    id: "SKU 8397",
    name: "Pulseira Masculino Chapa",
    price: 282.0,
    category: "Pulseiras Masculinas",
    description: "Pulseira Masculino Chapa Prata",
    images: [
      "https://img1.conectavenda.com.br/e_y_mourad/900/659b6b72-0c9d-4685-b349-c368ea5f64d9.webp",
    ],
  },
];


export default function App() {
  const categories = [
  "Todos",
  "Anéis Femininos",
  "Anéis Masculinos",
  "Brincos",
  "Conjuntos",
  "Correntes",
  "Pingentes",
  "Pulseiras Femininas",
  "Pulseiras Masculinas",
  "Tornozeleiras",
  
];

const [selectedCategory, setSelectedCategory] = useState("Todos");

const filteredProducts =
  selectedCategory === "Todos"
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === selectedCategory);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Smooth scroll
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href") || "");
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
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
            : item,
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
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header
        cartItemsCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <HeroSection />
        <ProductsSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          onAddToCart={handleAddToCart}
        />
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
