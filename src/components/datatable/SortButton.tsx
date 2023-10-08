import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

type Props = {
  headerName: string;
  column: any;
};

const SortButton = ({ headerName, column }: Props) => {
  return (
    <Button
      onClick={() => {
        column.toggleSorting(column.getIsSorted() === "asc");
      }}
      variant="ghost"
      className="-ml-4"
    >
      {headerName}
      <FontAwesomeIcon
        icon={faRightLeft}
        rotation={90}
        className="ml-2 h-4 w-4"
      />
    </Button>
  );
};

export default SortButton;
