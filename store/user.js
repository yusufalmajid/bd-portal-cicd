export const state = () => ({
  data: {},
  loggedIn: false,
  credit_list: [],
  permission_list: [],
  permission_id: null,
  first_login_setup: 0,
  is_suspended : 0,
});

export const getters = {
  profilePic: (state) => (config) => {
    if (state.data.profile_image_url) {
      return { backgroundImage: `url('${state.data.profile_image_url}')` };
    }
    return {
      backgroundImage: `url('${config.STATIC_ROOT}img/empty_profile_pic.svg')`,
    };
  },
};

export const actions = {
  async fetch({ rootState, commit }) {
    const d = await this.$api("session", {});

    if (d.status) {
      await commit("setUser", {
        data: d.data,
        status: true,
      });
    } else {
      commit("resetUser");
    }
    return d;
  },
  async login({ rootState, commit }, data) {
    const d = await this.$api("login", data);

    if (d.success && !d.error) {
      commit("setUser", { data: d.data, status: true });
      commit("setPermissionList", { data: d.data.permission, status: true });
    }

    return d;
  },
  async register({ commit }, data) {
    const d = await this.$api("employer/create", data);

    if (d.success && !d.error) {
      commit("setUser", { data: d.data, status: true });
      commit("setPermissionList", { data: d.data.permission, status: true });
    }

    return d;
  },
  async forgot({ commit }, data) {
    const d = await this.$api("employer/forgot", data);

    if (d.success && !d.error) {
      commit("setUser", { data: d.data, status: true });
      commit("setPermissionList", { data: d.data.permission, status: true });
    }

    return d;
  },
  async logOut({ rootState, commit }, exp) {
    const d = await this.$api("logout", {});
    commit("resetUser");

    if (exp) {
      this.$router.push("/?exp=1");
    } else {
      this.$router.push("/");
    }
    return Promise.resolve();
  },
  update({ commit }, data) {
    commit("updateField", data);
  },
};

export const mutations = {
  setUser(state, userData) {
    if (userData.data) {
      state.data = userData.data.user;
    }

    if (userData.status != undefined) {
      state.loggedIn = userData.status;
    }
  },
  setPermissionId(state, id) {
    state.permission_id = id;
  },
  setPermissionList(state, permitData) {
    if (permitData.data) {
      state.permission_list = permitData.data;
      localStorage.setItem("permitList", JSON.stringify(permitData));
    }
  },
  setCredit(state, dropdownData) {
    if (dropdownData.data) {
      state.credit_list = dropdownData.data.credit_list;
      localStorage.setItem("creditList", JSON.stringify(dropdownData));
    }
  },
  resetUser(state) {
    state.data = {};
    state.credit_list = [];
    state.permission_list = [];
    state.permission_id = null;
    localStorage.removeItem("creditList");
    localStorage.removeItem("permitList");
    state.loggedIn = false;
  },
  updateField(state, fieldData) {
    Object.assign(state.data, fieldData);
  },
  updateFirstLoginSetup(state, flag) {
    state.first_login_setup = flag;
  },
};
