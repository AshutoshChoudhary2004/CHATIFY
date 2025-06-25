import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import RequireAuthentication from "./components/RequireAuthentication";
import RequireAuthorization from "./components/RequireAuthorization";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";
import SignInPage from "./components/SignInPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback/*" element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"}/>} />
        <Route path="/sign-in-user" element={<SignInPage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuthorization>
              <AdminPage />
            </RequireAuthorization>
          }
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/chat"
            element={
              <RequireAuthentication>
                <ChatPage />
              </RequireAuthentication>
            }
          />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
