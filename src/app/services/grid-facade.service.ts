import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Grid } from '../models/grid';
import { GridStateService } from './grid-state.service';

@Injectable({
  providedIn: 'root',
})
export class GridFacadeService {
  private interval: any;

  constructor(private gridState: GridStateService) {
    this.gridState
      .getGrid()
      .pipe(
        map((g) => {
          let isEmpty = true;
          for (let i = 0; i < g.grid.length; i++) {
            for (let j = 0; j < g.grid[i].length; j++) {
              if (g.grid[i][j].isAlive) {
                isEmpty = false;
              }
            }
          }
          return isEmpty;
        })
      )
      .subscribe((isEmpty) => {
        if (isEmpty) {
          this.stopGame();
        }
        this.gridState.setEmpty(isEmpty);
      });
  }

  startGame() {
    this.gridState.setRunning(true);
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((grid) => {
        this.interval = setInterval(() => {
          for (let i = 0; i < grid.stepSize; i++) {
            grid.calculateNextGeneration();
          }
          this.gridState.setGrid(grid);
        }, grid.delay);
      });
  }

  stopGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.gridState.setRunning(false);
  }

  loadGridConfig(gridState: [number, number][]) {
    this.stopGame();
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((grid) => {
        const newGrid = new Grid(grid.rows, grid.columns);
        newGrid.setGridState(gridState);
        newGrid.delay = grid.delay;
        newGrid.stepSize = grid.stepSize;
        this.gridState.setGrid(newGrid);
      });
  }

  clearGrid() {
    this.stopGame();
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((grid) => {
        const newGrid = new Grid(grid.rows, grid.columns);
        newGrid.delay = grid.delay;
        newGrid.stepSize = grid.stepSize;
        this.gridState.setGrid(newGrid);
      });
  }

  toggleCell(rowIndex: number, columnIndex: number) {
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((grid) => {
        grid.toggleCellPopulation(rowIndex, columnIndex);
        this.gridState.setGrid(grid);
      });
  }
}
