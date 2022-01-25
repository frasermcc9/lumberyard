import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, isOpen, title, children }) => {
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
                    className="text-xl font-medium leading-6 text-gray-200 mb-1"
                  >
                    {title}
                  </Dialog.Title>
                  <XIcon
                    className="absolute right-6 top-6 w-10 text-gray-100 hover:bg-neutral-800 active:hover:bg-neutral-700 p-2 rounded-lg cursor-pointer"
                    onClick={onClose}
                  />
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
