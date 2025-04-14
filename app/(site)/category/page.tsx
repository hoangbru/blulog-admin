import { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSection from "@/components/breadcrumb-section";
import { Button } from "@/components/ui/button";
import CategoryList from "./_components/category-list";

export const metadata: Metadata = {
  title: "Category Management",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function Category() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadcrumbSection metaTitle={metadata.title} />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Category Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button><Link href={"/category/add"}>Add New Category</Link></Button>
        </div>
      </div>
      <CategoryList />
    </div>
  );
}
