import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard"
import Marques from "../pages/dashboard/marque"
import Modeles from "../pages/dashboard/modele"
import Voitures from "../pages/dashboard/voiture"



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login/" element={<Login />} />

          <Route path="dashboard/" >
            <Route path="" element={<Dashboard />} />
            <Route path="marque/" element={<Marques />} />
            <Route path="modele/" element={<Modeles />} />
            <Route path="voiture/" element={<Voitures/>} />
            
          </Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
