import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IGridConfig } from 'src/app/constants/grid-configs.constant';
import { GridStateService } from '../../services/grid-state.service';

@Component({
  selector: 'app-grid-options',
  templateUrl: './grid-options.component.html',
  styleUrls: ['./grid-options.component.css'],
})
export class GridOptionsComponent implements OnInit {
  @Input() isRunning$: Observable<boolean>;
  @Input() isEmpty$: Observable<boolean>;

  rowCount = 15;
  columnCount = 15;
  delay = 1;
  stepSize = 1;
  newGridConfigName = '';

  @Input() selectedGridConfigId = '0';
  @Input() gridConfigs: IGridConfig[];
  @Output() startStopClicked = new EventEmitter();
  @Output() clearClicked = new EventEmitter();
  @Output() generateClicked = new EventEmitter<[number, number]>();
  @Output() delayChanged = new EventEmitter<number>();
  @Output() stepSizeChanged = new EventEmitter<number>();
  @Output() gridConfigSelected = new EventEmitter<string>();

  constructor(private gridState: GridStateService) {}

  ngOnInit(): void {}

  setSelectedGridConfig(id: string) {
    this.selectedGridConfigId = id;
  }

  onStartStopClicked() {
    this.startStopClicked.emit();
  }

  saveGridConfig() {
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((g) => {
        const gridPattern = [];
        for (let i = 0; i < g.grid.length; i++) {
          for (let j = 0; j < g.grid[i].length; j++) {
            const element = g.grid[i][j];
            if (!element.isBoundary && element.isAlive) {
              gridPattern.push([i, j]);
            }
          }
        }
        const newId = Math.max(...this.gridConfigs.map((gc) => +gc.id)) + 1;
        this.gridConfigs.push({
          id: (newId + 1).toString(),
          name: this.newGridConfigName,
          pattern: gridPattern,
        });
      });
  }

  onGridStateClicked(gridConfigId: string) {
    this.gridConfigSelected.emit(gridConfigId);
  }

  onClearClicked() {
    this.clearClicked.emit();
  }

  onRandomizeClicked() {
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((g) => {
        g.randomize();
        this.gridState.setGrid(g);
      });
  }

  onGenerateClicked(rowCount: number, columnCount: number) {
    this.setSelectedGridConfig('0');
    this.generateClicked.emit([
      isNaN(rowCount) ? 1 : rowCount,
      isNaN(columnCount) ? 1 : columnCount,
    ]);
  }

  onDelayChanged(event: any) {
    const delay = event.target.value;
    if (isNaN(delay)) {
      this.delayChanged.emit(1000);
    } else {
      this.delayChanged.emit(delay);
    }
  }

  onStepSizeChanged(event: any) {
    const stepSize = event.target.value;
    if (isNaN(stepSize)) {
      this.stepSizeChanged.emit(1);
    } else {
      this.stepSizeChanged.emit(stepSize);
    }
  }
}
