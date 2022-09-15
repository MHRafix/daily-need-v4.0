import Image from "next/image";
import React, { useMemo, useState } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { usePagination, useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import uuid from "react-uuid";
import Admin from "../../../images/users/admin.png";
import Customer from "../../../images/users/customer.png";
import { ALL_USERS_TABLE_COLUMNS } from "../TableColumns";
import { TablePagination, UserSorter } from "../TableParts";

export default function UsersTable({ USERS_DATA }) {
  const columns = useMemo(() => ALL_USERS_TABLE_COLUMNS, []);
  const [data, setData] = useState(USERS_DATA);
  const [active, setActive] = useState("reset");

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
  // filter function here
  const handleUserFilter = (role, activer) => {
    const filtered_user = USERS_DATA.filter((user) => user.user_admin === role);
    setActive(activer);
    setData(filtered_user);
  };

  // reset filter
  const handleResetFilter = (activer) => {
    setActive(activer);
    setData(USERS_DATA);
  };

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
    handleUserFilter,
    handleResetFilter,
    active,
  };

  return (
    <>
      {/* data sorter  */}
      <UserSorter dependency={sorting_dependency} />

      {/* react table here */}
      <ReactTooltip place="left" type="dark" effect="solid" />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={uuid()} {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={uuid()}
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={uuid()} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "User Photo") {
                    return (
                      <td key={uuid()} className="py-1">
                        <Image
                          src={cell.value}
                          alt="user pic"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      </td>
                    );
                  } else if (cell.column.Header === "User Role") {
                    if (cell.value === true) {
                      return (
                        <td data-tip="Admin">
                          <Image
                            src={Admin}
                            alt="roleImg"
                            width={50}
                            height={50}
                          />
                        </td>
                      );
                    } else {
                      return (
                        <td data-tip="Customer">
                          <Image
                            data-tip="Customer"
                            src={Customer}
                            alt="roleImg"
                            width={50}
                            height={50}
                          />
                        </td>
                      );
                    }
                  } else if (cell.column.Header === "Action") {
                    return (
                      <td>
                        <span className="flex justify-center items-center">
                          <FiEdit
                            data-tip="Edit"
                            className="text-light_purple cursor-pointer text-normal outline-none"
                          />
                          &nbsp;&nbsp;
                          <RiDeleteBinLine
                            data-tip="Delete"
                            className="text-red-500 cursor-pointer text-normal outline-none"
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
