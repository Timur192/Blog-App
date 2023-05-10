"use client";

import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";
import EditModal from "../Modals/EditModal";

interface IPost {
  id: number;
  title: string;
  description: string;
  create_date: string;
  author: string;
  imgUrl: string;
  DeletePost: (id: number) => void;
}

interface IUser {
  user_name: string;
  avatar_url: string;
}

function MyPageCard({
  id,
  title,
  description,
  author,
  create_date,
  imgUrl,
  DeletePost,
}: IPost) {
  const [user, setUser] = useState<IUser>();
  const [ShowEditModal, setShowEditModal] = useState(false);

  const getUserProfile = async () => {
    if (author) {
      const { data } = await supabase
        .from("users")
        .select(`user_name, avatar_url`)
        .eq("id", author);
      data && setUser(data[0]);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <EditModal
        id={id}
        title={title}
        description={description}
        oldImageUrl={imgUrl}
        ShowEditModal={ShowEditModal}
        setShowEditModal={setShowEditModal}
      />
    <div className="w-80 sm:w-72 md:w-96 lg:w-1/2 xl:w-7/12  h-auto bg-gray-200 rounded-md m-5 p-2 relative">
      <div className="border-b border-gray-900/10 pb-5">
        <div className="flex items-center">
          <Image
            src={`${user?.avatar_url ? user.avatar_url : "/avatar.svg"}`}
            alt="avatar"
            width={30}
            height={30}
            className="cursor-pointer inline-block h-10 w-10 rounded-full ring-whit"
          />
          <p className="mx-2 font-bold">{user?.user_name}</p>
          <p className="absolute right-3">{create_date}</p>
        </div>
        <h1 className="my-2 font-bold text-3xl">{title}</h1>
        <div className="flex justify-between">
          <div className="w-auto h-36">
            <p className="text-ellipsis overflow-hidden ... h-full">
              {description}
            </p>
          </div>
          <Image
            src={imgUrl}
            alt="Content image"
            className="rounded-md"
            width={200}
            height={100}
          />
        </div>
      </div>
      <>
        <button
          onClick={() => setShowEditModal(true)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1 mt-1"
          >
          Edit
        </button>
        <button
          onClick={() => DeletePost(id)}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mx-1 mt-1"
        >
          Delete
        </button>
      </>
    </div>
          </>
  );
}

export default MyPageCard;
