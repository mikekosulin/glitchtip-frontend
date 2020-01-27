import { EventDetail } from "../../../interfaces";

/*tslint:disable */
export const templateError: EventDetail = {
  eventID: "737278b5db2a4280b82351342296beb0",
  dist: null,
  userReport: null,
  projectID: "2",
  previousEventID: null,
  message:
    "NoReverseMatch Reverse for 'nope' not found. 'nope' is not a valid view function or pattern name. /code/errors/templates/template_error.html /template-error/",
  id: "6",
  size: 16872,
  errors: [],
  culprit: "/template-error/",
  title:
    "NoReverseMatch: Reverse for 'nope' not found. 'nope' is not a valid view function or pattern name.",
  platform: "python",
  location: "/code/errors/templates/template_error.html",
  nextEventID: null,
  type: "error",
  metadata: {
    type: "NoReverseMatch",
    value:
      "Reverse for 'nope' not found. 'nope' is not a valid view function or pattern name.",
    filename: "/code/errors/templates/template_error.html"
  },
  groupingConfig: { id: "legacy:2019-03-12" },
  crashFile: null,
  tags: [
    { value: "Firefox 72.0", key: "browser", _meta: null },
    { value: "Firefox", key: "browser.name", _meta: null },
    { value: "no", key: "handled", _meta: null },
    { value: "error", key: "level", _meta: null },
    { value: "django", key: "mechanism", _meta: null },
    { value: "Linux", key: "os.name", _meta: null },
    { value: "CPython 3.8.0", key: "runtime", _meta: null },
    { value: "CPython", key: "runtime.name", _meta: null },
    { value: "ab3aadbbc567", key: "server_name", _meta: null },
    { value: "/template-error/", key: "transaction", _meta: null },
    { value: "http://localhost:8001/template-error/", key: "url", _meta: null }
  ],
  dateCreated: "2020-01-27T19:18:03.345Z",
  dateReceived: "2020-01-27T19:18:03.531Z",
  user: null,
  entries: [
    {
      type: "exception",
      data: {
        values: [
          {
            stacktrace: {
              frames: [
                {
                  function: "inner",
                  colNo: null,
                  vars: {
                    get_response:
                      "<bound method BaseHandler._get_response of <django.core.handlers.wsgi.WSGIHandler object at 0x7f61885db580>>",
                    request: "<WSGIRequest: GET '/template-error/'>",
                    exc:
                      "NoReverseMatch(\"Reverse for 'nope' not found. 'nope' is not a valid view function or pattern name.\")"
                  },
                  symbol: null,
                  module: "django.core.handlers.exception",
                  lineNo: 34,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/core/handlers/exception.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/core/handlers/exception.py",
                  platform: null,
                  context: [
                    [
                      29,
                      "    can rely on getting a response instead of an exception."
                    ],
                    [30, '    """'],
                    [31, "    @wraps(get_response)"],
                    [32, "    def inner(request):"],
                    [33, "        try:"],
                    [34, "            response = get_response(request)"],
                    [35, "        except Exception as exc:"],
                    [
                      36,
                      "            response = response_for_exception(request, exc)"
                    ],
                    [37, "        return response"],
                    [38, "    return inner"],
                    [39, ""]
                  ],
                  symbolAddr: null
                },
                {
                  function: "_get_response",
                  colNo: null,
                  vars: {
                    resolver_match:
                      "ResolverMatch(func=errors.views.TemplateErrorView, args=(), kwargs={}, url_name=template_error, app_names=[], namespaces=[], route=template-error/)",
                    callback_args: [],
                    middleware_method:
                      "<function CsrfViewMiddleware.process_view at 0x7f6187781c10>",
                    self:
                      "<django.core.handlers.wsgi.WSGIHandler object at 0x7f61885db580>",
                    request: "<WSGIRequest: GET '/template-error/'>",
                    callback: "<function TemplateErrorView at 0x7f618810a040>",
                    wrapped_callback:
                      "<function TemplateErrorView at 0x7f618810a040>",
                    resolver:
                      "<URLResolver 'django_error_factory.urls' (None:None) '^/'>",
                    callback_kwargs: {},
                    response:
                      '<TemplateResponse status_code=200, "text/html; charset=utf-8">'
                  },
                  symbol: null,
                  module: "django.core.handlers.base",
                  lineNo: 145,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/core/handlers/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/core/handlers/base.py",
                  platform: null,
                  context: [
                    [140, "                    )"],
                    [141, ""],
                    [142, "            try:"],
                    [143, "                response = response.render()"],
                    [144, "            except Exception as e:"],
                    [
                      145,
                      "                response = self.process_exception_by_middleware(e, request)"
                    ],
                    [146, ""],
                    [147, "        return response"],
                    [148, ""],
                    [
                      149,
                      "    def process_exception_by_middleware(self, exception, request):"
                    ],
                    [150, '        """']
                  ],
                  symbolAddr: null
                },
                {
                  function: "_get_response",
                  colNo: null,
                  vars: {
                    resolver_match:
                      "ResolverMatch(func=errors.views.TemplateErrorView, args=(), kwargs={}, url_name=template_error, app_names=[], namespaces=[], route=template-error/)",
                    callback_args: [],
                    middleware_method:
                      "<function CsrfViewMiddleware.process_view at 0x7f6187781c10>",
                    self:
                      "<django.core.handlers.wsgi.WSGIHandler object at 0x7f61885db580>",
                    request: "<WSGIRequest: GET '/template-error/'>",
                    callback: "<function TemplateErrorView at 0x7f618810a040>",
                    wrapped_callback:
                      "<function TemplateErrorView at 0x7f618810a040>",
                    resolver:
                      "<URLResolver 'django_error_factory.urls' (None:None) '^/'>",
                    callback_kwargs: {},
                    response:
                      '<TemplateResponse status_code=200, "text/html; charset=utf-8">'
                  },
                  symbol: null,
                  module: "django.core.handlers.base",
                  lineNo: 143,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/core/handlers/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/core/handlers/base.py",
                  platform: null,
                  context: [
                    [
                      138,
                      '                        "HttpResponse object. It returned None instead."'
                    ],
                    [
                      139,
                      "                        % (middleware_method.__self__.__class__.__name__)"
                    ],
                    [140, "                    )"],
                    [141, ""],
                    [142, "            try:"],
                    [143, "                response = response.render()"],
                    [144, "            except Exception as e:"],
                    [
                      145,
                      "                response = self.process_exception_by_middleware(e, request)"
                    ],
                    [146, ""],
                    [147, "        return response"],
                    [148, ""]
                  ],
                  symbolAddr: null
                },
                {
                  function: "render",
                  colNo: null,
                  vars: {
                    self:
                      '<TemplateResponse status_code=200, "text/html; charset=utf-8">',
                    retval:
                      '<TemplateResponse status_code=200, "text/html; charset=utf-8">'
                  },
                  symbol: null,
                  module: "django.template.response",
                  lineNo: 105,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/response.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/response.py",
                  platform: null,
                  context: [
                    [100, ""],
                    [101, "        Return the baked response instance."],
                    [102, '        """'],
                    [103, "        retval = self"],
                    [104, "        if not self._is_rendered:"],
                    [105, "            self.content = self.rendered_content"],
                    [
                      106,
                      "            for post_callback in self._post_render_callbacks:"
                    ],
                    [107, "                newretval = post_callback(retval)"],
                    [108, "                if newretval is not None:"],
                    [109, "                    retval = newretval"],
                    [110, "        return retval"]
                  ],
                  symbolAddr: null
                },
                {
                  function: "rendered_content",
                  colNo: null,
                  vars: {
                    self:
                      '<TemplateResponse status_code=200, "text/html; charset=utf-8">',
                    context: {
                      view:
                        "<errors.views.TemplateErrorView object at 0x7f6187682730>"
                    },
                    template:
                      "<django.template.backends.django.Template object at 0x7f61876e10a0>"
                  },
                  symbol: null,
                  module: "django.template.response",
                  lineNo: 83,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/response.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/response.py",
                  platform: null,
                  context: [
                    [
                      78,
                      "        response content, you must either call render(), or set the"
                    ],
                    [
                      79,
                      "        content explicitly using the value of this property."
                    ],
                    [80, '        """'],
                    [
                      81,
                      "        template = self.resolve_template(self.template_name)"
                    ],
                    [
                      82,
                      "        context = self.resolve_context(self.context_data)"
                    ],
                    [
                      83,
                      "        return template.render(context, self._request)"
                    ],
                    [84, ""],
                    [85, "    def add_post_render_callback(self, callback):"],
                    [86, '        """Add a new post-rendering callback.'],
                    [87, ""],
                    [88, "        If the response has already been rendered,"]
                  ],
                  symbolAddr: null
                },
                {
                  function: "render",
                  colNo: null,
                  vars: {
                    self:
                      "<django.template.backends.django.Template object at 0x7f61876e10a0>",
                    request: "<WSGIRequest: GET '/template-error/'>",
                    context:
                      "[{'True': True, 'False': False, 'None': None}, {}, {}, {'view': <errors.views.TemplateErrorView object at 0x7f6187682730>}]"
                  },
                  symbol: null,
                  module: "django.template.backends.django",
                  lineNo: 61,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/backends/django.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/backends/django.py",
                  platform: null,
                  context: [
                    [56, "        return self.template.origin"],
                    [57, ""],
                    [58, "    def render(self, context=None, request=None):"],
                    [
                      59,
                      "        context = make_context(context, request, autoescape=self.backend.engine.autoescape)"
                    ],
                    [60, "        try:"],
                    [61, "            return self.template.render(context)"],
                    [62, "        except TemplateDoesNotExist as exc:"],
                    [63, "            reraise(exc, self.backend)"],
                    [64, ""],
                    [65, ""],
                    [66, "def copy_exception(exc, backend=None):"]
                  ],
                  symbolAddr: null
                },
                {
                  function: "render",
                  colNo: null,
                  vars: {
                    self:
                      "<django.template.base.Template object at 0x7f618769f460>",
                    context:
                      "[{'True': True, 'False': False, 'None': None}, {}, {}, {'view': <errors.views.TemplateErrorView object at 0x7f6187682730>}]"
                  },
                  symbol: null,
                  module: "django.template.base",
                  lineNo: 171,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/base.py",
                  platform: null,
                  context: [
                    [
                      166,
                      '        "Display stage -- can be called many times"'
                    ],
                    [
                      167,
                      "        with context.render_context.push_state(self):"
                    ],
                    [168, "            if context.template is None:"],
                    [169, "                with context.bind_template(self):"],
                    [
                      170,
                      "                    context.template_name = self.name"
                    ],
                    [171, "                    return self._render(context)"],
                    [172, "            else:"],
                    [173, "                return self._render(context)"],
                    [174, ""],
                    [175, "    def compile_nodelist(self):"],
                    [176, '        """']
                  ],
                  symbolAddr: null
                },
                {
                  function: "_render",
                  colNo: null,
                  vars: {
                    self:
                      "<django.template.base.Template object at 0x7f618769f460>",
                    context:
                      "[{'True': True, 'False': False, 'None': None}, {}, {}, {'view': <errors.views.TemplateErrorView object at 0x7f6187682730>}]"
                  },
                  symbol: null,
                  module: "django.template.base",
                  lineNo: 163,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/base.py",
                  platform: null,
                  context: [
                    [158, "    def __iter__(self):"],
                    [159, "        for node in self.nodelist:"],
                    [160, "            yield from node"],
                    [161, ""],
                    [162, "    def _render(self, context):"],
                    [163, "        return self.nodelist.render(context)"],
                    [164, ""],
                    [165, "    def render(self, context):"],
                    [
                      166,
                      '        "Display stage -- can be called many times"'
                    ],
                    [
                      167,
                      "        with context.render_context.push_state(self):"
                    ],
                    [168, "            if context.template is None:"]
                  ],
                  symbolAddr: null
                },
                {
                  function: "render",
                  colNo: null,
                  vars: {
                    node:
                      "<django.template.defaulttags.URLNode object at 0x7f618769fc10>",
                    bit: "'<a href=\"'",
                    bits: ["'<a href=\"'"],
                    self: [
                      "<TextNode: '<a href=\"'>",
                      "<django.template.defaulttags.URLNode object at 0x7f618769fc10>",
                      "<TextNode: '\">'>"
                    ],
                    context:
                      "[{'True': True, 'False': False, 'None': None}, {}, {}, {'view': <errors.views.TemplateErrorView object at 0x7f6187682730>}]"
                  },
                  symbol: null,
                  module: "django.template.base",
                  lineNo: 936,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/base.py",
                  platform: null,
                  context: [
                    [931, ""],
                    [932, "    def render(self, context):"],
                    [933, "        bits = []"],
                    [934, "        for node in self:"],
                    [935, "            if isinstance(node, Node):"],
                    [
                      936,
                      "                bit = node.render_annotated(context)"
                    ],
                    [937, "            else:"],
                    [938, "                bit = node"],
                    [939, "            bits.append(str(bit))"],
                    [940, "        return mark_safe(''.join(bits))"],
                    [941, ""]
                  ],
                  symbolAddr: null
                },
                {
                  function: null,
                  colNo: null,
                  vars: null,
                  symbol: null,
                  module: null,
                  lineNo: 1,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath: "/code/errors/templates/template_error.html",
                  inApp: true,
                  instructionAddr: null,
                  filename: "/code/errors/templates/template_error.html",
                  platform: null,
                  context: [
                    [1, "&lt;a href=&quot;{% url &#x27;nope&#x27; %}&quot;&gt;"]
                  ],
                  symbolAddr: null
                },
                {
                  function: "render_annotated",
                  colNo: null,
                  vars: {
                    self:
                      "<django.template.defaulttags.URLNode object at 0x7f618769fc10>",
                    context:
                      "[{'True': True, 'False': False, 'None': None}, {}, {}, {'view': <errors.views.TemplateErrorView object at 0x7f6187682730>}]"
                  },
                  symbol: null,
                  module: "django.template.base",
                  lineNo: 903,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/base.py",
                  platform: null,
                  context: [
                    [
                      898,
                      "        rendering, the exception is annotated with contextual line information"
                    ],
                    [
                      899,
                      "        where it occurred in the template. For internal usage this method is"
                    ],
                    [
                      900,
                      "        preferred over using the render method directly."
                    ],
                    [901, '        """'],
                    [902, "        try:"],
                    [903, "            return self.render(context)"],
                    [904, "        except Exception as e:"],
                    [
                      905,
                      "            if context.template.engine.debug and not hasattr(e, 'template_debug'):"
                    ],
                    [
                      906,
                      "                e.template_debug = context.render_context.template.get_exception_info(e, self.token)"
                    ],
                    [907, "            raise"],
                    [908, ""]
                  ],
                  symbolAddr: null
                },
                {
                  function: "render",
                  colNo: null,
                  vars: {
                    reverse: "<function reverse at 0x7f61887ad4c0>",
                    url: "''",
                    self:
                      "<django.template.defaulttags.URLNode object at 0x7f618769fc10>",
                    args: [],
                    current_app: "''",
                    view_name: "'nope'",
                    context:
                      "[{'True': True, 'False': False, 'None': None}, {}, {}, {'view': <errors.views.TemplateErrorView object at 0x7f6187682730>}]",
                    kwargs: {},
                    NoReverseMatch:
                      "<class 'django.urls.exceptions.NoReverseMatch'>"
                  },
                  symbol: null,
                  module: "django.template.defaulttags",
                  lineNo: 443,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/template/defaulttags.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/template/defaulttags.py",
                  platform: null,
                  context: [
                    [438, "                current_app = None"],
                    [
                      439,
                      "        # Try to look up the URL. If it fails, raise NoReverseMatch unless the"
                    ],
                    [
                      440,
                      "        # {% url ... as var %} construct is used, in which case return nothing."
                    ],
                    [441, "        url = ''"],
                    [442, "        try:"],
                    [
                      443,
                      "            url = reverse(view_name, args=args, kwargs=kwargs, current_app=current_app)"
                    ],
                    [444, "        except NoReverseMatch:"],
                    [445, "            if self.asvar is None:"],
                    [446, "                raise"],
                    [447, ""],
                    [448, "        if self.asvar:"]
                  ],
                  symbolAddr: null
                },
                {
                  function: "reverse",
                  colNo: null,
                  vars: {
                    current_path: "None",
                    viewname: "'nope'",
                    args: [],
                    current_app: "''",
                    prefix: "'/'",
                    resolver:
                      "<URLResolver 'django_error_factory.urls' (None:None) '^/'>",
                    kwargs: {},
                    path: [],
                    urlconf: "'django_error_factory.urls'",
                    view: "'nope'"
                  },
                  symbol: null,
                  module: "django.urls.base",
                  lineNo: 87,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/urls/base.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/urls/base.py",
                  platform: null,
                  context: [
                    [82, "                else:"],
                    [
                      83,
                      '                    raise NoReverseMatch("%s is not a registered namespace" % key)'
                    ],
                    [84, "        if ns_pattern:"],
                    [
                      85,
                      "            resolver = get_ns_resolver(ns_pattern, resolver, tuple(ns_converters.items()))"
                    ],
                    [86, ""],
                    [
                      87,
                      "    return iri_to_uri(resolver._reverse_with_prefix(view, prefix, *args, **kwargs))"
                    ],
                    [88, ""],
                    [89, ""],
                    [90, "reverse_lazy = lazy(reverse, str)"],
                    [91, ""],
                    [92, ""]
                  ],
                  symbolAddr: null
                },
                {
                  function: "_reverse_with_prefix",
                  colNo: null,
                  vars: {
                    lookup_view: "'nope'",
                    m: "None",
                    self:
                      "<URLResolver 'django_error_factory.urls' (None:None) '^/'>",
                    args: [],
                    _prefix: "'/'",
                    lookup_view_s: "'nope'",
                    n: "None",
                    possibilities: [],
                    patterns: [],
                    msg:
                      "\"Reverse for 'nope' not found. 'nope' is not a valid view function or pattern name.\""
                  },
                  symbol: null,
                  module: "django.urls.resolvers",
                  lineNo: 677,
                  trust: null,
                  errors: null,
                  package: null,
                  absPath:
                    "/usr/local/lib/python3.8/site-packages/django/urls/resolvers.py",
                  inApp: false,
                  instructionAddr: null,
                  filename: "django/urls/resolvers.py",
                  platform: null,
                  context: [
                    [672, "        else:"],
                    [673, "            msg = ("],
                    [
                      674,
                      "                \"Reverse for '%(view)s' not found. '%(view)s' is not \""
                    ],
                    [
                      675,
                      "                \"a valid view function or pattern name.\" % {'view': lookup_view_s}"
                    ],
                    [676, "            )"],
                    [677, "        raise NoReverseMatch(msg)"]
                  ],
                  symbolAddr: null
                }
              ],
              framesOmitted: null,
              registers: null,
              hasSystemFrames: true
            },
            module: "django.urls.exceptions",
            rawStacktrace: null,
            mechanism: { type: "django", handled: false },
            threadId: null,
            value:
              "Reverse for 'nope' not found. 'nope' is not a valid view function or pattern name.",
            type: "NoReverseMatch"
          }
        ],
        excOmitted: null,
        hasSystemFrames: true
      }
    },
    {
      type: "request",
      data: {
        fragment: "",
        cookies: [],
        inferredContentType: "text/plain",
        env: { SERVER_NAME: "ab3aadbbc567", SERVER_PORT: "8001" },
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
          ["Host", "localhost:8001"],
          ["Referer", "http://localhost:8001/"],
          ["Upgrade-Insecure-Requests", "1"],
          [
            "User-Agent",
            "Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"
          ]
        ],
        url: "http://localhost:8001/template-error/",
        query: [],
        data: null,
        method: "GET"
      }
    }
  ],
  packages: {
    cffi: "1.13.2",
    "ipython-genutils": "0.2.0",
    pygments: "2.5.2",
    cleo: "0.7.6",
    pip: "19.3.1",
    "prompt-toolkit": "3.0.2",
    parso: "0.5.2",
    jeepney: "0.4.2",
    click: "7.0",
    appdirs: "1.4.3",
    "requests-toolbelt": "0.8.0",
    regex: "2020.1.8",
    pastel: "0.1.1",
    msgpack: "0.6.2",
    pexpect: "4.8.0",
    "sentry-sdk": "0.14.0",
    ipdb: "0.12.3",
    six: "1.14.0",
    poetry: "1.0.0",
    ptyprocess: "0.6.0",
    html5lib: "1.0.1",
    jedi: "0.15.2",
    traitlets: "4.3.3",
    asgiref: "3.2.3",
    cachy: "0.3.0",
    pathspec: "0.7.0",
    cachecontrol: "0.12.6",
    certifi: "2019.11.28",
    chardet: "3.0.4",
    wheel: "0.33.6",
    backcall: "0.1.0",
    cryptography: "2.8",
    sqlparse: "0.3.0",
    pycparser: "2.19",
    secretstorage: "3.1.2",
    urllib3: "1.25.7",
    webencodings: "0.5.1",
    pytz: "2019.3",
    clikit: "0.4.1",
    ipython: "7.11.1",
    lockfile: "0.12.2",
    pickleshare: "0.7.5",
    decorator: "4.4.1",
    tomlkit: "0.5.8",
    jsonschema: "3.2.0",
    "typed-ast": "1.4.1",
    keyring: "19.3.0",
    wcwidth: "0.1.8",
    django: "3.0.2",
    pyrsistent: "0.14.11",
    pyparsing: "2.4.6",
    pylev: "1.3.0",
    toml: "0.10.0",
    setuptools: "41.6.0",
    pkginfo: "1.5.0.1",
    black: "19.10b0",
    requests: "2.22.0",
    shellingham: "1.3.1",
    idna: "2.8",
    attrs: "19.3.0"
  },
  sdk: {
    version: "0.14.0",
    name: "sentry.python",
    upstream: { url: null, isNewer: false, name: "sentry.python" }
  },
  _meta: {
    user: null,
    context: null,
    entries: {
      "0": {
        data: {
          values: {
            "0": {
              "": null,
              stacktrace: {
                "": null,
                frames: {},
                registers: null,
                framesOmitted: null
              },
              mechanism: null,
              module: null,
              value: null,
              threadId: null,
              type: null
            }
          }
        }
      }
    },
    contexts: null,
    message: null,
    packages: null,
    tags: {},
    sdk: null
  },
  contexts: {
    runtime: {
      version: "3.8.0",
      type: "runtime",
      build: "3.8.0 (default, Nov 23 2019, 05:49:00) \n[GCC 8.3.0]",
      name: "CPython"
    },
    os: { type: "os", name: "Linux" },
    trace: {
      description:
        "django.middleware.clickjacking.XFrameOptionsMiddleware.__call__",
      parent_span_id: "9ede40076b725295",
      trace_id: "bec9565186e9474eb165f91e81deb6d5",
      span_id: "9cfe2bda8c47ac22",
      type: "default",
      op: "django.middleware"
    },
    browser: { version: "72.0", type: "browser", name: "Firefox" }
  },
  fingerprints: ["a8b88d9a728170fc062bed162e6b9394"],
  context: { "sys.argv": ["./manage.py", "runserver", "0.0.0.0:8001"] },
  release: null,
  groupID: "6"
};
