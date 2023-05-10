"use client";

import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

interface IUser {
  user_name: string;
  avatar_url: string;
  favorite_posts: [number]
}

interface IGlobalContextProps {
  user: User | null;
  userData: IUser | null,
  showModal: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setShowModal: (showModal: boolean) => void;
  setLoading: (loading: boolean) => void;
  getUserProfile: () => void
}

export const GlobalContext = createContext<IGlobalContextProps>({
  user: null,
  userData: null,
  showModal: false,
  loading: false,
  setUser: () => {},
  setShowModal: () => {},
  setLoading: () => {},
  getUserProfile: () => {}
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUser | null>(null);

  const getUserProfile = async () => {
    if (user) {
      const { data } = await supabase
        .from("users")
        .select(`user_name, avatar_url, favorite_posts`)
        .eq("id", user.id);
      if (data) {
        setUserData(data[0]);
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    setLoading(true)
    getUserProfile();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        userData: userData,
        showModal: showModal,
        loading: loading,
        setUser: setUser,
        setShowModal: setShowModal,
        setLoading: setLoading,
        getUserProfile: getUserProfile
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
