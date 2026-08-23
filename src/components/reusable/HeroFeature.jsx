export default function Feature({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-md">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>

        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
