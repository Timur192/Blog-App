"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/context";
import { supabase } from "@/supabase/supabaseClient";
import { IPost } from "@/util/PostsInterface";
import HomePageCard from "@/components/Cards/HomePageCard";
import Spinner from "@/components/Spinner";
import Link from "next/link";

function page() {
  const [data, setData] = useState<any>();
  const [LoadingPosts, setLoadingPosts] = useState(true);
  const [FavoritesExist, setFavoritesExist] = useState(false);
  const { user, userData, setShowModal } = useContext(GlobalContext);

  const getDataPosts = async () => {
    if (userData?.favorite_posts) {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .in("id", userData?.favorite_posts);
      if (data) {
        if (userData?.favorite_posts.length <= 0)
          return setFavoritesExist(false), setLoadingPosts(false);

        setData(data);
        setLoadingPosts(false);
        setFavoritesExist(true);
      }
    } else {
      setLoadingPosts(false);
      setData([]);
    }
  };

  useEffect(() => {
    getDataPosts();
  }, [userData]);

  return (
    <div className="flex w-full h-screen items-center flex-col overflow-auto">
      <div className="mt-14 sm:hidden"></div>
      {!LoadingPosts ? (
        <>
          {user ? (
            <>
              {FavoritesExist ? (
                <>
                  {data.map((items: IPost) => (
                    <HomePageCard {...items} />
                  ))}
                </>
              ) : (
                <>
                  <div className="flex w-full h-screen items-center justify-center flex-col">
                    <h2 className="text-xl mb-4">
                      There are no favorite posts, go to the{" "}
                      {
                        <Link href="/" className="text-indigo-600">
                          main page
                        </Link>
                      }{" "}
                      to add
                    </h2>
                  </div>
                </>
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
        </>
      ) : (
        <>
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner />
          </div>
        </>
      )}
      <div className="mb-16"></div>
    </div>
  );
}

export default page;
