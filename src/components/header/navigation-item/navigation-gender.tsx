import { GenderFilter } from "@/types/navigation";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import Link from "next/link";



const NavigationGender = ({ gender }: { gender: GenderFilter[] }) => {
  return (
    <>
      {gender.map((item, ind) => (
        <NavigationMenuItem key={item.value + ind}>
          <NavigationMenuTrigger className="px-4 py-2">
            {item.title === "Men" ? "Nam" : "Nữ"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-between p-6 w-[440px] lg:w-[680px]">
              {item.navItems.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold px-2 mb-2 text-gray-900">
                    {section.title}
                  </h4>
                  <ul
                    className={`w-max ${
                      section.items.length > 5
                        ? "grid grid-cols-2 gap-x-2"
                        : "grid grid-cols-1"
                    }`}
                  >
                    {section.items.map((subItem) => (
                      <li
                        key={
                          typeof subItem.value === "string"
                            ? subItem.value
                            : JSON.stringify(subItem.value)
                        }
                      >
                        <Link
                          href={
                            section.value === "brands"
                              ? `/collections?brands=${subItem.value}&genders=${item.value}`
                              : section.value === "price"
                              ? typeof subItem.value === "object"
                                ? `/collections?minPrice=${subItem.value.minPrice}&maxPrice=${subItem.value.maxPrice}&genders=${item.value}`
                                : "#"
                              : `/collections?movements=${subItem.value}&genders=${item.value}`
                          }
                          className={`block p-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition`}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}
    </>
  );
};

export default NavigationGender;
