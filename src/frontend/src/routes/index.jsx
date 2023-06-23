import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login/" element={<Login />} />

          {/* <Route path='register/'></Route>
            <Route path='dashboard/'>
            
            <Route path=''></Route>
        </Route> */}
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
