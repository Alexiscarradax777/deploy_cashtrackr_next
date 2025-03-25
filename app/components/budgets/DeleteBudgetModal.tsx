"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmPasswordForm from "./ConfirmPasswordForm";

//Pasando datos con un manejador de estado global pero se hace desde la url
export default function DeleteBudgetModal() {
  //Para quitar el model
  const router = useRouter();
  const pathname = usePathname(); //ubicacion actual

  const searchParams = useSearchParams();
  const deleteBudgetId = searchParams.get("deleteBudgetId");
  const show = deleteBudgetId ? true : false;

  //Limpiamos de la url
  const hideModal = new URLSearchParams(searchParams.toString());
  hideModal.delete("deleteBudgetId");
  return (
    <>
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => router.replace(`${pathname}?${hideModal}`)}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <ConfirmPasswordForm />
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
}
