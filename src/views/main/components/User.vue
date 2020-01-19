<template>
  <li :class="$style.userInfo">
    <img :src="avatar" width="36" height="36" alt="github user avatar" />
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

  &::before {
    content: '\B7';
    margin-right: 4px;
  }

  & + & {
    margin-top: 4px;
  }

  img {
    margin-right: 4px;
  }
}
</style>
