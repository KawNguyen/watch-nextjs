import { GenderFilter } from "@/types/navigation";
import {
  Youtube,
  Instagram,
  Facebook,
  Users,
  Grid3X3,
  Home,
} from "lucide-react";

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
    {
      name: "Casio",
      value: "casio",
      logo: "/images/brand/casio-logo.png",
    },
    {
      name: "Citizen",
      value: "citizen",
      logo: "/images/brand/citizen-logo.png",
    },
    {
      name: "Orient",
      value: "orient",
      logo: "/images/brand/orient-logo.png",
    },
  ],
  gender: [
    {
      title: "Men",
      value: "MEN",
      navItems: [
        {
          title: "Giá",
          value: "price",
          items: [
            {
              title: "Dưới 5 triệu",
              value: {
                minPrice: 0,
                maxPrice: 5000000,
              },
            },
            {
              title: "5 - 10 triệu",
              value: { minPrice: 5000000, maxPrice: 10000000 },
            },
            {
              title: "10 - 20 triệu",
              value: { minPrice: 10000000, maxPrice: 20000000 },
            },
            {
              title: "Trên 20 triệu",
              value: { minPrice: 20000000, maxPrice: 100000000 },
            },
          ],
        },
        {
          title: "Thương hiệu",
          value: "brands",
          items: [
            { title: "Rolex", value: "rolex" },
            { title: "Tissot", value: "tissot" },
            { title: "Omega", value: "omega" },
            { title: "Patek Philippe", value: "patek-philippe" },
            { title: "Daniel Wellington", value: "daniel-wellington" },
            { title: "Seiko", value: "seiko" },
            { title: "Casio", value: "casio" },
            { title: "Citizen", value: "citizen" },
            { title: "Orient", value: "orient" },
          ],
        },
        {
          title: "Động cơ",
          value: "movements",
          items: [
            { title: "Bộ máy cơ", value: "bo-may-co" },
            { title: "Bộ máy thạch anh", value: "bo-may-thach-anh" },
            { title: "Pin", value: "pin" },
          ],
        },
      ],
    },
    {
      title: "Women",
      value: "WOMEN",
      navItems: [
        {
          title: "Giá",
          items: [
            {
              title: "Dưới 5 triệu",
              value: {
                minPrice: 0,
                maxPrice: 5000000,
              },
            },
            {
              title: "5 - 10 triệu",
              value: { minPrice: 5000000, maxPrice: 10000000 },
            },
            {
              title: "10 - 20 triệu",
              value: { minPrice: 10000000, maxPrice: 20000000 },
            },
            {
              title: "Trên 20 triệu",
              value: { minPrice: 20000000, maxPrice: 100000000 },
            },
          ],
        },
        {
          title: "Thương hiệu",
          items: [
            { title: "Rolex", value: "rolex" },
            { title: "Tissot", value: "tissot" },
            { title: "Omega", value: "omega" },
            { title: "Patek Philippe", value: "patek-philippe" },
            { title: "Daniel Wellington", value: "daniel-wellington" },
            { title: "Seiko", value: "seiko" },
            { title: "Casio", value: "casio" },
            { title: "Citizen", value: "citizen" },
            { title: "Orient", value: "orient" },
          ],
        },
        {
          title: "Động cơ",
          items: [
            { title: "Bộ máy cơ", value: "bo-may-co" },
            { title: "Bộ máy thạch anh", value: "bo-may-thach-anh" },
            { title: "Pin", value: "pin" },
          ],
        },
      ],
    },
  ] satisfies GenderFilter[],
};

export const faqs = [
  {
    question: "Làm thế nào để đặt hàng?",
    answer:
      "Duyệt qua bộ sưu tập của chúng tôi, thêm chiếc đồng hồ bạn muốn vào giỏ hàng và tiến hành thanh toán. Làm theo hướng dẫn trên màn hình để hoàn tất đơn hàng.",
  },
  {
    question: "Các phương thức thanh toán nào được chấp nhận?",
    answer:
      "Chúng tôi chấp nhận thẻ tín dụng chính, PayPal và chuyển khoản ngân hàng.",
  },
  {
    question: "Làm thế nào để theo dõi đơn hàng của tôi?",
    answer:
      "Khi đơn hàng của bạn được giao, bạn sẽ nhận được số theo dõi qua email. Sử dụng nó để theo dõi lô hàng của bạn trên trang web của chúng tôi hoặc trang web của đơn vị vận chuyển.",
  },
  {
    question: "Chính sách đổi trả của bạn là gì?",
    answer:
      "Bạn có thể trả lại bất kỳ chiếc đồng hồ nào chưa qua sử dụng trong vòng 14 ngày kể từ ngày giao hàng để được hoàn tiền đầy đủ. Vui lòng xem trang Chính sách đổi trả của chúng tôi để biết thêm chi tiết.",
  },
  {
    question: "Bạn có cung cấp dịch vụ vận chuyển quốc tế không?",
    answer:
      "Có, chúng tôi cung cấp dịch vụ vận chuyển quốc tế. Phí vận chuyển và thời gian giao hàng sẽ thay đổi tùy theo địa điểm.",
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

export const recentSearches = [
  "men's leather watch",
  "casio edifice",
  "omega seamaster",
  "rolex datejust",
];

export const routes = [
  {
    title: "Sản phẩm",
    children: [
      { path: "/collections", title: "Tất cả sản phẩm" },
      { path: "/collections?genders=Men", title: "Nam" },
      { path: "/collections?genders=Women", title: "Nữ" },
      { path: "/collections?genders=Unisex", title: "Unisex" },
    ],
  },
  {
    title: "Hỗ trợ",
    children: [
      { path: "/support/about-us", title: "Về chúng tôi" },
      { path: "/support/contact", title: "Liên hệ" },
      { path: "/support/faq", title: "Câu hỏi thường gặp" },
    ],
  },
  {
    title: "Chính sách",
    children: [
      { path: "/policy/term-of-use", title: "Điều khoản sử dụng" },
      { path: "/policy/privacy-policy", title: "Chính sách bảo mật" },
      { path: "/policy/shipping-return", title: "Vận chuyển & Đổi trả" },
      { path: "/policy/refund-policy", title: "Chính sách hoàn tiền" },
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

export const menuItems = [
  {
    id: "home",
    title: "Trang chủ",
    icon: Home,
    href: "/",
  },
  {
    id: "collection",
    title: "Bộ sưu tập",
    icon: Grid3X3,
    href: "/collections",
  },
  {
    id: "men",
    title: "Nam",
    icon: Users,
    submenu: [
      {
        title: "Brand",
        href: "/men/brand",
        children: [
          { title: "Rolex", value: "rolex", queryKey: "brands" },
          {
            title: "Daniel Wellington",
            value: "daniel-wellington",
            queryKey: "brands",
          },
          { title: "Casio", value: "casio", queryKey: "brands" },
          { title: "Tissot", value: "tissot", queryKey: "brands" },
        ],
      },
      {
        title: "Material",
        href: "/men/material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "materials",
          },
          { title: "Vàng", value: "gold", queryKey: "materials" },
          { title: "Bạc", value: "silver", queryKey: "materials" },
        ],
      },
      {
        title: "Band Material",
        href: "/men/band-material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "bandMaterials",
          },
          { title: "Da cá sâu", value: "leather", queryKey: "bandMaterials" },
          { title: "Vàng", value: "gold", queryKey: "bandMaterials" },
          { title: "Bạc", value: "silver", queryKey: "bandMaterials" },
        ],
      },
    ],
  },
  {
    id: "women",
    title: "Nữ",
    icon: Users,
    submenu: [
      {
        title: "Brand",
        href: "/women/brand",
        children: [
          { title: "Rolex", value: "rolex", queryKey: "brands" },
          { title: "DW", value: "dw", queryKey: "brands" },
          { title: "Casio", value: "casio", queryKey: "brands" },
          { title: "Tissot", value: "tissot", queryKey: "brands" },
        ],
      },
      {
        title: "Material",
        href: "/women/material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "materials",
          },
          { title: "Vàng", value: "gold", queryKey: "materials" },
          { title: "Bạc", value: "silver", queryKey: "materials" },
        ],
      },
      {
        title: "Band Material",
        href: "/women/band-material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "bandMaterials",
          },
          { title: "Da cá sâu", value: "leather", queryKey: "bandMaterials" },
          { title: "Vàng", value: "gold", queryKey: "bandMaterials" },
          { title: "Bạc", value: "silver", queryKey: "bandMaterials" },
        ],
      },
    ],
  },
];
