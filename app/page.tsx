"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Menu, X, ArrowRight, Star, Users, Award, Zap } from "lucide-react"
import TestimonialsSection from "@/components/testimonials-section"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    price: string
    type: string
  } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "clients", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "clients", label: "Our Clients" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact Us" },
  ]

  const handlePlanSelection = (planName: string, planPrice: string, planType: string) => {
    setSelectedPlan({ name: planName, price: planPrice, type: planType })
    setIsModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPlan) return

    // Create inquiry object
    const inquiry = {
      id: Date.now().toString(),
      ...formData,
      plan: selectedPlan,
      status: "new",
      submittedAt: new Date().toISOString(),
    }

    // Save to localStorage
    const existingInquiries = JSON.parse(localStorage.getItem("contactInquiries") || "[]")
    existingInquiries.push(inquiry)
    localStorage.setItem("contactInquiries", JSON.stringify(existingInquiries))

    // Reset form and close modal
    setFormData({ name: "", email: "", phone: "", company: "", message: "" })
    setIsModalOpen(false)
    setSelectedPlan(null)

    // Show success message
    alert("Thank you for your inquiry! We'll get back to you soon.")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Get Started with {selectedPlan?.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedPlan?.type} • {selectedPlan?.price}/month
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Plan Details */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedPlan?.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedPlan?.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{selectedPlan?.price}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Details</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project requirements, goals, and timeline..."
                    className="min-h-[120px] transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE: Adding lightweight bubble animation layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Lightweight floating bubbles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bubble-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              background: `linear-gradient(45deg,
                hsl(${Math.random() * 60 + 200}, 60%, 70%),
                hsl(${Math.random() * 60 + 240}, 60%, 80%))`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 12}s`,
            }}
          />
        ))}

        {/* Gentle floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-indigo-400/5 to-blue-400/5 rotate-45 animate-float-slow-reverse" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-full animate-float-gentle" />
        <div className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 rotate-12 animate-float-slow" />

        {/* Subtle gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/8 to-cyan-300/8 rounded-full blur-xl animate-pulse-subtle" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-300/8 to-blue-300/8 rounded-full blur-xl animate-pulse-subtle-delayed" />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-cyan-300/8 to-indigo-300/8 rounded-full blur-lg animate-pulse-subtle" />

        {/* Gentle drifting lines */}
        <div className="absolute top-40 right-20 w-1 h-16 bg-gradient-to-b from-blue-400/10 to-transparent animate-drift-horizontal" />
        <div
          className="absolute bottom-40 left-20 w-1 h-20 bg-gradient-to-b from-cyan-400/10 to-transparent animate-drift-horizontal"
          style={{ animationDelay: "4s" }}
        />

        {/* Rotating subtle shapes */}
        <div className="absolute top-60 left-1/2 w-8 h-8 border border-blue-400/10 rotate-45 animate-gentle-rotate" />
        <div
          className="absolute bottom-60 right-1/2 w-6 h-6 border border-indigo-400/10 animate-gentle-rotate"
          style={{ animationDelay: "10s" }}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 rotate-45" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-full" />
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-gradient-to-br from-indigo-400/5 to-blue-400/5 rotate-12" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border transition-all duration-300 animate-slide-down-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-foreground">Prits</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 relative group ${
                    activeSection === item.id ? "text-blue-600" : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-blue-600 transform hover:scale-110 transition-all duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-slide-down">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:translate-x-2 ${
                    activeSection === item.id ? "text-blue-600" : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating bubbles with better visibility */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-bubble-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 15}px`,
                height: `${Math.random() * 30 + 15}px`,
                background: `linear-gradient(45deg,
                  hsl(${Math.random() * 60 + 200}, 60%, 70%),
                  hsl(${Math.random() * 60 + 240}, 60%, 80%))`,
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 15 + 12}s`,
              }}
            />
          ))}

          {/* Larger gradient orbs */}
          <div className="absolute top-20 left-10 w-60 h-60 bg-gradient-to-br from-blue-300/15 to-cyan-300/15 rounded-full blur-2xl animate-pulse-subtle" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-indigo-300/15 to-blue-300/15 rounded-full blur-2xl animate-pulse-subtle-delayed" />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-300/15 to-indigo-300/15 rounded-full blur-xl animate-float-gentle" />

          {/* Geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full animate-float-slow" />
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rotate-45 animate-float-slow-reverse" />
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full animate-float-gentle" />
          <div className="absolute bottom-1/3 right-1/4 w-18 h-18 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rotate-12 animate-float-slow" />

          {/* Drifting lines */}
          <div className="absolute top-40 right-20 w-1 h-20 bg-gradient-to-b from-blue-400/20 to-transparent animate-drift-horizontal" />
          <div
            className="absolute bottom-40 left-20 w-1 h-24 bg-gradient-to-b from-cyan-400/20 to-transparent animate-drift-horizontal"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute top-60 left-1/2 w-1 h-16 bg-gradient-to-b from-indigo-400/20 to-transparent animate-drift-horizontal"
            style={{ animationDelay: "8s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance animate-text-reveal">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                  Build stunning
                </span>
                <br />
                digital experiences.
              </h1>
              <p
                className="text-lg text-muted-foreground max-w-lg text-pretty animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                Prits creates innovative websites and mobile applications that captivate users and drive business growth
                through cutting-edge design and technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("services")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/person-working-on-laptop-with-colorful-ui-elements.jpg"
                  alt="Person working on laptop with design elements"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-blue-400 font-medium mb-4">What Prits Can Do For You</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance animate-text-reveal">Our Service Plans</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-pretty">
              Comprehensive digital marketing and development solutions tailored to your business needs.
            </p>
          </div>

          {/* SMO Services */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12 text-blue-300 animate-fade-in-up">
              Social Media Optimization (SMO)
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic Plan",
                  price: "$350",
                  hours: "50",
                  features: [
                    "10 Monthly postings",
                    "10 Analytics tracking",
                    "Competitor analysis",
                    "Strategy formation & Hashtag promotion",
                    "Monthly creative creation",
                    "Account Management",
                    "Engagement with communities & groups",
                    "Network build-up",
                    "Content optimization",
                    "Paid Promotion (Budget estimate, Campaign setup, Ad creative)",
                    "Remarketing (Audience lists, Ad creatives, Optimization)",
                    "Customer support (Phone, Email)",
                    "Additional: YouTube promotion, WhatsApp marketing, LinkedIn promotion",
                  ],
                  color: "from-blue-500 to-cyan-500",
                  popular: false,
                },
                {
                  name: "Bronze Plan",
                  price: "$550",
                  hours: "70",
                  features: [
                    "15 Monthly postings",
                    "15 Analytics tracking",
                    "Competitor analysis",
                    "Strategy formation & Hashtag promotion",
                    "Monthly creative creation",
                    "Account Management",
                    "Engagement with communities & groups",
                    "Network build-up",
                    "Content optimization",
                    "Paid Promotion (same features)",
                    "Remarketing (same features)",
                    "Customer support (Phone, Email)",
                    "Additional: Google My Business optimization, Blog posting",
                  ],
                  color: "from-amber-500 to-orange-500",
                  popular: true,
                },
                {
                  name: "Platinum Plan",
                  price: "$800",
                  hours: "130",
                  features: [
                    "20 Monthly postings",
                    "20 Analytics tracking",
                    "Competitor analysis",
                    "Strategy formation & Hashtag promotion",
                    "Monthly creative creation",
                    "Account Management",
                    "Engagement with communities & groups",
                    "Network build-up",
                    "Content optimization",
                    "Paid Promotion (same features)",
                    "Remarketing (same features)",
                    "Customer support (Phone, Email)",
                    "Additional: Influencer collaboration, Paid Ads on YouTube, Lead generation campaigns",
                  ],
                  color: "from-purple-500 to-indigo-500",
                  popular: false,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 hover:bg-slate-750 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up group relative ${
                    plan.popular ? "border-blue-500/50 ring-2 ring-blue-500/20" : "hover:border-blue-500/50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-0 space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-1">/month</span>
                      </div>
                      <p className="text-blue-400 text-sm">{plan.hours} Hours</p>
                    </div>

                    <div className="space-y-3">
                      {plan.features.slice(0, 8).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-700">
                        <p className="text-blue-400 text-sm font-medium">Plus additional features...</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handlePlanSelection(plan.name, plan.price, "Social Media Optimization")}
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* PPC Services */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12 text-cyan-300 animate-fade-in-up">
              Pay-Per-Click (PPC) Advertising
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic Plan",
                  price: "$350",
                  setupFee: "Setup Fee Included",
                  features: [
                    "Free Trial: 15 Days",
                    "Advertising Budget: $0 – $2,999 / Month",
                    "Full Optimizations: 1.5 Month",
                    "Ad Groups: Up to 7",
                    "Ads per Ad Group: 4",
                    "Keywords: Up to 75",
                    "Negative Keywords",
                    "Conversion Tracking + Funnel Reporting",
                    "Monthly Reporting + Custom Dashboard",
                    "No Contracts",
                    "Ad Networks: Google, Bing",
                    "Mobile Ads + Responsive Ads",
                    "Additional: A/B testing, CRM Integration, Advanced Targeting",
                  ],
                  color: "from-green-500 to-emerald-500",
                },
                {
                  name: "Gold Plan",
                  price: "$550",
                  setupFee: "Setup Fee Included",
                  features: [
                    "Free Trial: 15 Days",
                    "Advertising Budget: $3,000 – $5,000 / Month",
                    "Full Optimizations: 2.5 Month",
                    "Ad Groups: Up to 15",
                    "Ads per Ad Group: 5",
                    "Keywords: Up to 150",
                    "Negative Keywords",
                    "Conversion Tracking + Funnel Reporting",
                    "Monthly Reporting + Custom Dashboard",
                    "No Contracts",
                    "Ad Networks: Google, Bing, Yahoo, FB",
                    "Mobile Ads + Responsive Ads",
                    "Additional: A/B testing, Lead Generation Tracking, Advanced Targeting",
                  ],
                  color: "from-yellow-500 to-amber-500",
                },
                {
                  name: "Platinum Plan",
                  price: "$800",
                  setupFee: "Setup Fee Included",
                  features: [
                    "Free Trial: 15 Days",
                    "Advertising Budget: $5,000 – $7,000 / Month",
                    "Full Optimizations: 3.5 Month",
                    "Ad Groups: Up to 25",
                    "Ads per Ad Group: 6",
                    "Keywords: Up to 300",
                    "Negative Keywords",
                    "Conversion Tracking + Funnel Reporting",
                    "Monthly Reporting + ROI Dashboard",
                    "No Contracts",
                    "Ad Networks: Google, Bing, Yahoo, FB, LinkedIn",
                    "Display / Image Ads + Video Ads + A/B Testing",
                    "Additional: CRM Integration, Advanced Targeting, Multi-channel Retargeting",
                  ],
                  color: "from-purple-500 to-pink-500",
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 hover:bg-slate-750 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up group hover:border-cyan-500/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0 space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-1">/month</span>
                      </div>
                      <p className="text-cyan-400 text-sm">{plan.setupFee}</p>
                    </div>

                    <div className="space-y-3">
                      {plan.features.slice(0, 8).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-700">
                        <p className="text-cyan-400 text-sm font-medium">Plus additional features...</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handlePlanSelection(plan.name, plan.price, "PPC Advertising")}
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SEO Services */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12 text-green-300 animate-fade-in-up">
              Search Engine Optimization (SEO)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Basic",
                  price: "$799",
                  features: [
                    "Working Hours: 60/month",
                    "Keywords: 50",
                    "Backlinks: 50/month",
                    "Landing Pages Optimization: 6",
                    "Technical SEO Enhancements",
                    "Website SEO Audit & Fixes + Advanced AI Audit",
                    "Pre-Optimization Analysis + Extended competitor mapping",
                    "Competitor Analysis & Strategy + Predictive Gap Analysis",
                  ],
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  name: "Bronze",
                  price: "$1299",
                  features: [
                    "Enhanced Basic features",
                    "More keywords & backlinks",
                    "Advanced content optimization",
                    "Local SEO enhancements",
                    "Social media integration",
                    "Monthly reporting",
                    "Priority support",
                    "Extended analysis",
                  ],
                  color: "from-amber-600 to-orange-600",
                },
                {
                  name: "Gold",
                  price: "$1699",
                  features: [
                    "All Bronze features",
                    "Advanced AI optimization",
                    "Multi-channel integration",
                    "Custom dashboard",
                    "Predictive analytics",
                    "Voice search optimization",
                    "Advanced reporting",
                    "Dedicated account manager",
                  ],
                  color: "from-yellow-500 to-amber-500",
                },
                {
                  name: "Platinum",
                  price: "$2499",
                  features: [
                    "All Gold features",
                    "Enterprise-level optimization",
                    "AI-powered insights",
                    "Custom integrations",
                    "Advanced automation",
                    "ROI tracking",
                    "White-label reporting",
                    "24/7 priority support",
                  ],
                  color: "from-purple-500 to-indigo-600",
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 hover:bg-slate-750 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up group hover:border-green-500/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0 space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-2xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-1">/month</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handlePlanSelection(plan.name, plan.price, "SEO Services")}
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* LinkedIn Services */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12 text-indigo-300 animate-fade-in-up">
              LinkedIn Marketing Services
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Bronze Plan",
                  price: "$350",
                  features: [
                    "Target audience list: 1500+",
                    "Organic posts: 5 (Personal & Business)",
                    "LinkedIn invites & InMail: Enhanced",
                    "3 level follow-up",
                    "CSV file for connections (expanded)",
                    "Smart auto-cut if client responds",
                    "Track followers, engagement, leads + advanced insights",
                    "Additional: Sales Navigator integration, LinkedIn Ads support",
                  ],
                  color: "from-blue-600 to-indigo-600",
                },
                {
                  name: "Gold Plan",
                  price: "$550",
                  features: [
                    "Target audience list: 2000+",
                    "Organic posts: 8 (Personal & Business)",
                    "LinkedIn invites & InMail: 900",
                    "3 level follow-up",
                    "CSV file for connections (expanded)",
                    "Smart auto-cut if client responds",
                    "Track followers, engagement, leads + ROI reporting",
                    "Additional: CRM integration, Influencer outreach",
                  ],
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  name: "Platinum Plan",
                  price: "$800",
                  features: [
                    "Target audience list: 2500+",
                    "Organic posts: 12 (Personal & Business)",
                    "LinkedIn invites & InMail: 1500",
                    "3 level follow-up",
                    "CSV file for connections (expanded)",
                    "Smart auto-cut if client responds",
                    "Track followers, engagement, leads + advanced ROI reporting",
                    "Additional: LinkedIn Ads management, Profile optimization, Advanced targeting",
                  ],
                  color: "from-purple-500 to-pink-500",
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 hover:bg-slate-750 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up group hover:border-indigo-500/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0 space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-1">/month</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handlePlanSelection(plan.name, plan.price, "LinkedIn Marketing")}
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Web Development Services */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-12 text-rose-300 animate-fade-in-up">
              Web Development Services
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Silver Plan",
                  price: "$400",
                  features: [
                    "Partially Custom Design – only 1 iteration",
                    "Responsive Site (Desktop, Tablet, Mobile)",
                    "WordPress / Joomla! / C5 / Drupal",
                    "Back-End User Management",
                    "GUI Admin Panel",
                    "Search Engine Friendly Structure",
                    "Conversion Forms – up to 3",
                    "Content Migration",
                    "Web Hosting",
                    "Hosted Emails – 25",
                    "Web maintenance work – 5 hours/month",
                  ],
                  color: "from-slate-500 to-gray-600",
                },
                {
                  name: "Gold Plan",
                  price: "$800",
                  features: [
                    "Custom Design – up to 2 iterations",
                    "Responsive Site (Desktop, Tablet, Mobile)",
                    "WordPress / Joomla! / C5 / Drupal / Magento / Shopify",
                    "Custom Blog",
                    "CMS Updates – up to 6 months",
                    "Social Logins",
                    "Shopping Cart",
                    "Newsletter Module",
                    "Conversion Forms – up to 7",
                    "Products Migration – up to 500",
                    "Hosted Emails – 50",
                    "Web maintenance work – 10 hours/month",
                  ],
                  color: "from-yellow-500 to-amber-500",
                },
                {
                  name: "Premium Plan",
                  price: "$1800",
                  features: [
                    "Custom Design – up to 4 iterations",
                    "New Logo Design",
                    "HTML Email Templates",
                    "Custom Framework / WordPress / Magento / Shopify",
                    "Custom Blog",
                    "CMS Updates – up to 12 months",
                    "Shopping Cart",
                    "Dealer/Affiliate Section",
                    "Google eCommerce Tracking",
                    "Conversion Forms – up to 12",
                    "Products Migration – up to 2000",
                    "Hosted Emails – 200",
                    "Web maintenance work – 25 hours/month",
                  ],
                  color: "from-purple-500 to-indigo-600",
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 hover:bg-slate-750 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up group hover:border-rose-500/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0 space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-1">/month</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan.features.slice(0, 8).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-700">
                        <p className="text-rose-400 text-sm font-medium">Plus additional features...</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handlePlanSelection(plan.name, plan.price, "Web Development")}
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}

      {/* About Us Section */}
      <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-lg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div>
                <p className="text-blue-600 font-medium mb-4">About Prits</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance animate-text-reveal">
                  We design, develop & innovate.
                </h2>
                <p className="text-muted-foreground mb-6 text-pretty">
                  At Prits, we believe in the power of exceptional design and cutting-edge technology to transform
                  businesses. Our passionate team of designers, developers, and strategists work collaboratively to
                  bring your vision to life.
                </p>
                <p className="text-muted-foreground mb-8 text-pretty">
                  From concept to launch, we ensure every project reflects our commitment to quality, innovation, and
                  user-centered design.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { number: "200+", label: "Projects Completed" },
                  { number: "5+", label: "Years Experience" },
                  { number: "99%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center animate-fade-in-up group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-2 transform group-hover:scale-110 transition-all duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-blue-600 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-up" style={{ animationDelay: "300ms" }}>
              <img
                src="/professional-male-team-working-together-in-modern-office.jpg"
                alt="Prits all-male team working together"
                className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-500 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section
        id="clients"
        className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-xl animate-pulse-subtle" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-lg animate-float-gentle" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-md animate-float-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-blue-600 font-medium mb-4">Our Clients</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance animate-text-reveal">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                industry leaders
              </span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-pretty text-lg">
              We've partnered with forward-thinking companies across various industries to deliver exceptional digital
              solutions that drive growth and innovation.
            </p>
          </div>

          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[
                { name: "Google", color: "from-red-500 to-yellow-500" },
                { name: "Microsoft", color: "from-blue-500 to-cyan-500" },
                { name: "Apple", color: "from-gray-600 to-gray-800" },
                { name: "Amazon", color: "from-orange-500 to-yellow-500" },
                { name: "Meta", color: "from-blue-600 to-indigo-600" },
                { name: "Netflix", color: "from-red-600 to-red-800" },
                { name: "Spotify", color: "from-green-500 to-green-600" },
                { name: "Uber", color: "from-gray-800 to-black" },
                { name: "Airbnb", color: "from-pink-500 to-red-500" },
                { name: "Tesla", color: "from-red-600 to-red-700" },
                { name: "Adobe", color: "from-red-500 to-pink-500" },
                { name: "Slack", color: "from-purple-500 to-indigo-500" },
              ].map((client, index) => (
                <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-20 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center transform hover:scale-110 hover:shadow-2xl transition-all duration-500 group-hover:border-blue-200 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Client logo/name */}
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <span className="text-gray-700 font-bold text-lg group-hover:text-gray-900 transition-colors duration-300">
                        {client.name}
                      </span>
                    </div>

                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground animate-fade-in-up">
              What our clients say about us
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO, TechStart",
                  company: "Google",
                  content:
                    "Prits transformed our digital presence completely. Their innovative approach and attention to detail resulted in a 300% increase in user engagement. The team's expertise in both design and development is unmatched.",
                  rating: 5,
                  avatar: "SJ",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  name: "Michael Chen",
                  role: "Product Manager, InnovateCorp",
                  company: "Microsoft",
                  content:
                    "Working with Prits was a game-changer for our product launch. They delivered a stunning platform that not only looks amazing but performs flawlessly. Our conversion rates improved by 250%.",
                  rating: 5,
                  avatar: "MC",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Marketing Director, GrowthCo",
                  company: "Amazon",
                  content:
                    "The Prits team exceeded every expectation. Their strategic approach to our digital marketing campaigns resulted in unprecedented growth. They're true partners in our success story.",
                  rating: 5,
                  avatar: "ER",
                  color: "from-purple-500 to-indigo-500",
                },
                {
                  name: "David Kim",
                  role: "Founder, StartupX",
                  company: "Meta",
                  content:
                    "Prits didn't just build us a website; they crafted a digital experience that perfectly represents our brand. The ROI has been incredible, and our customers love the new platform.",
                  rating: 5,
                  avatar: "DK",
                  color: "from-orange-500 to-red-500",
                },
                {
                  name: "Lisa Thompson",
                  role: "VP of Digital, RetailCorp",
                  company: "Tesla",
                  content:
                    "The level of professionalism and creativity from Prits is outstanding. They transformed our e-commerce platform, resulting in a 400% increase in online sales within the first quarter.",
                  rating: 5,
                  avatar: "LT",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  name: "James Wilson",
                  role: "CTO, FinanceFlow",
                  company: "Apple",
                  content:
                    "Prits delivered a complex financial platform that handles millions of transactions seamlessly. Their technical expertise and innovative solutions have been instrumental to our growth.",
                  rating: 5,
                  avatar: "JW",
                  color: "from-cyan-500 to-blue-500",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <CardContent className="p-0 space-y-6 relative z-10">
                    {/* Rating stars */}
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>

                    {/* Testimonial content */}
                    <p className="text-muted-foreground italic text-pretty leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      "{testimonial.content}"
                    </p>

                    {/* Client info */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-blue-600 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 animate-fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Impact in Numbers</h3>
              <p className="text-muted-foreground">Real results that speak for themselves</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Projects Delivered", icon: "🚀", color: "from-blue-500 to-cyan-500" },
                { number: "98%", label: "Client Satisfaction", icon: "⭐", color: "from-green-500 to-emerald-500" },
                { number: "250%", label: "Average ROI Increase", icon: "📈", color: "from-purple-500 to-indigo-500" },
                { number: "24/7", label: "Support Available", icon: "🛟", color: "from-orange-500 to-red-500" },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                  >
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {metric.number}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-gray-700 transition-colors duration-300">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float-gentle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 8}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slide-up">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance animate-text-reveal">
                  Ready to start your project?
                </h2>
                <p className="text-muted-foreground text-pretty">
                  Let's collaborate to bring your vision to life. Get in touch with Prits today and discover how we can
                  transform your ideas into exceptional digital experiences.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <Users className="w-6 h-6 text-blue-600" />,
                    title: "Expert Team",
                    desc: "Skilled professionals dedicated to your success",
                    bg: "bg-blue-100",
                  },
                  {
                    icon: <Award className="w-6 h-6 text-cyan-600" />,
                    title: "Quality Assured",
                    desc: "Premium results that exceed expectations",
                    bg: "bg-cyan-100",
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-indigo-600" />,
                    title: "Fast Delivery",
                    desc: "Efficient processes without compromising quality",
                    bg: "bg-indigo-100",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 animate-fade-in-up group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card
              className="p-8 animate-slide-up transform hover:shadow-2xl transition-all duration-500 border-blue-200 hover:border-blue-400"
              style={{ animationDelay: "300ms" }}
            >
              <CardContent className="p-0">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <Input
                        placeholder="John Doe"
                        className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      className="transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      className="min-h-[120px] transform focus:scale-105 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold">Prits</span>
              </div>
              <p className="text-slate-300 text-sm text-pretty">
                Creating exceptional digital experiences that inspire, engage, and drive success for businesses
                worldwide.
              </p>
            </div>

            {[
              { title: "Services", links: ["UI/UX Design", "Development", "Digital Marketing", "Brand Strategy"] },
              { title: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
              { title: "Connect", links: ["Twitter", "LinkedIn", "Instagram", "Dribbble"] },
            ].map((column, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <h4 className="font-semibold mb-4 text-blue-300">{column.title}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="hover:text-blue-300 transition-all transform hover:translate-x-1 inline-block duration-300 hover:scale-105"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-t border-slate-800 mt-12 pt-8 text-center animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            <p className="text-slate-400 text-sm">© 2025 Prits. All rights reserved. Crafted with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
