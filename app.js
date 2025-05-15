import fs from 'node:fs';
import path from 'node:path';

function readMazeFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  return content.trim().split('\n').map(line =>
    line.trim().split(' ').map(cell => {
      if (cell === 'S' || cell === 'E') return cell;

      return parseInt(cell);
    })
  );
}

function printResult(result) {
  const mazeWithPath = maze.map(row => row.slice());

  for (const [x, y] of result) {
    if (mazeWithPath[x][y] === 0) {
      mazeWithPath[x][y] = 'P';
    }
  }

  for (const row of mazeWithPath) {
    console.log(row.join(' '));
  }
}

function solveMaze(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  let path = [];

  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];

  let startX, startY;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] === 'S') {
        startX = i;
        startY = j;
      }
    }
  }

  // Busca em profundidade
  function dfs(x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) {
      return false
    }

    if (maze[x][y] === 1 || visited[x][y]) {
      return false
    };

    path.push([x, y]);
    visited[x][y] = true;

    if (maze[x][y] === 'E') {
      return true
    }

    for (const [dx, dy] of directions) {
      if (dfs(x + dx, y + dy)) {
        return true
      };
    }

    path.pop();

    return false;
  }

  if (dfs(startX, startY)) {
    return path;
  } else {
    return null;
  }
}

const filePath = path.join(process.cwd(), 'maze.txt');
const maze = readMazeFromFile(filePath);

const result = solveMaze(maze);

if (result) {
  console.log('Caminho encontrado:');
  console.log(result);

  console.log('Labirinto com caminho marcado:');
  printResult(result);  
} else {
  console.log('Nenhum caminho encontrado.');
}
