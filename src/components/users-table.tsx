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

import { DeleteUserDialog } from "./delete-user-button";
import UpdateUserButton from "./update-user-button";

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
                <UpdateUserButton currentDetails={user} />
                <DeleteUserDialog userId={user.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}

      </TableBody>

    </Table>
  )
}
