import { ReactNode } from "react";
import "@/styles/globals.css";

import { GlobalContextProvider } from "@/context/context";
import SideBar from "@/components/Navigation/Sidebar";
import Profile from "@/components/Profile";
import AuthModal from "@/components/Modals/AuthModal";
import BottomNavigateBar from "@/components/Navigation/BottomNavigateBar";
import NavBarOnlyMobile from "@/components/NavBarOnlyMobile";

export const metadata = {
  title: "Blog Next App",
  description: "Blog home page",
};

export default function RootLayout({ children }: {children : ReactNode}) {
  return (
    <html lang="en">
     <body className="flex relative">
        <GlobalContextProvider>
          <NavBarOnlyMobile />
          <SideBar />
          <AuthModal />
          <Profile />
          {children}
          <BottomNavigateBar />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
