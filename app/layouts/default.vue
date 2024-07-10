<template>
    <div class="flex flex-col gap-4 p-4 font-600 font-content">
      <LayoutMenu />
      <slot/>
      <LayoutWrapper>
      <footer>
        <p>Разработано с использованием технологий Open-Meteo и OpenStreetMap</p>
        </footer>
      </LayoutWrapper>
    </div>
</template>