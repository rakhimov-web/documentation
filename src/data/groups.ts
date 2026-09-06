import { Boxes, Database, Hexagon } from "lucide-react";
import type { TechGroup } from "./types";
import { mongooseOverviewTopic } from "./topic-mongoose-overview";
import { middlewareTopic } from "./topic-middleware";

export const groups: TechGroup[] = [
  {
    id: "nodejs",
    name: "Node.js",
    icon: Hexagon,
    libraries: [
      {
        id: "mongoose",
        name: "Mongoose",
        tagline: "MongoDB uchun ODM kutubxonasi",
        description:
          "Node.js'da MongoDB bilan sxema, validatsiya, middleware va query builder orqali ishlash imkonini beruvchi kutubxona.",
        icon: Boxes,
        accent: "#0f62fe",
        status: "ready",
        topics: [mongooseOverviewTopic, middlewareTopic],
      },
      {
        id: "mongodb",
        name: "MongoDB",
        tagline: "Hujjat asosidagi NoSQL baza",
        description:
          "Mongoose orqasida turgan hujjat-orientatsiyalashgan (document-oriented) ma'lumotlar bazasi.",
        icon: Database,
        accent: "#8c8c8c",
        status: "soon",
        topics: [],
      },
    ],
  },
];

export function findLibrary(groupId: string, libId: string) {
  const group = groups.find((g) => g.id === groupId);
  const library = group?.libraries.find((l) => l.id === libId);
  return { group, library };
}

export function findTopic(groupId: string, libId: string, topicId: string) {
  const { group, library } = findLibrary(groupId, libId);
  const topic = library?.topics.find((t) => t.id === topicId);
  return { group, library, topic };
}

export function allTopicsFlat() {
  return groups.flatMap((g) =>
    g.libraries.flatMap((l) =>
      l.topics.map((t) => ({ group: g, library: l, topic: t })),
    ),
  );
}
