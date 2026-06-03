"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button";
import { Loader, Trash2Icon } from "lucide-react";
import { deleteUser } from "@/server/users";
import { toast } from "sonner";

export const DeleteUserDialog = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await deleteUser(userId);

      console.log("User deleted");

      toast.success("User deleted successfuly.");

      router.refresh();
    }

    catch (error: any) {
      toast.error("Failed to delete User.");
    }

    finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

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

          <Button variant="destructive" onClick={handleDelete}>
            {isLoading ?
              <Loader className="size-4 animate-spin" />
              :
              "Confirm"
            }
          </Button>

        </DialogFooter>
        
      </DialogContent>

    </Dialog>
  )
}
