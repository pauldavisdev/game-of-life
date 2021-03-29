import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cell } from 'src/app/models/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input() grid$: Observable<Cell[][]>;
  @Output() cellClicked = new EventEmitter<[number, number]>();

  constructor() {}

  ngOnInit(): void {}

  onCellClick(rowIndex: number, columnIndex: number) {
    this.cellClicked.emit([rowIndex, columnIndex]);
  }
}
