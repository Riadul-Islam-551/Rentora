import { getOwnerProperty } from "@/lib/api/property";
import { getLoggedInUser } from "@/lib/core/session";
import React from "react";

const OwnerPropertyPage = async () => {
  const owner = await getLoggedInUser();
  console.log('owner', owner.id)
  const property = await getOwnerProperty(owner.id);
  console.log("owner property", property);
  return (
    <div>
      <h1>my property</h1>
    </div>
  );
};

export default OwnerPropertyPage;
