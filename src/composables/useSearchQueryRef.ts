import { useQueryRef } from "./useQueryRef";

export const useSearchQueryRef = () => useQueryRef("q", { defaultValue: "" });
