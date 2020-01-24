export default {
  setMe(state, me) {
    state.me = {
      ...me,
    }
  },
  resetMe(state) {
    state.me = null
  },
}
