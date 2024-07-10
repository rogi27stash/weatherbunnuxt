
<template>
    <div class="mx-auto w-full max-w-screen-2xl flex flex-col [&_.p-menubar-start]:w-full">
        <Menubar>
            <template #start>
                <div class="mr-3 flex items-center gap-2 border-r pr-3 text-cyan-600 font-bold">
                    <LogoIcon class="h-9 w-9" />
                    <p>БризИнформ</p>
                </div>
                <CitySelector />
            </template>
        </MenuBar>
    </div>
</template>

<script setup>
import LogoIcon from "~/assets/logo.svg?component"
</script>
