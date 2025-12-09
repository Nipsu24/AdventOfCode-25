import fs from 'node:fs'

fs.readFile('input.txt', (err: NodeJS.ErrnoException | null, file: Buffer) => {
  if (err) throw err

  const lines: string[] = file.toString().trim().split('\n')

  let finalResult: bigint = 0n

  // number of digits to pick
  const K: number = 12 

  for (const line of lines) {
    const digits: number[] = line.split('').map(d => Number(d))
    const L: number = digits.length

    let result: string = ''
    let start: number = 0

    for (let picked = 0; picked < K; picked++) {
      const remaining: number = K - picked
      const end: number = L - remaining

      // finds max digit from digits[start .. end]
      let maxDigit = -1
      let maxIndex = start

      for (let i = start; i <= end; i++) {
        if (digits[i] > maxDigit) {
          maxDigit = digits[i]
          maxIndex = i
        }
      }

      result += String(maxDigit)
      start = maxIndex + 1
    }

    finalResult += BigInt(result)
  }

  console.log("Final Result:", finalResult.toString())
})
