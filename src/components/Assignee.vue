<template>
  <div class="flex items-center gap-1">
    <div
      v-if="!!initials"
      :class="
        cn(
          sizeClasses[props.size],
          'rounded-full uppercase flex justify-center items-center border border-muted-foreground',
        )
      "
      :style="{ backgroundColor: color?.background, color: color?.text }"
    >
      {{ initials }}
    </div>
    <div v-else :class="cn(sizeClasses[props.size], 'rounded-full uppercase flex justify-center items-center')">
      <UserX :size="20" />
    </div>
    <span v-if="props.displayFullname" class="text-xs capitalize text-muted-foreground">
      <template v-if="!!initials">
        {{ props.fullName }}
      </template>
      <template v-else>Unassigned</template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { UserX } from "@lucide/vue";
import { computed } from "vue";

interface Props {
  fullName?: string;
  size?: "base" | "sm";
  colorId?: string;
  displayFullname?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  size: "base",
  displayFullname: false,
});

const color = COLORS.find((c) => c.id === props.colorId);
const sizeClasses = {
  sm: "w-5.5 h-5.5 text-xs",
  base: "w-7 h-7 text-sm",
};

const initials = computed(() => {
  if (!props.fullName) return null;
  const [first, last] = props.fullName.split(" ");
  return `${first?.[0]?.toUpperCase() ?? ""}${last?.[0]?.toUpperCase() ?? ""}`;
});
</script>

<style scoped></style>
