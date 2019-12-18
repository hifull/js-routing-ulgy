export function routerClickHandler(i, self) {
  return function(evt) {
    handler.call(self, evt, i);
  }
}

function handler(evt, i) {
  evt.preventDefault();
  this.router.navgiate(this.routerLinks[i].getAttribute('routerLink'));
}