<template>
  <div :class="$style.mainContainer">
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>{{ hello }}</div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    hello: gql`
      {
        hello
      }
    `,
  },
}
</script>

<style lang="scss" module>
.mainContainer {
  margin: auto;
  width: 100%;
  max-width: 1080px;
  flex-grow: 1;
}
</style>
