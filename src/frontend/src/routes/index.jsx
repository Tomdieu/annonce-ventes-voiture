import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "../pages/auth/login";
import DashboardPage from "../pages/dashboard";
import MarquesPage from "../pages/dashboard/marque";
import ModelesPage from "../pages/dashboard/modele";
import Voitures from "../pages/dashboard/voiture";
// import { useAuth } from "../context/AuthContext";

// Example function to check if the user token exists
const checkUserTokenExists = () => {
  // Replace this with your own logic to check if the user token exists
  const AuserToken = localStorage.getItem("AuserToken")
  return !!AuserToken;
};


const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const userTokenExists = checkUserTokenExists();
  if (!userTokenExists) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login/" element={<Login />} />

          <Route path="dashboard/" element={<ProtectedRoute />}>
            <Route path="" element={<DashboardPage />} />
            <Route path="marque/" element={<MarquesPage />} />
            <Route path="modele/" element={<ModelesPage />} />
            <Route path="voiture/" element={<Voitures />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
