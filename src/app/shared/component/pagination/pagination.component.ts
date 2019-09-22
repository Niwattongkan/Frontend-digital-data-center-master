import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() data: any;
  @Input() pageSize: any;
  @Input() totalItem: any;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  public dataList = []
  public pager = []

  public maxPage = 0;
  public pageCurrent = 1;

  constructor() {

  }

  ngOnChanges() {
    this.totalItem = this.data.length;
    this.maxPage = Math.ceil(this.totalItem / this.pageSize);
    this.setPageSize();
  }

  public setPagination() {
    this.pager = [];
    for (let index = 0; index < this.maxPage; index++) {
      this.pager.push(index + 1)
    }
    this.onChange.emit(this.dataList);
  }

  public setPageSize() {
    this.dataList = this.data.slice((this.pageCurrent - 1) * this.pageSize, (this.pageCurrent * this.pageSize))
    this.setPagination();
  }

  public selectPagination(page: number) {
    this.pageCurrent = page;
    this.setPageSize();
  }

  public selectPreviousPage() {
    if (this.pageCurrent <= this.pager.length && this.pageCurrent > 0) {
      this.pageCurrent -= 1;
      this.setPageSize();
    }
  }

  public selectNextPage() {
    if (this.pageCurrent > 0 && this.pageCurrent < this.maxPage) {
      this.pageCurrent += 1;
      this.setPageSize();
    }
  }

}
