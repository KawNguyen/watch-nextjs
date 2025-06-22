import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { teamMembers } from "@/constant/routes";
import Image from "next/image";

const AboutUs = ()=>
{
  return (
    <section className="py-8 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Time Never Looked This Good.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4">
              The journey of our brand started with a passion for timeless
              elegance and unmatched precision. Since day one, we have committed
              to crafting watches that are not only functional but also reflect
              the personality and taste of their wearers.
            </p>
            <p className="text-gray-600">
              Our team brings together tradition and technology, aiming to
              redefine how people view time — not just as a measurement, but as
              a statement.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md aspect-[16/9]">
            <Image
              src="https://tnktravel.com.vn/wp-content/uploads/2023/05/Team-Work-l%C3%A0-g%C3%AC--1024x536.jpeg"
              alt="Team collaboration"
              className="w-full h-full object-cover"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "We constantly push boundaries and explore new technologies to stay ahead of the curve.",
              },
              {
                title: "Collaboration",
                description:
                  "We believe great ideas come from diverse teams working together toward a common goal.",
              },
              {
                title: "Integrity",
                description:
                  "We're committed to transparency, honesty, and doing what's right for our clients and community.",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-gray-50 shadow-sm border">
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{value.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden border shadow-sm">
                <div className="aspect-square w-full h-[500px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    width={800}
                    height={800}
                    priority
                  />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <CardDescription className="text-gray-600 text-sm">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutUs