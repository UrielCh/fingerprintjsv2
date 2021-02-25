export default function getGlobalDim(): [number, number, number] {
  const str = [] as string[]
  for (const x in window) str.push(x)
  return [Object.keys(window).length, str.length, str.join().length]
}
