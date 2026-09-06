import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { findLibrary } from "../data/groups";
import { SkeletonCard } from "../components/Skeleton";
import { useDelayedLoading } from "../lib/useDelayedLoading";

export default function LibraryOverview() {
  const { groupId = "", libId = "" } = useParams();
  const { group, library } = findLibrary(groupId, libId);
  const loading = useDelayedLoading(`${groupId}/${libId}`, 400);

  if (!group || !library) {
    return <Navigate to="/" replace />;
  }

  const Icon = library.icon;

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col gap-10 animate-fade-in">
      <div className="flex flex-col gap-2 text-[13px] text-ink-subtle">
        <div className="flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors">
            Bosh sahifa
          </Link>
          <span>/</span>
          <span>{group.name}</span>
          <span>/</span>
          <span className="text-ink">{library.name}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 border border-hairline p-7">
        <div
          className="w-14 h-14 flex items-center justify-center shrink-0"
          style={{ background: `${library.accent}1a` }}
        >
          <Icon size={28} strokeWidth={1.75} color={library.accent} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[30px] font-light text-ink leading-tight">
            {library.name}
          </h1>
          <p className="text-[13px] text-primary font-medium">
            {library.tagline}
          </p>
          <p className="text-[16px] leading-relaxed text-ink-muted max-w-2xl mt-1">
            {library.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-[20px] font-normal text-ink">Mavzular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
            : library.topics.map((topic) => {
                const TIcon = topic.icon;
                return (
                  <Link
                    key={topic.id}
                    to={`/${groupId}/${libId}/${topic.id}`}
                    className="group border border-hairline p-6 flex flex-col gap-4 hover:border-ink transition-colors bg-canvas"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 flex items-center justify-center bg-surface-1">
                        <TIcon size={20} strokeWidth={1.75} className="text-ink" />
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-ink-subtle">
                        <Clock size={12} />
                        {topic.readTime}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h3 className="text-[19px] font-normal text-ink">
                        {topic.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-ink-muted">
                        {topic.shortDesc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-primary font-medium">
                      O'qish
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
}
