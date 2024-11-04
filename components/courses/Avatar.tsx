import React from "react";

interface Props {
  text: string;
}

const Avatar = (params: Props) => {
  return (
    <div className="w-[40px] h-[40px] bg-[#8151FD] rounded-full flex-center text-white">
      <p className="paragraph-regular">{params.text}</p>
    </div>
  );
};

export default Avatar;
