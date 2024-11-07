"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import ToggleTitle from "@/components/shared/ToggleTitle";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import RegisterGroupTable from "@/components/shared/Table/RegisterGroupTable/RegisterGroupTable";

// ! CẬP NHẬT
const type: any = "create";

// TODO: Search debouce tìm kiếm lớp nếu cần

const CreateGroupRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [minMember, setMinMember] = useState("");
  const [maxMember, setMaxMember] = useState("");
  const [selectedLeaderOption, setSelectedLeaderOption] = useState(false);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  const [isToggleCreateSchedule, setIsToggleCreateSchedule] = useState(true);
  const [isToggleViewTable, setIsToggleViewTable] = useState(true);
  const [errorList, setErrorList] = useState([
    {
      id: "1",
      content: "Bạn phải chọn ngày bắt đầu và ngày kết thúc.",
      value: false,
    },
    {
      id: "2",
      content: "Số lượng thành viên nhóm tối thiểu và tối đa.",
      value: false,
    },
    { id: "3", content: "Số lượng thành viên phải là chữ số.", value: false },
    {
      id: "4",
      content: "Số lượng tối thiểu phải nhỏ hơn số lượng tối đa và khác 0.",
      value: false,
    },
  ]);

  // 2. Define a submit handler.
  async function handleSubmit() {
    setIsSubmitting(true);
    if (validate()) {
      toast({
        title: "Tạo lịch thất bại.",
        description: `Vui lòng kiểm tra lại thông tin.`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    try {
      console.log({
        dateStart: dateStart,
        dateEnd: dateEnd,
        minMembers: minMember,
        maxMembers: maxMember,
      });

      // naviate to home page
      router.push("/");

      toast({
        title: "Tạo lịch thành công.",
        description: `Đăng ký nhóm sẽ diễn ra vào ngày ${format(
          dateStart ?? "",
          "dd/MM/yyyy"
        )}`,
        variant: "success",
        duration: 3000,
      });
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  const validate = () => {
    const newErrorList = [...errorList];
    let isNotValid = false;

    if (!dateStart || !dateEnd) {
      newErrorList[0].value = true; // Ngày bắt đầu và kết thúc không hợp lệ
      isNotValid = true;
    } else {
      newErrorList[0].value = false; // Hợp lệ
    }

    if (minMember == "" || maxMember == "") {
      newErrorList[1].value = true; // Số lượng thành viên không hợp lệ
      isNotValid = true;
    } else {
      newErrorList[1].value = false;
    }

    if (isNaN(parseInt(minMember)) || isNaN(parseInt(maxMember))) {
      newErrorList[2].value = true;
      isNotValid = true;
      return isNotValid;
    } else {
      newErrorList[2].value = false;
    }

    if (
      parseInt(minMember) == 0 ||
      parseInt(maxMember) == 0 ||
      parseInt(minMember) > parseInt(maxMember)
    ) {
      newErrorList[3].value = true;
      isNotValid = true;
    } else {
      newErrorList[2].value = false;
    }
    console.log("newErrorList", newErrorList);

    setErrorList(newErrorList); // Cập nhật trạng thái errorList

    return isNotValid;
  };

  const { toast } = useToast();

  const handleClickCreateSchedule = () => {
    setIsToggleCreateSchedule(!isToggleCreateSchedule);
  };

  const handleClickViewTable = () => {
    setIsToggleViewTable(!isToggleViewTable);
  };

  const handleChangeMinMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinMember(e.target.value);
  };

  const handleChangeMaxMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMember(e.target.value);
  };

  // ! Từ data của group đăng ký, biến đổi nó thành data dạng này để render
  // ! mỗi student 1 row
  const dataStudentRegisterGroup = [
    {
      // TODO: Kh cần stt của sv ở đây
      // TODO: Hiện tại chỉ dùng làm key
      // * FIX: STT count ++ cho row leader

      STT: "1",
      isDeleted: false,
      data: {
        "Mã nhóm": "1",
        "Tên nhóm": "Figma",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Nguyễn Hoàng Linh",
      },
    },
    {
      STT: "2",
      isDeleted: false,
      data: {
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Lê Thành Lộc",
      },
    },
    {
      STT: "3",
      isDeleted: false,
      data: {
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      STT: "4",
      isDeleted: false,
      data: {
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Nguyễn Tiến Vĩ",
      },
    },
    {
      STT: "5",
      isDeleted: false,
      data: {
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Nguyễn Thị Thanh Tuyền",
      },
    },
    {
      STT: "6",
      isDeleted: false,
      data: {
        "Mã nhóm": "4",
        "Tên nhóm": "Đom đóm",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Võ Hữu Xike",
      },
    },
  ];

  return (
    <div>
      <ToggleTitle
        text="Lịch đăng ký nhóm"
        showStatus
        handleClick={handleClickCreateSchedule}
        value={isToggleCreateSchedule}
      />

      {isToggleCreateSchedule ? (
        <div className="flex px-6 gap-12">
          <div className="flex w-full flex-col gap-10">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                Thời hạn <span className="text-red-600">*</span>
              </label>

              <div className="mt-3.5 flex gap-4 items-center">
                <div className="w-1/4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full flex items-center text-center font-normal ${
                          !dateStart && "text-muted-foreground"
                        } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                      >
                        <span
                          className={`flex-grow text-center ${
                            !dateStart && "text-muted-foreground"
                          }`}
                        >
                          {dateStart
                            ? format(dateStart, "dd/MM/yyyy")
                            : "Ngày bắt đầu"}
                        </span>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateStart}
                        onSelect={setDateStart}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <span> - </span>
                <div className="w-1/4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full flex items-center text-center font-normal ${
                          !dateEnd && "text-muted-foreground"
                        } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                      >
                        <span
                          className={`flex-grow text-center ${
                            !dateEnd && "text-muted-foreground"
                          }`}
                        >
                          {dateEnd
                            ? format(dateEnd, "dd/MM/yyyy")
                            : "Ngày kết thúc"}
                        </span>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateEnd}
                        onSelect={setDateEnd}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <p className="text-[0.8rem] dark:text-slate-400 body-regular mt-2.5 text-light-500">
                {errorList[0].content}
              </p>

              {/* //! ERROR */}
              {errorList[0].value ? (
                <p className="mt-3.5 text-[0.8rem] font-medium dark:text-red-900 text-red-500">
                  {errorList[0].content}
                </p>
              ) : (
                <></>
              )}
            </div>

            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                Số lượng thành viên nhóm <span className="text-red-600">*</span>
              </label>

              <div className="mt-3.5 flex gap-6">
                <div className="flex gap-2 w-1/3 items-center">
                  <span className="body-regular w-auto flex-shrink-0">
                    Tối thiểu
                  </span>
                  <Input
                    value={minMember}
                    onChange={handleChangeMinMember}
                    name="minMembers"
                    placeholder="Nhập số lượng..."
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                  />
                </div>
                <div className="flex gap-2 w-1/3 items-center">
                  <p className="body-regular w-auto flex-shrink-0">Tối đa</p>
                  <Input
                    value={maxMember}
                    onChange={handleChangeMaxMember}
                    name="maxMembers"
                    placeholder="Nhập số lượng..."
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                  />
                </div>
              </div>

              {/* //! ERROR */}
              {errorList.map((item, index) => {
                if (index != 0 && item.value)
                  return (
                    <p
                      key={`${index}_${item.id}`}
                      className="mt-3.5 text-[0.8rem] font-medium dark:text-red-900 text-red-500"
                    >
                      {item.content}
                    </p>
                  );
              })}
            </div>

            <CheckboxComponent
              handleClick={() => {
                setSelectedLeaderOption(!selectedLeaderOption);
              }}
              value={selectedLeaderOption}
              text="Nhóm có nhóm trưởng"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <ToggleTitle
        text="Danh sách nhóm"
        handleClick={handleClickViewTable}
        value={isToggleViewTable}
      />

      {isToggleViewTable ? (
        <div className="px-6">
          <RegisterGroupTable
            isEditTable={false}
            isMultipleDelete={false}
            dataTable={dataStudentRegisterGroup}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="flex mt-12 gap-2">
        <SubmitButton text="Đăng" otherClasses="w-fit" onClick={handleSubmit} />
        <IconButton text="Tạm lưu" temp otherClasses="w-fit" />
        <IconButton text="Hủy" red otherClasses="w-fit" onClick={() => {}} />
      </div>
    </div>
  );
};

export default CreateGroupRegister;