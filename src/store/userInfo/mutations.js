export default {
  setTotalUsers(state, totalUsers) {
    state.totalUsers = totalUsers
  },
  setAllUsers(state, allUsers) {
    state.allUsers = [...allUsers]
  },
}
