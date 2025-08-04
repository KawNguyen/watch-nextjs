import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Đồng hồ Nam",
    subtitle: "Bộ sưu tập Luxatch",
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn1.jpg?v=1722307763&width=1077",
    alt: "Bộ sưu tập đồng hồ cao cấp cho nam",
    path: "/collections?genders=MEN",
  },
  {
    title: "Đồng hồ Nữ",
    subtitle: "Bộ sưu tập Luxatch",
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn2.jpg?v=1722309719&width=983",
    alt: "Bộ sưu tập đồng hồ cao cấp cho nữ",
    path: "/collections?genders=WOMEN",
  },
  {
    title: "Đồng hồ Unisex",
    subtitle: "Bộ sưu tập Luxatch",
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1bn2.jpg?v=1722309719&width=983",
    alt: "Bộ sưu tập đồng hồ cao cấp Unisex",
    path: "/collections?genders=UNISEX",
  },
];

const Category = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Mua sắm theo giới tính
          </h2>
          <div className="w-40 h-1 bg-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Khám phá những bộ sưu tập được tuyển chọn phù hợp với phong cách và
            nhu cầu của bạn.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <Link
              key={index}
              className="relative overflow-hidden rounded-xl max-w-xl w-full shadow-lg group"
              href={category.path}
            >
              <Image
                src={category.image}
                alt={category.alt}
                width={1920}
                height={1080}
                priority
                className="w-full object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-end pr-10 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider mb-2">
                  {category.subtitle}
                </span>
                <h3 className="text-xl md:text-3xl font-bold mb-4">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
