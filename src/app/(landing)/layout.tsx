import React from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default LandingLayout;
