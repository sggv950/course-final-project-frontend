import userService from '../service/user.service.js';

export default {
  state: {
    loggedInUser: {}
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },
    loginNewUser(state, { newUser }) {
      state.loggedInUser = newUser;
    },
    logOutUser(state) {
      state.loggedInUser = '';
    },
    setUserPartEvent(state, { joinedEvent }) {
      state.loggedInUser.partEventsIds.push(joinedEvent.eventId);
    },
    setUserAdminEvent(state, { eventId }) {
      state.loggedInUser.adminEventsIds.push(eventId);
    }
  },
  actions: {
    login({ commit }, { loginData }) {
      return userService.login(loginData).then(user => {
        if (user) {
          commit({ type: 'setLoggedInUser', user });
        }
        return user;
      });
    },
    signUpUser({ dispatch }, { newUser }) {
      userService.signupUser(newUser).then(() => {
        const loginData = {
          userName: newUser.name,
          password: newUser.password
        }
        dispatch({type: 'login', loginData})
      });
    },
    logout({ commit }) {
      userService.logout();
      commit('logOutUser');
      return Promise.resolve();
    },

    updateUserPartEvents({ commit, state }, { joinedEvent }) {
      commit({ type: 'setUserPartEvent', joinedEvent });
      userService.updateUser(state.loggedInUser);
    },
    updateUserAdminEvents({ commit, state }, { eventId }) {
      commit({ type: 'setUserAdminEvent', eventId });
      userService.updateUser(state.loggedInUser);
    },
    getUserById({ commit }, { userId }) {
      return userService.getById(userId);
    },
    getLoggedInUser({ commit }) {
      userService.getLoggedInUser().then(loggedInUser => {
        commit({ type: 'setLoggedInUser', user: loggedInUser });
      });
    }
  },
  getters: {
    isLoggedInUser: state => !!state.loggedInUser,
    loggedInUser: state => state.loggedInUser
  }
};
