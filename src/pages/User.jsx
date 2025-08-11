import { useContext, useState, useMemo } from "react";
import { AppContext } from "@/Context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../components/Heading";
import { MdSearch } from "react-icons/md";

const User = () => {
  const { users } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user) =>
      (user.fullname && user.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [users, searchTerm]);

  return (
    <div className="w-full min-h-screen p-0 sm:p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Heading
            title={`Users (${users.length})`}
            description="Manage your users"
          />
        </div>
      </div>
      <div className="relative mb-6">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  {searchTerm ? (
                    <div className="space-y-2">
                      <p className="text-gray-500">
                        No users found matching "{searchTerm}"
                      </p>
                      <Button
                        onClick={() => setSearchTerm("")}
                        className="text-sm"
                      >
                        Clear search
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-500">No users found</p>
                      <p className="text-sm text-gray-400">
                        No users have been added yet
                      </p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => (
                <TableRow key={user._id} className="hover:bg-gray-50/50">
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.fullname}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell className="font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {searchTerm && filteredUsers.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      )}
    </div>
  );
};

export default User;
