import makeRequest from '@/services/api';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    userIsAdmin(state) { return state.user?.privledgelevel === 'admin'; },
    isLoggedIn(state) { return state.user !== null; },
  },
  actions: {
    createNewUser(context, user) {
      makeRequest('/users', {
        method: 'POST',
        data: user,
      });
    },
    // updateUser(context, user, currentUser) {
    //   makeRequest(`/users/${user._id}`, {
    //     method: 'PATCH',
    //   });
    // },
    getUserInfo(context, id) {
      return new Promise((resolve, reject) => {
        makeRequest(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${context.rootGetters['auth/getAccessToken']}`,
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
};
