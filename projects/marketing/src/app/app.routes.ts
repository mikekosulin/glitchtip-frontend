import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./home.component").then((m) => m.HomeComponent),
  },
  {
    path: "pricing",
    loadComponent: () =>
      import("./pricing/pricing.component").then((m) => m.PricingComponent),
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/routes"),
    title: "Blog",
  },
  {
    path: "documentation",
    loadChildren: () => import("./documentation/routes"),
    title: "Documentation",
  },
];
