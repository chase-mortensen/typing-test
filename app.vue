<template>
  <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
  <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
  <NuxtLayout>
    <Home />
  </NuxtLayout>
</template>

<script setup>


useHead({
    title: 'Typing Test',
    link: {rel:"stylesheet", href:"https://rsms.me/inter/inter.css"},
    link: {rel:"stylesheet", href:"https://fonts.googleapis.com/css?family=Press+Start+2P"},
    link: {rel:"stylesheet", href:"https://unpkg.com/nes.css/css/nes.css"}
  })
</script>
