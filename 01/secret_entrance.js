import fs from 'node:fs'

fs.readFile('combi.txt', (err, file) => {

  if (err) throw err;

  const lines = file.toString().split('\n')
    var counter = 50
    var nullCount = 0
    lines.forEach(line => {
      if (line[0] === 'L') {
        var klicksLeft = 0
        klicksLeft = Number(line.substring(1))
      }
      else {
        var klicksRight = 0
        klicksRight = Number(line.substring(1))
      }
      klicksLeft ? counter -= klicksLeft : counter += klicksRight
      if (counter < 0) {
        while (counter < 0)
          counter += 100
      }
      else if (counter > 99) {
        while (counter > 99)
          counter -= 100
      }
      if (counter === 0)
        nullCount++
    })
    console.log("counter:", counter)
    console.log("Null count:", nullCount)
  });
