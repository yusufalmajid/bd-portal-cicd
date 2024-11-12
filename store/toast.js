export const state = () => ({
    items: []
})

export const actions = {
    async new({commit}, payload) {
        const id = this.$randomId()
        const duration = payload.duration ? payload.duration : 2000
        commit('add', {...payload, ...{id: id, duration: duration}})

        if(payload.status){
            setTimeout(() => {
                commit('remove', id)
            }, duration)
        }
    }
}
  
export const mutations = {
    remove(state, id) {
        const item = state.items.find(i => { return i.id == id})
        if (item)
        state.items.splice(state.items.indexOf(item), 1)
    },
    add(state, payload) {
        state.items.push({
            id: payload.id,
            message: payload.message,
            status: payload.status,
            duration: payload.duration
        })
    }
}