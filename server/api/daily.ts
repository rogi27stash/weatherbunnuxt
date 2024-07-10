import type { WeatherTodayForecast } from "~~/types/weather.type";

export default defineEventHandler(async (event) => {
  const { date, lat, lon } = getQuery(event);
  if (!lon || !lat) return null
  const req = await $fetch<WeatherTodayForecast>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}${!date ? "&current=temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,cloud_cover,surface_pressure,wind_speed_10m" : ""}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,cloud_cover,wind_speed_10m,uv_index,relative_humidity_950hPa&daily=sunrise,sunset&wind_speed_unit=ms&timezone=Europe%2FMoscow${!date ? "&forecast_days=1" : `&start_date=${date}&end_date=${date}`}`)
  return req;
})