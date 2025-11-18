// app/terms/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function TermsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "clients", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "clients", label: "Our Clients" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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

      {/* Main Content */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 relative overflow-hidden">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: November 12, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Prits ("we", "our", or "us"). These Terms and Conditions ("Terms") govern your use of our website (the "Site") and any services provided by Prits (the "Services"). By accessing or using the Site or Services, you agree to be bound by these Terms. If you do not agree, please do not use the Site or Services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Prits is a digital agency specializing in web development, SEO, PPC, SMO, and LinkedIn marketing services. We are committed to delivering high-quality digital solutions tailored to your business needs.
            </p>
          </section>

          {/* Services */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">2. Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We provide a range of digital services including, but not limited to, Social Media Optimization (SMO), Pay-Per-Click (PPC) Advertising, Search Engine Optimization (SEO), LinkedIn Marketing Services (LMS), and Web Development Services (WDS). Details of each service plan are outlined on our Site.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Services are delivered as per the selected plan and any agreed-upon project scope.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Any changes to the scope must be agreed upon in writing and may incur additional fees.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>We reserve the right to refuse or terminate services if they violate applicable laws or our policies.</span>
              </li>
            </ul>
          </section>

          {/* Payments */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">3. Payments</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All payments are due in advance unless otherwise agreed. Pricing is as displayed on the Site and may be subject to change with notice.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>We accept payments via credit card, bank transfer, or other methods specified at checkout.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Late payments may incur a 1.5% monthly interest fee. Services may be suspended until payment is received.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>All fees are non-refundable except as required by law or our refund policy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>For ongoing services (e.g., monthly plans), subscriptions auto-renew unless canceled 7 days prior to renewal.</span>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All materials provided by us, including designs, code, strategies, and reports, remain our intellectual property until full payment is received.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Upon full payment, you receive a limited, non-exclusive license to use the deliverables for your business purposes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>You grant us a limited license to use your materials for service delivery and portfolio showcasing (with permission).</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>We retain rights to reuse non-client-specific methodologies and templates.</span>
              </li>
            </ul>
          </section>

          {/* Confidentiality */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">5. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Both parties agree to keep confidential any proprietary information disclosed during the engagement.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Confidential information includes business strategies, client data, and trade secrets.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Obligations survive termination of services for 2 years.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Exceptions: Information already public or required by law.</span>
              </li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">6. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Either party may terminate services with 30 days' written notice. Immediate termination is possible for material breach.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>Upon termination, you must pay for services rendered to date.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>We will deliver any completed work upon final payment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>No refunds for prepaid services beyond pro-rated unused portions.</span>
              </li>
            </ul>
          </section>

          {/* Liability */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">7. Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our liability is limited to the fees paid for the specific service. We are not liable for indirect, consequential, or punitive damages.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>No guarantees of specific results (e.g., rankings, conversions) due to external factors.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>You are responsible for providing accurate information and access to necessary accounts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span>We are not liable for third-party actions or platform changes affecting services.</span>
              </li>
            </ul>
          </section>
            {/* Governing Law */}
            <section className="mb-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">8. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                    These Terms are governed by the laws of the jurisdiction in which Prits operates, without regard to its conflict of law principles. Any disputes arising from these Terms or the services will be resolved in the appropriate courts of that jurisdiction.
                </p>
            </section>
        </div>
      </section>
    </div>
  );
}