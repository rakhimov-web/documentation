import { Link, Navigate, useParams } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { findTopic } from "../data/groups";
import { SectionView } from "../components/ContentRenderer";
import { Quiz } from "../components/Quiz";
import { SkeletonTopicPage } from "../components/Skeleton";
import { useDelayedLoading } from "../lib/useDelayedLoading";

export default function TopicDetail() {
  const { groupId = "", libId = "", topicId = "" } = useParams();
  const { group, library, topic } = findTopic(groupId, libId, topicId);
  const loading = useDelayedLoading(`${groupId}/${libId}/${topicId}`, 550);

  if (!group || !library || !topic) {
    return <Navigate to="/" replace />;
  }

  const TIcon = topic.icon;

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-10 md:py-14">
      {loading ? (
        <SkeletonTopicPage />
      ) : (
        <div className="flex gap-12 animate-fade-in">
          <div className="flex-1 min-w-0 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-[13px] text-ink-subtle flex-wrap">
                <Link to="/" className="hover:text-primary transition-colors">
                  Bosh sahifa
                </Link>
                <span>/</span>
                <Link
                  to={`/${groupId}/${libId}`}
                  className="hover:text-primary transition-colors"
                >
                  {library.name}
                </Link>
                <span>/</span>
                <span className="text-ink">{topic.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-surface-1 shrink-0">
                  <TIcon size={20} strokeWidth={1.75} className="text-ink" />
                </div>
                <h1 className="text-[32px] font-light text-ink leading-tight">
                  {topic.title}
                </h1>
              </div>
              <p className="text-[16px] text-ink-muted leading-relaxed max-w-2xl">
                {topic.shortDesc}
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {topic.sections.map((section) => (
                <SectionView key={section.id} section={section} />
              ))}
            </div>

            {topic.quiz && topic.quiz.length > 0 && (
              <div
                id="quiz"
                className="flex flex-col gap-5 pt-6 border-t border-hairline scroll-mt-24"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle size={20} className="text-primary" />
                  <h2 className="text-[24px] font-normal text-ink">
                    Bilimingizni tekshiring
                  </h2>
                </div>
                <p className="text-[15px] text-ink-muted -mt-2">
                  {topic.title} mavzusi bo'yicha qisqa test — {topic.quiz.length}{" "}
                  ta savol.
                </p>
                <Quiz questions={topic.quiz} />
              </div>
            )}
          </div>

          {/* Table of contents */}
          <aside className="hidden xl:block w-[220px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-wider text-ink-subtle">
                Ushbu sahifada
              </span>
              <nav className="flex flex-col gap-2 border-l border-hairline">
                {topic.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="pl-3 -ml-px border-l-2 border-l-transparent hover:border-l-primary text-[13px] text-ink-muted hover:text-ink transition-colors"
                  >
                    {section.heading}
                  </a>
                ))}
                {topic.quiz && topic.quiz.length > 0 && (
                  <a
                    href="#quiz"
                    className="pl-3 -ml-px border-l-2 border-l-transparent hover:border-l-primary text-[13px] text-primary font-medium transition-colors"
                  >
                    Test
                  </a>
                )}
              </nav>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
