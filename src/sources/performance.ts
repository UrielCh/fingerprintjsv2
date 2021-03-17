/*
export function performace(): [number, number] | undefined {
  if ('performance' in window) {
    let min = 1
    let max = 1
    let time2 = performance.now()
    let time1 = time2
    for (let i = 0; i < 100000; i++) {
        time2 = time1
        time1 = performance.now()
        if (time2 < time1) {
          const delta = time1 - time2
          if (delta > min) {
            if (delta < max) max = delta
          } else {
            if (delta < min) {
              max = min
              min = delta
            }
          }
        }
      }
    return [min, max]
  }
  return
}
*/
// optimized version
// use less CPU
export default function performace2(): [number, number] | undefined {
  if ('performance' in window) {
    let min = 1
    let max = 1
    let time2 = performance.now()
    let time1 = time2
    let pmin = min
    let pmax = max
    let unchanged = 0
    for (;;) {
      for (let i = 0; i < 1200; i++) {
        time2 = time1
        time1 = performance.now()
        if (time2 < time1) {
          const delta = time1 - time2
          if (delta > min) {
            if (delta < max) max = delta
          } else {
            if (delta < min) {
              max = min
              min = delta
            }
          }
        }
      }
      if (pmin !== min || pmax !== max) {
        pmin = min
        pmax = max
      } else {
        unchanged++
      }
      if (unchanged > 20) break
    }
    return [min, max]
  }
  return
}
