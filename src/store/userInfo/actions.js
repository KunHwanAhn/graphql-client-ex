import gql from 'graphql-tag'

import apolloProvider from '@/plugins/vueApollo'

const { defaultClient: apollo } = apolloProvider

const query = gql`
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

export default {
  async getUserInfos({ commit }) {
    const { data } = await apollo.query({ query })
    commit('setTotalUsers', data.totalUsers)
    commit('setAllUsers', data.allUsers)
  },
}
