import { Directive, HostListener, Input, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { File as AppFile } from '@app/shared/interfaces/file';
import { ApiService } from '@app/shared/services/api.service';

@Directive({
  selector: '[appUpload]',
})
export class UploadDirective implements OnInit {

  /**
   * Input element required to handle file selection.
   */
  @Input() fileInput: HTMLInputElement;

  /**
   * Upload event (when file upload is finished).
   */
  @Output() upload = new EventEmitter<AppFile>();

  /**
   * On directive click, open file selection.
   */
  @HostListener('click') onClick(): void {
    this.fileInput.click();
  }

  constructor(private renderer2: Renderer2,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.renderer2.listen(this.fileInput, 'change', (): void => {
      this.onFileSelected();
    });
  }

  /**
   * When user tries to upload a file.
   */
  onFileSelected(): void {
    const files: File[] = Object.assign([], this.fileInput.files);
    if (!files[0]) {
      return;
    }
    // Empty list of files so user can upload same file again.
    this.fileInput.value = '';
    // Iterate through given files
    for (const file of files) {
      this.api.postFileUpload(file).subscribe({
        next: (response: AppFile): void => {
          this.upload.emit(response);
        },
      });
    }
  }
}
