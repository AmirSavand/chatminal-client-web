import { Component, Input } from '@angular/core';
import { Message } from '@app/shared/classes/message';
import { User } from '@app/shared/classes/user';
import { FileGroup } from '@app/shared/enums/file-group';
import { File } from '@app/shared/interfaces/file';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {

  readonly user = User;

  readonly fileGroup = FileGroup;

  /** File content loaded from API mapped to URL. */
  readonly fileContent: Record<string, string> = {};

  @Input() messages: Partial<Message>[];

  @Input() classes: string = '';

  constructor(private api: ApiService) {
  }

  loadFileContent(file: File): void {
    if (this.fileContent[file.url]) {
      return;
    }
    this.api.postFileDownload(file).subscribe((content: string): void => {
      this.fileContent[file.url] = content;
    });
  }
}
