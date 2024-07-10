<script setup lang='ts'>
import { useLocationStore } from "~/store/location";
import type { LocationInfoType } from "~~/types/location.type";
import type { AutoCompleteCompleteEvent, AutoCompleteOptionSelectEvent } from "primevue/autocomplete";

const locationStore = useLocationStore();
const searchQuery = ref(locationStore.$state.location.display_name);
const cities: Ref<LocationInfoType[]> = ref([]);

const search = (event: AutoCompleteCompleteEvent) => {
  setTimeout(async () => {
    if (event.query.trim().length) {
      const { data } = await useFetch("/api/search", {
        query: {
          query: event.query
        }
      })
      if (data.value) {
        cities.value = data.value
      }
    }
  }, 400)
}

const changeLocation = (event: AutoCompleteOptionSelectEvent) => {
  const { lat, lon, name } = event.value
  locationStore.$patch({ location: { display_name: name, lat, lon }})
}
</script>

<template>
    <div class="w-full [&_.p-autocomplete,.p-inputtext]:w-full">
        <AutoComplete v-model="searchQuery" fluid option-label="display_name" force-selection :suggestions="cities" placeholder="Укажите город" @option-select="changeLocation" @complete="search" />
    </div>
</template>

