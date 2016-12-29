import { Routes } from '@angular/router';
import * as Components from './components';

const RoutesCfg = [
  {
    paths: [''],
    component: 'Main',
    guards: [],
    has_nav_link: false
  } , {
    paths: ['**'],
    component: 'NotFound',
    guards: [],
    has_nav_link: false
  }
];

const generateRoutesObj = () => {
  let result = [];

  RoutesCfg.forEach(routeObj => {
    routeObj.paths.forEach(path => {
      result.push({
        path: path,
        component: Components.Pages[routeObj.component + 'Component'],
        canActivate: routeObj.guards
      });
    });
  });

  return result;
};

export const AppRoutes: Routes = generateRoutesObj();
