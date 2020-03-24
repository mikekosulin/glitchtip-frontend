import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { IssueDetailService } from "../../issue-detail.service";

@Component({
  selector: "app-entry-exception",
  templateUrl: "./entry-exception.component.html",
  styleUrls: ["./entry-exception.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryExceptionComponent {
  @Input() eventTitle: string;
  eventEntryException$ = this.issueService.eventEntryException$;
  isReversed$ = this.issueService.isReversed$;

  constructor(private issueService: IssueDetailService) {}

  getFlippedFrames() {
    this.issueService.getReversedFrames();
  }
}
