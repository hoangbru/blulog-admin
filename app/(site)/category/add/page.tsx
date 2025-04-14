import { Metadata } from "next";

import BreadcrumbSection from "@/components/breadcrumb-section";
import { CategoryFormAdd } from "./_components/category-form-add";

export const metadata: Metadata = {
  title: "Add New Category",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function CategoryAdd() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadcrumbSection metaTitle={metadata.title} />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add New Category</h2>
      </div>
      <CategoryFormAdd />
    </div>
  );
}
