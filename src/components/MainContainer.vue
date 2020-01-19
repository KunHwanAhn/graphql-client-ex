<template>
  <div :class="$style.mainContainer">
    <slot />
  </div>
</template>

<style lang="scss" module>
.mainContainer {
  margin: auto;
  width: 100%;
  max-width: 1080px;
  flex-grow: 1;
}
</style>
