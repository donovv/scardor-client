import makeRequest from '@/services/api';

export default {
  namespaced: true,
  state: {
    loginFormVisible: false,
    accessToken: null,
  },
  getters: {
    getAccessToken(state) { return state.accessToken; },
  },
  actions: {
    async reAuthenticate({ commit }) {
      if (localStorage.getItem('accessToken') === null) return;
      makeRequest('/authentication', {
        method: 'POST',
        data: {
          accessToken: localStorage.getItem('accessToken'),
          strategy: 'jwt',
        },
      })
        .then((res) => {
          commit('setAccessToken', res.accessToken);
          commit('user/setUser', res.user, { root: true });
        })
        .catch(() => {
          commit('removeAccessToken');
        });
    },
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        makeRequest('/authentication', {
          method: 'POST',
          data: {
            strategy: 'local',
            ...data,
          },
        })
          .then((res) => {
            commit('setAccessToken', res.accessToken);
            commit('user/setUser', res.user, { root: true });
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            commit('setErrorMessage', err);
            setTimeout(commit('removeErrorMessage'), 5000);
            reject(err);
          });
      });
    },
    async logOut({ commit }) {
      commit('user/clearUser', null, { root: true });
      commit('removeAccessToken');
    },
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    removeAccessToken(state) {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
};
