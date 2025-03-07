import { Routes, Route } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import { ProtectedRoute } from "./protected-route";

import Protected from "./protected";
import Loading from "./loading";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="login/callback"
        element={<LoginCallback loadingElement={<Loading />} />}
      />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="" element={<Protected />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
