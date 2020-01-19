<template>
  <div :class="$style.meContainer">
    <img :src="avatar" width="48" height="48" alt="github user avatar" />
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" module>
.meContainer {
  margin-top: 8px;
  display: flex;
  align-items: center;

  img {
    margin-right: 4px;
  }

  h1 {
    margin: 0;
    padding: 0;
  }
}
</style>
