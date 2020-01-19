<template>
  <MainContainer>
    <ApolloMutation
      :mutation="githubAuth"
      :variables="{ code }"
      @done="handleMutationDone"
    >
      <template #default="{ mutate, loading, error }">
        <button :disabled="loading" @click="mutate()">Get access token</button>
        <div :class="$style.messageContainer">
          <div v-if="loading">Trying to get new access token</div>
          <div v-if="error">An error occurred: {{ error }}</div>
        </div>
      </template>
    </ApolloMutation>
  </MainContainer>
</template>

<script>
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
  methods: {
    githubAuth(gql) {
      return gql`
        mutation getAccessToken($code: String!) {
          githubAuth(code: $code) {
            token
            user {
              githubLogin
              name
              avatar
            }
          }
        }
      `
    },
    handleMutationDone({ data }) {
      const { token } = data.githubAuth
      localStorage.setItem('token', token)
      this.$router.replace('/')
    },
  },
}
</script>

<style lang="scss" module>
.messageContainer {
  margin-top: 8px;
}
</style>
