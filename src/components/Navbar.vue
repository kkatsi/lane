<template>
  <nav class="flex items-center w-full border-b border-muted py-3 px-4">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem v-for="(routeMatch, index) in matches" :key="routeMatch.label">
          <BreadcrumbLink as-child class="text-base flex items-center gap-2 mr-2 min-w-0">
            <RouterLink :to="routeMatch.to">
              <template v-if="index === 0">
                <Logo class="h-8 w-8" />
                <span class="text-lg font-semibold text-foreground">Lane</span>
              </template>
              <template v-else>
                <span class="block truncate max-w-[220px]">{{ routeMatch.label }}</span>
              </template>
            </RouterLink>
          </BreadcrumbLink>
          <BreadcrumbSeparator v-if="index !== matches.length - 1" class="mr-2">/</BreadcrumbSeparator>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="ml-auto">
      <ModeToggle />
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.svg?component";
import { computed } from "vue";
import { RouterLink, useRoute, useRouter, type RouteRecordName, type RouterLinkProps } from "vue-router";
import ModeToggle from "./ModeToggle.vue";
import Breadcrumb from "./ui/breadcrumb/Breadcrumb.vue";
import BreadcrumbItem from "./ui/breadcrumb/BreadcrumbItem.vue";
import BreadcrumbLink from "./ui/breadcrumb/BreadcrumbLink.vue";
import BreadcrumbList from "./ui/breadcrumb/BreadcrumbList.vue";
import BreadcrumbSeparator from "./ui/breadcrumb/BreadcrumbSeparator.vue";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useCurrentTask } from "@/composables/useCurrentTask.ts";

interface BreadcrumbMatch {
  label: string;
  to: RouterLinkProps["to"];
}

const { name: boardName } = useCurrentBoard();
const { task } = useCurrentTask();
const route = useRoute();
const router = useRouter();

const buildCrumbLabel = (name: RouteRecordName | null) => {
  switch (name) {
    case "board":
      return boardName.value;
    case "boards":
      return "Boards";
    case "new":
      return "Create new board";
    case "task":
      return task.value?.title ?? "Edit Task";
    default:
      return "";
  }
};
const matches = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  const results: BreadcrumbMatch[] = [{ label: "", to: "/" }];
  for (const [index] of segments.entries()) {
    const resolved = router.resolve("/" + segments.slice(0, index + 1).join("/"));
    if (!resolved.name) continue;
    results.push({
      to: { name: resolved.name, params: resolved.params },
      label: buildCrumbLabel(resolved.name),
    });
  }
  return results;
});
</script>
