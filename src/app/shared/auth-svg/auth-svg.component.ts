import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "gt-auth-svg",
  templateUrl: "./auth-svg.component.html",
  styleUrls: ["./auth-svg.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSvgComponent {
  @Input() text = "";
  @Input() provider = "";
  @Input() source: "auth" | "dropdown" | "disconnect" | "" = "";
  @Input() loading = false;

  checkProviderSvg(provider: string) {
    if (
      [
        "digitalocean",
        "gitea",
        "github",
        "gitlab",
        "google",
        "keycloak",
        "microsoft",
      ].includes(provider)
    ) {
      return `#${provider}`;
    } else {
      return "#openid"
    }
  }
}
