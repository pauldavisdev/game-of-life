import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GridOptionsComponent } from './components/grid-options/grid-options.component';
import { gridConfigs } from './constants/grid-configs.constant';
import { Cell } from './models/cell';
import { Grid } from './models/grid';
import { GridFacadeService } from './services/grid-facade.service';
import { GridStateService } from './services/grid-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('gridOptions') gridOptions: GridOptionsComponent;
  title = "Conway's Game of Life";
  selectedGridConfigId = '0';
  grid$: Observable<Cell[][]>;
  isRunning$: Observable<boolean>;
  isEmpty$: Observable<boolean>;

  gridConfigs = gridConfigs;
  constructor(
    private gridState: GridStateService,
    private gridFacade: GridFacadeService
  ) {
    this.grid$ = this.gridState.getGrid().pipe(map((g) => g.grid));
    this.isRunning$ = this.gridState.isRunning();
    this.isEmpty$ = this.gridState.isEmpty();
  }

  toggleRunning() {
    this.gridState
      .isRunning()
      .pipe(take(1))
      .subscribe((r) => {
        if (r) {
          this.gridFacade.stopGame();
        } else {
          this.gridFacade.startGame();
        }
      });
  }

  loadGridConfig(gridConfigId: string) {
    if (gridConfigId !== 'None') {
      this.gridFacade.loadGridConfig(
        this.gridConfigs.find((gs) => gs.id === gridConfigId).pattern
      );
    } else {
      this.gridFacade.clearGrid();
    }
  }

  generateNewGrid(gridDimensions: [number, number]) {
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((g) => {
        const newGrid = new Grid(gridDimensions[0], gridDimensions[1]);
        newGrid.delay = g.delay;
        newGrid.stepSize = g.stepSize;
        this.gridState.setGrid(newGrid);
      });
  }

  updateDelay(delay: number) {
    this.isRunning$.pipe(take(1)).subscribe((isRunning) => {
      this.gridState
        .getGrid()
        .pipe(take(1))
        .subscribe((g) => {
          g.delay = delay * 1000;
          if (isRunning) {
            this.gridFacade.stopGame();
            this.gridFacade.startGame();
          }
        });
    });
  }

  updateStepSize(stepSize: number) {
    this.gridState
      .getGrid()
      .pipe(take(1))
      .subscribe((g) => {
        g.stepSize = stepSize;
      });
  }

  toggleCell(cellIndicies: [number, number]) {
    this.gridState
      .isRunning()
      .pipe(take(1))
      .subscribe((r) => {
        if (!r) {
          this.gridOptions.setSelectedGridConfig('0');
          this.gridFacade.toggleCell(cellIndicies[0], cellIndicies[1]);
        }
      });
  }

  clearGrid() {
    this.gridOptions.setSelectedGridConfig('0');
    this.gridFacade.clearGrid();
  }
}
