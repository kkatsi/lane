<template>
  <div v-if="!!initials"
    :class="cn(sizeClasses[props.size], 'rounded-full uppercase flex justify-center items-center border border-muted-foreground')"
    :style="{ backgroundColor: color?.background, color: color?.text }">
    {{ initials }}
  </div>
  <div v-else :class="cn(sizeClasses[props.size], 'rounded-full uppercase flex justify-center items-center')">
    <UserX />
  </div>
</template>

<script setup lang="ts">
import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { UserX } from '@lucide/vue';
import { computed } from 'vue';

interface Props {
  fullName?: string;
  size?: 'base' | 'sm'
  colorId?: string;
}
const props = withDefaults(
  defineProps<Props>(), {
  size: 'base'
}
)

const color = COLORS.find(c => c.id === props.colorId);
const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  base: 'w-7 h-7 text-sm'
}

const initials = computed(() => {
  if (!props.fullName) return null;
  const [first, last] = props.fullName.split(' ')
  return `${first?.[0]?.toUpperCase() ?? ''}${last?.[0]?.toUpperCase() ?? ''}`
})

</script>

<style scoped></style>
