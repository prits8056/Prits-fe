// components/TestimonialForm.tsx
"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  avatar: Yup.string().url("Invalid URL"),
});

export default function TestimonialForm({ initialValues, onSubmit }: { initialValues: any; onSubmit: (values: any) => void }) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <Field as={Input} name="name" />
          <ErrorMessage name="name" component="p" className="text-red-500" />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <Field as={Input} name="role" />
          <ErrorMessage name="role" component="p" className="text-red-500" />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <Field as={Input} name="company" />
          <ErrorMessage name="company" component="p" className="text-red-500" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <Field as={Textarea} name="content" />
          <ErrorMessage name="content" component="p" className="text-red-500" />
        </div>
        <div>
          <label htmlFor="avatar">Avatar URL</label>
          <Field as={Input} name="avatar" />
          <ErrorMessage name="avatar" component="p" className="text-red-500" />
        </div>
        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}