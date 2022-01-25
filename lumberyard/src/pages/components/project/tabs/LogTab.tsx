import React from "react";

interface LogListProps {
  logs: {
    message: string;
  }[];
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
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
    <div className="mx-auto text-lg">
      {logs.map((log, i) => {
        const regex = /(\[.*?\])/g;
        const message: string = log.message;

        const matches = Array.from(message.matchAll(regex), (r) => r[0]);
        const level = matches[1];
        return (
          <pre
            key={i}
            className={`font-mono py-1 ${getAlternatingBg(i)} ${getLevelColor(
              level
            )}`}
          >
            {log.message}
          </pre>
        );
      })}
    </div>
  );
};

export default LogList;
