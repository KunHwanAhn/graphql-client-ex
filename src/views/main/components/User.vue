<template>
  <li :class="$style.userInfo">
    <img :src="avatar" width="48" height="48" alt="github user avatar" />
    {{ name }}
  </li>
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
.userInfo {
  display: flex;
  align-items: center;

  img {
    margin-right: 4px;
  }
}
</style>
