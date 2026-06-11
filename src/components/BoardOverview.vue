<template>
  <Card class="rounded-lg overflow-hidden pt-0" as-child>
    <RouterLink :to="{ name: 'board', params: { boardId: props.id } }">
      <div class="h-1.5 w-full mb-3" :style="{ backgroundColor: randomColor?.background }" />
      <CardHeader>
        <CardTitle>
          {{ props.name }}
        </CardTitle>
        <CardAction @click.stop.prevent="toggleStar">
          <Star :size="16" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {{ props.description }}
        </CardDescription>
      </CardContent>
    </RouterLink>
  </Card>
</template>

<script setup lang="ts">
import { COLORS } from '@/constants/colors';
import { getRandomInt } from '@/lib/utils';
import type { BoardOverview } from '@/types';
import Card from './ui/card/Card.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardContent from './ui/card/CardContent.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardAction from './ui/card/CardAction.vue';
import { Star } from '@lucide/vue';

interface Props extends BoardOverview {
}
const props = defineProps<Props>();
const randomColor = COLORS[getRandomInt(COLORS.length - 1)]

const toggleStar = () => {
  console.log('star toggled')
}
</script>

<style scoped></style>
