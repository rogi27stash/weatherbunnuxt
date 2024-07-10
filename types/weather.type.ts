export type WeatherWeeklyForecast = {
  latitude: number,
  longitude: number,
  daily: {
    time: string[]
    weather_code: number[],
    temperature_2m_max: number[],
    apparent_temperature_max: number[]
  },
}

export type WeatherPerDayForecast = {
  latitude: number,
  longitude: number,
  "daily": {
    "sunrise": string[],
    "sunset": string[],
  },
  hourly: WeatherHourlyForecast,
}

export type WeatherTodayForecast = {
  current?: WeatherCurrentForecast,
} & WeatherPerDayForecast

export type WeatherHourlyForecast = {
  "time": string[],
  "temperature_2m": number[],
  "apparent_temperature": number[],
  "precipitation_probability": number[],
  "weather_code": number[],
  "surface_pressure": number[],
  "cloud_cover": number[],
  "wind_speed_10m": number[],
  "uv_index": number[],
  "relative_humidity_950hPa": number[],
}

export type WeatherCurrentForecast = {
  "temperature_2m": number,
  "relative_humidity_2m": number,
  "apparent_temperature": number,
  "rain": number,
  "weather_code": number,
  "cloud_cover": number,
  "surface_pressure": number,
  "wind_speed_10m": number,
}

export type windDirectionType =
  | "N"
  | "NE"
  | "E"
  | "SE"
  | "S"
  | "SW"
  | "W"
  | "NW";