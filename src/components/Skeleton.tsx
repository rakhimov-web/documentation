type Props = {
  className?: string;
};

export function SkeletonLine({ className = "" }: Props) {
  return <div className={`skeleton h-4 ${className}`} />;
}

export function SkeletonBlock({ className = "" }: Props) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="border border-hairline p-6 flex flex-col gap-4">
      <div className="skeleton h-10 w-10" />
      <div className="skeleton h-4 w-2/3" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-5/6" />
    </div>
  );
}

export function SkeletonTopicPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col gap-3">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-9 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="skeleton h-6 w-1/3" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-11/12" />
          <div className="skeleton h-32 w-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonSidebar() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-8 w-full" />
      ))}
    </div>
  );
}
