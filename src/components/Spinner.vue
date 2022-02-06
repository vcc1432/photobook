<template>
  <div
    class="overlay fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex-col flex justify-center items-center space-x-2"
  >
    <div class="loader animate-spin ease-linear rounded-full border-4 border-blue-600 h-10 w-10"></div>
  </div>
</template>

<script></script>
<style lang="scss" scoped>
.overlay {
  background: rgba(229, 231, 235, 0.75);
}
.loader {
  border-top-color: transparent;
}
</style>
