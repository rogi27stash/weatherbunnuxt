
<template>
    <LayoutWrapper class="grid grid-cols-2 w-full gap-4">
        <WeeklyForecast />
        <h1 class="col-span-2 text-2xl font-bold">
            <template v-if="date">
                Прогнозируемая погода в городе {{ locationStore.$state.location.display_name }} на {{ format(date, "d MMMM", { locale: ru }) }}
            </template>
            <template v-else>
                Погода в городе {{ locationStore.$state.location.display_name }} в {{ format(new Date(), "H:mm на d MMMM", { locale: ru }) }}
            </template>
        </h1>
        <template v-if="req.status.value == 'success'">
            <Panel class="flex flex-col [&_.p-panel-content-container]:h-full [&_.p-panel-content-container]:flex [&_.p-panel-content-container]:flex-col [&_.p-panel-content-container]:justify-center" :header="date ? 'Ожидаемые погодные условия' : 'Текущие погодные условия'">
            <div class="flex items-center gap-2">
                <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                        <Icon size="5em" :name="weatherCodesStore.getIcon(date ? req.data.value?.hourly?.weather_code[new Date().getHours()]! : req.data.value?.current?.weather_code!)" />
                        <p class="text-2em">{{ Math.round(date ? req.data.value?.hourly?.temperature_2m[new Date().getHours()]! : req.data.value?.current?.temperature_2m!) }}°</p>
                    </div>
                    <div class="h-full flex flex-col justify-center border-l pl-4 font-700">
                        <template v-if="date">
                            <p>{{ weatherCodesStore.getName(req.data.value?.hourly?.weather_code[new Date().getHours()]!) }}</p>
                            <p>Будет ощущаться как {{ Math.round(req.data.value?.hourly?.apparent_temperature[new Date().getHours()]!) }}°</p>
                        </template>
                        <template v-else>
                            <p>{{ weatherCodesStore.getName(req.data.value?.current?.weather_code!) }}</p>
                            <p>Ощущается как {{ Math.round(req.data.value?.current?.apparent_temperature!) }}°</p>
                        </template>
                    </div>
                </div>
                <div class="ml-auto">
                    <template v-if="date">
                        <div class="flex items-center justify-end gap-1">
                            <p>Влажность {{ req.data.value?.hourly?.relative_humidity_950hPa[new Date().getHours()] }}%</p>
                            <Icon size="1.2em" name="material-symbols:humidity-percentage-rounded" />
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <p>Вероятность осадков {{ req.data.value?.hourly?.precipitation_probability[new Date().getHours()] }}%</p>
                            <Icon size="1.2em" name="material-symbols:rainy" />
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <p>Сила ветра {{ req.data.value?.hourly?.wind_speed_10m[new Date().getHours()] }} м/c</p>
                            <Icon size="1.2em" name="material-symbols:wind-power-rounded" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex items-center justify-end gap-1">
                            <p>Влажность {{ req.data.value?.current?.relative_humidity_2m }}%</p>
                            <Icon size="1.2em" name="material-symbols:humidity-percentage-rounded" />
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <p>Вероятность осадков {{ req.data.value?.current?.rain }}%</p>
                            <Icon size="1.2em" name="material-symbols:rainy" />
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <p>Сила ветра {{ req.data.value?.current?.wind_speed_10m }} м/c</p>
                            <Icon size="1.2em" name="material-symbols:wind-power-rounded" />
                        </div>
                    </template>
                </div>
            </div>
        </Panel>
        <Panel header="Вспомогательная информация">
            <div class="grid cols-3 gap-6">
                <div class="flex flex-col items-center justify-end gap-1">
                    <div class="flex items-center justify-end gap-2">
                        <Icon size="1.2em" name="material-symbols:weight-sharp" />
                        <p>Давление (мм рт. ст.)</p>
                    </div>
                    <Knob value-template="{value}" :model-value="Math.round((date ? req.data.value?.hourly.surface_pressure[new Date().getHours()] : req.data.value?.current?.surface_pressure)!*0.75)" :max="900" value-color="MediumTurquoise"/>
                </div>
                <div class="flex flex-col items-center justify-end gap-1">
                    <div class="flex items-center justify-end gap-2">
                        <Icon size="1.2em" name="material-symbols:wb-sunny-outline" />
                        <p>УФ-Индекс</p>
                    </div>
                    <Knob value-template="{value}" :model-value="Math.round(date ? req.data.value?.hourly.uv_index[new Date().getHours()]! : req.data.value?.hourly.uv_index[new Date().getHours()]!)" :max="12" value-color="Purple"/>
                </div>
                <div class="grid cols-1 rows-2 items-center justify-end gap-1">
                    <div class="flex flex-col items-center justify-end">
                        <Icon size="2.3em" name="meteocons:sunrise-fill" />
                        <p>Рассвет в {{ format(req.data.value?.daily.sunrise[0]!, "H:mm") }}</p>
                    </div>
                    <div class="flex flex-col items-center justify-end">
                        <Icon size="2.3em" name="meteocons:moonrise-fill" />
                        <p>Закат в {{ format(req.data.value?.daily.sunset[0]!, "H:mm") }}</p>
                    </div>
                </div>
            </div>
        </Panel>
        <Fieldset class="col-span-2" legend="Сводка по часам" toggleable collapsed>
            <div class="grid cols-12 gap-2">
                <Card v-for="(time, hour) in req.data.value?.hourly.time" :key="time">
                    <template #content>
                    <div class="flex flex-col items-center gap-2 text-xs">
                        <Icon size="2em" :name="weatherCodesStore.getIcon(req.data.value?.hourly?.weather_code[hour]!)" />
                        <p class="text-base font-bold leading-none">{{ Math.round(req.data.value?.hourly?.temperature_2m[hour]!) }}<span v-if="Math.round(req.data.value?.hourly?.apparent_temperature[hour]!) !== Math.round(req.data.value?.hourly?.temperature_2m[hour]!)">-{{ Math.round(req.data.value?.hourly?.apparent_temperature[hour]!) }}</span>°</p>
                        <div class="grid cols-3 gap-6">
                            <div class="flex flex-col items-center justify-end gap-1">
                                <Icon size="1.2em" name="material-symbols:humidity-percentage-rounded" />
                                <p>{{ Math.round(req.data.value?.hourly?.relative_humidity_950hPa[hour]!) }}%</p>
                            </div>
                            <div class="flex flex-col items-center justify-end gap-1">
                                <Icon size="1.2em" name="material-symbols:rainy" />
                                <p>{{ Math.round(req.data.value?.hourly?.precipitation_probability[hour]!) }}%</p>
                            </div>
                            <div class="flex flex-col items-center justify-end gap-1">
                                <Icon size="1.2em" name="material-symbols:wind-power-rounded" />
                                <p>{{ req.data.value?.hourly?.wind_speed_10m[hour]! }}</p>
                            </div>
                        </div>
                        <p class="opacity-50">{{hour}}:00</p>
                    </div>
                    </template>
                </Card>
            </div>
        </Fieldset>
        <Panel v-if="!date" class="col-span-2" header="Карта погодных условий">
            <iframe width="100%" height="300" :src="`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&pressure=true&message=true`" frameborder="0"/>
        </Panel>
        </template>
        <template v-else-if="req.status.value == 'pending' || req.status.value == 'idle'">
            <Skeleton class="w-full" height="6rem" />
        </template>
        <template v-else-if="req.status.value == 'error'">
            <Card class="w-full border shadow-none">
                <template #content>
                    Ошибка загрузки информации {{ req.error.value }}
                </template>
            </Card>
        </template>
    </LayoutWrapper>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { useWeatherCodesStore } from "~/store/codes";
import { useLocationStore } from "~/store/location";

const locationStore = useLocationStore();
const weatherCodesStore = useWeatherCodesStore();
const router = useRouter()

const lat = computed(() => locationStore.getPosition.lat)
const lon = computed(() => locationStore.getPosition.lon)
const date = computed(() => router.currentRoute.value.query.date as string ?? null)
const req = useFetch("/api/daily", {
  query: {
    date,
    lat,
    lon,
  },
})
</script>