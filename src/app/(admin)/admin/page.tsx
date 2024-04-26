import React from "react";
import dynamic from "next/dynamic";
import { isAdmin } from "@/lib/isAdmin";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  if (!isAdmin()) redirect("/");

  return <App />;
};

export default AdminPage;
