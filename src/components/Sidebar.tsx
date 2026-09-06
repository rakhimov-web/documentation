import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  LayoutGrid,
  Search,
  X,
} from "lucide-react";
import { allTopicsFlat, groups } from "../data/groups";

function LibraryNode({
  groupId,
  library,
}: {
  groupId: string;
  library: (typeof groups)[number]["libraries"][number];
}) {
  const location = useLocation();
  const basePath = `/${groupId}/${library.id}`;
  const isActiveBranch = location.pathname.startsWith(basePath);
  const [open, setOpen] = useState(isActiveBranch || library.status === "ready");
  const Icon = library.icon;
  const isSoon = library.status === "soon";

  return (
    <div className="flex flex-col">
      <button
        onClick={() => !isSoon && setOpen((o) => !o)}
        className={`group flex items-center gap-2.5 w-full px-3 py-2.5 text-left transition-colors ${
          isSoon ? "opacity-50 cursor-default" : "cursor-pointer hover:bg-surface-1"
        }`}
      >
        <Icon size={17} strokeWidth={1.75} className="text-ink-muted shrink-0" />
        <span className="text-[14px] text-ink flex-1 truncate">{library.name}</span>
        {isSoon ? (
          <span className="text-[10px] uppercase tracking-wide text-ink-subtle border border-hairline px-1.5 py-0.5">
            Tez orada
          </span>
        ) : open ? (
          <ChevronDown size={14} className="text-ink-subtle shrink-0" />
        ) : (
          <ChevronRight size={14} className="text-ink-subtle shrink-0" />
        )}
      </button>

      {open && !isSoon && (
        <div className="flex flex-col ml-[27px] border-l border-hairline">
          {library.topics.map((topic) => (
            <NavLink
              key={topic.id}
              to={`${basePath}/${topic.id}`}
              className={({ isActive }) =>
                `px-4 py-2 text-[13.5px] transition-colors border-l-2 -ml-px ${
                  isActive
                    ? "border-l-primary text-primary bg-surface-1 font-medium"
                    : "border-l-transparent text-ink-muted hover:text-ink hover:bg-surface-1"
                }`
              }
            >
              {topic.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarSearch({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mx-2 mb-2 relative">
      <Search
        size={15}
        strokeWidth={1.75}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none"
      />
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Mavzu qidirish..."
        className="w-full pl-8 pr-8 py-2 text-[13.5px] bg-surface-1 text-ink placeholder:text-ink-subtle border border-transparent focus:border-primary focus:bg-canvas outline-none transition-colors"
      />
      {query && (
        <button
          onClick={() => onChange("")}
          aria-label="Qidiruvni tozalash"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return allTopicsFlat().filter(
      ({ topic }) =>
        topic.title.toLowerCase().includes(q) ||
        topic.shortDesc.toLowerCase().includes(q),
    );
  }, [q]);

  if (results.length === 0) {
    return (
      <div className="px-5 py-4 text-[13px] text-ink-subtle">
        "{query}" bo'yicha hech narsa topilmadi.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {results.map(({ group, library, topic }) => (
        <NavLink
          key={`${group.id}-${library.id}-${topic.id}`}
          to={`/${group.id}/${library.id}/${topic.id}`}
          className="flex flex-col gap-0.5 mx-2 px-3 py-2.5 text-ink hover:bg-surface-1 transition-colors"
        >
          <span className="text-[13.5px] font-medium">{topic.title}</span>
          <span className="text-[11.5px] text-ink-subtle">
            {group.name} / {library.name}
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export function Sidebar() {
  const [query, setQuery] = useState("");

  return (
    <nav className="flex flex-col h-full overflow-y-auto py-3">
      <SidebarSearch query={query} onChange={setQuery} />

      {query.trim() ? (
        <SearchResults query={query} />
      ) : (
        <>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2.5 mx-2 px-3 py-2.5 mb-2 text-[14px] transition-colors ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-ink hover:bg-surface-1"
              }`
            }
          >
            <LayoutGrid size={17} strokeWidth={1.75} />
            Bosh sahifa
          </NavLink>

          <div className="h-px bg-hairline mx-2 my-2" />

          {groups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="flex flex-col mb-1">
                <div className="flex items-center gap-2 px-5 py-2 text-[11px] uppercase tracking-wider text-ink-subtle">
                  <GroupIcon size={13} strokeWidth={2} />
                  {group.name}
                </div>
                <div className="flex flex-col">
                  {group.libraries.map((lib) => (
                    <LibraryNode key={lib.id} groupId={group.id} library={lib} />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-auto px-5 pt-6 pb-2 flex items-center gap-2 text-[11px] text-ink-subtle">
            <Clock size={12} />
            Doimiy yangilanib boradi
          </div>
        </>
      )}
    </nav>
  );
}
