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
  bearer = Promise.resolve(""),
}: FetcherArgs = {}) => {
  return async (url: string) =>
    fetch(getUrl(url), {
      method,
      body,
      headers: {
        Authorization: `Bearer ${await bearer}`,
        ...headers,
      },
    }).then((r) => r.json());
};

const getUrl = (url: string) => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  console.log(process.env.REACT_APP_ENDPOINT + url);
  return process.env.REACT_APP_ENDPOINT + url;
};

export { fetcher, getUrl };
