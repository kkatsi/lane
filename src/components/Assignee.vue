<template>
  <div :class="cn('flex items-center gap-1 text-muted-foreground', props.class)">
    <div
      v-if="!!initials"
      class="w-5.5 h-5.5 text-xs rounded-full uppercase flex justify-center items-center border border-muted-foreground'"
      :style="{ backgroundColor: color?.background, color: color?.text }"
    >
      {{ initials }}
    </div>
    <div
      v-else
      :class="
        cn(
          !initials && 'text-muted-foreground',
          'w-5.5 h-5.5 text-xs rounded-full uppercase flex justify-center items-center',
        )
      "
    >
      <UserX :size="20" />
    </div>
    <span
      v-if="props.displayFullname"
      :class="cn(textSizeClasses[props.size], 'capitalize', !initials && 'text-muted-foreground')"
      v-html="highlight"
    />
  </div>
</template>

<script setup lang="ts">
import { useHighlightedText } from "@/composables/useHighlightedText";
import { useSearchQuery } from "@/composables/useSearchQuery";
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { UserX } from "@lucide/vue";
import { computed, type HTMLAttributes } from "vue";

interface Props {
  fullName?: string;
  size?: "base" | "lg";
  colorId?: string;
  displayFullname?: boolean;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  size: "base",
  displayFullname: false,
});

const { injectSearchQuery } = useSearchQuery();
const searchQuery = injectSearchQuery();
const highlight = useHighlightedText(searchQuery, () => props.fullName ?? "Unassigned");

const color = computed(() => COLORS.find((c) => c.id === props.colorId));
const textSizeClasses = {
  base: "text-xs",
  lg: "text-sm",
};

const initials = computed(() => {
  if (!props.fullName) return null;
  const [first, last] = props.fullName.split(" ");
  return `${first?.[0]?.toUpperCase() ?? ""}${last?.[0]?.toUpperCase() ?? ""}`;
});
</script>

<style scoped></style>
