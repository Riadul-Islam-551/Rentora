import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOutUser from "../authentication/LogOutUser";

export function AvatarWithBadge({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={undefined}>
          <AvatarImage
            src={user?.image}
            alt={user?.name}
            className={undefined}
          />
          <AvatarFallback className="capitalize text-primary">
            {user?.name?.[0]}
          </AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-transparent">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="" inset={false}>
            <div className="">
              <LogOutUser></LogOutUser>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
