<template>
  <div :class="$style.mainContainer">
    <div v-if="$apollo.loading">Loading...</div>
    <template v-else>
      <div :class="$style.buttonContainer">
        <button @click="addFakeUsers">Add fake users</button>
      </div>
      <UserList
        :total-users="userInfos.totalUsers"
        :all-users="userInfos.allUsers"
        @refetch="refetch"
      />
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import UserList from './components/UserList.vue'

export default {
  apollo: {
    userInfos: {
      query: gql`
        query userInfos {
          totalUsers
          allUsers {
            githubLogin
            name
            avatar
          }
        }
      `,
      update: data => data,
    },
  },
  components: {
    UserList,
  },
  data() {
    return {
      userInfos: {},
    }
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

.buttonContainer {
  margin-bottom: 16px;
}
</style>
