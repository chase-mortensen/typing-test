<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div class="typewriter mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <h1 class="text-3xl mx-auto font-bold text-center text-gray-900">Typing Test</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-3xl">
            <slot/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.typewriter h1 {
  max-width: min-content;
  overflow: hidden;
  padding-left: 0.15em;
  border-right: .15em solid white;
  white-space: nowrap;
  margin: 0 auto;
  animation:
    typing 5s steps(34, end),
    blink-caret .5s step-end 12;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
  // 99% { border-color: orange }
}
</style>