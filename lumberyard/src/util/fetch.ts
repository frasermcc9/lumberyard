import { getAuth } from "@firebase/auth";

interface FetcherArgs {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
  bearer?: Promise<string>;
}

const fetcher = ({
  method = "GET",
  body = undefined,
  headers = {},
  bearer = getAuth().currentUser?.getIdToken(),
}: FetcherArgs = {}) => {
  return async (url: string) => {
    const bearerValue = await bearer;
    return fetch(getUrl(url), {
      method,
      body,
      headers: {
        Authorization: `Bearer ${bearerValue}`,
        "Content-Type": "application/json",
        ...headers,
      },
    }).then((r) => r.json());
  };
};

const getUrl = (url: string) => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  console.log(process.env.REACT_APP_ENDPOINT + url);
  return process.env.REACT_APP_ENDPOINT + url;
};

export { fetcher, getUrl };
