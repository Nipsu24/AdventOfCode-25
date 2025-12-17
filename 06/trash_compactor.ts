import fs from 'node:fs'

fs.readFile("input.txt", (err, file) => {
  if (err) throw err;

  const lines: string[] = file.toString().trim().split("\n");
  let numbers: number[][] = []
  numbers = lines.slice(0, -1).map((line) => line.trim().split(/\s+/).map(Number))
  let operants: string[] = []
  operants = lines.at(-1)!.trim().split(/\s+/)
  let midResult: number = 0
  let finalResult: number = 0
  for (let j = 0; j < numbers[0].length; j++) {
    midResult = (operants[j] === "+") ? 0 : 1
    for (let i = 0; i < numbers.length; i++) {
      if (operants[j] === "+")
        midResult += numbers[i][j]
      else
        midResult *= numbers[i][j]
    }
    finalResult += midResult
  }
  console.log("lines:", lines)
  console.log("numbers:", numbers)
  console.log("operants:", operants)
  console.log("final Result:", finalResult)
});