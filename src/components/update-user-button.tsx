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

import {
  Field,
  FieldGroup,
} from "@/components/ui/field"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, PencilIcon } from "lucide-react";
import { toast } from "sonner";

import { updateUser } from "@/server/users";
import type { NewUser } from "@/db/schema";

export default function UpdateUserButton({ currentDetails }: { currentDetails: Pick<NewUser, 'id' | 'username' | 'email'>}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => { // onSubmit automatically passes form event data on submit
    e.preventDefault();

    const details = new FormData(e.currentTarget);

    try {
      setIsLoading(true);

      await updateUser(currentDetails.id as string, {
        username: details.get("username") as string,
        email: details.get("email") as string,
        password: details.get("password") as string,
      });

      console.log("User created");

      toast.success("User Updated Successfully.");

      setOpen(false);

      router.refresh();
    }

    catch (error: any) {
      toast.error("Something went wrong! The entries you made might already exist.");
    }

    finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button variant="ghost"><PencilIcon size={4} /></Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} autoComplete="off">

          <DialogHeader>

            <DialogTitle>Update User</DialogTitle>

            <DialogDescription>
              Enter new Username, Email and Password to update the database.
            </DialogDescription>

          </DialogHeader>

          <br />

          <FieldGroup>

            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" placeholder="Enter Username" defaultValue={currentDetails.username} />
            </Field>

            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" placeholder="Enter Email" defaultValue={currentDetails.email} />
            </Field>

            <Field>
              <Label htmlFor="password-1">Password</Label>
              <Input id="password-1" name="password" type="password" placeholder="Enter Password" />
            </Field>

          </FieldGroup>

          <br />

          <DialogFooter>

            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">
              {isLoading ?
                <Loader className="size-4 animate-spin" />
                :
                "Confirm"
              }
            </Button>

          </DialogFooter>

        </form>
      </DialogContent>

    </Dialog>
  );
}
