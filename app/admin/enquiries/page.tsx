// app/admin/enquiries/page.tsx
"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  status: string;
};

const columns: ColumnDef<Enquiry>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "submittedAt", header: "Submitted At" },
  { accessorKey: "status", header: "Status" },
];

export default function Enquiries() {
  const [data, setData] = useState<Enquiry[]>([]);

  useEffect(() => {
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Enquiries</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}