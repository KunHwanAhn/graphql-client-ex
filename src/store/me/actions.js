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
    me {
      ...userInfo
    }
  }
`

export default {
  async getMe({ commit }) {
    const { data } = await apollo.query({ query })
    commit('setMe', data.me)
  },
}
