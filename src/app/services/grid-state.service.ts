import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Grid } from '../models/grid';

@Injectable({
  providedIn: 'root',
})
export class GridStateService {
  private running$ = new BehaviorSubject<boolean>(false);
  private grid$ = new BehaviorSubject<Grid>(new Grid());
  private isEmpty$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  getGrid(): Observable<Grid> {
    return this.grid$.asObservable();
  }

  setGrid(grid: Grid) {
    return this.grid$.next(grid);
  }

  isRunning(): Observable<boolean> {
    return this.running$.asObservable();
  }

  setRunning(isRunning: boolean) {
    this.running$.next(isRunning);
  }

  isEmpty(): Observable<boolean> {
    return this.isEmpty$.asObservable();
  }

  setEmpty(isEmpty: boolean) {
    this.isEmpty$.next(isEmpty);
  }
}
