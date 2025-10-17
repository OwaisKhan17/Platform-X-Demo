import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Column<T> {
  key: keyof T | string; // allows string for custom accessors
  label: string;
  render?: (item: T) => React.ReactNode; // optional custom cell render
  className?: string;
}

interface RowSelection<T> {
  selectedRowKeys: (string | number)[];
  onChange: (selectedKeys: (string | number)[]) => void;
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (item: T, index: number) => string | number;
  emptyMessage?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowSelection?: RowSelection<T>;
}

export default function DynamicTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No data available",
  headerClassName,
  bodyClassName,
  rowSelection
}: DynamicTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Header */}
          <TableHeader
            className={`border-b border-gray-100 dark:border-white/[0.05] ${headerClassName || ""}`}
          >
            <TableRow>
              {/* ✅ Add Select-All checkbox if rowSelection exists */}
              {rowSelection && (
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start w-[40px]"
                >
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 &&
                      rowSelection.selectedRowKeys.length === data.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        rowSelection.onChange(
                          data.map((item, index) =>
                            rowKey ? rowKey(item, index) : index
                          )
                        );
                      } else {
                        rowSelection.onChange([]);
                      }
                    }}
                    className="accent-blue-600 cursor-pointer"
                  />
                </TableCell>
              )}

              {columns.map((col) => (
                <TableCell
                  key={col.key.toString()}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody
            className={`divide-y divide-gray-100 dark:divide-white/[0.05] ${bodyClassName || ""}`}
          >
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="px-5 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => {
                const key = rowKey ? rowKey(item, index) : index;
                const isSelected = rowSelection?.selectedRowKeys.includes(key);

                return (
                  <TableRow
                    key={key}
                    className={isSelected ? "bg-blue-50 dark:bg-blue-900/30" : ""}
                  >
                    {/* ✅ Add checkbox cell */}
                    {rowSelection && (
                      <TableCell className="px-5 py-4 text-start w-[40px]">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              rowSelection.onChange([
                                ...rowSelection.selectedRowKeys,
                                key,
                              ]);
                            } else {
                              rowSelection.onChange(
                                rowSelection.selectedRowKeys.filter((k) => k !== key)
                              );
                            }
                          }}
                          className="accent-blue-600 cursor-pointer"
                        />
                      </TableCell>
                    )}

                    {columns.map((col) => (
                      <TableCell
                        key={col.key.toString()}
                        className={`px-5 py-4 text-start text-gray-700 dark:text-gray-300 ${col.className || ""}`}
                      >
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
