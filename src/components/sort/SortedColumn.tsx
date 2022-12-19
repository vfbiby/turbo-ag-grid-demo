export interface SortedColumnProps {
  name: string;
  order: string | null | undefined;
}

export function SortedColumn({ columns }: { columns: SortedColumnProps[] }) {
  return (
    <div>
      {columns.map((column) => (
        <>
          <span>{column.name}</span>
          <span>{column.order}</span>
        </>
      ))}
    </div>
  );
}
