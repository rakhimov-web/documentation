import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Clock, LayoutGrid } from "lucide-react";
import { groups } from "../data/groups";

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

export function Sidebar() {
  return (
    <nav className="flex flex-col h-full overflow-y-auto py-3">
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
    </nav>
  );
}
