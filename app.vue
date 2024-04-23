<script setup lang="ts">
import type { Anime as AnimeType, AnimePagination as AnimePaginationType } from "~/types/Anime";
import AnimePagination from "./components/AnimePagination.vue";

const query = ref<string>("")
const { data: animes } = await useFetch<{
  data: {
    data: AnimeType[],
    pagination: AnimePaginationType,
  }
}>("/api/animes")
const pagination = animes.value!.data.pagination
const animes_list = animes.value!.data.data

async function search() {
  await $fetch<AnimeType>(`/api/animes?search=${query.value}`)
}
</script>

<template>
  <div class="min-h-screen bg-black text-white/85">
    <div class="flex items-center h-16 bg-white/10">
      <header class="container flex justify-between mx-auto">
        <h1 class="text-3xl">
          <AppLink to="/" variant="link">Track Animes</AppLink>
        </h1>

        <nav class="flex items-center gap-4">
          <AppLink to="/" variant="primary">
            Início
          </AppLink>

          <form @submit.prevent="search">
            <input type="search" v-model="query" placeholder="Pesquisar anime..."
              class="px-3 py-2 border-2 rounded border-black/10 bg-white/15" />
          </form>

          <AppLink to="/login" variant="outline">
            Entrar
          </AppLink>
        </nav>
      </header>
    </div>

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
  </div>
</template>
