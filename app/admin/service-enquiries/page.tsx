// app/admin/service-enquiries/page.tsx
"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type ServiceEnquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  plan: { name: string; price: string; type: string };
  submittedAt: string;
  status: string;
};

const columns: ColumnDef<ServiceEnquiry>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "plan.name", header: "Plan Name" },
  { accessorKey: "plan.price", header: "Plan Price" },
  { accessorKey: "plan.type", header: "Plan Type" },
  { accessorKey: "submittedAt", header: "Submitted At" },
  { accessorKey: "status", header: "Status" },
];

export default function ServiceEnquiries() {
  const [data, setData] = useState<ServiceEnquiry[]>([]);

  useEffect(() => {
    fetch("/api/service-enquiries")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Service Enquiries</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}