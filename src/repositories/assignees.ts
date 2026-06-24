import type { Assignee } from "@/types";

export const ASSIGNEES_KEY = "lane:assignees";

const loadAll = (): Record<Assignee["id"], Assignee> =>
  JSON.parse(localStorage.getItem(ASSIGNEES_KEY) ?? "{}");

const saveAll = (assignees: Record<Assignee["id"], Assignee>) =>
  localStorage.setItem(ASSIGNEES_KEY, JSON.stringify(assignees));

export const assigneesRepo = {
  list: loadAll,
  save: (assignee: Assignee) => {
    const assignees = loadAll();
    assignees[assignee.id] = assignee;
    saveAll(assignees);
  },
};
