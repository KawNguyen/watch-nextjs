"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const timelineEvents = [
  {
    year: "1952",
    title: "Foundation",
    description:
      "Our company was founded with a vision to create exceptional timepieces",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dX7OsbIg2-Vdwo5wW3ya5CrJL92DHaGvgGI6MdgD5UAlE3Jso2z0lDK7sDydxUdP3k&usqp=CAU",
  },
  {
    year: "1968",
    title: "First Collection",
    description:
      "Launch of our first signature collection that defined our brand",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dX7OsbIg2-Vdwo5wW3ya5CrJL92DHaGvgGI6MdgD5UAlE3Jso2z0lDK7sDydxUdP3k&usqp=CAU",
  },
  {
    year: "1985",
    title: "Innovation",
    description:
      "Pioneered new watchmaking techniques that revolutionized the industry",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dX7OsbIg2-Vdwo5wW3ya5CrJL92DHaGvgGI6MdgD5UAlE3Jso2z0lDK7sDydxUdP3k&usqp=CAU",
  },
  {
    year: "2005",
    title: "Global Expansion",
    description:
      "Expanded to international markets, becoming a global luxury brand",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dX7OsbIg2-Vdwo5wW3ya5CrJL92DHaGvgGI6MdgD5UAlE3Jso2z0lDK7sDydxUdP3k&usqp=CAU",
  },
  {
    year: "2023",
    title: "Modern Era",
    description:
      "Combining traditional craftsmanship with cutting-edge technology",
    image: "/placeholder.svg?height=300&width=400",
  },
];

export function History() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <section
      ref={ref}
      className="py-12 bg-white to-black text-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Heritage</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            A legacy of excellence spanning over seven decades
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline navigation */}
          <motion.div
            className="flex justify-between mb-12 relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2" />

            {/* Active line */}
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-black -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={{
                width: `${(activeEvent / (timelineEvents.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Year markers */}
            {timelineEvents.map((event, index) => (
              <motion.button
                key={index}
                className="relative z-10 flex flex-col items-center"
                onClick={() => setActiveEvent(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 * index, duration: 0.5 },
                      }
                    : { opacity: 0, y: 20 }
                }
              >
                <motion.div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    activeEvent === index ? "bg-black" : "bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {activeEvent === index && (
                    <motion.div
                      className="w-2 h-2 bg-black rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.div>
                <motion.span
                  className={`mt-2 font-bold ${activeEvent === index ? "text-black" : "text-gray-500"}`}
                  animate={{
                    scale: activeEvent === index ? 1.2 : 1,
                    y: activeEvent === index ? -5 : 0,
                  }}
                >
                  {event.year}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>

          {/* Content display */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="overflow-hidden rounded-lg"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.img
                    src={timelineEvents[activeEvent].image}
                    alt={timelineEvents[activeEvent].title}
                    className="w-full h-auto object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.h3
                    className="text-3xl font-bold mb-4 text-black"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {timelineEvents[activeEvent].title}
                  </motion.h3>

                  <motion.p
                    className="text-lg text-black mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {timelineEvents[activeEvent].description}
                  </motion.p>

                  <motion.button
                    className="bg-transparent border border-black text-black px-6 py-2 rounded-md hover:scale-110 hover:text-black transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
