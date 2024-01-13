import React, { ReactNode } from "react";
import  Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout = (props: { children: ReactNode }) => (
  <div>
    <Navbar/>
    <div className="px-8 py-0">{props.children}</div>
  </div>
);

export default Layout;
