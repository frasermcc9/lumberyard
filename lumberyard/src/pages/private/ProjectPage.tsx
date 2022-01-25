import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { fetcher } from "../../util/fetch";
import Page from "../components/page/Page";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = () => {
  const { id } = useParams();

  const { data } = useSWR(`/project/${id}`, fetcher());

  if (!data) return null;

  console.log(data);

  let colors = ["bg-neutral-800", "bg-neutral-900"];
  const getAlternatingBg = (index: number) => {
    return colors[index % 2];
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "[DEBUG]":
        return "text-neutral-100";
      case "[INFO]":
        return "text-sky-400";
      case "[WARN]":
        return "text-yellow-500";
      case "[ERROR]":
        return "text-orange-500";
      case "[SUCCESS]":
        return "text-purple-500";
      case "[FATAL]":
        return "text-red-500";
      default:
        return "text-neutral-100";
    }
  };

  return (
    <Page>
      <Page.Spacing />
      <div className="mx-8">
        <h1 className="text-3xl text-center font-bold mb-8 text-">
          {data.name}
        </h1>
        <div className="mx-auto text-lg">
          {data.logs.map((log: any, i: number) => {
            const regex = /(\[.*?\])/g;
            const message: string = log.message;

            const matches = Array.from(message.matchAll(regex), (r) => r[0]);
            const level = matches[1];
            return (
              <pre
                key={i}
                className={`font-mono py-1 ${getAlternatingBg(
                  i
                )} ${getLevelColor(level)}`}
              >
                {log.message}
              </pre>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default ProjectPage;
