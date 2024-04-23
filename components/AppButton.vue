<script setup lang="ts">
import { NuxtLink } from '#components';
import type { ButtonVariant } from '~/types/Button';

const props = withDefaults(defineProps<{
    to: string
    variant: ButtonVariant
    component: "link" | "button"
}>(), {
    to: "",
    variant: 'primary',
    component: "button"
})

const component = computed(() => props.component === "link" ? NuxtLink : "button")

const variantStyles: Record<ButtonVariant, string> = {
    primary: "px-5 py-2 bg-indigo-900 rounded text-white hover:bg-indigo-800 hover:text-white/75 transition-all duration-300",
    outline: "px-5 py-2 transition-all duration-300 border-2 border-indigo-700 rounded hover:bg-indigo-900/35 hover:text-white/75",
    destructive: "px-5 py-2 bg-red-900 rounded text-white hover:bg-red-800 hover:text-white/75 transition-all duration-300",
    link: "text-white hover:text-white/75 transition-all duration-300 "
}
</script>

<template>
    <component :class="variantStyles[variant]" :to="to">
        <slot />
    </component>
</template>
