import Navbar from "@/components/shared/Navbar";
import React from "react";

const PublicLayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayoutPage;
