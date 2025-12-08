import fs from 'node:fs'

fs.readFile('input.txt', (err: NodeJS.ErrnoException | null, file: Buffer) => {
  if (err) throw err

  const lines: string[] = file.toString().trim().split('\n')

  let finalResult: number = 0
  
  lines.forEach((line: string): void => {
    let max = 0
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j < line.length; j++) {
        const value = Number(line[i] + line[j])
        if (value > max) max = value
      }
    }
    finalResult += max
  })
  console.log("Final Result:", finalResult)
})