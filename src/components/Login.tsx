import { useEffect, useState } from "react";
import { getAuthData } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { queryClient } from "@/main";
import { Skeleton } from "./ui/skeleton";

const Login = () => {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [identifier, setIdentifier] = useState<string>();
  const [password, setPassword] = useState<string>();

  const {
    data: authData,
    isFetching: authIsFetching,
    isError: authIsError,
    ...authQuery
  } = useQuery({
    queryKey: ["auth"],
    enabled: isFetching,
    queryFn: () => getAuthData(identifier, password),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFetching(true);
  };

  useEffect(() => {
    queryClient.resetQueries(["auth"]);
  }, []);

  useEffect(() => {
    if (authData) {
      dispatch(login(authData));
      queryClient.setQueryData(["auth"], null);
      setIsFetching(false);
      setIdentifier(null);
      setPassword(null);
    }
  }, [authData]);

  if (authIsFetching) return <Skeleton className="mt-5 h-[40px] w-[139px]" />;

  if (authIsError) {
    console.log(authQuery.error);
    return <div>Authentication error. Try again.</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="items-end gap-4 sm:-ml-20 sm:mt-5 sm:flex"
    >
      <div className="flex flex-col gap-4 sm:gap-2">
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:justify-between sm:gap-2">
          <Label
            htmlFor="email"
            className="sm:text-md ml-5 w-full text-sm sm:ml-0 sm:text-right"
          >
            Email
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="Identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:justify-between sm:gap-2">
          <Label
            htmlFor="password"
            className="sm:text-md ml-5 w-full text-sm sm:ml-0 sm:text-right"
          >
            Password
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={authIsFetching}
        className="mt-4 w-full sm:aspect-square sm:h-full"
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
