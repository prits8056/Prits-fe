// components/AdminNavbar.tsx
"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin/dashboard" className="text-xl font-bold">Prits Admin</Link>
        <div className="space-x-4">
          <Link href="/admin/enquiries">Enquiries</Link>
          <Link href="/admin/service-enquiries">Service Enquiries</Link>
          <Link href="/admin/testimonials">Testimonials</Link>
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
        </div>
      </div>
    </nav>
  );
}