import apolloProvider from '@/plugins/vueApollo'
import { userInfos, addFakeUsers } from '@/graphql/index.graphql'

const { defaultClient: apollo } = apolloProvider

export default {
  async getUserInfos({ commit }, options) {
    const { data } = await apollo.query({
      query: userInfos,
      ...options,
    })
    commit('setTotalUsers', data.totalUsers)
    commit('setAllUsers', data.allUsers)
  },
  async addFakeUsers(context, count = 1) {
    await apollo.mutate({
      mutation: addFakeUsers,
      variables: { count },
    })
  },
}
