"use client";

import { ChangeEvent, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import uniqid from "uniqid";

interface OldValue {
  id: number,
  title: string,
  description: string,
  oldImageUrl: string,
  ShowEditModal: boolean
  setShowEditModal: (arg: boolean) => void
}

function EditModal({id, title, description, oldImageUrl, ShowEditModal, setShowEditModal}: OldValue) {
  const [EditTitle, setEditTitle] = useState(title);
  const [EditDescription, setEditDescription] = useState(description);
  const [LoadingButton, setLoadingButton] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const notify = (text: string) => toast.success(text);
  //const notifyError = (text: string) => toast.error(text);
  
  const UploadPost = async (imageUrl: string) => {
      const { error } = await supabase
      .from('posts')
      .update({ 
        title: EditTitle,
        description: EditDescription,
        imgUrl: imageUrl
      })
      .eq('id', id)

      setLoadingButton(false);
      notify('Success edit post')
      setShowEditModal(false)
  };

  const EditPost = async () => {
    setLoadingButton(true);
    if (image !== null) {
      await supabase.storage.from("images").upload(`posts/${uniqid()}-${image.name}`, image, {upsert: false,})
      .then((res) => {if(res.data?.path) UploadPost(supabase.storage.from("images").getPublicUrl(res.data.path).data.publicUrl)})
      .catch((error) => console.log(error))
    } else {
      UploadPost(oldImageUrl)
    }
  };

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div
        className={`absolute flex z-50 items-center justify-center w-full h-full backdrop-opacity-10 backdrop-invert bg-black/20 ${
          !ShowEditModal && "hidden"
        }`}
      >
          <div className="rounded-md bg-gray-200 w-128">
            <div className="flex justify-center items-center flex-col m-2 border-b border-gray-900/10">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Post
              </h2>
              <div className="mt-5">
                <div className="mb-5">
                  <label
                    htmlFor="Title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={EditTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="block outline-none w-128 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Title"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
                >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  value={EditDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={5}
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="my-2 flex items-center flex-col gap-x-3">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="block w-full mb-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-indigo-600 hover:file:bg-violet-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 mr-2 flex items-center justify-end gap-x-6">
              <button
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              {LoadingButton ? (
                <>
                  <button
                    disabled
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={EditPost}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
   
    </>
  );
}

export default EditModal;
