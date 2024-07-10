import type { WeatherWeeklyForecast } from "~~/types/weather.type";

export default defineEventHandler(async (event) => {
  const { lat, lon } = getQuery(event);
  if (!lon || !lat) return null
  const req = await $fetch<WeatherWeeklyForecast>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,apparent_temperature_max`)
  return req;
})
