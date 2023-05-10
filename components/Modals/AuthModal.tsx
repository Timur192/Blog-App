"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/context";
import { supabase } from "@/supabase/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUser_name] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const { showModal, setShowModal, setUser } = useContext(GlobalContext);

  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(text);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [loginOrRegister]);

  const CreateUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      return notifyError(error.message);
    }

    await supabase.from("users").insert({
      id: data.user?.id,
      user_name: user_name,
      avatar_url: null,
    });

    if (data.user) {
      setUser(data.user);
    }

    localStorage.setItem(
      "jwt",
      data.session?.access_token ? data.session?.access_token : ""
    );

    notify("Successful registration");
    setShowModal(false);
    setEmail("");
    setPassword("");
    setUser_name("");
  };

  const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return notifyError(error.message);
    }

    if (data.user) {
      setUser(data.user);
    }

    localStorage.setItem(
      "jwt",
      data.session?.access_token ? data.session?.access_token : ""
    );

    notify("Successful authorization");
    setShowModal(false);
    setEmail("");
    setPassword("");
  };

  const Authorization = () => {
    if (loginOrRegister == "login") {
      Login();
    } else {
      CreateUser();
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div
        className={`absolute flex z-50 items-center justify-center w-full h-full backdrop-opacity-10 backdrop-invert bg-black/20 ${
          !showModal && "hidden"
        }`}
      >
        <div className="flex relative bg-white w-96 h-max items-center flex-col rounded-md px-10">
          <div className="absolute right-0 m-4 cursor-pointer">
            <Image
              src="/assets/close.svg"
              alt="close"
              width={25}
              height={25}
              onClick={() => setShowModal(false)}
              className="hover:scale-125 transition duration-150"
            />
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
              {loginOrRegister == "login"
                ? "Sign in to your account"
                : "Create new account"}
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            {loginOrRegister !== "login" && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User name
                </label>
                <div className="my-2">
                  <input
                    value={user_name}
                    onChange={(e) => setUser_name(e.target.value)}
                    type="text"
                    required
                    className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="my-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="my-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => Authorization()}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loginOrRegister == "login" ? "Sign in" : "Register"}
              </button>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              {loginOrRegister == "login"
                ? "Don't have an account yet?"
                : "Already have an account?"}{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() =>
                  setLoginOrRegister(
                    loginOrRegister == "login" ? "register" : "login"
                  )
                }
              >
                {loginOrRegister == "login" ? "Register now" : "Sign in"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthModal;
