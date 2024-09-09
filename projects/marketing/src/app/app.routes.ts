import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./home.component").then((m) => m.HomeComponent),
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/routes"),
    title: "Blog",
  },
];
