import { Cell } from './cell';

export class Grid {
  private _rows: number;
  private _columns: number;
  private _currentGeneration: Cell[][] = [];
  private _nextGeneration: Cell[][] = [];
  private _stepSize = 1;
  private _delay = 1000;
  private _randomizePercentage = 30;

  constructor(rows = 15, columns = 15) {
    this._rows = rows;
    this._columns = columns;
    this._generateGrid();
  }

  public get rows() {
    return this._rows;
  }

  public set rows(rows: number) {
    this._rows = rows;
  }

  public get columns() {
    return this._columns;
  }

  public set columns(columns: number) {
    this._columns = columns;
  }

  public get grid() {
    return this._currentGeneration;
  }

  public set stepSize(stepSize: number) {
    this._stepSize = stepSize;
  }

  public get stepSize() {
    return this._stepSize;
  }

  public set delay(delay: number) {
    this._delay = delay;
  }

  public get delay() {
    return this._delay;
  }

  private _generateGrid() {
    for (let i = 0; i < this._rows + 2; i++) {
      this._currentGeneration[i] = [];
      for (let j = 0; j < this._columns + 2; j++) {
        if (i === 0 || i === this._rows) {
          this._currentGeneration[i][j] = new Cell(false, true);
        } else if (j === 0 || j > this._columns) {
          this._currentGeneration[i][j] = new Cell(false, true);
        } else {
          this._currentGeneration[i][j] = new Cell(false);
        }
      }
    }

    this._nextGeneration = this.copyGrid(this._currentGeneration);
  }

  public setGridState(gridConfig: [number, number][] = []) {
    for (let i = 0; i < gridConfig.length; i++) {
      const cellX = gridConfig[i][0];
      const cellY = gridConfig[i][1];
      this._currentGeneration[cellX][cellY].isAlive = true;
    }
  }

  public calculateNextGeneration() {
    let neighbours = [];
    for (let i = 1; i < this._rows; i++) {
      for (let j = 1; j < this._columns; j++) {
        const topLeft = this._currentGeneration[i - 1][j - 1];
        if (topLeft.isAlive) {
          neighbours.push(topLeft);
        }
        const top = this._currentGeneration[i - 1][j];
        if (top.isAlive) {
          neighbours.push(top);
        }
        const topRight = this._currentGeneration[i - 1][j + 1];
        if (topRight.isAlive) {
          neighbours.push(topRight);
        }
        const right = this._currentGeneration[i][j + 1];
        if (right.isAlive) {
          neighbours.push(right);
        }
        const bottomRight = this._currentGeneration[i + 1][j + 1];
        if (bottomRight.isAlive) {
          neighbours.push(bottomRight);
        }
        const bottom = this._currentGeneration[i + 1][j];
        if (bottom.isAlive) {
          neighbours.push(bottom);
        }
        const bottomLeft = this._currentGeneration[i + 1][j - 1];
        if (bottomLeft.isAlive) {
          neighbours.push(bottomLeft);
        }
        const left = this._currentGeneration[i][j - 1];
        if (left.isAlive) {
          neighbours.push(left);
        }

        if (this._currentGeneration[i][j].isAlive) {
          if (neighbours.length < 2) {
            this._nextGeneration[i][j].isAlive = false;
          } else if (neighbours.length > 3) {
            this._nextGeneration[i][j].isAlive = false;
          } else {
            this._nextGeneration[i][j].isAlive = true;
          }
        } else {
          if (neighbours.length === 3) {
            this._nextGeneration[i][j].isAlive = true;
          }
        }
        neighbours = [];
      }
    }

    this._currentGeneration = this.copyGrid(this._nextGeneration);
  }

  private copyGrid(source: Cell[][]) {
    let output = [];
    for (let i = 0; i < this._rows + 2; i++) {
      output[i] = [];
      for (let j = 0; j < this._columns + 2; j++) {
        output[i][j] = new Cell(source[i][j].isAlive, source[i][j].isBoundary);
      }
    }
    return output;
  }

  public toggleCellPopulation(rowIndex: number, columnIndex: number) {
    this.grid[rowIndex][columnIndex].isAlive = !this.grid[rowIndex][columnIndex]
      .isAlive;
  }

  public randomize() {
    for (let i = 0; i < this.grid.length - 1; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].isAlive = false;
        const random = Math.round(Math.random() * 99) + 1;
        if (random < this._randomizePercentage) {
          this.grid[i][j].isAlive = true;
        }
      }
    }
  }

  deepCopyFunction = (inObject: Cell[][]): Cell[][] => {
    let outObject, value, key;

    if (typeof inObject !== typeof Array<Cell>() || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : new Cell(false);

    for (key in inObject) {
      value = inObject[key];

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = this.deepCopyFunction(value);
    }

    return outObject;
  };
}
