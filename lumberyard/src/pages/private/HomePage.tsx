import { async } from "@firebase/util";
import React, { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useAuth } from "../../hooks/useAuth";
import { fetcher, getUrl } from "../../util/fetch";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [{ authLoaded, user }] = useAuth();

  const { data } = useSWR(
    "/user",
    fetcher({ method: "GET", bearer: user?.getIdToken() })
  );

  const createUser = async () => {
    const fetch = fetcher({
      bearer: user?.getIdToken(),
      method: "POST",
    });

    fetch("/user");
  };

  return (
    <div>
      Auth
      <div>{JSON.stringify(data)}</div>
      <button onClick={createUser}>Create user!</button>
    </div>
  );
};

export default HomePage;
