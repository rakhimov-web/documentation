import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { groups } from "../data/groups";
import { SkeletonCard } from "../components/Skeleton";
import { useDelayedLoading } from "../lib/useDelayedLoading";

export default function Dashboard() {
  const loading = useDelayedLoading("dashboard", 450);
  const totalTopics = groups
    .flatMap((g) => g.libraries)
    .reduce((acc, l) => acc + l.topics.length, 0);

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col gap-12 animate-fade-in">
      {/* Hero */}
      <div className="flex flex-col gap-4 border-b border-hairline pb-10">
        <span className="text-[14px] text-primary font-medium">
          Shaxsiy bilimlar bazasi
        </span>
        <h1 className="text-[36px] md:text-[42px] font-light leading-[1.15] text-ink max-w-2xl">
          My Documentation — o'rganganlaringizni bir joyda saqlang
        </h1>
        <p className="text-[17px] leading-relaxed text-ink-muted max-w-xl">
          IT dunyosida o'zimga kerak bo'lgan manbalarni shu yerda — eng qulay
          va tushunarli usulda — dokumentatsiya qilib saqlayman. Bu yagona
          texnologiyaga bog'liq emas: vaqt o'tishi bilan turli sohalar
          qo'shilib boradi. Chap paneldan mavzuni tanlang yoki quyidagi
          kartalardan boshlang.
        </p>
        <div className="flex items-center gap-2 text-[13px] text-ink-subtle mt-1">
          <FileText size={14} />
          Hozircha {totalTopics} ta mavzu tayyor
        </div>
      </div>

      {/* Groups */}
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <group.icon size={20} strokeWidth={1.75} className="text-ink" />
            <h2 className="text-[24px] font-normal text-ink">{group.name}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : group.libraries.map((lib) => {
                  const Icon = lib.icon;
                  const isSoon = lib.status === "soon";
                  const card = (
                    <div
                      className={`group h-full border border-hairline p-6 flex flex-col gap-4 transition-colors ${
                        isSoon
                          ? "opacity-60"
                          : "hover:border-ink cursor-pointer bg-canvas"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="w-11 h-11 flex items-center justify-center"
                          style={{ background: `${lib.accent}1a` }}
                        >
                          <Icon size={22} strokeWidth={1.75} color={lib.accent} />
                        </div>
                        {isSoon && (
                          <span className="text-[10px] uppercase tracking-wide text-ink-subtle border border-hairline px-1.5 py-0.5">
                            Tez orada
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-[19px] font-normal text-ink">
                          {lib.name}
                        </h3>
                        <p className="text-[13px] text-ink-subtle">
                          {lib.tagline}
                        </p>
                      </div>
                      <p className="text-[14px] leading-relaxed text-ink-muted flex-1">
                        {lib.description}
                      </p>
                      {!isSoon && (
                        <div className="flex items-center gap-1.5 text-[13px] text-primary font-medium mt-1">
                          Ko'rish
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </div>
                      )}
                    </div>
                  );
                  return isSoon ? (
                    <div key={lib.id}>{card}</div>
                  ) : (
                    <Link key={lib.id} to={`/${group.id}/${lib.id}`}>
                      {card}
                    </Link>
                  );
                })}
          </div>
        </div>
      ))}
    </div>
  );
}
