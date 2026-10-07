export interface BoardItem {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  time: string;
}

export interface BoardData {
  title: string;
  todo: BoardItem[];
  inProgress: BoardItem[];
  done: BoardItem[];
}

export const SAMPLE_BOARDS: Record<"sprint" | "roadmap", BoardData> = {
  sprint: {
    title: "Sprint 42 · Core Platform",
    todo: [
      {
        id: 1,
        title: "Database schema migration",
        tag: "Backend",
        tagColor: "bg-blue-100 text-blue-700",
        time: "2d",
      },
      {
        id: 2,
        title: "Refactor auth token refresh",
        tag: "Security",
        tagColor: "bg-purple-100 text-purple-700",
        time: "1d",
      },
    ],
    inProgress: [
      {
        id: 3,
        title: "Stripe webhook idempotency",
        tag: "Billing",
        tagColor: "bg-amber-100 text-amber-800",
        time: "In Review",
      },
      {
        id: 4,
        title: "Column dropzone indicators",
        tag: "UI",
        tagColor: "bg-sky-100 text-sky-700",
        time: "Active",
      },
    ],
    done: [
      {
        id: 5,
        title: "Vite 8 & Tailwind v4 upgrade",
        tag: "DevOps",
        tagColor: "bg-emerald-100 text-emerald-800",
        time: "Merged",
      },
      {
        id: 6,
        title: "Multi-board drag & drop engine",
        tag: "Frontend",
        tagColor: "bg-emerald-100 text-emerald-800",
        time: "Shipped",
      },
    ],
  },
  roadmap: {
    title: "Q4 Product Roadmap",
    todo: [
      {
        id: 10,
        title: "Export boards to JSON / Markdown",
        tag: "Feature",
        tagColor: "bg-blue-100 text-blue-700",
        time: "Nov",
      },
      {
        id: 11,
        title: "Keyboard navigation shortcuts",
        tag: "A11y",
        tagColor: "bg-purple-100 text-purple-700",
        time: "Dec",
      },
    ],
    inProgress: [
      {
        id: 12,
        title: "Real-time websocket presence",
        tag: "Infra",
        tagColor: "bg-amber-100 text-amber-800",
        time: "WIP",
      },
    ],
    done: [
      {
        id: 13,
        title: "Initial release v1.0",
        tag: "Milestone",
        tagColor: "bg-emerald-100 text-emerald-800",
        time: "Oct",
      },
      {
        id: 14,
        title: "Custom pastel status palettes",
        tag: "Design",
        tagColor: "bg-emerald-100 text-emerald-800",
        time: "Oct",
      },
    ],
  },
};

export const VALUE_PROPS = [
  "Zero configuration",
  "Smooth HTML5 dragging",
  "Instant local reactivity",
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Capture Ideas",
    description:
      "Quickly dump tasks into your backlog. Title and describe them without getting bogged down in 20 custom fields.",
  },
  {
    step: "02",
    title: "Prioritize & Move",
    description:
      "Drag cards into your active lane. Visual indicators highlight valid drop slots as you hover.",
  },
  {
    step: "03",
    title: "Ship Without Noise",
    description:
      "Celebrate finished milestones in the completed stream and keep your team aligned effortlessly.",
  },
];
