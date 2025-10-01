// app/admin/dashboard/page.tsx
"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Enquiries</h2>
            <Link href="/admin/enquiries">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">View</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Service Enquiries</h2>
            <Link href="/admin/service-enquiries">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">View</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
            <Link href="/admin/testimonials">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">Manage</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}