"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import { usePathname, useRouter } from "next/navigation";

const CreateExercise = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };

  return (
    <div>
      <BackToPrev
        text={"Quay lại danh sách thông báo"}
        onClickPrev={handleClick}
      />

      <CreateExercise />
    </div>
  );
};

export default CreateExercise;
