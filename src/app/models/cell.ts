export class Cell {
  private _isAlive: boolean;
  private _isBoundary = false;
  constructor(isAlive: boolean, isBoundary?: boolean) {
    this._isAlive = isAlive;
    if (isBoundary !== undefined) {
      this._isBoundary = isBoundary;
    }
  }

  public get isAlive(): boolean {
    return this._isAlive;
  }

  public set isAlive(isAlive: boolean) {
    this._isAlive = isAlive;
  }

  public get isBoundary(): boolean {
    return this._isBoundary;
  }
}
