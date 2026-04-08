type LoadingSkeletonProps = {
  title?: string;
};

export function LoadingSkeleton({ title = "Carregando conteúdo..." }: LoadingSkeletonProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-6 text-sm font-medium text-slate-500">{title}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100"
          />
        ))}
      </div>
    </div>
  );
}
