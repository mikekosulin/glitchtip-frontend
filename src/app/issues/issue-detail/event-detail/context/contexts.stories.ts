import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

import { SharedModule } from "../../../../shared/shared.module";
import { ContextsComponent } from "./contexts.component";
import { generateIconPath, iconDictionary } from "src/app/shared/shared.utils";

export default {
  title: "Events/Contexts",
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      declarations: [],
    }),
    withKnobs,
  ],
};

export const contexts = () => {
  const options = [];
  let user = boolean("User", true);
  user
    ? options.push({
        title: "em@jay.com",
        subtitle: "EmJay117",
        key: "Username",
        type: "user",
        icon: null,
        matIcon: "account_circle",
      })
    : null;

  let browser = boolean("Browser", true);
  browser
    ? options.push({
        title: "FireFox",
        subtitle: "11.7",
        key: "Version",
        type: "browser",
        icon: "assets/images/browser-svgs/firefox/firefox.svg",
        matIcon: null,
      })
    : null;

  let runtime = boolean("Runtime", true);
  runtime
    ? options.push({
        title: "CPython",
        subtitle: "3.8.0",
        key: "Version",
        type: "runtime",
        icon: "assets/images/logos/48x48/cpython.png",
        matIcon: null,
      })
    : null;

  let os = boolean("OS", true);
  os
    ? options.push({
        title: "Ubuntu",
        subtitle: "20.0.4",
        key: "Version",
        type: "os",
        icon: "assets/images/os-logos/ubuntu.png",
        matIcon: null,
      })
    : null;

  let device = boolean("Device", true);
  device
    ? options.push({
        title: "Red Ryder",
        subtitle: "amd64",
        key: "Arch",
        type: "device",
        icon: null,
        matIcon: "devices_other",
      })
    : null;

  let gpu = boolean("GPU", true);
  gpu
    ? options.push({
        title: "Graphic",
        subtitle: "a vendor",
        key: "Vendor",
        type: "gpu",
        icon: null,
        matIcon: null,
      })
    : null;

  return {
    component: ContextsComponent,
    props: {
      specialContexts$: of(options),
    },
  };
};

contexts.story = {
  name: "Event Detail Contexts",
};

export const unknownContexts = () => {
  const contextsExample = [
    {
      type: "user",
      icon: null,
      matIcon: "account_circle",
      title: "em@jay.com",
      subtitle: "117",
      key: "ID",
    },
    {
      type: "runtime",
      icon: "assets/images/logos/48x48/cpython.png",
      matIcon: null,
      title: "CPython",
      subtitle: "3.8.6",
      key: "Version",
    },
    {
      type: "browser",
      icon: undefined,
      matIcon: "tab",
      title: "Unknown Browser",
      subtitle: null,
      key: "Version",
    },
    {
      type: "device",
      icon: null,
      matIcon: "devices_other",
      title: "Unknown Device",
      subtitle: null,
      key: null,
    },
    {
      type: "os",
      icon: undefined,
      matIcon: "computer",
      title: "Unknown Operating System",
      subtitle: null,
      key: "Version",
    },
  ];
  return {
    component: ContextsComponent,
    props: {
      specialContexts$: of(contextsExample),
    },
  };
};

unknownContexts.story = {
  name: "Event Detail Contexts - Unknown Scenario",
};

export const IconPaths = () => {
  const iconMarkup = Object.keys(iconDictionary).map(
    (icon) => `
    <div style="border: 1px solid lightgray; margin: 5px; padding: 0 10px 10px;">
      <p style="font-size: 0.75em">${icon}</p>
      <img
        style="width: 50px; height: 50px;"
        class="image"
        src="${generateIconPath(icon)}"
      />
    </div>
  `
  );

  return {
    template: `
      <div style="display: flex; flex-wrap: wrap;">
        ${iconMarkup.join("")}
      </div>
    `,
  };
};

IconPaths.story = {
  name: "Icon Paths",
};
