import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectsRoutingModule } from "./projects-routing.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectListComponent } from "../shared/project-list/project-list.component";

@NgModule({
    imports: [CommonModule, ProjectsRoutingModule, ProjectListComponent, ProjectsComponent],
})
export class ProjectsModule {}
