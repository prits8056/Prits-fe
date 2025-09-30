"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  company: string
  selectedPlan: string
  planPrice: string
  message: string
  submittedAt: string
  status: "new" | "contacted" | "closed"
}

export default function ContactPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  // Get plan details from URL parameters
  const selectedPlan = searchParams.get("plan") || ""
  const planPrice = searchParams.get("price") || ""
  const planType = searchParams.get("type") || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Create submission object
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      ...formData,
      selectedPlan: selectedPlan ? `${selectedPlan} (${planType})` : "General Inquiry",
      planPrice: planPrice || "N/A",
      submittedAt: new Date().toISOString(),
      status: "new",
    }

    // Store in localStorage (in production, this would be sent to a server)
    const existingSubmissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
    existingSubmissions.push(submission)
    localStorage.setItem("contactSubmissions", JSON.stringify(existingSubmissions))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your inquiry has been submitted successfully. Our team will get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push("/")} className="w-full bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: "", email: "", phone: "", company: "", message: "" })
                }}
                className="w-full"
              >
                Submit Another Inquiry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Started with Prits</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your digital presence? Fill out the form below and our team will get in touch with you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary (if plan selected) */}
          {selectedPlan && (
            <Card className="lg:order-2">
              <CardHeader>
                <CardTitle className="text-blue-900">Selected Plan</CardTitle>
                <CardDescription>Your chosen service package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-900">{selectedPlan}</h3>
                      <p className="text-sm text-blue-600">{planType}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">{planPrice}</div>
                      <div className="text-sm text-blue-600">/month</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Our team will provide you with detailed information about this plan and help customize it to your
                    specific needs.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm font-medium">✓ Free consultation included</p>
                  <p className="text-green-700 text-sm">
                    We'll discuss your requirements and provide a customized proposal.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Form */}
          <Card className="lg:order-1">
            <CardHeader>
              <CardTitle className="text-blue-900">Contact Information</CardTitle>
              <CardDescription>
                {selectedPlan
                  ? "Tell us about your project and we'll get back to you with a detailed proposal."
                  : "Get in touch with us for any inquiries or to discuss your project needs."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      required
                      className="focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={
                      selectedPlan
                        ? "Tell us about your project requirements, timeline, and any specific needs you have..."
                        : "Describe your project, goals, and how we can help you..."
                    }
                    rows={5}
                    required
                    className="focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• We'll review your inquiry within 24 hours</li>
                    <li>• Schedule a free consultation call</li>
                    <li>• Provide a detailed proposal and timeline</li>
                    <li>• Start your project once approved</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 text-lg font-medium"
                >
                  {isLoading ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Quick Response</h3>
              <p className="text-sm text-gray-600">We respond to all inquiries within 24 hours</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">💡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Consultation</h3>
              <p className="text-sm text-gray-600">Get expert advice at no cost</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Custom Solutions</h3>
              <p className="text-sm text-gray-600">Tailored to your specific needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
