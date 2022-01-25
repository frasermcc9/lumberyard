import React from "react";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth";
import { fetcher } from "../../util/fetch";
import ProjectSelect from "../components/home/ProjectSelect";
import Page from "../components/page/Page";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Page>
      <Page.Spacing />
      <ProjectSelect />
    </Page>
  );
};

export default HomePage;
