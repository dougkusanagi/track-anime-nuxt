<script setup lang="ts">
import AnimePagination from "@/components/AnimePagination.vue";
import type { Anime as AnimeType, AnimePagination as AnimePaginationType } from "~/types/Anime";

const { data: animes } = await useFetch<{
    data: {
        data: AnimeType[],
        pagination: AnimePaginationType,
    }
}>("/api/animes")
const pagination = animes.value!.data.pagination
const animes_list = animes.value!.data.data
</script>

<template>
    <AnimePagination class="mt-16" :pagination="pagination" />

    <main class="container p-4 mx-auto mt-4 rounded-lg bg-white/10">
        <h2 class="text-2xl">Lista de Animes</h2>

        <section class="grid grid-cols-7 gap-4 mt-4">
            <div class="mb-4 h-96" v-for="anime in animes_list">
                <!-- Anime Card -->
                <img class="bg-cover h-80" :src="anime.images.webp.image_url" />

                <div class="mt-2">
                    <input class="w-full" type="number" value="0" />
                </div>

                <p class="mt-1 text-sm text-center">{{ anime.title }}</p>
            </div>
        </section>
    </main>

    <AnimePagination class="mt-4 pb-28" :pagination="pagination" />
</template>
