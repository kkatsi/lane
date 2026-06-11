import type { Board, BoardOverview } from "@/types";

export const BOARD_OVERVIEWS_KEY = "lane:boardOverviews";
export const BOARDS_KEY = "lane:boards";

const boardOverviewsSeed: Record<BoardOverview["id"], BoardOverview> = {
  board1: {
    id: "board1",
    name: "Product Roadmap",
    tasksCount: "3",
    restAssigneesCount: 0,
    firstTwoAssignees: [
      { id: "maria", name: "Maria", colorId: "red" },
      { id: "nikos", name: "Nikos", colorId: "green" },
    ],
    updatedAt: "2026-06-10T14:32:00+00:00",
  },
  board2: {
    id: "board2",
    name: "Bug Triage",
    tasksCount: "2",
    restAssigneesCount: 0,
    firstTwoAssignees: [
      { id: "elena", name: "Elena", colorId: "violet" },
      { id: "yannis", name: "Yannis", colorId: "blue" },
    ],
    updatedAt: "2026-06-09T09:15:00+00:00",
  },
};

const boardsSeed: Record<Board["id"], Board> = {
  board1: {
    id: "board1",
    name: "Product Roadmap",
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
};

export const seedLocalStorage = () => {
  if (!localStorage.getItem(BOARD_OVERVIEWS_KEY)) {
    localStorage.setItem(BOARD_OVERVIEWS_KEY, JSON.stringify(boardOverviewsSeed));
  }
  if (!localStorage.getItem(BOARDS_KEY)) {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(boardsSeed));
  }
};
