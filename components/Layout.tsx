import React, { ReactNode } from "react";
import  Navbar from "./Navbar";
import Footer from "./Footer";


type Props = {
  children: ReactNode;
};

const Layout = (props: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="px-8 py-2 flex-grow ">{props.children}</div>
      <Footer/>
  </div>
);

export default Layout;
