"use client";

import NavbarButton from "@/components/shared/NavbarButton";
import { TeacherSettingTabItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      <div
        aria-label="Tabs with underline"
        role="tablist"
        className="relative
          custom-scrollbar-navbar
          h-[54px]
          mb-4
          flex
          gap-2
          items-center
          text-center
          whitespace-nowrap
          overflow-x-auto
          flex-nowrap
          mt-2 border-b border-gray
          "
      >
        {TeacherSettingTabItems.map((item) => {
          const isActive =
            pathName === item.route || pathName.includes(`${item.route}`);

          return (
            <Link key={item.route} href={item.route}>
              <NavbarButton isActive={isActive} label={item.label} />
            </Link>
          );
        })}
      </div>
      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
