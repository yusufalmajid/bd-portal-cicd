export default async function ({ redirect, req, query, store, route }) {
  if (route.path.indexOf("/merchant") > -1) {
    return Promise.resolve();
  }

  if (query.exp) {
    // forced expire session
    return Promise.resolve();
  }

  if (store.state.user.loggedIn) return redirect("/lead-submissions");
  return Promise.resolve();

  //default redirect to '/'
  //subdomain bd.xxx.xxx redirect to '/bd/'
}
