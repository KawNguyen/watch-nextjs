import { Youtube,Instagram,Facebook} from 'lucide-react';

export const navigation = {
  brand: [
    {
      name: "Rolex",
      value: "rolex",
      logo: "/images/brand/rolex-logo.png",
    },
    {
      name: "Tissot",
      value: "tissot",
      logo: "/images/brand/tissot-logo.png",
    },
    {
      name: "Omega",
      value: "omega",
      logo: "/images/brand/omega-logo.png",
    },
    {
      name: "Patek Philippe",
      value: "patek-philippe",
      logo: "/images/brand/patek-philippe-logo.png",
    },
    {
      name: "Daniel Wellington",
      value: "daniel-wellington",
      logo: "/images/brand/daniel-wellington-logo.png",
    },
    {
      name: "Seiko",
      value: "seiko",
      logo: "/images/brand/seiko-logo.png",
    },
  ],
  gender: [
    {
      title: "Men",
      value: "men",
      navItems: [
        {
          title: "Brands",
          items: [
            { title: "Rolex", value: "rolex" },
            { title: "Tissot", value: "tissot" },
            { title: "Omega", value: "omega" },
            { title: "Seiko", value: "seiko" },
          ],
        },
        {
          title: "Styles",
          items: [
            { title: "Dress Watches", value: "dress" },
            { title: "Diving Watches", value: "diving" },
            { title: "Chronograph", value: "chronograph" },
            { title: "Automatic", value: "automatic" },
          ],
        },
      ],
    },
    {
      title: "Women",
      value: "women",
      navItems: [
        {
          title: "Brands",
          items: [
            { title: "Daniel Wellington", value: "daniel-wellington" },
            { title: "Tissot", value: "tissot" },
            { title: "Omega", value: "omega" },
          ],
        },
        {
          title: "Styles",
          items: [
            { title: "Fashion Watches", value: "fashion" },
            { title: "Minimalist", value: "minimalist" },
            { title: "Smartwatch", value: "smartwatch" },
          ],
        },
      ],
    },
  ],
};

export const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collection, add your desired watch to the cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept major credit cards, PayPal, and bank transfers.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. Use it to track your shipment on our website or the courier's site.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return any unworn watch within 14 days of delivery for a full refund. Please see our Return Policy page for details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by destination.",
  },
];

export const allPosts = [
  {
    title: "Intro to ML",
    category: "Men Watch",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Discover the world of machine learning with our comprehensive guide. From theory to practical applications, we'll walk you through the fundamentals and show you how to build your own models.",
  },
  {
    title: "All",
    category: "All",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Discover the world of machine learning with our comprehensive guide. From theory to practical applications, we'll walk you through the fundamentals and show you how to build your own models.",
  },
  {
    title: "Why Open Source Matters",
    category: "Open source",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Open source software has become an essential part of modern technology. Learn why it matters and how you can contribute to the future of software development.",
  },
  {
    title: "GPT vs BERT in NLP",
    category: "Natural language processing",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Explore the differences between GPT and BERT in natural language processing. Understand their strengths and use cases for different tasks.",
  },
  {
    title: "Our Hardware Journey",
    category: "Hardware",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Uncover the fascinating world of hardware with our guide. From the basics to advanced topics, we'll explore the evolution of hardware and its impact on our daily lives.",
  },
  {
    title: "Vision Transformers",
    category: "Women Watch",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Learn about the revolutionary Vision Transformers and how they're transforming computer vision.",
  },
  {
    title: "AI Research Roadmap 2025",
    category: "Research",
    image: "/images/logo.png",
    date: "2023-08-15",
    description:
      "Get a clear view of the future of AI research with our roadmap. Discover the latest breakthroughs and areas of interest.",
  },
];

export const team = [
  {
    name: "Anna Nguyen",
    role: "Founder & CEO",
    image: "",
  },
  {
    name: "David Tran",
    role: "Chief Watchmaker",
    image: "",
  },
  {
    name: "Linh Pham",
    role: "Customer Experience Lead",
    image: "",
  },
];

export const searchProducts = [
  {
    id: "1",
    title: "Bo mạch chủ MSI PRO B760M-A WIFI DDR4",
    price: 3490000,
    originalPrice: 4190000,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop",
    category: "Motherboard",
    href: "/products/1",
    inStock: true,
  },
  {
    id: "2",
    title: "Bo mạch chủ MSI A320M-A Pro",
    price: 1390000,
    originalPrice: 1550000,
    image:
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=80&h=80&fit=crop",
    category: "Motherboard",
    href: "/products/2",
    inStock: true,
  },
  {
    id: "3",
    title: "Bo mạch chủ ASUS PRIME A620M-A DDR5",
    price: 3290000,
    image:
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=80&h=80&fit=crop",
    category: "Motherboard",
    href: "/products/3",
    inStock: false,
  },
  {
    id: "4",
    title: "Bo mạch chủ MSI B450M-A PRO MAX II",
    price: 1690000,
    originalPrice: 1990000,
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=80&h=80&fit=crop",
    category: "Motherboard",
    href: "/products/4",
    inStock: true,
  },
  {
    id: "5",
    title: "Bo mạch chủ ASUS PRIME B650M-A-CSM DDR5",
    price: 4690000,
    image:
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=80&h=80&fit=crop",
    category: "Motherboard",
    href: "/products/5",
    inStock: true,
  },
  {
    id: "6",
    title: "Classic Heritage Watch Premium Gold",
    price: 2500000,
    originalPrice: 3200000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
    category: "Watch",
    href: "/products/6",
    inStock: true,
  },
  {
    id: "7",
    title: "Luxury Gold Watch Diamond Edition",
    price: 8900000,
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=80&h=80&fit=crop",
    category: "Watch",
    href: "/products/7",
    inStock: true,
  },
  {
    id: "8",
    title: "Sport Elite Watch Titanium",
    price: 1890000,
    originalPrice: 2100000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop",
    category: "Watch",
    href: "/products/8",
    inStock: true,
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: "Order Shipped",
    description: "Your order #1234 has been shipped.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New Promotion",
    description: "Get 20% off on your next purchase!",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    title: "Welcome!",
    description: "Thanks for joining KronLux.",
    time: "3 days ago",
    read: true,
  },
];

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew: boolean;
  discount: number;
}

export const watchProducts: Product[] = [
  {
    id: 1,
    name: "Rolex Submariner Date",
    brand: "Rolex",
    price: 285000000,
    originalPrice: 300000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 128,
    category: "Men's Watch",
    isNew: true,
    discount: 5,
  },
  {
    id: 2,
    name: "Apple Watch Series 9",
    brand: "Apple",
    price: 12000000,
    originalPrice: 15000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 256,
    category: "Smart Watch",
    isNew: true,
    discount: 20,
  },
  {
    id: 3,
    name: "Casio G-Shock GA-2100",
    brand: "Casio",
    price: 3500000,
    originalPrice: 4000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 89,
    category: "Sports Watch",
    isNew: false,
    discount: 12,
  },
  {
    id: 4,
    name: "Omega Speedmaster Professional",
    brand: "Omega",
    price: 165000000,
    originalPrice: 180000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 67,
    category: "Men's Watch",
    isNew: false,
    discount: 8,
  },
  {
    id: 5,
    name: "Seiko Prospex Automatic",
    brand: "Seiko",
    price: 8500000,
    originalPrice: 10000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 145,
    category: "Automatic Watch",
    isNew: true,
    discount: 15,
  },
  {
    id: 6,
    name: "Tissot PRC 200 Chronograph",
    brand: "Tissot",
    price: 12500000,
    originalPrice: 14000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    reviews: 92,
    category: "Men's Watch",
    isNew: false,
    discount: 11,
  },
  {
    id: 7,
    name: "Citizen Eco-Drive Ladies",
    brand: "Citizen",
    price: 6500000,
    originalPrice: 7500000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    reviews: 78,
    category: "Women's Watch",
    isNew: false,
    discount: 13,
  },
  {
    id: 8,
    name: "TAG Heuer Formula 1",
    brand: "TAG Heuer",
    price: 28000000,
    originalPrice: 32000000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 54,
    category: "Sports Watch",
    isNew: true,
    discount: 12,
  },
];

export const watchBrands = [
  "Rolex",
  "Omega",
  "Seiko",
  "Casio",
  "Citizen",
  "Tissot",
  "TAG Heuer",
  "Breitling",
  "Patek Philippe",
  "Audemars Piguet",
];

export const watchCategories = [
  "Men's Watch",
  "Women's Watch",
  "Sports Watch",
  "Smart Watch",
  "Automatic Watch",
  "Digital Watch",
  "Luxury Watch",
  "Vintage Watch",
];

export const popularSearches = [
  "Rolex Submariner",
  "Apple Watch",
  "Casio G-Shock",
  "Omega Speedmaster",
  "Seiko Automatic",
  "Tissot PRC 200",
  "Citizen Eco-Drive",
];

export const recentSearches = ["men's leather watch", "casio edifice", "omega seamaster", "rolex datejust"]


export const routes = [
  {
    title: "Our Products",
    children: [
      { path: "/products", title: "All products" },
      { path: "/products?gender=Men", title: "Men" },
      { path: "/products?gender=Women", title: "Women" },
      { path: "/products?gender=Unisex", title: "Unisex" },
    ],
  },
  {
    title: "Support",
    children: [
      { path: "/support/about-us", title: "About Us" },
      { path: "/support/contact", title: "Contact" },
      { path: "/support/faq", title: "FAQ" },
    ],
  },
  {
    title: "Policy",
    children: [
      { path: "/policy/term-of-use", title: "Term Of Use" },
      { path: "/policy/privacy-policy", title: "Privacy Policy" },
      { path: "/policy/shipping-return", title: "Shipping And Returns" },
      { path: "/policy/refund-policy", title: "Refund Policy" },
    ],
  },
];

export const icons = [
  {
    icon_social: Facebook,
    url: "https://www.facebook.com/iambot710?locale=vi_VN",
  },
  {
    icon_social: Instagram,
    url: "https://www.instagram.com/iamkhoa29/",
  },
  {
    icon_social: Youtube,
    url: "https://www.youtube.com/@hailoc3403",
  },
];




export const poster = [
  {
    id: 1,
    url: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    text: "Time is Precious Shop Watches Effortlessly.",
  },
  {
    id: 2,
    url: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl2.jpg",
    text: "Luxury Redefined Second by Second.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1731759992339-1b079071ab89?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    text: "Precision and Style ",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1731759992338-f44243163ba4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Timeless Prestige Seamlessly Yours.",
  },
];






export const articles = [
  {
    id: 1,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "09/05/2025",
    tag: "Kiến thức đồng hồ",
    title: "Đồng Hồ – Món Quà Ý Nghĩa Để Tặng ",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 2,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "18/04/2025",
    tag: "Kiến thức đồng hồ",
    title: "Các Phân Khúc Đồng Hồ Trên Thị Trường",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 3,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "01/04/2025",
    tag: "Kiến thức đồng hồ",
    title: "5 Mẫu Đồng Hồ Đáng Mua Nhất Năm 2025",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 4,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "25/03/2025",
    tag: "Kiến thức đồng hồ",
    title: "Top Đồng Hồ Dưới 10 Triệu Đáng Mua Nhất",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 5,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "10/03/2025",
    tag: "Kiến thức đồng hồ",
    title: "Hướng Dẫn Chọn Đồng Hồ Cho Nam",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
];