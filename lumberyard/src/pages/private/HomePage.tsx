import React from "react";
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
