import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiPencilAlt } from "react-icons/hi";
import { useForm } from "react-hook-form";

export default function UpdateDialog(props) {
  const cancelButtonRef = useRef(null);
  const { open, setOpen } = props;
  const { onSubmit } = props;
  const { defaultValues } = props;
  const { disabled } = props;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-background bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-background rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-background px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-500 sm:mx-0 sm:h-10 sm:w-10">
                    <HiPencilAlt className="h-6 w-6 text-indigo-100" aria-hidden="true" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-foreground">
                      Update animation
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col space-y-4">
                      <p className="text-sm text-gray-200">
                        You are currently viewing the settings for this animation. Only the original
                        creator of this animation can modify its settings. The resolution of the animation
                        cannot be modified.
                      </p>
                      <fieldset className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Title</label>
                        <input
                          disabled={disabled}
                          className="rounded-md border border-gray-600 py-px px-2"
                          {...register("title", {
                            required: "This field is required."
                          })}
                        />
                        {!!errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                      </fieldset>
                      <fieldset className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Framerate (fps)</label>
                        <input
                          disabled={disabled}
                          type={disabled ? undefined : "number"}
                          className="rounded-md border border-gray-600 py-px px-2"
                          {...register("framerate", {
                            required: "This field is required.",
                          })}
                        />
                        {!!errors.framerate && <span className="text-xs text-red-500">{errors.framerate.message}</span>}
                      </fieldset>
                      <fieldset className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Width (px)</label>
                        <input
                          disabled
                          className="rounded-md border border-gray-600 py-px px-2"
                          {...register("width")}
                        />
                      </fieldset>
                      <fieldset className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Height (px)</label>
                        <input
                          disabled
                          className="rounded-md border border-gray-600 py-px px-2"
                          {...register("height")}
                        />
                      </fieldset>
                    </div>
                    <div className="py-3 sm:space-x-3 mt-2 sm:flex sm:flex-row">
                      <button
                        disabled={isSubmitting || disabled}
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-500 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:w-auto sm:text-sm"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}