<template>
  <MainContainer v-loading="loading">
    <button :disabled="loading" @click="signInWithGithub">
      Get access token
    </button>
    <div :class="$style.messageContainer">
      <div v-if="loading">Trying to get new access token</div>
      <div v-if="error">An error occurred: {{ error }}</div>
    </div>
  </MainContainer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('me')

import MainContainer from '@/components/MainContainer.vue'

export default {
  components: {
    MainContainer,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    }
  },
  methods: {
    ...mapActions(['getAccessToken']),
    async signInWithGithub() {
      this.loading = true

      try {
        await this.getAccessToken(this.code)
        this.$router.replace('/')
      } catch (error) {
        this.error = error
      }

      this.loading = false
    },
  },
}
</script>

<style lang="scss" module>
.messageContainer {
  margin-top: 8px;
}
</style>
