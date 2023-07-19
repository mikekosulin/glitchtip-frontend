import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from "@angular/router";
import { SettingsService } from "./api/settings.service";
import { UserService } from "./api/user/user.service";

@Component({
  selector: "gt-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.settings.getSettings().subscribe();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.firstChild?.params;
        const orgSlug = params ? params["org-slug"] : undefined;
        this.settings.triggerPlausibleReport(orgSlug);
      }
    });

    const systemTheme = matchMedia("(prefers-color-scheme: dark)");
    function setTheme(preferredTheme?: string) {
      if (!preferredTheme || preferredTheme === 'system') {
        if (systemTheme.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (preferredTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    this.userService.userDetails$.subscribe((user) => {
      setTheme(user?.options.preferred_theme)
    })
    systemTheme.addEventListener('change', ({ matches }) => {
      setTheme('system')
    })
  }
}
