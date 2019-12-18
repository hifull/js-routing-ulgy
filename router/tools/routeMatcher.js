export class RouteMatcher {
  constructor(routes) {
    this.routes = routes;
  }

  matchRoute(pathName) {
    const pathNameChunks = pathName.split('/').slice(1);
    const splittedRoutes = [];
    let renderedHtml;
    
    if (pathNameChunks.length === 1) {
      renderedHtml = this.routes.find(route => route.path === pathName);
    } else {
      this.routes.forEach((route) => {
        splittedRoutes.push(route.path.split('/').slice(1));
      });

      splittedRoutes.forEach(route => {
        if (route.length === pathNameChunks.length) {
          let isMatching = true;

          pathNameChunks.forEach((chunk, index) => {
            if (route[index][0] !== ':' && route[index] !== chunk) {
              isMatching = false;
            }
          })

          if (isMatching) {
            renderedHtml = this.routes.find(conf => conf.path === `/${route.join('/')}`)
          }
        }
      })
    }

    if (!renderedHtml) {
      renderedHtml = this.routes.find(route => route.path === '**');
    }
    if (!renderedHtml) throw new Error('Unkwonw custom route: ' + pathName)

    return renderedHtml.component
  }
}