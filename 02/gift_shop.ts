import fs from 'node:fs'

fs.readFile('input.txt', (err: NodeJS.ErrnoException | null, file: Buffer) => {
  if (err) throw err

  const lines: string[] = file.toString().trim().split(',')

  let finalResult: number = 0
  
  lines.forEach((line: string): void => {
    const ids: string[] = line.split('-')
    let currId: number = Number(ids[0])
    const lastId: number = Number(ids[1])
    while (currId <= lastId) {
     if (currId.toString().length % 2 === 0) {
      const subOne: string = currId.toString().substring(0, currId.toString().length / 2)
      const subTwo: string = currId.toString().substring(currId.toString().length / 2)
      if (subOne === subTwo) {
        finalResult += Number(currId)
      }
     }
     currId += 1;
    }
  })
  console.log("Final Result:", finalResult)
})