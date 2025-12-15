import fs from 'node:fs'

fs.readFile("input.txt", (err, file) => {
  if (err) throw err;

  const lines: string[] = file.toString().trim().split("\n");
  let foundEmpty: boolean = false;
  const ingredients: number[] = []
  const ranges: number[][] = []
  const allFreshIds = new Set<number>();
  for (const line of lines) {
    if (foundEmpty)
      ingredients.push(Number(line))
    else {
      const start: number = Number(line.substring(0, line.indexOf("-")));
      const end: number = Number(line.substring(line.indexOf("-") + 1));
      const range: number[] = [start, end]
      if (start && end)
        ranges.push(range)
    }
  }

  // sort by start
  ranges.sort((a, b) => a[0] - b[0]);

  let totalFresh = 0;
  let [currentStart, currentEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];
    if (start <= currentEnd + 1) {
      // merge overlapping or touching ranges
      currentEnd = Math.max(currentEnd, end);
    } else {
      totalFresh += currentEnd - currentStart + 1;
      currentStart = start;
      currentEnd = end;
    }
  }

  // add the last range
  totalFresh += currentEnd - currentStart + 1;

  console.log("Total fresh ingredient IDs:", totalFresh);
});
