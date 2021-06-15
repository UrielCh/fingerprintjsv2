import { replaceNaN, toInt } from '../utils/data'

export default function getScreenResolution(): [number, number] {
  const s = screen
  // Some browsers return screen resolution as strings, e.g. "1200", instead of a number, e.g. 1200.
  // I suspect it's done by certain plugins that randomize browser properties to prevent fingerprinting.
  // replace NaN by 0
  const parseDimension = (value: unknown) => replaceNaN(toInt(value), 0)
  const dimensions = [parseDimension(s.width), parseDimension(s.height)] as [number, number]
  dimensions.sort().reverse()
  return dimensions
}
