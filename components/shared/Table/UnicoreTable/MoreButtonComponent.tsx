"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TableDataMoreComponentItems } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

interface MoreButtonParams {
  handleEdit: () => void;
}

const MoreButtonComponent = (params: MoreButtonParams) => {
  const [isShowDialog, setIsShowDialog] = useState(false);

  return (
    <>
      <Menubar className="relative border-none bg-transparent shadow-none z-100">
        <MenubarMenu>
          <MenubarTrigger
            className="
           w-10 h-10"
          >
            <Image
              src="/assets/icons/more.svg"
              alt="edit"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </MenubarTrigger>

          <MenubarContent
            className="
          -translate-y-2
          absolute right-[-3rem] mt-0 min-w-[120px] rounded border py-2 bg-white  
          dark:border-dark-400 dark:bg-dark-300"
          >
            {TableDataMoreComponentItems.map((item) => (
              <MenubarItem
                className="
                      flex items-center gap-4 px-2.5 py-2 hover:bg-light-800
                      dark:focus:bg-dark-400 cursor-pointer"
                key={item.value}
                onClick={
                  item.value === "edit"
                    ? params.handleEdit
                    : item.value === "delete"
                    ? () => {
                        console.log("setIsShowDialog");
                        setIsShowDialog(true);
                      }
                    : undefined
                }
              >
                <p
                  className="
                  body-medium
                  text-black"
                >
                  {item.label}
                </p>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {isShowDialog ? (
        <AlertDialog open={isShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
              <AlertDialogDescription>
                {/* This action cannot be undone. This will permanently delete your
                account and remove your data from our servers. */}
                Thao tác này không thể hoàn tác, dữ liệu của bạn sẽ bị xóa vĩnh viễn và không thể khôi phục.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsShowDialog(false);
                }}
              >
                Đồng ý
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default MoreButtonComponent;
