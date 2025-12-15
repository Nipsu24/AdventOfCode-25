import fs from 'node:fs'

fs.readFile("input.txt", (err, file) => {
  if (err) throw err;

  const lines: string[] = file.toString().trim().split("\n");
  let foundEmpty: boolean = false;
  const ingredients: number[] = []
  const foodRanges: number[][] = []
  const freshIds: number[] = []
  for (const line of lines) {
    if (foundEmpty)
      ingredients.push(Number(line))
    else {
      const start: number = Number(line.substring(0, line.indexOf("-")));
      const end: number = Number(line.substring(line.indexOf("-") + 1));
      const range: number[] = [start, end]
      if (start && end)
        foodRanges.push(range)
    }

    if (line === "")
      foundEmpty = true;
  }
  for (const ingredient of ingredients) {
    for (const range of foodRanges) {
      if (ingredient >= range[0] && ingredient <= range[1]) {
        if (!freshIds.includes(ingredient))
          freshIds.push(ingredient)
      }
    }
  }
  // console.log("fresh food ranges:", foodRanges)
  // console.log("ingridients:", ingridients)
  console.log("ID count:", freshIds.length)
});