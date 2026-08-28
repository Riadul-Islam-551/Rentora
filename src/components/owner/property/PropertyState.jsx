const PropertyStats = ({ properties, totalProperties }) => {
  const approvedCount = properties.filter(
    (property) => property.status?.toLowerCase() === "approved",
  ).length;

  const pendingCount = properties.filter(
    (property) => property.status?.toLowerCase() === "pending",
  ).length;

  const rejectedCount = properties.filter(
    (property) => property.status?.toLowerCase() === "rejected",
  ).length;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Total Properties</p>

        <p className="mt-1 text-2xl font-bold">{totalProperties}</p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Approved</p>

        <p className="mt-1 text-2xl font-bold text-success">{approvedCount}</p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Pending</p>

        <p className="mt-1 text-2xl font-bold text-warning">{pendingCount}</p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Rejected</p>

        <p className="mt-1 text-2xl font-bold text-error">{rejectedCount}</p>
      </div>
    </div>
  );
};

export default PropertyStats;
