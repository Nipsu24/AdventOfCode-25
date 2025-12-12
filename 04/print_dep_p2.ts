import fs from 'node:fs'

fs.readFile("input.txt", (err, file) => {
  if (err) throw err;

  const lines: string[] = file.toString().trim().split("\n");
  const rows: number = lines.length;
  const cols: number = lines[0].length;

  let accessible: number = 0;
  let noRoleRemoved: boolean = false;
  let removeFields: [number, number][] = []

  const directions: [number, number][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ];
  while (!noRoleRemoved) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (lines[r][c] !== "@") continue;

      let count: number = 0;
      // loops through array of directions and checks all 8 directions (with boundary check)
      //  - avoids extensive if-statements
      for (const [dr, dc] of directions) {
        const nr: number = r + dr;
        const nc: number = c + dc;

        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          lines[nr][nc] === "@"
        ) {
          count++;
        }
      }

      if (count < 4) {
        removeFields.push([r, c])
        accessible++;
      }
    }
  }
  if (removeFields.length === 0)
    noRoleRemoved = true
  else {
    for (const [removeR, removeC] of removeFields) {
      const rowArray: string[] = lines[removeR].split("");   // turn row string into array
      rowArray[removeC] = ".";                     // mutate the character
      lines[removeR] = rowArray.join("");          // turn array back into a string
    }
    removeFields = []
  }
}

  console.log("Accessible rolls:", accessible);
});