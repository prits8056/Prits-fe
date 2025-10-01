// app/admin/testimonials/page.tsx
"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import TestimonialForm from "@/components/TestimonialForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
};

const columns: ColumnDef<Testimonial>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "content", header: "Content" },
  { accessorKey: "avatar", header: "Avatar" },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="space-x-2">
        <Button onClick={() => row.original._id && handleEdit(row.original)}>Edit</Button>
        <Button variant="destructive" onClick={() => row.original._id && handleDelete(row.original._id)}>
          Delete
        </Button>
      </div>
    ),
  },
];

let handleEdit: (testimonial: Testimonial) => void;
let handleDelete: (id: string) => void;

export default function Testimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then(setData);
  };

  handleEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setIsOpen(true);
  };

  handleDelete = async (id: string) => {
    await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const handleSubmit = async (values: any) => {
    if (editing) {
      await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } else {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    }
    setIsOpen(false);
    setEditing(null);
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Testimonials</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white" onClick={() => setEditing(null)}>
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <TestimonialForm initialValues={editing || { name: "", role: "", company: "", content: "", avatar: "" }} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}