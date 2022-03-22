import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "components/header/Header";
import css from "./layout.css";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export { Layout };
