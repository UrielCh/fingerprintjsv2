import { isDesktopSafari, isWebKit } from '../utils/browser'
import { countTruthy } from '../utils/data'

function isiPad(): boolean {
  if ('iPad' === navigator.platform) return true
  const ratio = screen.width / screen.height
  return (
    countTruthy([
      'MediaSource' in window,
      !!(Element.prototype as any).webkitRequestFullscreen,
      ratio > 2 / 3 && ratio < 1.5,
    ]) >= 2
  )
}
/**
 * It should be improved to handle mock value on iOS:
 * https://github.com/fingerprintjs/fingerprintjs/issues/514#issuecomment-727782842
 */
export default function getPlatform(): string {
  const platform = navigator.platform
  if ('MacIntel' === platform && isWebKit() && !isDesktopSafari()) {
    return isiPad() ? 'iPad' : 'iPhone'
  }
  return platform
  // return navigator.platform
}
