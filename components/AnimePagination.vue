<script setup lang="ts">
import type { AnimePagination } from "~/types/Anime";

const props = defineProps<{
    pagination: AnimePagination
}>()
</script>


<template>
    <section>
        <article class="container p-4 mx-auto rounded-lg bg-white/10">
            <div class="flex items-center justify-between ">
                <AppLink to="/previous-page" variant="outline">
                    Página Anterior
                </AppLink>

                <span class="text-white/65">
                    Exibindo {{ pagination.items.per_page }} de {{ pagination.items.total }}
                </span>

                <span class="text-white/65">
                    Página atual: {{ pagination.current_page }}
                </span>

                <AppLink to="/next-page" variant="outline">
                    Proxima Página
                </AppLink>
            </div>
        </article>
    </section>
</template>
