import Image from "next/image";
import React, { useMemo, useState } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { FiBookOpen, FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { usePagination, useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import useDeleteReq from "../../../hooks/http_req/deleteReq";
import AlertToast from "../../alertToast/AlertToast";
import toastConfig from "../../toastConfig";
import { CATEGORY_PRODUCTS_TABLE_COLUMNS } from "../TableColumns";
import { TableDataSorterInput, TablePagination } from "../TableParts";

export default function CategoryProductsTable({
  handleModal,
  all_products,
  CATEGORY_DATA,
}) {
  const columns = useMemo(() => CATEGORY_PRODUCTS_TABLE_COLUMNS, []);
  const [data, setData] = useState(CATEGORY_DATA);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  // pagination dependency
  const pagination_dependency = {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
  };

  // sorting dependency
  const sorting_dependency = {
    setPageSize,
    pageSize,
  };

  const { toastOn, setToastOn, toastType, toastText, handleDelete } =
    useDeleteReq();

  const { toast_config } = toastConfig(setToastOn, toastType, toastText);
  return (
    <>
      {toastOn && <AlertToast toast_config={toast_config} />}
      {/* data sorter  */}
      <TableDataSorterInput dependency={sorting_dependency} />
      {/* react table here */}
      <ReactTooltip place="left" type="dark" effect="solid" />
      <table id="products_table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      <span className="flex items-center">
                        <span
                          className={
                            column.isSortedDesc ? "text-black" : "text-black4"
                          }
                        >
                          <BiUpArrowAlt />
                        </span>
                        <span
                          className={
                            !column.isSortedDesc ? "text-black" : "text-black4"
                          }
                        >
                          <BiDownArrowAlt />
                        </span>
                      </span>
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === "cat_image") {
                    return (
                      <div
                        className="!p-extra_padding4"
                        style={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-table",
                            width: "50px",
                          }}
                        >
                          <Image
                            src={cell.value}
                            alt="img"
                            width={100}
                            height={100}
                            className="rounded-full"
                          />
                        </span>
                      </div>
                    );
                  } else if (cell.column.Header === "Products Quantity") {
                    const category_products = all_products?.filter(
                      (product) => product.category === cell.value
                    );

                    return (
                      <td>
                        <div>{category_products?.length}</div>
                      </td>
                    );
                  } else if (cell.column.Header === "Action") {
                    return (
                      <td>
                        <span className="flex justify-center items-center">
                          &nbsp;&nbsp;
                          <RiDeleteBinLine
                            onClick={() =>
                              handleDelete(
                                `admin_pannel_api/manage_category/${cell.value}`
                              )
                            }
                            data-tip="Delete"
                            className="text-red-500 cursor-pointer text-normal outline-none"
                          />
                          &nbsp;&nbsp;
                          <FiEdit
                            data-tip="Edit"
                            className="text-light_purple cursor-pointer text-normal outline-none"
                          />
                          &nbsp;&nbsp;
                          <FiBookOpen
                            onClick={() => handleModal(cell.value)}
                            data-tip="Products"
                            className="text-green cursor-pointer text-normal outline-none"
                          />
                        </span>
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* table data pagination here  */}
      {pageOptions.length > 1 && (
        <TablePagination dependency={pagination_dependency} />
      )}
    </>
  );
}
