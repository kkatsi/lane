<template>
  <Card class="rounded-lg overflow-hidden p-0" as-child>
    <RouterLink :to="{ name: 'board', params: { boardId: props.id } }">
      <div class="h-1 w-full mb-3" :style="{ backgroundColor: randomColor?.background }" />
      <CardHeader>
        <CardTitle>
          {{ props.name }}
        </CardTitle>
        <CardAction @click.stop.prevent="toggleStar">
          <Star :size="16" :class="props.starred ? 'fill-yellow-400 text-yellow-400' : 'fill-none'" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {{ props.description }}
          <div class="flex items-center justify-between my-3">
            <div class="flex items-center gap-1" v-if="props.tasksCount > 0">
              <LayoutList :size="14" />
              {{ props.tasksCount }} {{ props.tasksCount > 1 ? 'tasks' : 'task' }}
            </div>
            <div class="ml-auto flex items-center">
              <Initials class="-ml-1" v-for="assignee in firstTwoAssignees" :key="assignee.id" size="sm"
                :full-name="assignee.name" :color-id="assignee.colorId" />
              <span v-if="props.restAssigneesCount > 0" class="text-muted-foreground text-sm ml-1">+{{
                props.restAssigneesCount }}</span>
            </div>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter class="bg-card text-xs text-muted-foreground">
        Updated {{ timeAgo }}
      </CardFooter>
    </RouterLink>
  </Card>
</template>

<script setup lang="ts">
import { COLORS } from '@/constants/colors';
import { getRandomInt } from '@/lib/utils';
import { useBoardsStore } from '@/stores/boards.ts';
import type { BoardOverview } from '@/types';
import { LayoutList, Star } from '@lucide/vue';
import { useTimeAgo } from '@vueuse/core';
import Initials from './Initials.vue';
import Card from './ui/card/Card.vue';
import CardAction from './ui/card/CardAction.vue';
import CardContent from './ui/card/CardContent.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardFooter from './ui/card/CardFooter.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';

interface Props extends BoardOverview {
}
const props = defineProps<Props>();

const { toggleStarredBoard } = useBoardsStore();

const randomColor = COLORS[getRandomInt(COLORS.length - 1)]

const toggleStar = () => {
  toggleStarredBoard(props.id)
}

const timeAgo = useTimeAgo(() => props.updatedAt);
</script>

<style scoped></style>
