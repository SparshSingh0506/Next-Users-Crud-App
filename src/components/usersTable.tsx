import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllUsers } from "@/server/users";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

export default async function UsersTable() {
  const users = await getAllUsers();
  return (
    <Table className="w-full table-fixed">
      <TableCaption>List of all the users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Username</TableHead>
          <TableHead className="font-bold">E-mail</TableHead>
          <TableHead className="font-bold">Created At</TableHead>
          <TableHead className="font-bold">Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={i}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
            <TableCell>{user.updatedAt?.toLocaleString()}</TableCell>
            <TableCell className="justify-items-end">
              <div className="flex gap-2">
                <Button variant="ghost"><PencilIcon size={4} /></Button>
                <Button variant="destructive"><Trash2Icon size={4} /></Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
