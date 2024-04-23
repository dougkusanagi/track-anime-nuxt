import type { AnimeResponse } from "~/types/Anime";
import * as z from "valibot";

const animes_schema = z.object({
  mal_id: z.nullable(z.number()),
  url: z.string(),
  images: z.object({
    jpg: z.object({
      image_url: z.string(),
      small_image_url: z.string(),
      large_image_url: z.string(),
    }),
    webp: z.object({
      image_url: z.string(),
      small_image_url: z.string(),
      large_image_url: z.string(),
    }),
  }),
  titles: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
    })
  ),
  title: z.string(),
  title_english: z.nullable(z.string()),
  title_japanese: z.string(),
  title_synonyms: z.array(z.string()),
  type: z.string(),
  source: z.string(),
  episodes: z.nullable(z.number()),
  status: z.string(),
  airing: z.boolean(),
  aired: z.object({
    from: z.nullable(z.string()),
    to: z.nullable(z.string()),
    prop: z.object({
      from: z.object({
        day: z.nullable(z.number()),
        month: z.nullable(z.number()),
        year: z.nullable(z.number()),
      }),
      to: z.object({
        day: z.nullable(z.number()),
        month: z.nullable(z.number()),
        year: z.nullable(z.number()),
      }),
    }),
    string: z.string(),
  }),
  duration: z.string(),
  rating: z.string(),
  score: z.number(),
  scored_by: z.number(),
  rank: z.number(),
  popularity: z.number(),
  members: z.number(),
  favorites: z.number(),
  synopsis: z.string(),
  background: z.nullable(z.string()),
  season: z.nullable(z.string()),
  year: z.nullable(z.number()),
  broadcast: z.object({
    day: z.nullable(z.string()),
    time: z.nullable(z.string()),
    timezone: z.nullable(z.string()),
    string: z.nullable(z.string()),
  }),
  producers: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  licensors: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  studios: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  genres: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  explicit_genres: z.nullable(
    z.array(
      z.object({
        mal_id: z.number(),
        type: z.string(),
        name: z.string(),
        url: z.string(),
      })
    )
  ),
  themes: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  demographics: z.nullable(
    z.array(
      z.object({
        mal_id: z.number(),
        type: z.string(),
        name: z.string(),
        url: z.string(),
      })
    )
  ),
});

const animes_pagination_schema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  current_page: z.number(),
  items: z.object({
    count: z.number(),
    total: z.number(),
    per_page: z.number(),
  }),
});

const animes_response_schema = z.object({
  pagination: animes_pagination_schema,
  data: z.array(animes_schema),
});

export default defineCachedEventHandler(
  async (event) => {
    console.log("Refreshing animes cache");

    try {
      const animes: AnimeResponse = await $fetch(
        "https://api.jikan.moe/v4/anime"
      );

      return {
        ok: true,
        data: z.parse(animes_response_schema, animes),
      };
    } catch (e: z.SchemaIssue | any) {
      console.log(e.issues.map((issue: z.SchemaIssue) => issue.path));
      return [];
    }
  },
  {
    base: "animes",
    getKey: () => "animes",
    shouldBypassCache: () => false,
    maxAge: 1000 * 60 * 60 * 24,
    staleMaxAge: 1000 * 60 * 60 * 24,
  }
);
