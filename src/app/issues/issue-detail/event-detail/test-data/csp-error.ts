import { EventDetail } from "src/app/issues/interfaces";

/*tslint:disable */
export const cspError: EventDetail = {
  eventID: "75c941b27a9c4819a374a2f2052279bc",
  dist: null,
  userReport: null,
  projectID: "1",
  previousEventID: null,
  message: "Blocked 'style' from 'example.com'",
  id: "41",
  size: 1317,
  errors: [],
  culprit: "style-src cdn.example.com",
  title: "Blocked 'style' from 'example.com'",
  platform: "other",
  location: "example.com",
  nextEventID: null,
  type: "csp",
  metadata: {
    message: "Blocked 'style' from 'example.com'",
    uri: "example.com",
    directive: "style-src"
  },
  groupingConfig: { id: "legacy:2019-03-12" },
  crashFile: null,
  tags: [
    {
      value: "http://example.com/css/style.css",
      key: "blocked-uri",
      _meta: null
    },
    { value: "style-src", key: "effective-directive", _meta: null },
    { value: "error", key: "level", _meta: null },
    { value: "csp", key: "logger", _meta: null },
    { value: "http://example.com/signup.html", key: "url", _meta: null },
    {
      query: "user.ip:69.197.135.226",
      value: "ip:69.197.135.226",
      key: "user",
      _meta: null
    }
  ],
  dateCreated: "2020-02-06T19:35:11.310Z",
  dateReceived: "2020-02-06T19:35:11.310Z",
  user: {
    username: null,
    name: null,
    ip_address: "69.197.135.226",
    email: null,
    data: {},
    id: null
  },
  entries: [
    {
      type: "message",
      data: { formatted: "Blocked 'style' from 'example.com'" }
    },
    {
      type: "csp",
      data: {
        blocked_uri: "http://example.com/css/style.css",
        referrer: "",
        violated_directive: "style-src cdn.example.com",
        document_uri: "http://example.com/signup.html",
        original_policy:
          "default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports",
        effective_directive: "style-src"
      }
    },
    {
      type: "request",
      data: {
        fragment: "",
        cookies: [],
        inferredContentType: null,
        env: null,
        headers: [["User-Agent", "axios/0.19.0"]],
        url: "http://example.com/signup.html",
        query: [],
        data: null,
        method: null
      }
    }
  ],
  packages: {},
  sdk: {
    version: "0.19.0",
    name: "axios",
    upstream: { url: null, isNewer: false, name: "axios" }
  },
  _meta: {
    user: null,
    context: null,
    entries: {},
    contexts: null,
    message: null,
    packages: null,
    tags: {},
    sdk: null
  },
  contexts: {},
  fingerprints: ["d5345fd5e29cfa4c251224cb7a035edc"],
  context: {},
  release: null,
  groupID: "12"
};
