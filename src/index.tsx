import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "router/router";
import { Loader } from "ui/loader/Loader";
import { RecoilRoot } from "recoil";
import "./index.css";


ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>,
  document.getElementById("root")
);
