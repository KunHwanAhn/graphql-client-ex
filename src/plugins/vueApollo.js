import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo)

export const apollo = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request(operation) {
    const token = localStorage.getItem('token')

    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
})

const apolloProvider = new VueApollo({
  defaultClient: apollo,
})

export default apolloProvider
