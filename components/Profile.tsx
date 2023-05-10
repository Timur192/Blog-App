"use client";

import { GlobalContext } from "@/context/context";
import { supabase } from "@/supabase/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function Profile() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, loading, userData, setUser, setShowModal, setLoading } = useContext(GlobalContext);

    const Auth = async () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          const {
            data: { user },
          } = await supabase.auth.getUser(jwt);
          setUser(user);
        }
        setLoading(false);
      };
    
    useEffect(() => {
            Auth();
      }, []);


  const LogOut = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    setUser(null)
  }

  return (
    <div className="absolute right-5 m-2 z-50">
      {loading ? (
         <button
         onClick={() => setShowModal(true)}
         type="button"
         className="bg-gray-300 rounded-md px-5 py-1"
       >
         Login
       </button>
      ) : (
        <>
          {user ? (
            <>
            {userData?.avatar_url ? <>
              <Image
                src={userData.avatar_url}
                alt="avatar"
                width={50}
                height={50}
                className="cursor-pointer inline-block h-10 w-10 rounded-full ring-2 ring-whit"
                onClick={() => setShowMenu((prev) => !prev)}
                />
                </>:<>
              <Image
                src='/avatar.svg'
                alt="avatar"
                width={50}
                height={50}
                className="cursor-pointer inline-block h-10 w-10 rounded-full ring-2 ring-whit"
                onClick={() => setShowMenu((prev) => !prev)}
                />
                </>}
              {showMenu && (
                <div className="absolute border-2 border-gray-500 flex items-center justify-center right-0 w-36 h-32 mt-2 bg-gray-200 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <Link
                      className="drop-shadow-md bg-slate-50 rounded-md px-2 py-3 m-2 flex w-32"
                      href="/profile"
                      onClick={() => setShowMenu((prev) => !prev)}
                    >
                      <Image
                        className="mr-2"
                        src="/assets/profile.svg"
                        alt="logo"
                        width={20}
                        height={20}
                      />
                      <p className=" text-sm ">Profile</p>
                    </Link>
                    <Link
                      className="drop-shadow-md bg-slate-50 rounded-md px-2 py-3 m-2 flex w-32"
                      href="/"
                      onClick={LogOut}
                    >
                      <Image
                        className="mr-2"
                        src="/assets/log-out.svg"
                        alt="logo"
                        width={19}
                        height={19}
                      />
                      <p className=" text-sm ">Log out</p>
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="bg-gray-300 rounded-md px-5 py-1"
            >
              Login
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
