import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminLogin from "./AdminLogin";
import Layout from "./Layout";
import Legend from "./Legend";
import Roster from "./Roster";
import Search from "./Search";

//Layout component ensures header is rendered above the current component
const App = () => {
  return (
    <StrictMode>
      <Auth0Provider
        domain="dev-0aljb7b7.us.auth0.com"
        clientId="x1YRgzozlH77fRaSMlWdgYIr3UOU5XMc"
        redirectUri={`${window.location.origin}/admin/home`}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Roster />} />
              <Route path="/legend" element={<Legend />} />
              <Route path="/search" element={<Search />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/home" element={<AdminHome />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </StrictMode>
  );
};

export default App;
