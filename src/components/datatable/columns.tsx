import { ColumnDef } from "@tanstack/react-table";
import SortButton from "./SortButton";
import EditDialog from "./EditDialog";

export const columns: ColumnDef<Meter>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortButton column={column} headerName="Id" />,
  },
  {
    accessorKey: "owner",
    header: ({ column }) => <SortButton column={column} headerName="Owner" />,
  },
  {
    accessorKey: "monitored_entity",
    header: ({ column }) => (
      <SortButton column={column} headerName="Monitored Entity" />
    ),
  },
  {
    accessorKey: "meter_type",
    header: ({ column }) => (
      <SortButton column={column} headerName="Meter Type" />
    ),
  },
  {
    accessorKey: "accessibility",
    header: ({ column }) => (
      <SortButton column={column} headerName="Accessibility" />
    ),
    cell: ({ getValue }) => {
      const accessibility = getValue();

      if (!accessibility) return;

      const formatted = (accessibility as string).split(";").join(", ");
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "submitted_at",
    header: ({ column }) => (
      <SortButton column={column} headerName="Submitted At" />
    ),
    cell: ({ getValue }) => {
      const submitted_at = getValue();
      const formatted = new Date(submitted_at as string)
        .toLocaleDateString("cs-CZ", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replace(/\//g, ". ");
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const meter = row.original;
      return <EditDialog row={meter} />;
    },
  },
];
