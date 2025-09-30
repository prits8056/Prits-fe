"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("testimonials")
    if (stored) {
      setTestimonials(JSON.parse(stored))
    } else {
      // Default testimonials if none exist
      const defaultTestimonials: Testimonial[] = [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "Marketing Director",
          company: "TechCorp Inc.",
          content:
            "Prits transformed our digital presence completely. Their innovative approach and attention to detail exceeded our expectations.",
          avatar: "/professional-woman-diverse.png",
        },
        {
          id: "2",
          name: "Michael Chen",
          role: "CEO",
          company: "StartupXYZ",
          content:
            "Working with Prits was a game-changer for our startup. They delivered exceptional results within our tight timeline.",
          avatar: "/professional-man.jpg",
        },
        {
          id: "3",
          name: "Emily Rodriguez",
          role: "Product Manager",
          company: "InnovateLab",
          content:
            "The team at Prits brought our vision to life with creativity and technical excellence. Highly recommended!",
          avatar: "/professional-woman-diverse.png",
        },
      ]
      setTestimonials(defaultTestimonials)
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with Prits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
