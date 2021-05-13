
const state = {
    user: null,
};
const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
};
const actions = {

};
const mutations = {
    setUser(state, username) {
        state.user = username;
      },
    
      logout(state, user) {
        state.user = user;
      },
};
export default {
  state,
  getters,
  actions,
  mutations
};