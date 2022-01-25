import React, { useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../../hooks/useAuth";
import { fetcher } from "../../../util/fetch";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { useAlert } from "../common/CornerAlert";
import CreateProjectModal from "./CreateProjectModal";
import { useNavigate } from "react-router";

interface ProjectSelectProps {}

const ProjectSelect: React.FC<ProjectSelectProps> = () => {
  const { data } = useSWR<any[]>("/project", fetcher());
  const navigate = useNavigate();

  const { createAlert } = useAlert();
  const [modalOpen, setModalOpen] = useState(false);

  const Header = () => (
    <div>
      <h1 className="text-3xl text-center font-semibold">Select Project</h1>
    </div>
  );

  const NewProject: React.FC = () => {
    return (
      <div
        className="w-56 h-56 border-dashed border-2 rounded text-4xl font-bold select-none hover:bg-neutral-800 transition-all cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="h-full w-full justify-center flex items-center pb-3">
          +
        </div>
      </div>
    );
  };

  const handleCopy = (toCopy: string) => {
    navigator.clipboard.writeText(toCopy);

    createAlert(
      {
        icon: <ClipboardCopyIcon />,
        message: "Copied to clipboard",
        mode: "success",
      },
      3500
    );
  };

  console.log(data);

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Header />
        <div className="mt-4 mb-20">
          <h2 className="text-xl">No projects found</h2>
        </div>
        <NewProject />
      </div>
    );
  }

  return (
    <div>
      <CreateProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Header />
      <div className="w-full flex flex-wrap justify-center mt-16 gap-8 max-w-5xl mx-auto">
        {data?.map?.((project) => (
          <div
            key={project.id}
            className="w-56 h-56 border-dashed border-2 hover:bg-neutral-800 transition-all cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/project/${project.id}`);
            }}
          >
            <div className="h-full w-full justify-center flex items-center">
              <div className="flex flex-col items-center gap-y-4">
                <div className="text-2xl font-semibold text-center">
                  {project.name}
                </div>
                <ClipboardCopyIcon
                  className="hover:bg-neutral-700 p-1 rounded cursor-pointer transition-all w-10 h-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopy(project.apiKey);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <NewProject />
      </div>
    </div>
  );
};

export default ProjectSelect;
