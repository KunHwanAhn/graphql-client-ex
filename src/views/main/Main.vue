<template>
  <MainContainer>
    <div v-if="$apollo.loading">Loading...</div>
    <template v-else>
      <div :class="$style.githubLoginContainer">
        <div v-if="hasToken">
          <button @click="logout">
            Logout
          </button>
          <Me v-if="me" :name="me.name" :avatar="me.avatar" />
        </div>
        <button v-else @click="goToGithubAuthLogin">Login using Github</button>
      </div>
      <div :class="$style.buttonContainer">
        <button :disabled="loading" @click="addFakeUsers">
          Add fake users
        </button>
      </div>
      <UserList
        :total-users="totalUsers"
        :all-users="allUsers"
        @refetch="refetch"
      />
      <div v-if="error">An error occurred: {{ error }}</div>
    </template>
  </MainContainer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState: mapUserInfoState,
  mapActions: mapUserInfoActions,
} = createNamespacedHelpers('userInfo')

const {
  mapState: mapMeState,
  mapMutations: mapMeMutations,
  mapActions: mapMeActions,
} = createNamespacedHelpers('me')

import MainContainer from '@/components/MainContainer.vue'
import Me from './components/Me.vue'
import UserList from './components/UserList.vue'

const AUTH_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=user`

export default {
  components: {
    MainContainer,
    Me,
    UserList,
  },
  data() {
    return {
      hasToken: false,
      loading: false,
      error: null,
    }
  },
  computed: {
    ...mapMeState(['me']),
    ...mapUserInfoState(['totalUsers', 'allUsers']),
  },
  async created() {
    this.hasToken = !!localStorage.getItem('token')

    await this.getUserInfos()
    await this.getMe()
  },
  methods: {
    ...mapMeMutations({
      internalLogout: 'logout',
    }),
    ...mapMeActions(['getMe']),
    ...mapUserInfoActions({
      getUserInfos: 'getUserInfos',
      internalAddFakeUsers: 'addFakeUsers',
    }),
    async refetch() {
      this.loading = true
      this.error = null

      try {
        await this.getUserInfos({ fetchPolicy: 'network-only' })
      } catch (error) {
        this.error = error
      }

      this.loading = false
    },
    async addFakeUsers() {
      this.loading = true
      this.error = null

      try {
        await this.internalAddFakeUsers()
      } catch (error) {
        this.error = error
      }

      this.loading = false

      await this.refetch()
    },
    logout() {
      this.internalLogout()
      this.hasToken = false
    },
    goToGithubAuthLogin() {
      window.location = AUTH_LOGIN_URL
    },
  },
}
</script>

<style lang="scss" module>
.githubLoginContainer,
.buttonContainer {
  margin-bottom: 16px;
}
</style>
