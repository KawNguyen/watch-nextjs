import { Heart, LogIn, ShoppingBag } from "lucide-react";

export const rh = [
  {
    icon: Heart,
    hover: "Favorite",
    path: "profile/favorite",
  },
  {
    icon: ShoppingBag,
    hover: "Cart",
    path: "/cart",
  },
  {
    icon: LogIn,
    hover: "Sign In",
    path: "/sign-in",
  },
];

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
    {
      title: "Unisex",
      value: "unisex",
      navItems: [
        {
          title: "Brands",
          items: [
            { title: "Casio", value: "casio" },
            { title: "Seiko", value: "seiko" },
          ],
        },
        {
          title: "Styles",
          items: [
            { title: "Casual", value: "casual" },
            { title: "Digital", value: "digital" },
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
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop",
      category: "Motherboard",
      href: "/products/1",
      inStock: true,
    },
    {
      id: "2",
      title: "Bo mạch chủ MSI A320M-A Pro",
      price: 1390000,
      originalPrice: 1550000,
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=80&h=80&fit=crop",
      category: "Motherboard",
      href: "/products/2",
      inStock: true,
    },
    {
      id: "3",
      title: "Bo mạch chủ ASUS PRIME A620M-A DDR5",
      price: 3290000,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=80&h=80&fit=crop",
      category: "Motherboard",
      href: "/products/3",
      inStock: false,
    },
    {
      id: "4",
      title: "Bo mạch chủ MSI B450M-A PRO MAX II",
      price: 1690000,
      originalPrice: 1990000,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=80&h=80&fit=crop",
      category: "Motherboard",
      href: "/products/4",
      inStock: true,
    },
    {
      id: "5",
      title: "Bo mạch chủ ASUS PRIME B650M-A-CSM DDR5",
      price: 4690000,
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=80&h=80&fit=crop",
      category: "Motherboard",
      href: "/products/5",
      inStock: true,
    },
    {
      id: "6",
      title: "Classic Heritage Watch Premium Gold",
      price: 2500000,
      originalPrice: 3200000,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
      category: "Watch",
      href: "/products/6",
      inStock: true,
    },
    {
      id: "7",
      title: "Luxury Gold Watch Diamond Edition",
      price: 8900000,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=80&h=80&fit=crop",
      category: "Watch",
      href: "/products/7",
      inStock: true,
    },
    {
      id: "8",
      title: "Sport Elite Watch Titanium",
      price: 1890000,
      originalPrice: 2100000,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop",
      category: "Watch",
      href: "/products/8",
      inStock: true,
    },
  ]


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