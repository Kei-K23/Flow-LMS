import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="w-7 h-7 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
