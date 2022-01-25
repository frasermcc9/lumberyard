import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { fetcher } from "../../../util/fetch";
import { useAlert } from "../common/CornerAlert";

interface WalletModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const CreateProjectModal: React.FC<WalletModalProps> = ({
  onClose,
  isOpen,
}) => {
  const [projectNameField, setProjectNameField] = useState("");

  const [{ user }] = useAuth();
  const { createAlert } = useAlert();

  const createProject = async () => {
    if (projectNameField.length > 64) {
      return createAlert(
        {
          icon: <XIcon />,
          message: "Project name must be 64 characters or less",
          mode: "error",
        },
        3000
      );
    }

    const fetch = fetcher({
      bearer: user?.getIdToken(),
      method: "POST",
      body: JSON.stringify({ name: projectNameField }),
    });

    fetch("/project");

    setProjectNameField("");
    onClose();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-neutral-900 bg-opacity-80 backdrop-blur" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-px my-8 overflow-hidden text-left align-middle transition-all transform bg-gradient-to-r from-blue-400 to-emerald-500 shadow-xl rounded-2xl">
                <div className="bg-neutral-900 p-8 rounded-2xl relative">
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-medium leading-6 text-gray-200 mb-5"
                  >
                    Create New Project
                  </Dialog.Title>
                  <XIcon
                    className="absolute right-6 top-6 w-10 text-gray-100 hover:bg-neutral-800 active:hover:bg-neutral-700 p-2 rounded-lg cursor-pointer"
                    onClick={onClose}
                  />

                  <div className="mt-2">
                    <p className="text-md text-gray-500 mb-2">Project Name</p>
                  </div>

                  <input
                    className="text-gray-200 bg-neutral-800 rounded-lg p-3 outline-none ring-0 focus:ring-1 ring-cyan-400 transition-all w-full mb-4"
                    value={projectNameField}
                    onChange={(e) => setProjectNameField(e.target.value)}
                    placeholder="i.e. Lumberyard"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={createProject}
                      className="transition-all bg-neutral-900 hover:bg-cyan-700 hover:bg-opacity-20 active:hover:bg-cyan-600 active:hover:bg-opacity-25 py-2 px-4 -mr-3 shadow rounded-lg text-cyan-500 font-semibold"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateProjectModal;
