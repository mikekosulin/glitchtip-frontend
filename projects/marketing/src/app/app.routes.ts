import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "blog",
    loadChildren: () => import("./blog/routes"),
    title: "Blog",
  },
];
