import React from "react";
import Modal from "../../common/Modal";
import cn from "classnames";

interface SettingsTabProps {
  doDelete: () => void;
  doApiKeyRefresh: () => void;
}

interface ModalCategory {
  title: string;
  subtitle: string;
  actionText: string;
  action: () => void;
  actionColors: string;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  doDelete,
  doApiKeyRefresh,
}) => {
  const [modalContents, setModal] = React.useState<ModalCategory | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const deleteModal: ModalCategory = {
    title: "Delete Project",
    subtitle: "Are you sure you want to delete this project?",
    actionText: "Delete",
    action: doDelete,
    actionColors: "hover:bg-red-700 active:hover:bg-red-600 text-red-500",
  };

  const updateModal: ModalCategory = {
    title: "Refresh API Key",
    subtitle: "Are you sure you want to update the API key?",
    actionText: "Update",
    action: () => {
      doApiKeyRefresh();
      setModalVisible(false);
    },
    actionColors: "hover:bg-blue-700 active:hover:bg-blue-600 text-blue-500",
  };

  return (
    <>
      <Modal
        title={modalContents?.title}
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className="text-md text-gray-500 mt-2">
          {modalContents?.subtitle}
        </div>
        <div className="flex gap-x-4 justify-end">
          <button
            onClick={() => setModalVisible(false)}
            className="transition-all bg-neutral-900 hover:bg-neutral-700 hover:bg-opacity-20 active:hover:bg-neutral-600 active:hover:bg-opacity-25 mt-5 py-2 px-4 -ml-4 shadow rounded-lg text-neutral-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={modalContents?.action}
            className={cn(
              "transition-all bg-neutral-900 hover:bg-opacity-20 active:hover:bg-opacity-25 mt-5 py-2 px-4 -ml-4 shadow rounded-lg font-semibold",
              modalContents?.actionColors
            )}
          >
            {modalContents?.actionText}
          </button>
        </div>
      </Modal>
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
        <SettingsHeader title="Management" />
        <hr className="mb-6" />
        <button
          className="bg-red-500 hover:bg-red-600 font-semibold text-lg p-2 px-4 rounded-lg transition-all"
          onClick={() => {
            setModal(deleteModal);
            setModalVisible(true);
          }}
        >
          Delete Project
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 font-semibold text-lg p-2 px-4 rounded-lg transition-all"
          onClick={() => {
            setModal(updateModal);
            setModalVisible(true);
          }}
        >
          Refresh API Key
        </button>
      </div>
    </>
  );
};

const SettingsHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="my-2">
      <span className="text-2xl font-extralight">{title}</span>
    </div>
  );
};

export default SettingsTab;
