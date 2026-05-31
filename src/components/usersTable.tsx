import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllUsers } from "@/server/users";

export default async function UsersTable() {
  const users = await getAllUsers();
  return (
    <Table>
      <TableCaption>List of all the users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">ID</TableHead>
          <TableHead className="font-bold">E-mail</TableHead>
          <TableHead className="font-bold">Username</TableHead>
          <TableHead className="font-bold">Password</TableHead>
          <TableHead className="font-bold">Created At</TableHead>
          <TableHead className="font-bold">Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={i}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.password}</TableCell>
            <TableCell>{user.createdAt?.toLocaleDateString()}</TableCell>
            <TableCell>{user.updatedAt?.toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
