"use client";

import { useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { GlobalContext } from "@/context/context";
import { IPost } from "@/util/PostsInterface";
import Image from "next/image";

interface IUser {
  user_name: string;
  avatar_url: string;
}

function HomePageCard({
  id,
  title,
  description,
  author,
  create_date,
  imgUrl,
}: IPost) {
  const [authorProfile, setAuthorProfile] = useState<IUser>();
  const [favorite, setFavorite] = useState(false);
  const {
    user,
    userData,
    getUserProfile
  } = useContext(GlobalContext);

  const AddFavorite = async (id: number) => {
    if (userData?.favorite_posts) {
      const { error } = await supabase
        .from("users")
        .update({
          favorite_posts: [...userData.favorite_posts, id],
        })
        .eq("id", user?.id);
      getUserProfile();
    } else {
      const { error } = await supabase
        .from("users")
        .update({
          favorite_posts: [id],
        })
        .eq("id", user?.id);
      getUserProfile();
    }
  };

  const DeleteFavorite = async (id: number) => {
    const filterArray = userData?.favorite_posts?.filter((i) => i !== id);
    const { error } = await supabase
      .from("users")
      .update({
        favorite_posts: filterArray,
      })
      .eq("id", user?.id);

    getUserProfile();
  };

  const DeleteOrAdd = (id: number) => {
    setFavorite(!favorite);
    if (favorite) {
      DeleteFavorite(id);
    } else {
      AddFavorite(id);
    }
  };

  const getAuthorProfile = async () => {
    if (author) {
      const { data } = await supabase
        .from("users")
        .select(`user_name, avatar_url`)
        .eq("id", author);
      data && setAuthorProfile(data[0]);
    }
  };

  useEffect(() => {
    getAuthorProfile();
    if (userData?.favorite_posts) {
      userData?.favorite_posts.forEach((i) =>
        i == id ? setFavorite(true) : null
      );
    }
  }, [userData]);

  return (
    <div className="w-80 sm:w-72 md:w-96 lg:w-1/2 xl:w-7/12 h-auto bg-gray-200 rounded-md m-5 p-2 relative">
      <div className="border-b border-gray-900/10 pb-5">
        <div className="flex items-center">
          <Image
            src={`${
              authorProfile?.avatar_url
                ? authorProfile.avatar_url
                : "/avatar.svg"
            }`}
            alt="avatar"
            width={30}
            height={30}
            className="cursor-pointer inline-block h-10 w-10 rounded-full ring-whit"
          />
          <p className="mx-2 font-bold">{authorProfile?.user_name}</p>
          <p className="absolute right-3">{create_date}</p>
        </div>
        <h1 className="my-2 font-bold text-3xl">{title}</h1>
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="w-auto h-36">
            <p className="text-ellipsis overflow-hidden ... h-full">
              {description}
            </p>
          </div>
          <Image
            src={imgUrl}
            alt="Content image"
            className="rounded-md w-aut"
            width={300}
            height={100}
          />
        </div>
      </div>
      <div className="flex mt-1 p-1">
        <Image src="/assets/comments.svg" alt="" width={30} height={30} className="cursor-pointer hover:scale-125 transition duration-150 mx-1 "/>
        <Image
          src={`/assets/${
            !favorite ? "bookmark-bl.svg" : "bookmark-red.svg"
          }`}
          alt=""
          width={35}
          height={35}
          onClick={() => DeleteOrAdd(id)}
          className="cursor-pointer hover:scale-125 transition duration-150 mx-1"
        />
      </div>
    </div>
  );
}

export default HomePageCard;
