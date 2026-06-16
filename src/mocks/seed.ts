import type { Board } from "@/types";
import { BOARDS_KEY } from "@/repositories/boards";

const boardsSeed: Record<Board["id"], Board> = {
  board1: {
    id: "board1",
    name: "Product Roadmap",
    description: "Quarterly initiatives and feature bets across the product surface.",
    colorId: "blue",
    starred: true,
    updatedAt: "2026-06-10T14:32:00+00:00",
    columnOrder: ["to-do", "bugs"],
    columns: {
      "to-do": { id: "to-do", title: "To-Do", taskIds: ["1"] },
      bugs: { id: "bugs", title: "Bugs", taskIds: ["2", "3"] },
    },
    tasks: {
      "1": {
        id: "1",
        title: "Investigate flaky checkout flow",
        description: "Lorem",
        assigneeId: "maria",
        dueDate: "2026-05-24T17:28:25+00:00",
        labelIds: ["bug"],
      },
      "2": {
        id: "2",
        title: "Crash on iOS 18 share sheet",
        description: "Ipsum",
        assigneeId: "nikos",
        dueDate: "2026-05-24T17:28:25+00:00",
        labelIds: ["urgent"],
      },
      "3": {
        id: "3",
        title: "Search returns stale results after edit",
        description: "Ipsumidis",
        assigneeId: "maria",
        dueDate: "2026-05-24T17:28:25+00:00",
        labelIds: ["bug", "urgent"],
      },
    },
    labels: {
      bug: { id: "bug", name: "Bug", colorId: "red" },
      urgent: { id: "urgent", name: "urgent", colorId: "orange" },
    },
    assignees: {
      maria: { id: "maria", name: "Maria Papadopoulou", colorId: "red" },
      nikos: { id: "nikos", name: "Nikos Georgiou", colorId: "green" },
    },
  },
  board2: {
    id: "board2",
    name: "Bug Triage",
    description: "Incoming defects sorted by severity and assigned to the on-call rotation.",
    colorId: "red",
    starred: false,
    updatedAt: "2026-06-09T09:15:00+00:00",
    columnOrder: ["open", "in-review"],
    columns: {
      open: { id: "open", title: "Open", taskIds: ["10"] },
      "in-review": { id: "in-review", title: "In Review", taskIds: ["11"] },
    },
    tasks: {
      "10": {
        id: "10",
        title: "Login button unresponsive on Safari",
        description: "Steps to reproduce attached",
        assigneeId: "elena",
        dueDate: "2026-06-20T12:00:00+00:00",
        labelIds: ["bug"],
      },
      "11": {
        id: "11",
        title: "Avatar uploads exceed 10MB cap",
        description: "Reported by two users",
        assigneeId: "yannis",
        dueDate: "2026-06-22T12:00:00+00:00",
        labelIds: ["bug", "urgent"],
      },
    },
    labels: {
      bug: { id: "bug", name: "Bug", colorId: "red" },
      urgent: { id: "urgent", name: "urgent", colorId: "orange" },
    },
    assignees: {
      elena: { id: "elena", name: "Elena Vassiliou", colorId: "violet" },
      yannis: { id: "yannis", name: "Yannis Antoniou", colorId: "blue" },
    },
  },
  board3: {
    id: "board3",
    name: "Design System",
    description: "Component primitives, tokens, and ongoing refactors of the shared UI kit.",
    colorId: "purple",
    starred: true,
    updatedAt: "2026-06-11T08:02:00+00:00",
    columnOrder: ["backlog", "doing"],
    columns: {
      backlog: { id: "backlog", title: "Backlog", taskIds: ["20"] },
      doing: { id: "doing", title: "Doing", taskIds: ["21"] },
    },
    tasks: {
      "20": {
        id: "20",
        title: "Migrate spacing scale to tokens",
        description: "Sweep all usages of legacy spacing variables",
        assigneeId: "sofia",
        dueDate: "2026-06-25T12:00:00+00:00",
        labelIds: ["design", "tokens", "tech-debt", "docs", "polish"],
      },
      "21": {
        id: "21",
        title: "Unify Button variants",
        description: "Collapse primary/secondary/ghost into a single API",
        assigneeId: "petros",
        dueDate: "2026-06-30T12:00:00+00:00",
        labelIds: ["design", "refactor", "components", "breaking", "a11y"],
      },
    },
    labels: {
      design: { id: "design", name: "Design", colorId: "purple" },
      refactor: { id: "refactor", name: "Refactor", colorId: "blue" },
      tokens: { id: "tokens", name: "Tokens", colorId: "pink" },
      a11y: { id: "a11y", name: "Accessibility", colorId: "green" },
      components: { id: "components", name: "Components", colorId: "orange" },
      docs: { id: "docs", name: "Documentation", colorId: "yellow" },
      breaking: { id: "breaking", name: "Breaking", colorId: "red" },
      polish: { id: "polish", name: "Polish", colorId: "pink" },
      "tech-debt": { id: "tech-debt", name: "Tech Debt", colorId: "gray" },
      performance: { id: "performance", name: "Performance", colorId: "blue" },
    },
    assignees: {
      sofia: { id: "sofia", name: "Sofia Markou", colorId: "orange" },
      petros: { id: "petros", name: "Petros Stefanidis", colorId: "blue" },
    },
  },
  board4: {
    id: "board4",
    name: "Q3 Marketing",
    description: "Campaigns, content, and launch comms scheduled for the third quarter.",
    colorId: "green",
    starred: false,
    updatedAt: "2026-05-30T17:45:00+00:00",
    columnOrder: ["ideas", "scheduled", "live"],
    columns: {
      ideas: { id: "ideas", title: "Ideas", taskIds: ["30"] },
      scheduled: { id: "scheduled", title: "Scheduled", taskIds: ["31"] },
      live: { id: "live", title: "Live", taskIds: ["32"] },
    },
    tasks: {
      "30": {
        id: "30",
        title: "Launch blog post for v2 features",
        description: "Draft is in Notion",
        assigneeId: "anna",
        dueDate: "2026-07-05T12:00:00+00:00",
        labelIds: ["content"],
      },
      "31": {
        id: "31",
        title: "Onboarding email sequence",
        description: "Two-step drip, segment by plan",
        assigneeId: "dimitris",
        dueDate: "2026-07-10T12:00:00+00:00",
        labelIds: ["campaign"],
      },
      "32": {
        id: "32",
        title: "Refresh landing page hero",
        description: "Swap hero image for the new product shot",
        assigneeId: "anna",
        dueDate: null,
        labelIds: ["content", "urgent"],
      },
    },
    labels: {
      content: { id: "content", name: "Content", colorId: "green" },
      campaign: { id: "campaign", name: "Campaign", colorId: "violet" },
      urgent: { id: "urgent", name: "Urgent", colorId: "orange" },
    },
    assignees: {
      anna: { id: "anna", name: "Anna Christou", colorId: "green" },
      dimitris: { id: "dimitris", name: "Dimitris Pappas", colorId: "red" },
    },
  },
};

export const seedLocalStorage = () => {
  if (!localStorage.getItem(BOARDS_KEY)) {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(boardsSeed));
  }
};
