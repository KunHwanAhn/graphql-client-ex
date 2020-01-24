import gql from 'graphql-tag'

import apolloProvider from '@/plugins/vueApollo'

const { defaultClient: apollo } = apolloProvider

const getMeQuery = gql`
  fragment userInfo on User {
    githubLogin
    name
    avatar
  }

  query getMe {
    me {
      ...userInfo
    }
  }
`

const githubAuthMutation = gql`
  fragment userInfo on User {
    githubLogin
    name
    avatar
  }

  mutation getAccessToken($code: String!) {
    githubAuth(code: $code) {
      token
      user {
        ...userInfo
      }
    }
  }
`

export default {
  async getMe({ commit }) {
    const { data } = await apollo.query({ query: getMeQuery })
    if (data.me) {
      commit('setMe', data.me)
    }
  },
  async getAccessToken({ commit }, code) {
    const { data } = await apollo.mutate({
      mutation: githubAuthMutation,
      variables: { code },
    })
    const { token, user } = data.githubAuth
    localStorage.setItem('token', token)
    commit('setMe', user)
  },
}
