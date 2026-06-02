"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { deleteUser } from "@/server/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteUserDialog = ({userId}: {userId: string}) => {
  const router = useRouter();

  const handleDelete = () => { // clear why async await does not matter here
    try{
      deleteUser(userId);

      console.log("User deleted");

      toast.success("User deleted successfuly.");

      router.refresh();
    }
    catch (error: any) {
      toast.error("Failed to delete User.");
    }
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button variant="destructive"><Trash2Icon size={4} /></Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>

          <DialogTitle>Are you absolutely sure?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete this record from the server.
          </DialogDescription>

        </DialogHeader>

        <DialogFooter>

          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleDelete}>Confirm</Button>

        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}
