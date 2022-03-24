import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "components/layout/Layout";
import { Home } from "pages/home/Home";

import { LoginPage } from "pages/login/LoginPage";
import { LoginPasswordPage } from "pages/login-password/LoginPasswordPage";

import { EditProfilePage } from "pages/edit-profile/EditProfilePage";
import { UserPetsPage } from "pages/user-pets/UserPetsPage";
import { PetDataPage } from "pages/pet-data/PetDataPage";
import { SignUpPage } from "pages/sign-up/SignUp";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="login/password" element={<LoginPasswordPage />} />

          <Route path="edit-profile" element={<EditProfilePage />} />

          <Route path="sign-up" element={<SignUpPage />} />

          <Route path="user-pets" element={<UserPetsPage />} />

          <Route path="pet-data" element={<PetDataPage />} />
        </Route>
      </Routes>
    </>
  );
}

export { AppRouter };
