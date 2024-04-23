import type { AnimeResponse } from "~/types/Anime";

export default defineEventHandler(async (event) => {
  try {
    const animes = await $fetch<AnimeResponse>(
      "https://api.jikan.moe/v4/anime"
    );

    return {
      ok: true,
      data: animes,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: error,
    };
  }
});
