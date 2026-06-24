import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options";
import { useQueryRef } from "./useQueryRef";
import { useSearchQueryRef } from "./useSearchQueryRef";
import { isDefined } from "@/lib/utils";
import { useRoute, useRouter } from "vue-router";

export const useBoardFilters = () => {
  const route = useRoute();
  const router = useRouter();
  const searchQuery = useSearchQueryRef();
  const assigneeIds = useQueryRef("assignee", { type: "array", defaultValue: [] });
  const labelIds = useQueryRef("label", { type: "array", defaultValue: [] });
  const dueDate = useQueryRef("dueDate", {
    values: Object.values(DATE_FILTER_OPTIONS)
      .map((v) => v.id)
      .filter(isDefined),
    defaultValue: DATE_FILTER_OPTIONS.ANYTIME.id,
  });

  const resetFilters = () => {
    router.replace({
      query: { ...route.query, assignee: undefined, label: undefined, dueDate: undefined, q: undefined },
    });
  };

  return { searchQuery, assigneeIds, labelIds, dueDate, resetFilters };
};
