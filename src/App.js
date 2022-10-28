import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import AdminLogin from "./admin/AdminLogin";
import CharacterEdit from "./admin/charEdit/CharacterEdit";
import MoveEdit from "./admin/moveEdit/MoveEdit";
import StanceEdit from "./admin/stanceEdit/StanceEdit";
import ComboEdit from "./admin/comboEdit/ComboEdit";
import Layout from "./Layout";
import Legend from "./legend/Legend";
import Roster from "./Roster";
import Search from "./search/Search";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CharacterPage from "./charPage/CharacterPage";
import CharPageHome from "./charPage/CharPageHome";
import CharPageMovelist from "./charPage/CharPageMovelist";
import CharPageStances from "./charPage/CharPageStances";
import CharPageCombos from "./charPage/CharPageCombos";
import CharPagePunishers from "./charPage/CharPagePunishers";
import TierList from "./tierList/TierList";
import CharResultsSkeleton from "./search/CharResultsSkeleton";

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
              <Route path="/tier" element={<TierList />} />
              <Route path="/characters/:charID" element={<CharacterPage />}>
                <Route path="home" element={<CharPageHome />} />
                <Route path="moves" element={<CharPageMovelist />} />
                <Route path="stances" element={<CharPageStances />} />
                <Route path="combos" element={<CharPageCombos />} />
                <Route path="punishers" element={<CharPagePunishers />} />
              </Route>
              <Route path="/admin" element={<AdminLogin />}>
                <Route path="home" element={<AdminHome />} />
                <Route path="characters/:charID" element={<CharacterEdit />} />
                <Route
                  path="characters/:charID/moves/:moveID"
                  element={<MoveEdit />}
                />
                <Route
                  path="characters/:charID/stances/:stanceID"
                  element={<StanceEdit />}
                />
                <Route
                  path="characters/:charID/combos/:comboID"
                  element={<ComboEdit />}
                />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default App;
