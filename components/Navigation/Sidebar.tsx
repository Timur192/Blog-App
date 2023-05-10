"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const arrayLinks = [
  {
    href: "/create-post",
    title: "Create Post",
    icon: "/assets/create-post.svg",
  },
  {
    href: "/",
    title: "All Post",
    icon: "/assets/all-posts.svg",
  },
  {
    href: "/my-posts",
    title: "My Post",
    icon: "/assets/all-posts.svg",
  },
  {
    href: "/favorites-posts",
    title: "favorite",
    icon: "/assets/favorite.svg",
  },
];

function SideBar() {
  const pathname = usePathname();

  return (
    <div className="hidden bg-gray-200 w-40 h-full absolute sm:block">
      <div className="flex m-3 justify-center items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="p-2 font-bold">Blog app</h1>
      </div>
      <div className="flex flex-wrap justify-center mt-5">
        {arrayLinks.map((items) => (
          <Link
            className={`rounded-md px-4 py-3 m-1 flex w-40 ${pathname == items.href ? 'bg-indigo-500' : 'bg-slate-50'}`}
            href={items.href}
          >
            <Image
              className="mr-2"
              src={items.icon}
              alt="logo"
              width={20}
              height={20}
            />
            {items.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
