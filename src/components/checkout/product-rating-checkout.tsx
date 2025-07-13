"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle, Package, Sparkles } from "lucide-react"
import Image from "next/image"

export default function Component() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex)
  }

  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex)
  }

  const handleSubmit = () => {
    if (rating > 0) {
      setIsSubmitted(true)
      console.log("Rating:", rating, "Review:", review)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    // Reset form after a delay to allow for smooth closing animation
    setTimeout(() => {
      setRating(0)
      setHoveredRating(0)
      setReview("")
      setIsSubmitted(false)
    }, 300)
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Rate this product"
    }
  }

  const SuccessContent = () => (
    <div className="text-center py-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
        Thank you for your feedback!
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Your review helps other customers make informed decisions and helps us improve our products.
      </p>
      <div className="space-y-3">
        <Button
          onClick={handleClose}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  )

  const RatingContent = () => (
    <div className="space-y-6">
      {/* Product Info */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 p-4 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg">
            <Image src="/placeholder.svg?height=64&width=64" alt="Product" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Premium Wireless Headphones</h4>
            <p className="text-sm text-gray-500 mt-1">Order #12345</p>
            <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Delivered
            </Badge>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <p className="font-semibold text-gray-900">Rate this product</p>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>

          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-200 hover:scale-125 transform focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded-full p-1"
              >
                <Star
                  className={`w-10 h-10 transition-all duration-200 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="h-6">
            <p
              className={`text-lg font-medium transition-all duration-300 ${
                (hoveredRating || rating) > 0 ? "text-gray-900 scale-105" : "text-gray-500"
              }`}
            >
              {getRatingText(hoveredRating || rating)}
            </p>
          </div>
        </div>
      </div>

      {/* Review Text Area */}
      <div className="space-y-3">
        <label htmlFor="review" className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <span>Share your thoughts</span>
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <Textarea
            id="review"
            placeholder="Tell others about your experience with this product..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[100px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">{review.length}/500</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none h-12 text-base font-semibold"
          disabled={rating === 0}
        >
          {rating === 0 ? "Select a rating to continue" : "Submit Review"}
        </Button>
        <Button
          variant="ghost"
          onClick={handleClose}
          className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-300 h-11"
        >
          Skip for now
        </Button>
      </div>

      {/* Privacy Note */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <p className="text-xs text-gray-600 text-center leading-relaxed">
          <span className="font-medium">Your review will be public</span> and help other customers.
          <br />
          You can edit or delete it anytime in your account.
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Demo page content */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Order Complete! <CheckCircle className="inline-block w-6 h-6 text-green-600" />
          </h1>
          <p className="text-gray-600 text-lg">Your order has been successfully processed.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-3 text-lg">
              Rate Your Purchase
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md border-0 bg-white/95 backdrop-blur-sm shadow-2xl">
            {!isSubmitted ? (
              <>
                <DialogHeader className="text-center pb-2">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 w-14 h-14 mx-auto flex items-center justify-center">
                      <Package className="w-7 h-7 text-white " />
                    </div>
                  </div>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    How was your experience?
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Share your thoughts about this product
                  </DialogDescription>
                </DialogHeader>
                <RatingContent />
              </>
            ) : (
              <SuccessContent />
            )}
          </DialogContent>
        </Dialog>

        {/* Additional demo content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Premium Wireless Headphones</span>
              <span>$299.99</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>$299.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
