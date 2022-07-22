import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
  console.log(QualitiesProvider);
  return (
    <div>
      <NavBar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/users/:userId?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
