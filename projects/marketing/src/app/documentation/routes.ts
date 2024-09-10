import { Route } from "@angular/router";
import { DocumentationIndexComponent } from "./documentation-index.component";

export default [
  { path: "", component: DocumentationIndexComponent },
  //   { path: ":slug", component: BlogPostComponent },
] as Route[];
