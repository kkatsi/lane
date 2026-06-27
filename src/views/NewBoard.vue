<template>
  <div
    class="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs"
  />
  <Card
    class="fixed left-1/2 top-[calc(50%+var(--navbar-height)/2)] z-50 w-[calc(100%-2rem)] sm:max-w-md -translate-x-1/2 -translate-y-1/2"
  >
    <div
      class="absolute top-0 left-0 h-1 w-full mb-3"
      :style="{ backgroundColor: COLORS.find((c) => c.id === selectedColorId)?.background }"
    />
    <CardHeader>
      <CardTitle>Create new board</CardTitle>
    </CardHeader>
    <CardContent>
      <form id="new-board-form" @submit="onSubmit" @keydown.enter.exact.prevent="onSubmit">
        <FieldGroup>
          <form.Field name="name">
            <template v-slot="{ field, state }">
              <Field :data-invalid="!state.meta.isValid">
                <FieldLabel :for="field.name">Name</FieldLabel>
                <Input
                  :id="field.name"
                  type="text"
                  placeholder="e.g Mobile App"
                  :name="field.name"
                  :model-value="state.value"
                  @update:model-value="(v) => field.handleChange(v as typeof field.state.value)"
                  :aria-invalid="!state.meta.isValid"
                />
                <FieldError v-if="!state.meta.isValid" :errors="state.meta.errors" />
              </Field>
            </template>
          </form.Field>
          <form.Field name="description">
            <template v-slot="{ field, state }">
              <Field :data-invalid="!state.meta.isValid">
                <FieldLabel :for="field.name">
                  Description
                  <span class="text-xs text-muted-foreground ml-auto">Optional</span>
                </FieldLabel>
                <Textarea
                  :id="field.name"
                  type="text"
                  placeholder="What is the board for?"
                  :name="field.name"
                  :model-value="state.value"
                  @update:model-value="(v) => field.handleChange(v as typeof field.state.value)"
                  class="resize-none"
                  :aria-invalid="!state.meta.isValid"
                />
                <FieldError v-if="!state.meta.isValid" :errors="state.meta.errors" />
              </Field>
            </template>
          </form.Field>
          <form.Field name="colorId">
            <template v-slot="{ field, state }">
              <FieldSet :data-invalid="!state.meta.isValid">
                <FieldLegend variant="label">Color</FieldLegend>
                <RadioGroup
                  :model-value="field.state.value"
                  @update:model-value="(v) => field.handleChange(v as typeof field.state.value)"
                  class="flex gap-2"
                  :aria-invalid="!state.meta.isValid"
                >
                  <FieldLabel
                    v-for="COLOR in COLORS"
                    :key="COLOR.id"
                    :for="`form-radiogroup-${COLOR.id}`"
                    :class="
                      cn(
                        'relative w-5 h-5 rounded-full cursor-pointer ring-offset-2 ring-offset-background',
                        field.state.value === COLOR.id && 'ring-2 ring-primary',
                      )
                    "
                    :style="{ backgroundColor: COLOR.background }"
                  >
                    <RadioGroupItem
                      :id="`form-radiogroup-${COLOR.id}`"
                      :value="COLOR.id"
                      :aria-invalid="!state.meta.isValid"
                      class="sr-only"
                    />
                  </FieldLabel>
                </RadioGroup>
                <FieldError v-if="!state.meta.isValid" :errors="state.meta.errors" />
              </FieldSet>
            </template>
          </form.Field>
          <form.Field name="templateId">
            <template v-slot="{ field, state }">
              <FieldSet :data-invalid="!state.meta.isValid">
                <FieldLegend variant="label">Template</FieldLegend>
                <RadioGroup
                  :model-value="field.state.value"
                  @update:model-value="(v) => field.handleChange(v as typeof field.state.value)"
                  :aria-invalid="!state.meta.isValid"
                  class="gap-0"
                >
                  <Field v-for="TEMPLATE in BOARD_TEMPLATES" :key="TEMPLATE.id" orientation="horizontal">
                    <FieldLabel :for="`form-radiogroup-${TEMPLATE.id}`" class="p-2 rounded-lg cursor-pointer">
                      <RadioGroupItem
                        :id="`form-radiogroup-${TEMPLATE.id}`"
                        :value="TEMPLATE.id"
                        :aria-invalid="!state.meta.isValid"
                      />
                      <FieldContent class="gap-0">
                        <FieldTitle>{{ TEMPLATE.name }}</FieldTitle>
                        <FieldDescription class="text-xs">
                          {{ TEMPLATE.description }}
                        </FieldDescription>
                      </FieldContent>
                    </FieldLabel>
                  </Field>
                </RadioGroup>
                <FieldError v-if="!state.meta.isValid" :errors="state.meta.errors" />
              </FieldSet>
            </template>
          </form.Field>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <span class="flex items-center gap-1 text-muted-foreground text-xs mr-auto">
        <Kbd>
          <CornerDownLeft :size="10" />
          Enter
        </Kbd>
        to create
      </span>
      <RouterLink :to="{ name: 'boards' }" as-child>
        <Button type="button" variant="ghost" class="cursor-pointer" :disabled="isSubmitting">Close</Button>
      </RouterLink>
      <Button class="cursor-pointer" type="submit" form="new-board-form" :disabled="isSubmitting">
        <template v-if="isSubmitting">Creating...</template>
        <template v-else>Create board</template>
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import Field from "@/components/ui/field/Field.vue";
import FieldContent from "@/components/ui/field/FieldContent.vue";
import FieldDescription from "@/components/ui/field/FieldDescription.vue";
import FieldError from "@/components/ui/field/FieldError.vue";
import FieldGroup from "@/components/ui/field/FieldGroup.vue";
import FieldLabel from "@/components/ui/field/FieldLabel.vue";
import FieldLegend from "@/components/ui/field/FieldLegend.vue";
import FieldSet from "@/components/ui/field/FieldSet.vue";
import FieldTitle from "@/components/ui/field/FieldTitle.vue";
import Input from "@/components/ui/input/Input.vue";
import Kbd from "@/components/ui/kbd/Kbd.vue";
import RadioGroup from "@/components/ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "@/components/ui/radio-group/RadioGroupItem.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import { BOARD_TEMPLATES, DEFAULT_BOARD_TEMPLATE_ID } from "@/constants/board-templates";
import { COLORS, DEFAULT_COLOR_ID } from "@/constants/colors";
import { notifyError } from "@/lib/notifyError";
import { cn } from "@/lib/utils";
import { newBoardValidationSchema } from "@/schemas/boardValidationSchema";
import { useBoardsStore } from "@/stores/boards";
import { CornerDownLeft } from "@lucide/vue";
import { useForm } from "@tanstack/vue-form";
import { useRouter } from "vue-router";

const router = useRouter();

const { addBoard } = useBoardsStore();

const form = useForm({
  defaultValues: {
    name: "",
    description: "",
    colorId: DEFAULT_COLOR_ID,
    templateId: DEFAULT_BOARD_TEMPLATE_ID,
  },
  validators: {
    onChange: newBoardValidationSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      const boardId = addBoard(value);
      router.push({ name: "board", params: { boardId } });
    } catch (error) {
      notifyError(error, { actionVerb: "add board" });
    }
  },
});

const selectedColorId = form.useStore((s) => s.values.colorId);
const isSubmitting = form.useStore((s) => s.isSubmitting);

const onSubmit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  form.handleSubmit();
};
</script>

<style scoped></style>
