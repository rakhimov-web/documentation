import type { LucideIcon } from "lucide-react";

export type CodeExample = {
  caption?: string;
  language?: string;
  code: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; example: CodeExample }
  | { type: "note"; variant: "info" | "warning" | "success"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type Section = {
  id: string;
  heading: string;
  blocks: ContentBlock[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Topic = {
  id: string;
  title: string;
  shortDesc: string;
  icon: LucideIcon;
  readTime: string;
  status?: "ready" | "soon";
  sections: Section[];
  quiz?: QuizQuestion[];
};

export type LibraryEntry = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  status?: "ready" | "soon";
  topics: Topic[];
};

export type TechGroup = {
  id: string;
  name: string;
  icon: LucideIcon;
  libraries: LibraryEntry[];
};
