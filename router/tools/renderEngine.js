import { routerClickHandler } from '../handlers/routerClickHandler.js';

export class RenderEngine {
  constructor(router) {
    this.router = router;
    this.routerLinks = this.getAllRouterLinks();
  }

  renderComponent(component) {
    this.removeLinksHandlers();
    this.router.outlet.innerHTML = component;
    this.routerLinks = this.getAllRouterLinks();
    this.addLinksHandlers();
  }

  removeLinksHandlers() {
    for (let i = 0, len = this.routerLinks.length; i < len; i++) {
      this.routerLinks[i].removeEventListener('click', routerClickHandler(i, this));
    }
  }

  addLinksHandlers() {
    for (let i = 0, len = this.routerLinks.length; i < len; i++) {
      this.routerLinks[i].addEventListener('click', routerClickHandler(i, this)) 
    }
  }

  getAllRouterLinks() {
    return document.body.querySelectorAll('a[routerLink]');
  };
}