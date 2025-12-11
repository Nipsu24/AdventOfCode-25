import fs from 'node:fs'

fs.readFile("input.txt", (err, file) => {
  if (err) throw err;

  const lines = file.toString().trim().split("\n");
  const rows = lines.length;
  const cols = lines[0].length;

  let accessible = 0;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (lines[r][c] !== "@") continue;

      let count = 0;
      // loops through array of directions and checks all 8 directions (with boundary check)
      //  - avoids extensive if-statements
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          lines[nr][nc] === "@"
        ) {
          count++;
        }
      }

      if (count < 4) {
        accessible++;
      }
    }
  }

  console.log("Accessible rolls:", accessible);
});