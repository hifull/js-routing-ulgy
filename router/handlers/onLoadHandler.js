export function onLoadHandler(evt) {
  this.renderEngine.renderComponent(
    this.routeMatcher.matchRoute(evt.path[0].location.pathname)
  );
};