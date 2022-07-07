import React from "react";
import { Route, useParams, Switch } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import UserEditPage from "../components/page/userPage/userEditPage";
const Users = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <>
      <Switch>
        <Route
          path={`/users/:${userId}/edit`}
          render={() => <UserEditPage userId={userId} />}
        />
        <Route
          path={`/users/:${userId}`}
          render={() => <UserPage userId={userId} />}
        />
        <Route path="/users" component={UsersListPage} />
      </Switch>
    </>
  );
};

export default Users;
