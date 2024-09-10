import { Component } from "@angular/core";
import { LinksService } from "../links.service";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";

@Component({
  standalone: true,
  imports: [RouterLink, MatCardModule],
  selector: "mkt-documentation-index",
  templateUrl: "./documentation-index.component.html",
  styleUrls: ["./documentation-index.component.scss"],
})
export class DocumentationIndexComponent {
  registerLink = this.links.registerLink;

  constructor(private links: LinksService) {}
}
