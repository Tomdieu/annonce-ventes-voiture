import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/auth/login";
import DashboardPage from "./pages/dashboard";
import MarquesPage from "./pages/dashboard/marque";
import ModelesPage from "./pages/dashboard/modele";
import VoituresPage from "./pages/dashboard/voiture";
import AnnoncePage from "./pages/dashboard/annonce";
import VoitureView from "./pages/dashboard/voiture/vehicle";
import IndexPage from "./pages";
import ContactPage from "./pages/contact";
import HomePage from "./pages/home";

// Example function to check if the user token exists
const checkUserTokenExists = () => {
  // Replace this with your own logic to check if the user token exists
  const AuserToken = localStorage.getItem("AuserToken");
  return !!AuserToken;
};

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
  children,
}) => {
  const userTokenExists = checkUserTokenExists();
  if (!userTokenExists) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/contact/" element={<ContactPage/>} />
        <Route path="/annonces/" element={<IndexPage/>} />

        <Route path="/dashboard/" element={<ProtectedRoute />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="marque/" element={<MarquesPage />} />
          <Route path="modele/" element={<ModelesPage />} />
          <Route path="voiture/" element={<VoituresPage />} />
          <Route path="voiture/:id/" element={<VoitureView />} />
          <Route path="annonce/" element={<AnnoncePage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
