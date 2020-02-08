import { apollo } from '@/plugins/vueApollo'
import { getMe, getAccessToken } from '@/graphql/me.graphql'

export default {
  async getMe({ commit }) {
    const { data } = await apollo.query({ query: getMe })
    if (data.me) {
      commit('setMe', data.me)
    }
  },
  async getAccessToken({ commit }, code) {
    const { data } = await apollo.mutate({
      mutation: getAccessToken,
      variables: { code },
    })
    const { token, user } = data.githubAuth
    localStorage.setItem('token', token)
    commit('setMe', user)
  },
}
