import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getSessionToken } from "../LocalStorage";

const Login = React.lazy(() => import("../../pages/signIn"));
const SignUp = React.lazy(() => import("../../pages/signUp"));

export function RenderRoutes({ routes }: { routes: any[] }) {
  const token = getSessionToken();

  return (
    <React.Suspense fallback={<Spinner animation="border" role="status" />}>
      <Routes>
        <Route
          path="/sign-in"
          element={!token ? <Login /> : <p>you already logged in</p>}
        />
        <Route
          path="/sign-up"
          element={!token ? <SignUp /> : <p>you already logged in</p>}
        />
        {routes?.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              token ? (
                <route.component {...route} />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          />
        ))}
        <Route
          path="/*"
          element={
            !token ? <Navigate to="/sign-in" /> : <h1>page not found, 404!</h1>
          }
        />
      </Routes>
    </React.Suspense>
  );
}
