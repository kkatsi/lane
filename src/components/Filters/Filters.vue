<template>
  <Popover>
    <PopoverTrigger as-child>
      <button>Filters</button>
    </PopoverTrigger>
    <PopoverContent>
      <FiltersPopover />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import Popover from '../ui/popover/Popover.vue'
import PopoverContent from '../ui/popover/PopoverContent.vue'
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue'
import FiltersPopover from './FiltersPopover.vue'
</script>

<style scoped></style>
