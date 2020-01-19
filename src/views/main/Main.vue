<template>
  <MainContainer>
    <div v-if="$apollo.loading">Loading...</div>
    <template v-else>
      <div :class="$style.githubLoginContainer">
        <div v-if="hasToken">
          <button @click="logout">
            Logout
          </button>
          <Me :name="userInfos.me.name" :avatar="userInfos.me.avatar" />
        </div>
        <button v-else @click="goToGithubAuthLogin">Login using Github</button>
      </div>
      <div :class="$style.buttonContainer">
        <button @click="addFakeUsers">Add fake users</button>
      </div>
      <UserList
        :total-users="userInfos.totalUsers"
        :all-users="userInfos.allUsers"
        @refetch="refetch"
      />
    </template>
  </MainContainer>
</template>

<script>
import gql from 'graphql-tag'

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
  apollo: {
    userInfos: {
      query: gql`
        fragment userInfo on User {
          githubLogin
          name
          avatar
        }

        query userInfos {
          totalUsers
          allUsers {
            ...userInfo
          }
          me {
            ...userInfo
          }
        }
      `,
      update: data => data,
    },
  },
  data() {
    return {
      userInfos: {},
      hasToken: false,
    }
  },
  created() {
    this.hasToken = !!localStorage.getItem('token')
  },
  methods: {
    async refetch() {
      this.userInfos = {}
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
