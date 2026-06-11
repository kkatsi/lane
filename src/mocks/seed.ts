import type { Board, BoardOverview } from "@/types";

export const BOARD_OVERVIEWS_KEY = "lane:boardOverviews";
export const BOARDS_KEY = "lane:boards";

const boardOverviewsSeed: Record<BoardOverview["id"], BoardOverview> = {
  board1: {
    id: "board1",
    name: "Product Roadmap",
    description: "Quarterly initiatives and feature bets across the product surface.",
    tasksCount: "3",
    restAssigneesCount: 0,
    firstTwoAssignees: [
      { id: "maria", name: "Maria", colorId: "red" },
      { id: "nikos", name: "Nikos", colorId: "green" },
    ],
    starred: true,
    updatedAt: "2026-06-10T14:32:00+00:00",
  },
  board2: {
    id: "board2",
    name: "Bug Triage",
    description: "Incoming defects sorted by severity and assigned to the on-call rotation.",
    tasksCount: "2",
    restAssigneesCount: 0,
    firstTwoAssignees: [
      { id: "elena", name: "Elena", colorId: "violet" },
      { id: "yannis", name: "Yannis", colorId: "blue" },
    ],
    starred: false,
    updatedAt: "2026-06-09T09:15:00+00:00",
  },
  board3: {
    id: "board3",
    name: "Design System",
    description: "Component primitives, tokens, and ongoing refactors of the shared UI kit.",
    tasksCount: "2",
    restAssigneesCount: 4,
    firstTwoAssignees: [
      { id: "sofia", name: "Sofia", colorId: "orange" },
      { id: "petros", name: "Petros", colorId: "blue" },
    ],
    starred: true,
    updatedAt: "2026-06-11T08:02:00+00:00",
  },
  board4: {
    id: "board4",
    name: "Q3 Marketing",
    description: "Campaigns, content, and launch comms scheduled for the third quarter.",
    tasksCount: "3",
    restAssigneesCount: 1,
    firstTwoAssignees: [
      { id: "anna", name: "Anna", colorId: "green" },
      { id: "dimitris", name: "Dimitris", colorId: "red" },
    ],
    starred: false,
    updatedAt: "2026-05-30T17:45:00+00:00",
  },
};

const boardsSeed: Record<Board["id"], Board> = {
  board1: {
    id: "board1",
    name: "Product Roadmap",
    starred: true,
    columnOrder: ["to-do", "bugs"],
    columns: {
      "to-do": { id: "to-do", title: "To-Do", taskIds: ["1"] },
      bugs: { id: "bugs", title: "Bugs", taskIds: ["2", "3"] },
    },
    tasks: {
      "1": {
        id: "1",
        title: "No title",
        description: "Lorem",
        assigneeId: "maria",
        dueDate: "2026-05-24T17:28:25+00:00",
        labelIds: ["bug"],
      },
      "2": {
        id: "2",
        title: "This is a title of the ticket 2",
        description: "Ipsum",
        assigneeId: "nikos",
        dueDate: "2026-05-24T17:28:25+00:00",
        labelIds: ["urgent"],
      },
      "3": {
        id: "3",
        title: "This is a title of the ticket 3",
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
      maria: { id: "maria", name: "Maria", colorId: "red" },
      nikos: { id: "nikos", name: "Nikos", colorId: "green" },
    },
  },
  board2: {
    id: "board2",
    name: "Bug Triage",
    starred: false,
    columnOrder: ["open", "in-review"],
    columns: {
      open: { id: "open", title: "Open", taskIds: ["10"] },
      "in-review": { id: "in-review", title: "In Review", taskIds: ["11"] },
    },
    tasks: {
      "10": {
        id: "10",
        title: "Login page crashes on Safari",
        description: "Steps to reproduce attached",
        assigneeId: "elena",
        dueDate: "2026-06-20T12:00:00+00:00",
        labelIds: ["bug"],
      },
      "11": {
        id: "11",
        title: "Date picker off-by-one in DST",
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
      elena: { id: "elena", name: "Elena", colorId: "violet" },
      yannis: { id: "yannis", name: "Yannis", colorId: "blue" },
    },
  },
  board3: {
    id: "board3",
    name: "Design System",
    starred: true,
    columnOrder: ["backlog", "doing"],
    columns: {
      backlog: { id: "backlog", title: "Backlog", taskIds: ["20"] },
      doing: { id: "doing", title: "Doing", taskIds: ["21"] },
    },
    tasks: {
      "20": {
        id: "20",
        title: "Audit spacing tokens",
        description: "Sweep all usages of legacy spacing variables",
        assigneeId: "sofia",
        dueDate: "2026-06-25T12:00:00+00:00",
        labelIds: ["design"],
      },
      "21": {
        id: "21",
        title: "Refactor Button variants",
        description: "Collapse primary/secondary/ghost into a single API",
        assigneeId: "petros",
        dueDate: "2026-06-30T12:00:00+00:00",
        labelIds: ["design", "refactor"],
      },
    },
    labels: {
      design: { id: "design", name: "Design", colorId: "violet" },
      refactor: { id: "refactor", name: "Refactor", colorId: "blue" },
    },
    assignees: {
      sofia: { id: "sofia", name: "Sofia", colorId: "orange" },
      petros: { id: "petros", name: "Petros", colorId: "blue" },
    },
  },
  board4: {
    id: "board4",
    name: "Q3 Marketing",
    starred: false,
    columnOrder: ["ideas", "scheduled", "live"],
    columns: {
      ideas: { id: "ideas", title: "Ideas", taskIds: ["30"] },
      scheduled: { id: "scheduled", title: "Scheduled", taskIds: ["31"] },
      live: { id: "live", title: "Live", taskIds: ["32"] },
    },
    tasks: {
      "30": {
        id: "30",
        title: "Launch teaser blog post",
        description: "Draft is in Notion",
        assigneeId: "anna",
        dueDate: "2026-07-05T12:00:00+00:00",
        labelIds: ["content"],
      },
      "31": {
        id: "31",
        title: "Email campaign for v2",
        description: "Two-step drip, segment by plan",
        assigneeId: "dimitris",
        dueDate: "2026-07-10T12:00:00+00:00",
        labelIds: ["campaign"],
      },
      "32": {
        id: "32",
        title: "Homepage banner update",
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
      anna: { id: "anna", name: "Anna", colorId: "green" },
      dimitris: { id: "dimitris", name: "Dimitris", colorId: "red" },
    },
  },
};

export const seedLocalStorage = () => {
  if (!localStorage.getItem(BOARD_OVERVIEWS_KEY)) {
    localStorage.setItem(BOARD_OVERVIEWS_KEY, JSON.stringify(boardOverviewsSeed));
  }
  if (!localStorage.getItem(BOARDS_KEY)) {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(boardsSeed));
  }
};
