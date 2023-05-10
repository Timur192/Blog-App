"use client";

import { GlobalContext } from "@/context/context";
import { supabase } from "@/supabase/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { IPost } from "@/util/PostsInterface";
import toast, { Toaster } from "react-hot-toast";
import MyPageCard from "@/components/Cards/MyPageCard";
import Spinner from "@/components/Spinner";

function page() {
  const [data, setData] = useState<any>();
  const [LoadingPosts, setLoadingPosts] = useState(true);
  const { user, setShowModal } = useContext(GlobalContext);

  const notify = (text: string) => toast.success(text);

  const getDataPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("author", user?.id);
    if (data) {
      setData(data);
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    getDataPosts();
  }, [user]);

  const DeletePost = async (id: number) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    notify("Deleted");
    getDataPosts();
  };

  return (
    <div className="flex w-full h-screen items-center flex-col overflow-auto">
      <div className="mt-14 sm:hidden"></div>
      {user ? (
        <>
          {!LoadingPosts ? (
            <>
              {data.map((items: IPost) => (
                <MyPageCard {...items} DeletePost={DeletePost} />
              ))}
            </>
          ) : (
            <div className="flex w-full h-screen items-center justify-center">
              <Spinner />
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full h-screen items-center justify-center flex-col">
          <h2 className="text-xl mb-4">You must be logged in to view!</h2>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      )}
      <div className="mb-16"></div>
    </div>
  );
}

export default page;
