import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useQueryRef = (key: string, settings?: { defaultValue?: string }) => {
  const route = useRoute();
  const router = useRouter();
  const queryRef = computed({
    get: () => (route.query[key] as string) ?? settings?.defaultValue ?? "",
    set: (val) =>
      router.replace({
        query: {
          ...route.query,
          [key]: val || undefined,
        },
      }),
  });

  return queryRef;
};
