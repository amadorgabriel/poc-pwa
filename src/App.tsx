import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const HomePage = React.lazy(() => import("./pages/Home"));
const ScopePage = React.lazy(() => import("./pages/Scopes"));
const CreateScopePage = React.lazy(() => import("./pages/Scopes/Create"));
const AttendancePage = React.lazy(() => import("./pages/Attendance"));
const OfflinePage = React.lazy(() => import("./pages/Offline"));

// import HomePage from "./pages/Home";
// import ScopePage from "./pages/Scopes";
// import CreateScopePage from "./pages/Scopes/Create";
// import AttendancePage from "./pages/Attendance";
// import OfflinePage from "./pages/Offline";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "scopes",
    children: [
      {
        index: true,
        element: <ScopePage />,
      },
      {
        path: "create",
        element: <CreateScopePage />,
      },
    ],
  },
  {
    path: "attendance/:id",
    children: [
      {
        index: true,
        element: <AttendancePage />,
      },
    ],
  },
  {
    path: "offline",
    element: <OfflinePage />,
  },
  {
    path: "*",
    element: <p>Not Found :(</p>,
  },
]);

export const App = () => {
  window.addEventListener("online", () => {
    window.location.reload();
  });

  return (
    <div className="container">
      <div className="content">
        <Suspense fallback={<p>Loading..</p>}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
