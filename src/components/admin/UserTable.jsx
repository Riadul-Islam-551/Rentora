import React from "react";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UpdateUserRoleDialogue } from "./UpdateUserRoleDialogue";

const UserTable = ({ users = [] }) => {
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleClass = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-primary/10 text-primary border-primary/20";

      case "owner":
        return "bg-success/10 text-success border-success/20";

      case "tenant":
        return "bg-warning/10 text-warning border-warning/20";

      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!users.length) {
    return (
      <div className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
        <UserRound className="mb-3 size-10 text-muted-foreground" />

        <h3 className="text-lg font-semibold">No Users Found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are currently no registered users.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =====================================================
          DESKTOP / LARGE SCREEN TABLE-STYLE HEADER
          ===================================================== */}

      <div className="hidden lg:grid lg:grid-cols-[2fr_2fr_1fr_1.5fr_1.5fr_1.3fr] items-center gap-4 rounded-t-xl bg-muted border border-b-0 px-5 py-3 text-sm font-semibold text-muted-foreground text-center ">
        <div>User</div>
        <div>Email</div>
        <div>Role</div>
        <div>Mobile</div>
        <div>Email Status</div>
        <div>Joined</div>
      </div>

      {/* =====================================================
          USERS
          ===================================================== */}

      {users.map((user) => (
        <div
          key={user._id}
          className="
            bg-card
            transition-colors
            hover:bg-muted/20
            border 
            border-b-0 
          "
        >
          {/* =================================================
              LARGE SCREEN
              TABLE-LIKE ROW
              ================================================= */}

          <div
            className="
              hidden
              lg:grid
              lg:grid-cols-[2fr_2fr_1fr_1.5fr_1.5fr_1.3fr]
              items-center
              gap-4 
              px-5
              py-4
            "
          >
            {/* USER */}

            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-secondary
                  text-sm
                  font-semibold
                  text-secondary-foreground
                "
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={100}
                    height={100}
                    className="size-full object-cover"
                  />
                ) : (
                  getInitials(user.name)
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {user.name || "Unknown User"}
                </p>

                <p className="break-all text-xs text-muted-foreground">
                  {user._id}
                </p>
              </div>
            </div>

            {/* EMAIL */}

            <div className="min-w-0">
              <p className="break-all text-sm text-foreground">
                {user.email || "N/A"}
              </p>
            </div>

            {/* ROLE */}

            <div className="flex flex-col gap-2 items-center justify-center">
              <span
                className={`
                  inline-flex
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  capitalize
                  ${getRoleClass(user?.role)}
                `}
              >
                {user?.role || "Unknown"}
              </span>
              <UpdateUserRoleDialogue user={user}></UpdateUserRoleDialogue>
            </div>

            {/* MOBILE */}

            <div className="min-w-0">
              <span className="wrap-break-words text-sm text-muted-foreground">
                {user.mobileNumber || "Not provided"}
              </span>
            </div>

            {/* EMAIL STATUS */}

            <div>
              {user.emailVerified ? (
                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-success/20
                    bg-success/10
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-success
                  "
                >
                  Verified
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-warning/20
                    bg-warning/10
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-warning
                  "
                >
                  Not Verified
                </span>
              )}
            </div>

            {/* JOINED */}

            <div>
              <span className="whitespace-nowrap text-sm text-muted-foreground">
                {formatDate(user.createdAt)}
              </span>
            </div>
          </div>

          {/* =================================================
              MOBILE / TABLET
              RESPONSIVE USER CARD
              ================================================= */}

          <div className="lg:hidden p-4 sm:p-5">
            {/* User heading */}

            <div className="flex items-start gap-3 border-b pb-4">
              <div
                className="
                  flex
                  size-11
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-secondary
                  text-sm
                  font-semibold
                  text-secondary-foreground
                "
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={100}
                    height={100}
                    className="size-full object-cover"
                  />
                ) : (
                  getInitials(user.name)
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="wrap-break-words font-semibold text-foreground">
                  {user.name || "Unknown User"}
                </h3>

                <p className="mt-1 break-all text-xs text-muted-foreground">
                  {user._id}
                </p>
              </div>

              {/* Role */}

              <div className="flex flex-col items-center justify-center gap-2">
                <span
                  className={`
                  shrink-0
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  capitalize
                  ${getRoleClass(user?.role)}
                `}
                >
                  {user?.role || "Unknown"}
                </span>
                <UpdateUserRoleDialogue user={user}></UpdateUserRoleDialogue>
              </div>
            </div>

            {/* Information */}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Email */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Email
                </p>

                <p className="break-all text-sm text-foreground">
                  {user.email || "N/A"}
                </p>
              </div>

              {/* Mobile */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Mobile
                </p>

                <p className="wrap-break-words text-sm text-foreground">
                  {user.mobileNumber || "Not provided"}
                </p>
              </div>

              {/* Email Status */}

              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Email Status
                </p>

                {user.emailVerified ? (
                  <span
                    className="
                      inline-flex
                      rounded-full
                      border
                      border-success/20
                      bg-success/10
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-success
                    "
                  >
                    Verified
                  </span>
                ) : (
                  <span
                    className="
                      inline-flex
                      rounded-full
                      border
                      border-warning/20
                      bg-warning/10
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-warning
                    "
                  >
                    Not Verified
                  </span>
                )}
              </div>

              {/* Joined */}

              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Joined
                </p>

                <p className="text-sm text-foreground">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* =====================================================
          TOTAL
          ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-b-xl
          border
          bg-muted/30
          px-5
          py-3
        "
      >
        <span className="text-sm font-medium">Total Users</span>

        <span className="text-sm font-bold">{users.length}</span>
      </div>
    </div>
  );
};

export default UserTable;
