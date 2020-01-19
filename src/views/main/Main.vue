<template>
  <div :class="$style.mainContainer">
    <div v-if="$apollo.loading">Loading...</div>
    <template v-else>
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
    refetch() {
      this.userInfos = {}
      this.$apollo.queries.userInfos.refetch()
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
</style>
