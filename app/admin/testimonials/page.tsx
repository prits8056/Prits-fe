"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star, Save, Plus } from "lucide-react"
import Link from "next/link"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  isActive: boolean
  createdAt: string
}

export default function TestimonialsManagement() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  })

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    loadTestimonials()
  }, [router])

  const loadTestimonials = () => {
    const testimonialData = JSON.parse(localStorage.getItem("testimonials") || "[]")
    setTestimonials(testimonialData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    const updatedTestimonials = [...testimonials, newTestimonial]
    setTestimonials(updatedTestimonials)
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials))

    // Reset form
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
    })
    setIsAdding(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Testimonials Management</h1>
                <p className="text-sm text-gray-500">Add and manage customer testimonials</p>
              </div>
            </div>
            <Button onClick={() => setIsAdding(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Testimonial Form */}
        {isAdding && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Testimonial</CardTitle>
              <CardDescription>Create a new customer testimonial to display on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                    <Input
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="CEO, Marketing Director, etc."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`w-8 h-8 ${
                          star <= formData.rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{formData.rating} star(s)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Content *</label>
                  <Textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write the customer's testimonial here..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button type="submit" className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Testimonial</span>
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Existing Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Testimonials</CardTitle>
            <CardDescription>
              {testimonials.length} testimonial(s) total • {testimonials.filter((t) => t.isActive).length} active
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testimonials.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
                <p className="text-gray-600 mb-4">Add your first customer testimonial to get started</p>
                <Button onClick={() => setIsAdding(true)} className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add First Testimonial</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                          <div className="flex items-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {testimonial.role} at {testimonial.company}
                        </p>
                        <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4">
                          "{testimonial.content}"
                        </blockquote>
                      </div>
                      <div className="ml-4 text-right">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            testimonial.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {testimonial.isActive ? "Active" : "Inactive"}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Added {new Date(testimonial.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
