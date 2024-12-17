"use client";

import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import ExercisePostItem from "@/components/shared/PostItem/Item/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/Item/PostItem";
import ReportPostItem from "@/components/shared/PostItem/Item/ReportPostItem";
import TableSearch from "@/components/shared/Search/TableSearch";
import {
  AnnouncementTypes,
  AnnouncementTypesNotRegularCourse,
  FilterType,
} from "@/constants";
import { mockPostDataCourseIdPage } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const page = () => {
  const pathName = usePathname();
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);

  var typeFilter = FilterType.SortNewer;

  //! CALL API để xem course này có phải có type là internCourse hay thesisCourse hay không
  const isNotRegularCourse = false;
  const renderAnnouncementTypes = isNotRegularCourse
    ? AnnouncementTypesNotRegularCourse
    : AnnouncementTypes;

  const getRenderPostItem = (item: any): JSX.Element => {
    switch (item.typePost) {
      case "report":
        return (
          <ReportPostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
            isFinalReport={item.isFinalReport}
            setGrading={() => {
              // setIsGrading(true);
              if (item.isFinalReport) setIsGradeThesisReport(true);
            }}
          />
        );
      case "exercise":
        return (
          <ExercisePostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
            }}
          />
        );
      case "announcement":
      default:
        return (
          <PostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
          />
        );
    }
  };

  return isGradeThesisReport ? (
    <>
      <BackToPrev
        text={"Quay lại danh sách thông báo"}
        onClickPrev={() => {
          setIsGradeThesisReport(false);
        }}
      />
      <ReviewForm/>
    </>
  ) : (
    <div>
      <div
        className="
        mt-6 mb-10 flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
        {/* Search & Filter */}
        <div className="flex justify-start w-1/2">
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="pr-2 w-[70%]"
          />
          <Dropdown
            className="z-30 rounded-lg w-[30%]"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div>
                <IconButton
                  text="Bộ lọc"
                  iconLeft={
                    typeFilter === FilterType.None
                      ? "/assets/icons/filter.svg"
                      : "/assets/icons/filter_active.svg"
                  }
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  border
                />
              </div>
            )}
          >
            <Dropdown.Header>
              <span
                onClick={() => {
                  // cancelDetailFilter();
                  // handleChooseFilter(FilterType.None);
                }}
                className="block truncate text-sm font-medium cursor-pointer"
              >
                Bỏ bộ lọc
              </span>
            </Dropdown.Header>
            <ul className=" text-sm" aria-labelledby="filterDropdownButton">
              <li
                className="flex items-center
                    w-full
                    justify-start
                    px-4
                    py-2
                    text-sm
                    text-gray-700
                    focus:outline-none
                    "
              >
                <input
                  checked={typeFilter === FilterType.SortNewer}
                  id="SortNewer"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortNewer}
                  onChange={() => {
                    // handleChooseFilter(FilterType.SortNewer)
                  }}
                  className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                />
                <label
                  htmlFor="SortNewer"
                  className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Mới nhất
                </label>
              </li>
              <li
                className="flex items-center
                    w-full
                    justify-start
                    px-4
                    py-2
                    text-sm
                    text-gray-700
                    focus:outline-none
                    "
              >
                <input
                  // checked={typeFilter === FilterType.SortOlder}
                  checked={true}
                  id="SortOlder"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortOlder}
                  onChange={() => {
                    // handleChooseFilter(FilterType.SortOlder)
                  }}
                  className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                />
                <label
                  htmlFor="SortOlder"
                  className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Cũ nhất
                </label>
              </li>
            </ul>
          </Dropdown>
        </div>

        {/* Create announcement */}
        <div>
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="w-full">
                <div>
                  <IconButton
                    text="Tạo thông báo"
                    iconLeft="/assets/icons/add.svg"
                  />
                </div>
              </div>
            )}
          >
            <div className="w-full">
              {renderAnnouncementTypes.map((item) => (
                <Link
                  key={`${pathName}${item.route}`}
                  href={`${pathName}${item.route}`}
                >
                  <Dropdown.Item>{item.label}</Dropdown.Item>
                </Link>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* PostList */}
      <div className="mt-6 flex flex-col gap-4">
        {mockPostDataCourseIdPage.map((item, index) => {
          return getRenderPostItem(item);
        })}
      </div>
    </div>
  );
};

export default page;
