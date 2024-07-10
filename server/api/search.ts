import type { LocationInfoType } from "~~/types/location.type";

export default defineEventHandler(async (event) => {
  const query = getQuery(event).query ?? "";
  if (!query) return null
  const req = await $fetch<LocationInfoType[]>(`https://nominatim.openstreetmap.org/search.php?city=${query}&viewbox=17.34805%2C64.47374%2C138.10977%2C23.00088&accept-language=ru&limit=5&format=jsonv2`)
  return req as unknown as LocationInfoType[] ?? null;
})
