import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateMeter } from "@/api/inventory-meters";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { useToast } from "../ui/use-toast";

interface Props {
  row: Meter;
}

const EditDialog = ({ row }: Props) => {
  const { authData } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const [rowData, setRowData] = useState<Meter>({
    id: row.id,
    owner: row.owner ?? "",
    monitored_entity: row.monitored_entity ?? "",
    meter_type: row.meter_type ?? "",
    accessibility: row.accessibility ?? "",
    submitted_at: row.submitted_at ?? "",
  });

  const meterMutation = useMutation({
    mutationFn: async () => {
      const response = await updateMeter(authData, rowData);
      if (response.status === 200) {
        toast({
          title: "Success!",
          description: `Successfully updated row #${rowData.id}.`,
        });
      } else {
        toast({
          title: "Error.",
          description: `The request returned a response of ${response.status}. Please, try again.`,
        });
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["inventoryMeters"]);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    meterMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <FontAwesomeIcon icon={faPen} className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-2 sm:mx-0 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit row #{rowData.id}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5 p-3 sm:grid sm:gap-3"
        >
          <div className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-x-16">
            <Label htmlFor="owner" className="col-span-1 w-max text-right">
              Owner
            </Label>
            <Input
              id="owner"
              type="text"
              value={rowData.owner}
              onChange={(e) =>
                setRowData((prev) => ({ ...prev, owner: e.target.value }))
              }
              className="col-span-4 sm:col-span-3"
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-x-16">
            <Label
              htmlFor="monitored_entity"
              className="col-span-1 w-max text-right"
            >
              Monitored Entity
            </Label>
            <Input
              id="monitored_entity"
              type="text"
              value={rowData.monitored_entity}
              onChange={(e) =>
                setRowData((prev) => ({
                  ...prev,
                  monitored_entity: e.target.value,
                }))
              }
              className="col-span-4 sm:col-span-3"
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-x-16">
            <Label htmlFor="meter_type" className="col-span-1 w-max text-right">
              Meter Type
            </Label>
            <Input
              id="meter_type"
              type="text"
              value={rowData.meter_type}
              onChange={(e) =>
                setRowData((prev) => ({ ...prev, meter_type: e.target.value }))
              }
              className="col-span-4 sm:col-span-3"
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-x-16">
            <Label
              htmlFor="accessibility"
              className="col-span-1 w-max text-right"
            >
              Accessibility
            </Label>
            <Input
              id="accessibility"
              type="text"
              value={rowData.accessibility}
              onChange={(e) =>
                setRowData((prev) => ({
                  ...prev,
                  accessibility: e.target.value,
                }))
              }
              className="col-span-4 sm:col-span-3"
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-x-16">
            <Label
              htmlFor="submitted_at"
              className="col-span-1 w-max text-right"
            >
              Submitted At
            </Label>
            {
              <div
                id="submitted_at"
                className="col-span-3 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm opacity-70 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              >
                {new Date(rowData.submitted_at as string)
                  .toLocaleDateString("cs-CZ", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                  .replace(/\//g, ". ")}
              </div>
            }
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
