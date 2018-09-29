const getters = {
  sidebar: state => state.app.sidebar,
  user:state => state.user.info,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
};
export default getters;
