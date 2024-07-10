<template>
  <div class="grid col-span-2 cols-7 rows-1 gap-2">
        <template v-if="req.status.value == 'success'">
            <NuxtLink v-for="(day, index) in req.data.value?.daily.time" :key="index" :to="isToday(day) ? '/' : { query: { 'date': formatISO(day, { representation: 'date' }) } }">
                <Card :class="isDateSame(day) ? 'bg-cyan-4' : null" class="border shadow-none outline-cyan-4 hover:outline">
                    <template #content>
                    <div class="flex flex-col items-center gap-1">
                        <Icon size="3em" :name="weatherCodesStore.getIcon(req.data.value?.daily.weather_code[index]!)" />
                        <p class="text-xs leading-none">{{ weatherCodesStore.getName(req.data.value?.daily.weather_code[index]!) }}</p>
                        <p class="text-lg leading-none">{{ format(day, 'd MMMM', { locale: ru }) }}</p>
                        <p class="text-sm opacity-60">{{Math.round(req.data.value?.daily.temperature_2m_max[index]!)}}<span v-if="Math.round(req.data.value?.daily.apparent_temperature_max[index]!) !== Math.round(req.data.value?.daily.temperature_2m_max[index]!)">-{{Math.round(req.data.value?.daily.apparent_temperature_max[index]!)}}</span>°</p>
                    </div>
                    </template>
                </Card>
            </NuxtLink>
        </template>
        <template v-else-if="req.status.value == 'pending' || req.status.value == 'idle'">
            <Skeleton class="col-span-7" height="6rem" />
        </template>
        <template v-else-if="req.status.value == 'error'">
            <Card class="col-span-7 border shadow-none">
                <template #content>
                    Ошибка загрузки информации {{ req.error.value }}
                </template>
            </Card>
        </template>
    </div>
</template>

<script setup lang="ts">
import { format, formatISO } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { useWeatherCodesStore } from "~/store/codes";
import { useLocationStore } from "~/store/location";

const locationStore = useLocationStore();
const weatherCodesStore = useWeatherCodesStore();
const router = useRouter();

const isToday = (date: string) => formatISO(new Date(), { representation: "date" }) === formatISO(date, { representation: "date" })
const isDateSame = (date: string) => router.currentRoute.value.query.date ? router.currentRoute.value.query.date === formatISO(date, { representation: "date" }) : isToday(date);
const lat = computed(() => locationStore.getPosition.lat)
const lon = computed(() => locationStore.getPosition.lon)
const req = useFetch("/api/weekly", {
  query: {
    lat: lat,
    lon: lon,
  },
})
</script>