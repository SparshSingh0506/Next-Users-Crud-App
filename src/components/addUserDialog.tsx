"use client";

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

export default function AddUserDialog() {
  return (
    <Dialog>

      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button>Create User <UserPlus /></Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log("User Added!");
        }} autoComplete="off">

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
              <Input id="username-1" name="username" placeholder="Enter Username" />
            </Field>

            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" placeholder="Enter Email" />
            </Field>

          </FieldGroup>

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
