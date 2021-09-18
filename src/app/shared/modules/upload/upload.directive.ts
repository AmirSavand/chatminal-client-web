import { Directive, HostListener, Input, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '@app/shared/services/api.service';

@Directive({
  selector: '[appUpload]',
})
export class UploadDirective implements OnInit {

  /**
   * List of accepted file formats for picture selection.
   */
  static readonly IMAGE_ACCEPT_LIST = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/svg+xml'];

  /**
   * Input element required to handle file selection.
   */
  @Input() fileInput: HTMLInputElement;

  /**
   * Upload event (when file upload is finished).
   */
  @Output() upload = new EventEmitter<string>();

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
      this.api.postFile(file).subscribe(({ file }: { file: string }): void => {
        this.upload.emit(file);
      });
    }
  }
}
