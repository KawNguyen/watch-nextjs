"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

export default function WatchBlogPage() {
  // Categories for filtering
  const categories = ["All", "Luxury", "Vintage", "Affordable"];
  const [activeCategory, setActiveCategory] = useState("All");

  // Featured watches (now with more entries)
  const featuredWatches = [
    {
      id: 1,
      title: "Rolex Submariner",
      description: "The iconic dive watch with unmatched precision.",
      category: "Luxury",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 2,
      title: "Omega Speedmaster",
      description: "The legendary Moonwatch, a piece of history.",
      category: "Vintage",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 3,
      title: "Seiko Presage",
      description: "Japanese craftsmanship meets affordability.",
      category: "Affordable",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 4,
      title: "Patek Philippe Nautilus",
      description: "Ultra-thin luxury for the discerning collector.",
      category: "Luxury",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 5,
      title: "Cartier Tank",
      description: "A timeless Art Deco masterpiece.",
      category: "Vintage",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 6,
      title: "Tissot PRX",
      description: "Swiss quality at an accessible price.",
      category: "Affordable",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
  ];

  // Recommended posts
  const recommendedPosts = [
    {
      id: 7,
      title: "How to Spot a Fake Rolex",
      description: "Expert tips to avoid counterfeit watches.",
      category: "Guides",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 8,
      title: "Top 5 Dive Watches of 2024",
      description: "From budget to luxury, these divers dominate.",
      category: "Reviews",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 9,
      title: "The History of the Omega Speedmaster",
      description: "How NASA's Moonwatch came to be.",
      category: "History",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
    {
      id: 10,
      title: "Automatic vs. Quartz: Which is Right for You?",
      description: "Breaking down the mechanics.",
      category: "Guides",
      image:
        "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/512686251_749559837455179_2680405489020327467_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pM9BFnxit_cQ7kNvwHxtMQL&_nc_oc=Admfjw6T0VTDA2nXbGt860um0zfANdON814SZjlRUGuvKMLKv5s9AKneNFeMHEmUBnek6n2135ihGE7khlfNx7uG&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=-sEpeACj6-l1sJeKYZCuQA&oh=00_AfOwEXxzHz_s_E-JVSw8JF0KIHjmLAxvTob24nqAlFFCJw&oe=68649909",
    },
  ];
  const filteredWatches =
    activeCategory === "All"
      ? featuredWatches
      : featuredWatches.filter((watch) => watch.category === activeCategory);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the finest watches for every occasion
          </p>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-white hover:text-gray-900"
          >
            Shop Now
          </Button>
        </div>
      </section>
      <section className="py-12 container mx-auto px-4">
        <Tabs
          defaultValue="All"
          className="w-full"
          onValueChange={(value) => setActiveCategory(value)}
        >
          <TabsList className="grid grid-cols-4 gap-2 bg-gray-100 p-2 rounded-lg">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredWatches.map((watch) => (
                <Card
                  key={watch.id}
                  className="hover:shadow-lg transition-shadow "
                >
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2 pl-2">
                      {watch.category}
                    </Badge>
                    <CardTitle className="pl-2">{watch.title}</CardTitle>
                    <CardDescription className="pl-2">{watch.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={watch.image}
                      alt={watch.title}
                      width={300}
                      height={300}
                      className="object-contain w-full h-full p-1"
                    />
                  </CardContent>
                  <CardFooter className="p-2"> 
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Recommended Posts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            You Might Like These
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow border-0"
              >
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {post.category}
                  </Badge>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                  <CardContent>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </CardContent>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" className="pl-0 text-gray-900">
                    Read More →
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
