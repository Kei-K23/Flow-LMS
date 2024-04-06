import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b border-b-slate-200 h-12 ">
      <nav className="h-full">
        <Link href={"/"}>Flow</Link>
      </nav>
    </header>
  );
};

export default Header;
