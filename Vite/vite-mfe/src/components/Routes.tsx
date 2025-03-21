import { Routes, Route } from "react-router-dom";

import Protected from "./protected";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Protected />} />
    </Routes>
  );
};

export default AppRoutes;
