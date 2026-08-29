import React from "react";
import { getAllUsers } from "@/lib/api/users";
import UserTable from "@/components/admin/UserTable";

const UserPage = async () => {
  const userRes = await getAllUsers();

  const users = userRes?.data || [];

  return (
    <div className="w-full min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Users
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and view all registered users.
        </p>
      </div>

      <UserTable users={users} />
    </div>
  );
};

export default UserPage;
