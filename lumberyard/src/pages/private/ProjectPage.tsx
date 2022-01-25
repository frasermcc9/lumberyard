import { CheckCircleIcon, KeyIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../routes/Loader";
import { fetcher } from "../../util/fetch";
import { useAlert } from "../components/common/CornerAlert";
import Page from "../components/page/Page";
import HorizontalTabs from "../components/project/HorizontalTabs";
import LogList from "../components/project/tabs/LogTab";
import SettingsTab from "../components/project/tabs/SettingsTab";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = () => {
  const [{ user }] = useAuth();

  const { id } = useParams();
  const { data } = useSWR(`/project/${id}`, fetcher());
  const { createAlert } = useAlert();

  const navigate = useNavigate();

  const doDelete = async () => {
    createAlert(
      {
        icon: <TrashIcon />,
        message: "Deleting project...",
        mode: "info",
      },
      4500
    );
    await fetcher({
      bearer: user?.getIdToken(),
      method: "DELETE",
    })("/project/" + id);

    navigate("/");
    createAlert(
      {
        icon: <CheckCircleIcon />,
        message: "Project deleted",
        mode: "success",
      },
      3500
    );
  };

  const doKeyReset = async () => {
    createAlert(
      {
        icon: <KeyIcon />,
        message: "Updating project...",
        mode: "info",
      },
      4500
    );
    await fetcher({
      bearer: user?.getIdToken(),
      method: "PATCH",
    })("/project/" + id);

    createAlert(
      {
        icon: <CheckCircleIcon />,
        message: "API key updated!",
        mode: "success",
      },
      3500
    );
  };

  if (!data) return <Loader />;

  return (
    <Page>
      <Page.Spacing spacing="py-6" />
      <div className="mx-8">
        <h1 className="text-3xl text-center font-bold">{data.name}</h1>
        <HorizontalTabs
          tabs={[
            { content: <LogList logs={data.logs} />, header: "Logs" },
            {
              content: (
                <SettingsTab doApiKeyRefresh={doKeyReset} doDelete={doDelete} />
              ),
              header: "Settings",
            },
          ]}
        />
      </div>
    </Page>
  );
};

export default ProjectPage;
