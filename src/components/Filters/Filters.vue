<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <Filter />
        Filter
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <FiltersPopover />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Filter } from "@lucide/vue";
import Button from "../ui/button/Button.vue";
import Popover from "../ui/popover/Popover.vue";
import PopoverContent from "../ui/popover/PopoverContent.vue";
import PopoverTrigger from "../ui/popover/PopoverTrigger.vue";
import FiltersPopover from "./FiltersPopover.vue";
</script>

<style scoped></style>
