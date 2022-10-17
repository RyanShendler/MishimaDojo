import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import AdminLogin from "./admin/AdminLogin";
import CharacterEdit from "./admin/charEdit/CharacterEdit";
import MovelistEdit from "./admin/moveEdit/MovelistEdit";
import StanceEdit from "./admin/stanceEdit/StanceEdit";
import ComboEdit from "./admin/comboEdit/ComboEdit";
import Layout from "./Layout";
import Legend from "./Legend";
import Roster from "./Roster";
import Search from "./Search";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

//Layout component ensures header is rendered above the current component
const App = () => {
  return (
    <Auth0Provider
      domain="dev-0aljb7b7.us.auth0.com"
      clientId="x1YRgzozlH77fRaSMlWdgYIr3UOU5XMc"
      redirectUri={`${window.location.origin}/admin/home`}
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Roster />} />
              <Route path="/legend" element={<Legend />} />
              <Route path="/search" element={<Search />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route
                path="/admin/characters/:charID"
                element={<CharacterEdit />}
              />
              <Route
                path="/admin/characters/:charID/moves/:moveID"
                element={<MovelistEdit />}
              />
              <Route
                path="/admin/characters/:charID/stances/:stanceID"
                element={<StanceEdit />}
              />
              <Route
                path="/admin/characters/:charID/combos/:comboID"
                element={<ComboEdit />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default App;
