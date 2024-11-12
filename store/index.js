export const state = () => ({
  pageName: "", // used by topbar to display current page
  isLoading: false, // loader
  breadcrumb: [],
  open_cut_off_calendar: false,
  calendarFloat: false,
  payLaterModal: false,
  open_create_new_modal: {},
  total_leads: 0,
  total_application: 0,
  total_report: 0,
});

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    if (req.session?.user) {
      commit("user/setUser", { data: req.session, status: true });
      // commit('user/setCredit', {data: req.session.credit_list, status: true})
      dispatch('updateLeadTotals');
      dispatch('updateApplicationTotals');
    }
  },
  async changeLang({}, code) {
    if (this.$i18n.getLocaleCookie() != code) {
      await this.$i18n.setLocale(code);
    }
  },
  async updateLeadTotals({ rootState, commit }){
    let res = await this.$api('leads/total', {});
    commit('setTotalLeads', res.total_application)
  },
  async updateApplicationTotals({ rootState, commit }){
    let res2 = await this.$api('application/total', {});
    commit('setTotalApplication', res2.total_application)
  }
};

export const mutations = {
  setOpenCreateNewModal(state, object) {
    state.open_create_new_modal = object;
  },
  setPageName(state, name) {
    state.pageName = name;
  },
  setBreadcrumb(state, name) {
    state.breadcrumb = name;
  },
  updateNewsLayout(state, style) {
    state.newsLayoutStyle = style;
  },
  updateLoader(state, boolean) {
    state.isLoading = boolean;
  },
  setTotalLeads(state, value) {
    state.total_leads = value;
  },
  setTotalApplication(state, value) {
    state.total_application = value;
  },
  setTotalReport(state, value) {
    state.total_report = value;
  },

};

export const getters = {
  get_open_create_new_modal: (state) => (config) => {
    return state.open_create_new_modal;
  },
};
