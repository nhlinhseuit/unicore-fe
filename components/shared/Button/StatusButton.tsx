import React from "react";
import Image from "next/image";
import { Dropdown, Tooltip } from "flowbite-react";
import {} from "flowbite-react";

interface StatusButtonProps {
  text: string;
  info?: string;
  smallText?: boolean;
  temp?: boolean;
  red?: boolean;
  yellow?: boolean;
  green?: boolean;
  gray?: boolean;

  onClick?: () => void;
  iconLeft?: string;
  iconRight?: string;
  iconWidth?: number;
  iconHeight?: number;
  bgColor?: string;
  textColor?: string;
  border?: boolean;
  otherClasses?: string;
  isFilter?: boolean;
}

const StatusButton = (params: StatusButtonProps) => {
  return (
    <div
      onClick={params.onClick ? params.onClick : undefined}
      className={`
        flex
        gap-1
        items-center
        justify-center
        ${params.border && "border border-gray-200"}
        ${params.isFilter && "border-[#2563EB]"} 
        ${params.textColor ? `${params.textColor}` : "text-white"} 

        ${params.temp ? `bg-[#17A1FA]` : ""} 
        ${params.yellow ? `bg-[#FFC107]` : ""} 
        ${params.red ? `bg-[#F02021]` : ""} 
        ${params.green ? `bg-[#27CD95]` : ""} 
        ${params.gray ? `bg-[#CCCCCC]` : ""} 
        hover:bg-primary-800
        focus:ring-1
        focus:ring-gray-200
        font-medium
        rounded-lg
        text-sm
        px-4
        py-1
        dark:bg-primary-600
        dark:hover:bg-primary-700
        focus:outline-none
        dark:focus:ring-primary-800
        h-auto
        text-center
        
        ${params.otherClasses}
        `}
    >
      <span
        title="diễn ra 20/12"
        className={`flex-grow pl-2 pr-2 text-center ${
          params.smallText ? "text-[12px]" : ""
        }`}
      >
        {params.text}
      </span>

      {params.info && (
        <Tooltip
          content={params.info}
          style="dark"
          arrow={true}
          className="bg-[#1e1e1e] text-white text-[12px] py-1"
        >
          <Image
            src="/assets/icons/info.svg"
            alt="info"
            width={18}
            height={18}
            className="ml-2 cursor-pointer"
          />
        </Tooltip>
      )}
    </div>
  );
};

export default StatusButton;