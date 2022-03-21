import React from "react";
import { SearchForm } from "../search-form/SearchForm";
import { Outlet } from "react-router-dom";
import css from "./layout.css";

function Layout() {
  return (
    <>
      <header className={css.header}>
        <div className={css["header-content"]}>
          <SearchForm></SearchForm>
        </div>
      </header>

      <Outlet />
    </>
  );
}

export { Layout };
