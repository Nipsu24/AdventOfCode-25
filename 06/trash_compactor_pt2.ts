import fs from 'node:fs'

fs.readFile("input.txt", (err, file) => {
  if (err) throw err;

  const lines: string[] = file.toString().trim().split("\n");
  let operants: string = ""
  operants = lines.at(-1)!
  let operantsIsolated: string[] = []
  operantsIsolated = lines.at(-1)!.trim().split(/\s+/)
  const maxNumberLengths: number[] = []
  const operantsIndex: number[] = []
  for (let i = 0; i < operants.length; i++) {
    if (operants[i] === "+" || operants[i] === "*")
      operantsIndex.push(i)
  }
  let j: number = 1
  let i: number = 0
  let distance: number = 0
  let midResult: number = 0
  while (j < operantsIndex.length) {
    distance = operantsIndex[j] - operantsIndex[i] - 1
    maxNumberLengths.push(distance)
    j++
    i++
  }
  //hard coded max lenght of last column
  maxNumberLengths.push(2)
  let builtNumber: string = ""
  let builtNumberChunk: string[] = []
  let count = 0
  let k = 0
  let finalResult: number = 0
  for (i = 0; i < lines[0].length; i++) {
    if (count === maxNumberLengths[k]) {
      count = 0
      k++
      builtNumberChunk = []
      continue;
    }
    builtNumber = ""
    for (j = 0; j < lines.length - 1; j++) {
      if (lines[j][i] !== ' ')
        builtNumber += lines[j][i]
    }
    builtNumberChunk.push(builtNumber)
    count++
    if (maxNumberLengths[k] === count) {
      let result: number = 0
      if (operantsIsolated[k] === '*')
        result = builtNumberChunk.reduce((product, num) => product * Number(num), 1);
      else
        result = builtNumberChunk.reduce((sum, num) => sum + Number(num), 0);
      finalResult += result
    }
  }
  console.log("final Result", finalResult)
});