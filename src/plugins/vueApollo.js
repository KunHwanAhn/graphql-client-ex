import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
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
  defaultClient: apolloClient,
})

export default apolloProvider
