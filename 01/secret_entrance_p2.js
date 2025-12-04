import fs from 'node:fs'

fs.readFile('combi.txt', (err, file) => {
  if (err) throw err;

  const lines = file.toString().trim().split('\n')

  let counter = 50
  let nullCount = 0

  lines.forEach(line => {
    let sign = 1
    if (line.startsWith('L')) sign = -1
    if (line.startsWith('R')) sign = 1

    let offset = Number(line.slice(1)) * sign

    while (offset !== 0) {
      counter += sign
      offset -= sign

      if (counter % 100 === 0) {
        nullCount++
      }
    }

    counter = ((counter % 100) + 100) % 100
  })

  console.log("Null count:", nullCount)
})