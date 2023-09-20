import { ErrorHandler, Injectable } from "@angular/core";
import { MicroSentryErrorBusService } from "@micro-sentry/angular";
import { MicroSentryService } from "@micro-sentry/angular";

@Injectable({ providedIn: "root" })
export class CustomMicroSentryErrorHandler implements ErrorHandler {
  constructor(
    private errorBus: MicroSentryErrorBusService,
    microSentry: MicroSentryService
  ) {
    // tslint:disable-next-line:rxjs-prefer-angular-takeuntil
    errorBus.errors$.subscribe((error) => {
      microSentry.report(error);
    });
  }

  handleError(error: any): void {
    this.errorBus.next(error);

    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      if (confirm($localize`New version available. Load New Version?`)) {
        window.location.reload();
      }
    }
  }
}
