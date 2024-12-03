import { DataGradingReviewItem } from "@/types";
import { Table } from "flowbite-react";
import { useRef } from "react";
import InputComponent from "../components/InputComponent";
import { tableTheme } from "../components/DataTable";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: DataGradingReviewItem;
}

const ScoreReviewItemTable = (params: DataTableParams) => {
  const refInput = useRef(params.dataTable);

  const handleInputChange = (
    key: keyof DataGradingReviewItem,
    value: string | number
  ) => {
    // @ts-ignore
    refInput.current[key] = value;

  };

  const renderTableCellValue = (key: any, value: any) => {
    if (key !== "Bài nộp" && params.isEditTable) {
      return (
        <InputComponent
          value={value}
          placeholder={value}
          onChange={(newValue) => handleInputChange(key, newValue)}
          otherClassess="w-full"
        />
      );
    }
    return value;
  };

  return (
    <div>
      <div
        className="
          scroll-container 
          overflow-auto
          max-w-full
          h-fit
          rounded-lg
          border-[1px]
          border-secondary-200
          "
      >
        <Table hoverable theme={tableTheme}>
          {/* HEADER */}
          <Table.Head
            theme={tableTheme?.head}
            className="sticky top-0 z-10 uppercase border-b bg-gray"
          >
            {Object.keys(params.dataTable).map((key, index) => {
              return (
                <Table.HeadCell
                  key={`${key}_${index}`}
                  theme={tableTheme?.head?.cell}
                  className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                >
                  {key}
                </Table.HeadCell>
              );
            })}
          </Table.Head>

          {/* BODY */}
          <Table.Body className="text-left divide-y">
            <Table.Row
              onClick={() => {}}
              className={`bg-background-secondary  text-left ${
                params.isEditTable
                  ? "hover:bg-white cursor-default"
                  : "hover:bg-light-800 cursor-default"
              } duration-100`}
            >
              {/* Các giá trị khác */}
              {Object.entries(params.dataTable).map(([key, value]) => {
                return (
                  <Table.Cell
                    theme={{
                      base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
                    }}
                    className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left 
              ${key === "Bài nộp" ? "underline cursor-pointer" : ""}
              ${key === "Điểm" || key === "Tỉ lệ điểm" ? "text-center" : ""}
            `}
                  >
                    {renderTableCellValue(key, value)}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ScoreReviewItemTable;