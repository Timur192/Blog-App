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

function BottomNavigateBar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-5 border-t border-gray-500 bg-gray-200 w-full h-14 absolute bottom-0 z-10 sm:hidden">
        {arrayLinks.map((items) => (
          <Link
            className={`rounded-md px-4 py-3 m-1 flex w-auto ${pathname == items.href ? 'bg-indigo-500' : 'bg-slate-50'}`}
            href={items.href}
          >
            <Image
              src={items.icon}
              alt="logo"
              width={20}
              height={20}
            />
          </Link>
        ))}
    
    </div>
  );
}

export default BottomNavigateBar;
