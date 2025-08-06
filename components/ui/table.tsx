import * as React from "react";

interface Column<T> {
  key: keyof T | "actions";
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Table<T extends { _id: string }>({ columns, data, page, totalPages, onPageChange }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded-lg">
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id} className="border-t border-gray-700 hover:bg-gray-900">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2">
                    {col.key === "actions"
                      ? col.render && col.render(null, row)
                      : col.render
                      ? col.render(row[col.key], row)
                      : row[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}