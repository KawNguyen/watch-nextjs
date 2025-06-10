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
