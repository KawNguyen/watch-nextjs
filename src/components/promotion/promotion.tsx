"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, ArrowRight, CheckCircle, Timer, Gift } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const saleEnd = new Date();
  saleEnd.setDate(saleEnd.getDate() + 1); // 1 day from now

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = saleEnd.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    setIsVisible(true)

    // Add smooth scroll behavior to the entire document
    document.documentElement.style.scrollBehavior = "smooth"

    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      <header className="py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">TimeZone</span>
          </div>
          <Badge className="bg-red-600 text-white animate-pulse">Limited Time</Badge>
        </div>
      </header>


      <section
        className={`py-12 px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="container mx-auto text-center">
          <Badge className="bg-red-600 text-white text-lg px-4 py-2 mb-6">🔥 FLASH SALE - 48 HOURS ONLY</Badge>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-yellow-400">70% OFF</span>
            <br />
            Premium Watches
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Exclusive Black Friday Deal: Get our bestselling luxury timepieces at unprecedented prices.
            <span className="text-yellow-400 font-semibold"> Only 50 pieces available!</span>
          </p>


          <div className="bg-[#111827] rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">⏰ Sale Ends In:</h3>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.days).padStart(2, "10")}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, "10")}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, "10")}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, "10")}</div>
                <div className="text-sm">Minutes</div>
              </div>

            </div>
          </div>

          <Button
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-500 text-xl px-8 py-4 mb-4 transform hover:scale-105 transition-all duration-300"
            onClick={() => scrollToSection("featured-deal")}
          >
            CLAIM YOUR 70% DISCOUNT NOW
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-gray-400">⚡ Free shipping worldwide • 30-day money-back guarantee</p>
        </div>
      </section>


      <section id="featured-deal" className="py-16 px-4 bg-slate-800/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🎯 {"TODAY'S FEATURED DEAL"}</h2>
            <p className="text-gray-300">{"The watch everyone's talking about - now at its lowest price ever"}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-700 border-yellow-400 border-2 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/20">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <Badge className="absolute -top-2 -right-2 bg-red-600 text-white z-10 text-lg px-3 py-1">
                      BESTSELLER
                    </Badge>
                    <Image
                      src='/images/logo.png'
                      alt="Premium Watch"
                      width={400}
                      height={400}
                      className="mx-auto"
                    />
                  </div>

                  <div className="space-y-6 text-white">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Luxury Sport Elite</h3>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-300">(2,847 reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl font-bold text-yellow-400">$149</span>
                        <span className="text-2xl text-gray-400 line-through">$499</span>
                        <Badge className="bg-green-600 text-white text-lg">Save $350</Badge>
                      </div>
                      <p className="text-green-400 font-semibold">✅ Lowest price guaranteed</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Swiss movement precision</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Waterproof up to 100m</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Sapphire crystal glass</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>2-year international warranty</span>
                      </div>
                    </div>

                    <div className="bg-red-600 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">🔥 Only 12 left in stock!</span>
                        <Timer className="h-5 w-5" />
                      </div>
                    </div>

                    <Button size="lg" className="w-full bg-yellow-400 text-black hover:bg-yellow-500 text-xl py-4">
                      ADD TO CART - $149
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">⚡ Join 50,000+ Happy Customers</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 hover:bg-slate-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                {"Amazing quality for the price. Looks exactly like watches costing 10x more!"}
              </p>
              <p className="text-sm text-gray-400">- Tran Hai Ta, Verified Buyer</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 hover:bg-slate-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                {"Fast shipping, excellent customer service. Will definitely buy again!"}
              </p>
              <p className="text-sm text-gray-400">- Huynh Kim Tan, Verified Buyer</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 hover:bg-slate-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                {"Perfect gift for my husband. He absolutely loves it and gets compliments daily."}
              </p>
              <p className="text-sm text-gray-400">- Nguyen Ngoc Dang Ky, Verified Buyer </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">

        <div className="absolute -top-16 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-red-600/10 rounded-full blur-3xl z-0" />

        <div className="container mx-auto text-center relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-yellow-400 rounded-full p-4 shadow-lg mb-4 animate-bounce">
              <Gift className="h-12 w-12 text-slate-900" />
            </div>
            <h2 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
              {"Don't Miss Out!"}
            </h2>
            <p className="text-2xl mb-6 text-gray-200 opacity-90 max-w-2xl mx-auto">
              <span className="font-semibold text-yellow-400">70% OFF</span> {"— our biggest sale of the year. Once its gone, it won't be back until next Black Friday."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="flex items-center justify-center bg-slate-700/70 rounded-xl py-4 px-6 shadow-md">
              <span className="text-green-400 text-2xl mr-2">✅</span>
              <span className="text-lg text-white font-medium">50 pieces available <span className="text-yellow-400 font-bold">(12 left)</span></span>
            </div>
            <div className="flex items-center justify-center bg-slate-700/70 rounded-xl py-4 px-6 shadow-md">
              <span className="text-green-400 text-2xl mr-2">✅</span>
              <span className="text-lg text-white font-medium">Free worldwide shipping</span>
            </div>
            <div className="flex items-center justify-center bg-slate-700/70 rounded-xl py-4 px-6 shadow-md">
              <span className="text-green-400 text-2xl mr-2">✅</span>
              <span className="text-lg text-white font-medium">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center justify-center bg-slate-700/70 rounded-xl py-4 px-6 shadow-md">
              <span className="text-green-400 text-2xl mr-2">✅</span>
              <span className="text-lg text-white font-medium">2-year warranty included</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-white hover:from-yellow-300 hover:to-red-400 text-2xl px-12 py-5 font-bold shadow-xl rounded-full transition-all duration-300 transform hover:scale-105"
          >
            SECURE YOUR WATCH NOW - $149
          </Button>
          <p className="text-base mt-6 text-gray-300 opacity-80 tracking-wide">
            ⚡ Sale ends in <span className="font-semibold text-yellow-400"><div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.days).padStart(2, "10")}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, "10")}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, "10")}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, "10")}</div>
                <div className="text-sm">Minutes</div>
              </div>

            </div>
            </span>
          </p>
        </div>
      </section>


      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-5 w-5 rotate-[-90deg]" />
      </button>
    </div>
  )
}
