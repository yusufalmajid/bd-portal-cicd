export const state = () => ({
    sideBarOpen: false,
    sideBarAction: '', // track if user has manually open or close sidebar
    sideBarList: [], // for sidebar looping
})

export const getters = {
    sidebar_list: (state) => (config) => {
        return state.sideBarList
    },
}

export const mutations = {
    toggleSideBar(state) {
        state.sideBarOpen = !state.sideBarOpen
        if (state.sideBarOpen) {
            state.sideBarAction = 'open'
        }
        else {
            state.sideBarAction = 'close'
        }
    },
    closeSideBar(state) {
        state.sideBarOpen = false
    },
    openSideBar(state) {
        state.sideBarOpen = true
    },
    setSideBarList(state, sidebar) {
        var sideBarListTemp = []

        sideBarListTemp.push(...[
            {
                link: "/dashboard",
                bi: "bi bi-grid-fill",
                lang: "dashboard",
                perm: "perm-dashboard",
            },
            {
                link: null,
                bi: "bi bi-people-fill",
                lang: "employer",
                perm: "perm-employer",
                child: [
                    {
                        link: "/employer-list",
                        bi: "bi bi-people-fill",
                        lang: "employer_list",
                        perm: "perm-employer-list",
                    },
                    {
                        link: "/role-list",
                        bi: "bi bi-people-fill",
                        lang: "role_list",
                        perm: "perm-role-list",
                    },
                ],
            },
            {
                link: "/staff",
                bi: "bi bi-people-fill",
                lang: "staff",
                perm: "perm-staff",
            },
            {
                link: "/withdrawal-list",
                bi: "bi bi-file-earmark-text-fill",
                lang: "withdrawal_list",
                perm: "perm-withdrawal",
            },
            {
                link: "/staff-report",
                bi: "bi bi-file-earmark-text-fill",
                lang: "billing",
                perm: "perm-staff-report",
            },
            {
                link: "/bill",
                bi: "bi bi-coin",
                lang: "payment",
                perm: "perm-billing",
            },
            {
                link: "/settings",
                bi: "bi bi-gear-fill",
                lang: "settings",
                perm: "perm-setting",
            },
            // {
            //     link: "/reports",
            //     bi: "bi bi-file-text-fill",
            //     lang: "reports",
            // },
            {
                link: "/import-list",
                bi: "bi bi-file-earmark-text-fill",
                lang: "import_list",
                perm: 'perm-import'
            },
            {
                link: "/export-list",
                bi: "bi bi-cloud-arrow-down-fill",
                lang: "export_list",
                perm: 'perm-export'
            },
        ])

        state.sideBarList = sideBarListTemp
    },
}

export const actions = {
    generateSideBar({ rootState, commit }) {
        commit('setSideBarList')
    }
}