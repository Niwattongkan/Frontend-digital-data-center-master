import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  public headerData: any = [];

  public dataList: any = [];
  public pager: any = [];

  public pageSize = 10;
  public pageCurrent = 1;
  public totalItem: number;
  public currentPage = 1;

  public TextSearch = "";

  @Input() data = [];
  @Input() headerTable: any = [];
  @Input() title: string;
  @Input() wrapper: boolean;
  @Input() header: boolean;

  ngOnChanges() {
    this.setheaderData(this.data);
    this.setScoreTable(this.data.length);
    this.setPageSize();
  }

  public setheaderData(data) {
    this.headerData = data[0] ? Object.getOwnPropertyNames(data[0]) : []
  }

  public setScoreTable(length: number) {
    this.totalItem = length;
  }

  public setPageSize() {
    this.dataList = this.data.slice((this.currentPage - 1) * this.pageSize, (this.currentPage * this.pageSize))
    this.setPagination();
  }

  public setPagination() {
    this.pager = [];
    for (let index = 0; index < Math.ceil(this.totalItem / this.pageSize); index++) {
      this.pager.push(index + 1)
    }
  }

  public selectPagination(page: number) {
    this.currentPage = page;
    this.setPageSize();
  }

  public selectPreviousPage() {
    if (this.currentPage <= this.pager.length) {
      this.currentPage -= 1;
      this.setPageSize();
    }
  }

  public selectNextPage() {
    if (this.currentPage > 0) {
      this.currentPage += 1;
      this.setPageSize();
    }
  }

  public setPageSearch() {
    this.setScoreTable(this.dataList.length);
    this.dataList = this.dataList.slice((this.currentPage - 1) * this.pageSize, (this.currentPage * this.pageSize))
    this.setPagination();
  }

  public searchValue(searching: String) {
    if (searching === "") {
      this.setScoreTable(this.data.length);
      this.setPageSize();
    } else {
      this.dataList = this.searchDataFromTable(searching);
      this.setPageSearch();
    }
  }

  private searchDataFromTable(text) {
    let includeValue = [];
    for (let indexList = 0; indexList < this.data.length; indexList++) {
      for (let indexHead = 0; indexHead < this.headerTable.length; indexHead++) {
        if (this.data[indexList][this.headerTable[indexHead]].includes(text)) {
          includeValue.push(this.data[indexList])
        }
      }
    }
    return includeValue;
  }
}
