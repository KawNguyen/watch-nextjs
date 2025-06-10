import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import Link from "next/link";

interface NavItem {
  title: string;
  value: string;
}

interface NavSection {
  title: string; // e.g., "Brands" or "Styles"
  items: NavItem[];
}

interface Gender {
  title: string;
  value: string;
  navItems: NavSection[];
}

interface NavigationGenderProps {
  gender: Gender[];
}

const NavigationGender = ({ gender }: NavigationGenderProps) => {
  return (
    <>
      {gender.map((item, ind) => (
        <NavigationMenuItem key={item.value + ind}>
          <NavigationMenuTrigger className="px-4 py-2">
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-6 p-6 w-[400px] lg:w-[500px]">
              {item.navItems.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold mb-2 text-gray-900">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((subItem) => (
                      <li key={subItem.value}>
                        <Link
                          href={`/${subItem.value}/collections?gender=${item.value}`}
                          className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition"
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
