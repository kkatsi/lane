<template>
  <Card as-child class="border border-muted-foreground border-dashed">
    <RouterLink :to="{ name: 'new-board' }" class="h-full flex flex-col items-center justify-center gap-2">
      <button
        class="cursor-pointer w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
        <Plus />
      </button>
      <CardContent class="flex flex-col items-center">
        <CardTitle>
          Create new board...
        </CardTitle>
        <CardDescription>
          From scratch or template
        </CardDescription>
      </CardContent>
    </RouterLink>
  </Card>

</template>

<script setup lang="ts">
import { Plus } from '@lucide/vue';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardDescription from './ui/card/CardDescription.vue';
</script>

<style scoped></style>
