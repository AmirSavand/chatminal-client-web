import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GetParams } from '@modules/micro/interfaces/get-params';

import { FilterType } from '@modules/filters/shared/enums/filter-type';
import { Filter } from '@modules/filters/shared/interfaces/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  readonly filterType = FilterType;

  @Input() filters: Filter[];

  @Input() initialEvent = true;

  @Output() update = new EventEmitter<GetParams>();

  ngOnInit(): void {
    if (this.initialEvent) {
      this.onUpdate();
    }
  }

  onUpdate(): void {
    const params: GetParams = {};
    for (const filter of this.filters) {
      if (filter.value !== null) {
        params[filter.key] = String(filter.value);
      }
    }
    this.update.emit(params);
  }
}
