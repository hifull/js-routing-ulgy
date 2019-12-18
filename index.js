import { Router } from './router/index.js';
import { AboutComponent } from './components/about.js';
import { NewsComponent } from './components/news.js';
import { HomeComponent } from './components/home.js';
import { PostComponent } from './components/post.js';
import { NotFoundComponent } from './components/notFound.js';

const router = new Router([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/user/:id/profile/:setting',
    component: AboutComponent
  },
  {
    path: '/news',
    component: NewsComponent
  },
  {
    path: '/news/:id',
    component: PostComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]);