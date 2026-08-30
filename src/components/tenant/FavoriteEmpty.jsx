const FavoriteEmpty = () => {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
      <h2 className="text-lg font-semibold">No favorite properties</h2>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        You haven&apos;t added any properties to your favorites yet.
      </p>
    </div>
  );
};

export default FavoriteEmpty;