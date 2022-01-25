import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface PageProps {}

type Space = "py-2" | "py-4" | "py-8" | "py-12" | "py-16" | "py-20" | "py-24";
type PageFC = React.FC<PageProps> & { Spacing: React.FC<{ spacing?: Space }> };

const Page: PageFC = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen text-zinc-200 bg-neutral-900">
      <Navigation />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

Page.Spacing = ({ spacing = "py-4" }) => (
  <div className={`w-full ${spacing}`} />
);

export default Page;
