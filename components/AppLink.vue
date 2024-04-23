<script setup lang="ts">
import type { ButtonVariant } from '~/types/Button';

const props = withDefaults(defineProps<{
    to: string,
    variant: ButtonVariant,
}>(), {
    to: "",
    variant: 'primary',
})
</script>

<template>
    <AppButton :to :variant="variant" component="link">
        <slot />
    </AppButton>
</template>
