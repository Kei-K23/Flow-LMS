import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      {children}
    </div>
  );
};

export default AuthLayout;
