import React, { useMemo } from "react";
import { Table as RBTable } from "react-bootstrap";
import { useTable } from "react-table";
import { TableProps } from "./Table.props";

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  refetch,
  params,
  className = "",
  ...props
}) => {
  const tColumns = useMemo(() => columns, [columns]);
  const tData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      data: tData,
      columns: tColumns,
    });

  return (
    <RBTable
      {...props}
      {...getTableProps()}
      hover
      bordered
      className={`
                rtl
                ${className}
            `}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(row.original);
                }
              }}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </RBTable>
  );
};

export default Table;
