import { EventDetail } from "../../../interfaces";

/*tslint:disable */
export const pageNotFound: EventDetail = {
  eventID: "121da0ea18894a6e9eafe7d7027fec4b",
  id: "121da0ea18894a6e9eafe7d7027fec4b",
  issue: 13,
  contexts: {
    trace: {
      op: "django.middleware",
      span_id: "85bee10ac7bb746c",
      trace_id: "52c5c9d9b7304cce95659e5d0615601c",
      description:
        "django.middleware.clickjacking.XFrameOptionsMiddleware.__call__",
      parent_span_id: "bfac543765f9ce61"
    },
    runtime: {
      name: "CPython",
      build: "3.8.2 (default, Feb 26 2020, 15:09:34) \n[GCC 8.3.0]",
      version: "3.8.2"
    }
  },
  culprit: "/message/",
  dateCreated: "2020-03-13T13:33:44.881822Z",
  dateReceived: "2020-03-13T13:33:44.993168Z",
  entries: [
    {
      type: "request",
      data: {
        env: {
          SERVER_NAME: "52c1bc4559ee",
          SERVER_PORT: "8001"
        },
        url: "http://localhost:8001/message/",
        method: "GET",
        headers: [
          [
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
          ],
          ["Accept-Encoding", "gzip, deflate"],
          ["Accept-Language", "en-US,en;q=0.5"],
          ["Connection", "keep-alive"],
          ["Content-Length", ""],
          ["Content-Type", "text/plain"],
          ["Cookie", ""],
          ["Dnt", "1"],
          ["Host", "localhost:8001"],
          ["Referer", "http://localhost:8001/"],
          ["Upgrade-Insecure-Requests", "1"],
          [
            "User-Agent",
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0"
          ]
        ],
        query_string: "",
        inferredContentType: "text/plain"
      }
    }
  ],
  metadata: {
    title: "Page not found!"
  },
  packages: {
    pip: "20.0.2",
    six: "1.14.0",
    cffi: "1.14.0",
    cleo: "0.7.6",
    idna: "2.9",
    ipdb: "0.12.3",
    jedi: "0.16.0",
    pytz: "2019.3",
    toml: "0.10.0",
    attrs: "19.3.0",
    black: "19.10b0",
    cachy: "0.3.0",
    click: "7.0",
    parso: "0.6.2",
    pylev: "1.3.0",
    regex: "2020.2.20",
    wheel: "0.34.2",
    clikit: "0.4.2",
    django: "3.0.4",
    pastel: "0.2.0",
    poetry: "1.0.0",
    appdirs: "1.4.3",
    asgiref: "3.2.3",
    certifi: "2019.11.28",
    chardet: "3.0.4",
    ipython: "7.13.0",
    jeepney: "0.4.3",
    keyring: "19.3.0",
    msgpack: "1.0.0",
    pexpect: "4.8.0",
    pkginfo: "1.5.0.1",
    tomlkit: "0.5.11",
    urllib3: "1.25.8",
    wcwidth: "0.1.8",
    backcall: "0.1.0",
    html5lib: "1.0.1",
    lockfile: "0.12.2",
    pathspec: "0.7.0",
    pygments: "2.6.1",
    requests: "2.23.0",
    sqlparse: "0.3.1",
    decorator: "4.4.2",
    pycparser: "2.20",
    pyparsing: "2.4.6",
    traitlets: "4.3.3",
    "typed-ast": "1.4.1",
    jsonschema: "3.2.0",
    ptyprocess: "0.6.0",
    pyrsistent: "0.14.11",
    "sentry-sdk": "0.14.2",
    setuptools: "45.2.0",
    pickleshare: "0.7.5",
    shellingham: "1.3.2",
    cachecontrol: "0.12.6",
    cryptography: "2.8",
    webencodings: "0.5.1",
    secretstorage: "3.1.2",
    "prompt-toolkit": "3.0.3",
    "ipython-genutils": "0.2.0",
    "requests-toolbelt": "0.8.0"
  },
  platform: "python",
  sdk: {
    name: "sentry.python",
    version: "0.14.2",
    packages: [
      {
        name: "pypi:sentry-sdk",
        version: "0.14.2"
      }
    ],
    integrations: [
      "argv",
      "atexit",
      "dedupe",
      "django",
      "excepthook",
      "logging",
      "modules",
      "stdlib",
      "threading"
    ]
  },
  tags: [],
  title: "Page not found!",
  type: "default",
  nextEventID: null,
  previousEventID: null
};
