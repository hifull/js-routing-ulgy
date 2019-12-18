import { onLoadHandler, onPopHandler } from './handlers/index.js';
import { RouteMatcher } from './tools/routeMatcher.js';
import { RenderEngine } from './tools/renderEngine.js';

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.outlet = document.body.querySelector('#router-outlet');
    this.routeMatcher = new RouteMatcher(routes); 
    this.renderEngine = new RenderEngine(this); 

    this.onPopHandler = onPopHandler.bind(this);
    this.onLoadHandler = onLoadHandler.bind(this);

    this.enablePopListener();
    this.enableLoadListener();
  }

  enablePopListener() {
    window.addEventListener('popstate', this.onPopHandler);
  }

  enableLoadListener() {
    window.addEventListener('load', this.onLoadHandler);
  }

  navgiate(pathName) {
    if (pathName === window.location.pathname) return

    window.history.pushState(
      {}, pathName, window.location.origin + pathName
    );
    
    this.renderEngine.renderComponent(this.routeMatcher.matchRoute(pathName));
  }
}