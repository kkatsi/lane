import { computed, toValue, type MaybeRefOrGetter } from "vue";

const escape = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export const useHighlightedText = (query: MaybeRefOrGetter<string | undefined>, content: MaybeRefOrGetter<string>) => {
  const highlight = computed(() => {
    const safe = escape(toValue(content));
    const value = toValue(query)?.trim();
    if (!value) return safe;
    const q = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // escape regex
    return safe.replace(new RegExp(`(${q})`, "gi"), '<mark class="highlight">$1</mark>');
  });

  return highlight;
};
