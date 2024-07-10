export const useWeatherCodesStore = defineStore("weathercode", {
  getters: {
    getIcon: (state) => (code: number) => Object.keys(state.codes).find((key) => state.codes[key]?.values?.includes(code)) ?? "meteocons:code-orange-fill",
    getName: (state) => (code: number) => state.codes[Object.keys(state.codes).find((key) => state.codes[key]?.values?.includes(code)) ?? "meteocons:code-orange-fill"]?.name
  },
  state: () => ({
    codes: {
      "meteocons:clear-day-fill": {
        name: "Чистое небо",
        values: [0, 1]
      },
      "meteocons:code-orange-fill": {
        name: "Ошибка получения погоды",
        values: []
      },
      "meteocons:extreme-day-snow-fill": {
        name: "Мокрый снег",
        values: [85, 86]
      },
      "meteocons:extreme-rain-fill": {
        name: "Проливной дождь",
        values: [80, 81, 82]
      },
      "meteocons:fog-fill": {
        name: "Туман",
        values: [45, 48]
      },
      "meteocons:haze-fill": {
        name: "Град",
        values: [77]
      },
      "meteocons:overcast-drizzle-fill": {
        name: "Изморось",
        values: [51, 53, 55]
      },
      "meteocons:overcast-snow-fill": {
        name: "Ледяная изморось",
        values: [56, 57]
      },
      "meteocons:partly-cloudy-day-fill": {
        name: "Облачно",
        values: [2, 3]
      },
      "meteocons:rain-fill": {
        name: "Дождь",
        values: [61, 63, 65]
      },
      "meteocons:snowflake-fill": {
        name: "Снег",
        values: [71, 73, 75]
      },
      "meteocons:thermometer-raindrop-fill": {
        name: "Ледяной дождь",
        values: [66, 67]
      },
      "meteocons:thunderstorms-day-extreme-fill": {
        name: "Гроза с градом",
        values: [96, 99]
      },
      "meteocons:thunderstorms-day-overcast-fill": {
        name: "Гроза",
        values: [95]
      },
    } as { [key: string]: { values: number[], name: string } }

  }),
});