import { isDesktopSafari, isWebKit } from '../utils/browser'
import { countTruthy } from '../utils/data'

/**
 * Checks whether the device is an iPad.
 * It doesn't check that the engine is WebKit and that the WebKit isn't desktop.
 */

function isiPad(): boolean {
  // Checked on:
  // Safari on iPadOS (both mobile and desktop modes): 8, 11, 12, 13, 14
  // Chrome on iPadOS (both mobile and desktop modes): 11, 12, 13, 14
  // Safari on iOS (both mobile and desktop modes): 9, 10, 11, 12, 13, 14
  // Chrome on iOS (both mobile and desktop modes): 9, 10, 11, 12, 13, 14
  // Before iOS 13. Safari tampers the value in "request desktop site" mode since iOS 13.
  if (navigator.platform === 'iPad') {
    return true
  }

  const s = screen
  const screenRatio = s.width / s.height
  return (
    countTruthy([
      'MediaSource' in window,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!(Element.prototype as any).webkitRequestFullscreen,
      screenRatio > 2 / 3 && screenRatio < 3 / 2,
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
