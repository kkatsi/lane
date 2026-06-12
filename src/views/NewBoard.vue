<template>
  <div
    class="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs" />
  <Card
    class="fixed left-1/2 top-[calc(50%+var(--navbar-height)/2)] z-50 w-[calc(100%-2rem)] sm:max-w-md -translate-x-1/2 -translate-y-1/2">
    <div class="absolute top-0 left-0 h-1 w-full mb-3"
      :style="{ backgroundColor: COLORS.find(c => c.id === values.colorId)?.background }" />
    <CardHeader>
      <CardTitle>Create new board</CardTitle>
    </CardHeader>
    <CardContent>
      <form id="new-board-form">
        <FieldGroup>
          <VeeField v-slot="{ componentField, errors }" name="name">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="name">
                Name
              </FieldLabel>
              <Input id="name" type="text" placeholder="e.g Mobile App" v-bind="componentField" />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ componentField, errors }" name="description">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="name">
                Description
                <span class="text-xs text-muted-foreground ml-auto">Optional</span>
              </FieldLabel>
              <Textarea id="description" type="text" placeholder="What is the board for?" v-bind="componentField"
                class="resize-none" />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ componentField, errors, value }" name="colorId">
            <FieldSet :data-invalid="!!errors.length">
              <FieldLegend variant="label">
                Color
              </FieldLegend>
              <RadioGroup v-bind="componentField" class="flex gap-2" :aria-invalid="!!errors.length">
                <FieldLabel v-for="COLOR in COLORS" :key="COLOR.id" :for="`form-vee-radiogroup-${COLOR.id}`" :class="cn(
                  'relative w-5 h-5 rounded-full cursor-pointer ring-offset-2 ring-offset-background',
                  value === COLOR.id && 'ring-2 ring-primary')" :style="{ backgroundColor: COLOR.background }">
                  <RadioGroupItem :id="`form-vee-radiogroup-${COLOR.id}`" :value="COLOR.id"
                    :aria-invalid="!!errors.length" class="sr-only" />
                </FieldLabel>
              </RadioGroup>
              <FieldError v-if="errors.length" :errors="errors" />
            </FieldSet>
          </VeeField>
          <VeeField v-slot="{ componentField, errors }" name="templateId">
            <FieldSet :data-invalid="!!errors.length">
              <FieldLegend variant="label">
                Template
              </FieldLegend>
              <RadioGroup v-bind="componentField" :aria-invalid="!!errors.length" class="gap-0">
                <Field v-for="TEMPLATE in BOARD_TEMPLATES" :key="TEMPLATE.id" orientation="horizontal">
                  <FieldLabel :for="`form-vee-radiogroup-${TEMPLATE.id}`" class="p-2 rounded-lg cursor-pointer">
                    <RadioGroupItem :id="`form-vee-radiogroup-${TEMPLATE.id}`" :value="TEMPLATE.id"
                      :aria-invalid="!!errors.length" />
                    <FieldContent class="gap-0">
                      <FieldTitle>{{ TEMPLATE.name }}</FieldTitle>
                      <FieldDescription class="text-xs">
                        {{ TEMPLATE.description }}
                      </FieldDescription>
                    </FieldContent>
                  </FieldLabel>
                </Field>
              </RadioGroup>
              <FieldError v-if="errors.length" :errors="errors" />
            </FieldSet>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <RouterLink :to="{ name: 'boards' }" as-child>
        <Button type="button" variant="ghost" class="cursor-pointer">
          Close
        </Button>
      </RouterLink>
      <Button class="cursor-pointer" type="submit" form="new-board-form">
        Create board
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import Field from '@/components/ui/field/Field.vue';
import FieldContent from '@/components/ui/field/FieldContent.vue';
import FieldDescription from '@/components/ui/field/FieldDescription.vue';
import FieldError from '@/components/ui/field/FieldError.vue';
import FieldGroup from '@/components/ui/field/FieldGroup.vue';
import FieldLabel from '@/components/ui/field/FieldLabel.vue';
import FieldLegend from '@/components/ui/field/FieldLegend.vue';
import FieldSet from '@/components/ui/field/FieldSet.vue';
import FieldTitle from '@/components/ui/field/FieldTitle.vue';
import Input from '@/components/ui/input/Input.vue';
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue';
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { BOARD_TEMPLATES } from '@/constants/board-templates';
import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { useForm, Field as VeeField } from 'vee-validate';

const { values } = useForm({
  initialValues: {
    name: '',
    description: '',
    colorId: COLORS[COLORS.length - 1]?.id,
    templateId: BOARD_TEMPLATES[BOARD_TEMPLATES.length - 1]?.id
  },
})
</script>

<style scoped></style>
