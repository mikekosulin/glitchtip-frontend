The Bottle integration adds support for the [Bottle Web Framework](https://bottlepy.org/).
Currently it works well with the stable version of Bottle (0.12).
However, the integration with the development version (0.13) doesn't work properly.

1. Install `sentry-sdk` from PyPI with the `bottle` extra:

   ```bash
   $ pip install --upgrade sentry-sdk[bottle]
   ```

2. To configure the SDK, initialize it with the integration before your app has been initialized:

   ```python
   import sentry_sdk

   from bottle import Bottle, run
   from sentry_sdk.integrations.bottle import BottleIntegration

   sentry_sdk.init(
       dsn="YOUR-GLITCHTIP-DSN-HERE",
       integrations=[BottleIntegration()]
   )

   app = Bottle()
   ```
