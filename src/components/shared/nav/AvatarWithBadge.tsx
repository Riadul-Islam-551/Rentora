import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarWithBadge({user}) {
  return (
    <Avatar>
      <AvatarImage src={user?.image} alt={user?.name} />
      <AvatarFallback className="capitalize text-primary">{user?.name[0]}</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  );
}
