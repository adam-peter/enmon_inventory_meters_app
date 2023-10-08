import { Button } from "@/components/ui/button";
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="headingGradient h-max scroll-m-20 text-center font-inter text-3xl font-extrabold tracking-tight sm:-mt-16 sm:text-4xl lg:text-5xl">
        Enmon Inventory Meters App
      </h1>
      <h2 className="mb-5 mt-3 scroll-m-20 text-center font-semibold tracking-tight sm:text-2xl">
        by Adam Petržela
      </h2>
      {loggedIn ? (
        <Button onClick={() => navigate("/inventory-meters")} className="mt-5">
          Explore the App
        </Button>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default MainPage;
