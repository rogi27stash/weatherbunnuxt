import type { LocationInfoType } from "~~/types/location.type";

export const useLocationStore = defineStore("location", {
  getters: {
    getPosition: (state) => {
      const { lat, lon } = state.location
      return { lat, lon }
    }
  },
  persist: true,
  state: () => ({
    location: {
      display_name: "Москва",
      lat: 55.7505412,
      lon: 37.6174782
    } as LocationInfoType
  }),
});