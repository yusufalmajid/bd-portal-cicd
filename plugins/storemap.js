export default function ({app, store}, inject) {

    const userData = () => {
        const localState = store.state.user
        if (localState.loggedIn) {
            return localState.data
        }
        return {}
    }

    const toast = (status, message, duration) => {
        store.dispatch('toast/new', {
            message: message,
            status: status,
            duration: duration
        })
    }

    inject('userData', userData)
    inject('toast', toast)
};
