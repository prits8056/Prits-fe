"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  PlusCircle,
  Trash2,
  LogOut,
  ExternalLink,
} from "lucide-react"
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

export default function AdminDashboard() {
  const router = useRouter()
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    // Load data
    loadContactSubmissions()
    loadTestimonials()
  }, [router])

  const loadContactSubmissions = () => {
    const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
    setContactSubmissions(submissions)
  }

  const loadTestimonials = () => {
    const testimonialData = JSON.parse(localStorage.getItem("testimonials") || "[]")
    setTestimonials(testimonialData)
  }

  const updateSubmissionStatus = (id: string, status: "new" | "contacted" | "closed") => {
    const updatedSubmissions = contactSubmissions.map((submission) =>
      submission.id === id ? { ...submission, status } : submission,
    )
    setContactSubmissions(updatedSubmissions)
    localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions))
  }

  const deleteSubmission = (id: string) => {
    const updatedSubmissions = contactSubmissions.filter((submission) => submission.id !== id)
    setContactSubmissions(updatedSubmissions)
    localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions))
    setSelectedSubmission(null)
  }

  const toggleTestimonialStatus = (id: string) => {
    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === id ? { ...testimonial, isActive: !testimonial.isActive } : testimonial,
    )
    setTestimonials(updatedTestimonials)
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials))
  }

  const deleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id)
    setTestimonials(updatedTestimonials)
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials))
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />
      case "contacted":
        return <Eye className="w-4 h-4" />
      case "closed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  // Calculate statistics
  const stats = {
    totalSubmissions: contactSubmissions.length,
    newSubmissions: contactSubmissions.filter((s) => s.status === "new").length,
    totalTestimonials: testimonials.length,
    activeTestimonials: testimonials.filter((t) => t.isActive).length,
    recentSubmissions: contactSubmissions.filter((s) => {
      const submittedDate = new Date(s.submittedAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return submittedDate > weekAgo
    }).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Prits Admin</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank">
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Website</span>
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/testimonials">
              <Button className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Add Testimonial</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <ExternalLink className="w-4 h-4" />
                <span>View Contact Form</span>
              </Button>
            </Link>
            <Link href="/#testimonials" target="_blank">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Star className="w-4 h-4" />
                <span>View Live Testimonials</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.newSubmissions}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Testimonials</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeTestimonials}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.recentSubmissions}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inquiries">Contact Inquiries</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Contact Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Inquiries List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Contact Inquiries</span>
                      <Badge variant="secondary">{contactSubmissions.length} total</Badge>
                    </CardTitle>
                    <CardDescription>Manage customer inquiries and plan selections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contactSubmissions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No inquiries yet</p>
                          <p className="text-sm mt-2">Customers can submit inquiries through the contact form</p>
                          <Link href="/contact">
                            <Button className="mt-4 bg-transparent" variant="outline">
                              View Contact Form
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        contactSubmissions.map((submission) => (
                          <div
                            key={submission.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                              selectedSubmission?.id === submission.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-semibold text-gray-900">{submission.name}</h3>
                                  <Badge className={getStatusColor(submission.status)}>
                                    <div className="flex items-center space-x-1">
                                      {getStatusIcon(submission.status)}
                                      <span className="capitalize">{submission.status}</span>
                                    </div>
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                                <p className="text-sm text-blue-600 font-medium">{submission.selectedPlan}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(submission.submittedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">{submission.planPrice}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Inquiry Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Inquiry Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSubmission ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{selectedSubmission.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{selectedSubmission.email}</span>
                            </div>
                            {selectedSubmission.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{selectedSubmission.phone}</span>
                              </div>
                            )}
                            {selectedSubmission.company && (
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span>{selectedSubmission.company}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{new Date(selectedSubmission.submittedAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Selected Plan</h4>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-medium text-blue-900">{selectedSubmission.selectedPlan}</p>
                            <p className="text-blue-700">{selectedSubmission.planPrice}/month</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {selectedSubmission.message}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Actions</h4>
                          <div className="flex flex-col space-y-2">
                            <Button
                              size="sm"
                              variant={selectedSubmission.status === "contacted" ? "default" : "outline"}
                              onClick={() => updateSubmissionStatus(selectedSubmission.id, "contacted")}
                            >
                              Mark as Contacted
                            </Button>
                            <Button
                              size="sm"
                              variant={selectedSubmission.status === "closed" ? "default" : "outline"}
                              onClick={() => updateSubmissionStatus(selectedSubmission.id, "closed")}
                            >
                              Mark as Closed
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteSubmission(selectedSubmission.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Select an inquiry to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Testimonials Management</span>
                  <div className="flex items-center space-x-2">
                    <Link href="/admin/testimonials">
                      <Button className="flex items-center space-x-2">
                        <PlusCircle className="w-4 h-4" />
                        <span>Add New</span>
                      </Button>
                    </Link>
                    <Link href="/#testimonials" target="_blank">
                      <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Live</span>
                      </Button>
                    </Link>
                  </div>
                </CardTitle>
                <CardDescription>Manage customer testimonials displayed on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No testimonials yet</p>
                      <p className="text-sm mt-2">Add testimonials to showcase customer feedback on your website</p>
                      <Link href="/admin/testimonials">
                        <Button className="mt-4">Add First Testimonial</Button>
                      </Link>
                    </div>
                  ) : (
                    testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                              <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                                {testimonial.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <div className="flex items-center">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {testimonial.role} at {testimonial.company}
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-2">{testimonial.content}</p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => toggleTestimonialStatus(testimonial.id)}>
                              {testimonial.isActive ? "Deactivate" : "Activate"}
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteTestimonial(testimonial.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
