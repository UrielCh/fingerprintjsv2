import { x64hash128 } from './utils/hashing'
import { load, Agent, LoadOptions, GetOptions, GetResult, hashComponents, componentsToDebugString } from './agent'
import { getComponents, Component, UnknownComponents, BuiltinComponents, SourcesToComponents } from './sources'
import { isTrident, isEdgeHTML, isChromium, isWebKit, isGecko, isDesktopSafari } from './utils/browser'

import getAvailableScreenResolution from './sources/available_screen_resolution'
import getScreenResolution from './sources/screen_resolution'
import getGlobalDim from './sources/global_dim'
import getTouchSupport from './sources/touch_support'

export function check(url?: string, cb?: (result: { [key: string]: string }) => void, force?: boolean): void {
  const start = Date.now()
  let visits = 0
  const m = location.search.match(/gclid=([^&]+)/)
  const currentGclid = m ? m[1] : ''
  let prevGclid: string | null = ''
  let rnd: string | null = ''
  let oldrnd: string | null = null
  let visitorId: string | null = null
  const telemetry = {} as { [key: string]: string }
  if (window.localStorage) {
    visits = Number(window.localStorage.getItem('c')) + 1
    window.localStorage.setItem('c', String(visits))
    oldrnd = rnd = window.localStorage.getItem('rnd')
    if (!rnd) {
      rnd = Math.random().toString(36).substr(2)
      window.localStorage.setItem('rnd', rnd)
    }
    prevGclid = window.localStorage.getItem('g')
    if (currentGclid) window.localStorage.setItem('g', currentGclid)
    visitorId = window.localStorage.getItem('fp')
  }

  function pushStr(arg: string[], k: string, v: string | null): void {
    if (!v) return
    if (v.length > 120) v = v.substr(0, 120)
    arg.push(k + '=' + v)
    telemetry[k] = v
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function pushArg(arg: string[], k: string, v: any): void {
    const t = typeof v
    if (v === null) return
    if (t === 'undefined') return
    if (t === 'boolean') pushStr(arg, k, v ? '1' : '0')
    if (t === 'number') pushStr(arg, k, '' + v)
    if (t === 'object') {
      if (v.length && typeof v[0] === 'number') {
        pushStr(arg, k, v.join(','))
        return
      }
      if (v.maxTouchPoints) pushStr(arg, 'mt', '' + v.maxTouchPoints)
      if (v.touchEvent) pushStr(arg, 'te', '1')
      if (v.touchStart) pushStr(arg, 'ts', '1')
      if (v.length) pushStr(arg, k, '' + v.length)
    }
  }
  function appendImg(img: HTMLElement) {
    const body = document.getElementsByTagName('body')
    if (body.length) {
      body[0].appendChild(img)
    } else {
      setTimeout(appendImg, 250, img)
    }
  }

  function report(arg: string[]) {
    if (url) {
      const img = document.createElement('img')
      pushArg(arg, 'sec', ((Date.now() - start) / 1000) | 0)
      pushStr(arg, 'cgid', currentGclid)
      img.src = url + '?' + arg.join('&')
      appendImg(img)
    }
  }

  const arg0 = [] as string[]
  pushArg(arg0, 'asr', getAvailableScreenResolution())
  pushArg(arg0, 'sr', getScreenResolution())
  pushArg(arg0, 'gd', getGlobalDim())
  pushArg(arg0, 'dpr', window.devicePixelRatio)
  pushArg(arg0, 'hc', navigator.hardwareConcurrency)
  pushArg(arg0, '', getTouchSupport())
  pushStr(arg0, 'fp', visitorId)
  pushStr(arg0, 'gid', prevGclid)
  pushStr(arg0, 'rnd', rnd)
  report(arg0)

  // eslint-disable-next-line no-constant-condition
  if (force || !oldrnd)
    load().then(function (fp) {
      fp.get().then(function (result) {
        const arg: string[] = []
        for (const k of Object.keys(result.components)) {
          if (k === 'ts') continue
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pushArg(arg, k, (result.components as any)[k].value)
        }
        pushArg(arg, 'v', visits)
        pushStr(arg, 'fp', result.visitorId)
        if (window.localStorage) {
          window.localStorage.setItem('fp', result.visitorId)
        }
        pushStr(arg, 'rnd', rnd)
        const gl = result.components.webGL.value
        if (gl) {
          pushStr(arg, 'glv', gl.vendor)
          pushStr(arg, 'glvu', gl.vendorUnmasked)
          pushStr(arg, 'glr', gl.renderer)
          pushStr(arg, 'glru', gl.rendererUnmasked)
        }
        report(arg)
        if (cb) cb(telemetry)
      })
    })
  let nxt = 1000
  const autoreport = function () {
    setTimeout(function () {
      report([])
      nxt += 1000
      if (nxt < 20000) autoreport()
    }, nxt)
  }
  autoreport()
}

// Exports that are under Semantic versioning
export {
  load,
  Agent,
  LoadOptions,
  GetOptions,
  GetResult,
  hashComponents,
  componentsToDebugString,
  Component,
  UnknownComponents,
  BuiltinComponents,
}
// The default export is a syntax sugar (`import * as FP from '...' → import FP from '...'`).
// It should contain all the public exported values.
export default { load, hashComponents, componentsToDebugString }

// The exports below are for private usage. They may change unexpectedly. Use them at your own risk.
/** Not documented, out of Semantic Versioning, usage is at your own risk */
export const murmurX64Hash128 = x64hash128
export { getComponents, SourcesToComponents, isTrident, isEdgeHTML, isChromium, isWebKit, isGecko, isDesktopSafari }
