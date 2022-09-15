import React, { useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import { MINI_USER_TABLE_COLUMNS } from "../TableColumns";

export default function UsersTable({ USER_DATA }) {
  const columns = useMemo(() => MINI_USER_TABLE_COLUMNS, []);
  const data = useMemo(() => USER_DATA);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="lg:!w-full xs:w-full">
      <ReactTooltip place="left" type="warning" effect="solid" />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "10px",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      <span className="flex items-center">
                        <BiUpArrowAlt />

                        <BiDownArrowAlt />
                      </span>
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === "user_pic") {
                    return (
                      <div
                        className="!p-extra_padding4"
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderLeft: "1px solid #ddd",
                        }}
                      >
                        <img src={cell.value} alt="img" id="user_image" />
                      </div>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
                {/* <td data-tip="Delete">del</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
