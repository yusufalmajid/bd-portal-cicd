export default async function ({store, redirect, req, route}) {
	if (route.path.indexOf('/merchant') > -1) {
		return Promise.resolve()
	}

	if (!store.state.user.loggedIn) return redirect('/')
	return Promise.resolve() 
}