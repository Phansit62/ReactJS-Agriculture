import React from "react";
import { Dialog, Transition } from "@headlessui/react";

function Modal({ children, IsOpen, setIsOpen, title = "", wdith = "", height = "" }) {
  return (
    <Dialog open={IsOpen} onClose={() => setIsOpen(false)} className="relative z-50" as="div">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`${wdith} ${height} bg-white rounded-lg shadow-md p-4 transition-all`}>
          <Dialog.Title className={"border-b-2 border-black/30 text-xl py-1"}>{title}</Dialog.Title>

          {children}
          <div className="flex justify-end mt-4">
            <button onClick={() => setIsOpen(false)}>ปิด</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal;
