import { Component, Input, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { SpreadType } from '../../options/spread-type';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-even-spread',
  templateUrl: './pdf-even-spread.component.html',
  styleUrls: ['./pdf-even-spread.component.css'],
})
export class PdfEvenSpreadComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public spread: SpreadType = 'off';

  @Input()
  public scrollMode: ScrollModeType = 0;

  constructor(private notificationService: PDFNotificationService, private ngZone: NgZone) {
    this.notificationService.onPDFJSInit.pipe(take(1)).subscribe(() => {
      this.onPdfJsInit();
    });
  }

  public onPdfJsInit(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('spreadmodechanged', (event) => {
      this.ngZone.run(() => {
        console.log('Caught event: spreadmodechanged', event);
        const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
        this.spread = modes[event.mode];
      });
    });
  }

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.pdfViewer.spreadMode = 2;
  }
}
