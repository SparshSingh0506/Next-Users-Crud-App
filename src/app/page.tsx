import AddUserButton from "@/components/add-user-button";
import UsersTable from "@/components/users-table";

export default async function Home() {

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
      <h1 className="text-2xl font-bold">Users</h1>
      
      <AddUserButton />
      <UsersTable />
    </div>
  );
}
