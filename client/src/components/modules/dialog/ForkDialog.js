import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CgGitFork } from "react-icons/cg";
import { useForm } from "react-hook-form";

export default function ForkDialog(props) {
  const cancelButtonRef = useRef(null);
  const { open, setOpen } = props;
  const { onSubmit } = props;
  const { defaultValues } = props;
  const { min, max } = props;

  const { register, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues });

  React.useEffect(() => {
    setValue("frame", defaultValues.frame);
  }, [defaultValues.frame]);

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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 sm:mx-0 sm:h-10 sm:w-10">
                    <CgGitFork className="h-6 w-6 text-indigo-100" aria-hidden="true" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-foreground">
                      Fork animation
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col space-y-4">
                      <p className="text-sm text-gray-200">
                        By forking this animation, you are creating your own copy separate from the original.
                        If you wish to make changes to this animation, click on "Edit" instead.
                      </p>
                      <fieldset className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Title</label>
                        <input
                          className="rounded-md border border-gray-600 py-px px-2"
                          {...register("title", {
                            required: "This field is required."
                          })}
                        />
                        {!!errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                      </fieldset>
                      <fieldset className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">From frame</label>
                        <input
                          type="number"
                          className="rounded-md border border-gray-600 py-px px-2"
                          {...register("frame", {
                            required: "This field is required.",
                            min: {
                              value: min,
                              message: `This field at minimum must be ${min}.`
                            },
                            max: {
                              value: max,
                              message: `This field at maximum must be ${max}.`
                            }
                          })}
                        />
                        {!!errors.frame && <span className="text-xs text-red-500">{errors.frame.message}</span>}
                      </fieldset>
                    </div>
                    <div className="py-3 sm:space-x-3 mt-2 sm:flex sm:flex-row">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                      >
                        Fork
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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