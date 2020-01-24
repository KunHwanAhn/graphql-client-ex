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
        <button @click="addFakeUsers">Add fake users</button>
      </div>
      <UserList
        :total-users="totalUsers"
        :all-users="allUsers"
        @refetch="refetch"
      />
    </template>
  </MainContainer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import gql from 'graphql-tag'

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
    ...mapMeMutations(['resetMe']),
    ...mapMeActions(['getMe']),
    ...mapUserInfoActions(['getUserInfos']),
    async refetch() {
      await this.$apollo.queries.userInfos.refetch()
    },
    async addFakeUsers() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation addFakeUsers($count: Int!) {
            addFakeUsers(count: $count) {
              name
              githubLogin
              avatar
            }
          }
        `,
        variables: {
          count: 3,
        },
      })

      await this.refetch()
    },
    logout() {
      localStorage.removeItem('token')
      this.resetMe()
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
