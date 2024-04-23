<script setup lang="ts">
const query = ref("")
const search = () => {
    console.log(query.value)
}
</script>

<template>
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
</template>
