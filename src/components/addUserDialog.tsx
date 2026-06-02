"use client";

import { useState } from "react";

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
import { UserPlus } from "lucide-react";

import { createUser } from "@/server/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => { // onSubmit automatically passes form event data on submit
    e.preventDefault();

    const details = new FormData(e.currentTarget);

    try {
      await createUser({
        username: details.get("username") as string,
        email: details.get("email") as string,
        password: details.get("password") as string,
      });

      console.log("User created");

      toast.success("User Added Successfully.");

      setOpen(false);

      router.refresh();
    }

    catch (error: any) {
      toast.error("Something went wrong! The entries you made might already exist.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button>Add User <UserPlus /></Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} autoComplete="off">

          <DialogHeader>

            <DialogTitle>Add User</DialogTitle>

            <DialogDescription>
              Enter Username and email to add to the database.
            </DialogDescription>

          </DialogHeader>

          <br />

          <FieldGroup>

            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" placeholder="Enter Username" required />
            </Field>

            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" placeholder="Enter Email" required />
            </Field>

            <Field>
              <Label htmlFor="password-1">Password</Label>
              <Input id="password-1" name="password" type="password" placeholder="Enter Password" required />
            </Field>

          </FieldGroup>

          <br />

          <DialogFooter>

            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Confirm</Button>

          </DialogFooter>

        </form>
      </DialogContent>

    </Dialog>
  )
}
