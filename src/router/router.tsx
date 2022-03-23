import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "components/layout/Layout";
import { Home } from "pages/home/Home";

import { LoginPage } from "pages/login/LoginPage";
import { LoginPasswordPage } from "pages/login-password/LoginPasswordPage";

import { UserDataPage } from "pages/user-data/UserDataPage";
import { UserPetsPage } from "pages/user-pets/UserPetsPage";
import { PetDataPage } from "pages/pet-data/PetDataPage";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="login/password" element={<LoginPasswordPage />} />

          <Route path="user-data" element={<UserDataPage />} />

          <Route path="user-pets" element={<UserPetsPage />} />

          <Route path="pet-data" element={<PetDataPage />} />
        </Route>
      </Routes>
    </>
  );
}

export { AppRouter };
