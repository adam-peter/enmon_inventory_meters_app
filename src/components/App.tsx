import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import MainPage from "../pages/mainpage";
import InventoryMeters from "../pages/inventory-meters";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="inventory-meters" element={<InventoryMeters />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
