export interface TableColumn {
  displayText: string;
  key: string;
}

interface TableProps {
  columns: TableColumn[];
  data: Array<Record<string, any>>;
}

export function Table({ data, columns }: TableProps) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return (
      <p className="text-red-500">Error: Columns must be a non-empty array.</p>
    );
  }

  if (!Array.isArray(data) || data.some((row) => typeof row !== 'object')) {
    return (
      <p className="text-red-500">Error: Data must be an array of objects.</p>
    );
  }

  return (
    <table className="min-w-full bg-background text-foreground border border-gray-700 mt-6">
      <thead>
        <tr
          className="text-white"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--primary), var(--secondary))',
          }}>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-2 text-left font-semibold">
              {column.displayText}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-primary/10">
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-4 py-2 border-t border-gray-700">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
