import fs from "node:fs";

function isInvalid(id: number): boolean {
  const s = id.toString();
  const n = s.length;

  // Tries every possible chunk size and compares build result with passed input
  for (let size = 1; size <= n / 2; size++) {
    if (n % size !== 0) continue;

    const chunk = s.slice(0, size);
    const repeatCount = n / size;

    let built = "";
    for (let i = 0; i < repeatCount; i++) {
      built += chunk;
    }

    if (built === s) return true;
  }

  return false;
}

fs.readFile("input.txt", (err: NodeJS.ErrnoException | null, file: Buffer) => {
  if (err) throw err;

  const lines: string[] = file.toString().trim().split(",");
  let finalResult = 0;

  for (const line of lines) {
    const [start, end] = line.split("-").map(Number);

    for (let currId = start; currId <= end; currId++) {
      if (isInvalid(currId)) {
        finalResult += currId;
      }
    }
  }

  console.log("Final Result:", finalResult);
});
