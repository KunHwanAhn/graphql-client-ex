export default {
  setMe(state, me) {
    state.me = {
      ...me,
    }
  },
  logout(state) {
    localStorage.removeItem('token')
    state.me = null
  },
}
