import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import CreateSnippet from "./pages/CreateSnippet.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditSnippet from "./pages/EditSnippet.jsx";
import Register from "./pages/Register.jsx";
import SnippetDetails from "./pages/SnippetDetails.jsx";

import PublicRoute from "./components/PublicRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Layout from "./components/Layout.jsx";
import SnippetForm from "./components/SnippetForm.jsx";
import Favourites from "./pages/Favourites.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create" element={<SnippetForm isEdit={false} />} />

        <Route path="/edit/:id" element={<SnippetForm isEdit={true} />} />

        <Route path="/snippets/favourites" element={<Favourites />} />
        
        <Route path="/snippet/:id" element={<SnippetDetails />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
