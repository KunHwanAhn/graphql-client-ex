import gql from 'graphql-tag'

import apolloProvider from '@/plugins/vueApollo'

const { defaultClient: apollo } = apolloProvider

const userInfosQuery = gql`
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
  }
`

const addFakeUsersMutation = gql`
  fragment userInfo on User {
    githubLogin
    name
    avatar
  }

  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      ...userInfo
    }
  }
`

export default {
  async getUserInfos({ commit }, options) {
    const { data } = await apollo.query({
      query: userInfosQuery,
      ...options,
    })
    commit('setTotalUsers', data.totalUsers)
    commit('setAllUsers', data.allUsers)
  },
  async addFakeUsers(context, count = 1) {
    await apollo.mutate({
      mutation: addFakeUsersMutation,
      variables: { count },
    })
  },
}
