export interface IGridConfig {
  id: string;
  name: string;
  pattern: [number, number][];
}

export const gridConfigs: IGridConfig[] = [
  {
    id: '0',
    name: 'User',
    pattern: [],
  },
  {
    id: '1',
    name: 'Blocks',
    pattern: [
      [3, 3],
      [3, 4],
      [4, 3],
      [4, 4],
      [7, 7],
      [7, 8],
      [8, 7],
      [8, 8],
    ],
  },
  {
    id: '2',
    name: 'Lines',
    pattern: [
      [3, 3],
      [3, 4],
      [3, 5],
      [6, 6],
      [6, 7],
      [6, 8],
    ],
  },
  {
    id: '3',
    name: 'Glider',
    pattern: [
      [1, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  },
];
