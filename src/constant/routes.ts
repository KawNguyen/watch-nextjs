import { Heart, LogIn, ShoppingBag } from "lucide-react";

export const rh = [
  {
    icon: Heart,
    hover: "Favorite",
    path: "/favorite",
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
  },
  {
    title: "All",
    category: "All",
    image: "/images/logo.png",
  },
  {
    title: "Why Open Source Matters",
    category: "Open source",
    image: "/images/logo.png",
  },
  {
    title: "GPT vs BERT in NLP",
    category: "Natural language processing",
    image: "/images/logo.png",
  },
  {
    title: "Our Hardware Journey",
    category: "Hardware",
    image: "/images/logo.png",
  },
  {
    title: "Vision Transformers",
    category: "Women Watch",
    image: "/images/logo.png",
  },
  {
    title: "AI Research Roadmap 2025",
    category: "Research",
    image: "/images/logo.png",
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
