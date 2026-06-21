<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui";
import { computed, useTemplateRef, type HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { DialogDescription, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);

const innerRef = useTemplateRef<{ $el: HTMLElement } | null>("innerRef");
defineExpose({ element: computed(() => innerRef.value?.$el ?? null) });
</script>

<template>
  <DialogDescription
    ref="innerRef"
    data-slot="dialog-description"
    v-bind="forwardedProps"
    :class="
      cn(
        'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
        props.class,
      )
    "
  >
    <slot />
  </DialogDescription>
</template>
