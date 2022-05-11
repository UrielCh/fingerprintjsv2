import { x64hash128 } from './utils/hashing'
import { load, Agent, LoadOptions, GetOptions, GetResult, hashComponents, componentsToDebugString } from './agent'
import { getComponents, Component, UnknownComponents, BuiltinComponents, SourcesToComponents } from './sources'
import { isTrident, isEdgeHTML, isChromium, isWebKit, isGecko, isDesktopSafari } from './utils/browser'

import getAvailableScreenResolution from './sources/available_screen_resolution'
import getScreenResolution from './sources/screen_resolution'
import getGlobalDim from './sources/global_dim'
import getTouchSupport from './sources/touch_support'

//@ts-ignore
!function(){"use strict";function t(t){if(t)p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p,this.buffer8=r;else if(n){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var e="object"==typeof window?window:{},i=!e.JS_MD4_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;i&&(e=global);var r,h=!e.JS_MD4_NO_COMMON_JS&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,n=!e.JS_MD4_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],o=[0,8,16,24],u=["hex","array","digest","buffer","arrayBuffer"],p=[];if(n){var d=new ArrayBuffer(68);r=new Uint8Array(d),p=new Uint32Array(d)}var y=function(e){return function(i){return new t(!0).update(i)[e]()}},c=function(){var e=y("hex");i&&(e=l(e)),e.create=function(){return new t},e.update=function(t){return e.create().update(t)};for(var r=0;r<u.length;++r){var h=u[r];e[h]=y(h)}return e},l=function(t){var e=require("crypto"),i=require("buffer").Buffer,r=function(r){if("string"==typeof r)return e.createHash("md4").update(r,"utf8").digest("hex");if(n&&r instanceof ArrayBuffer)r=new Uint8Array(r);else if(void 0===r.length)return t(r);return e.createHash("md4").update(new i(r)).digest("hex")};return r};t.prototype.update=function(t){if(!this.finalized){var e="string"!=typeof t;e&&n&&t instanceof ArrayBuffer&&(t=new Uint8Array(t));for(var i,r,h=0,s=t.length||0,f=this.blocks,a=this.buffer8;s>h;){if(this.hashed&&(this.hashed=!1,f[0]=f[16],f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0),e)if(n)for(r=this.start;s>h&&64>r;++h)a[r++]=t[h];else for(r=this.start;s>h&&64>r;++h)f[r>>2]|=t[h]<<o[3&r++];else if(n)for(r=this.start;s>h&&64>r;++h)i=t.charCodeAt(h),128>i?a[r++]=i:2048>i?(a[r++]=192|i>>6,a[r++]=128|63&i):55296>i||i>=57344?(a[r++]=224|i>>12,a[r++]=128|i>>6&63,a[r++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++h)),a[r++]=240|i>>18,a[r++]=128|i>>12&63,a[r++]=128|i>>6&63,a[r++]=128|63&i);else for(r=this.start;s>h&&64>r;++h)i=t.charCodeAt(h),128>i?f[r>>2]|=i<<o[3&r++]:2048>i?(f[r>>2]|=(192|i>>6)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]):55296>i||i>=57344?(f[r>>2]|=(224|i>>12)<<o[3&r++],f[r>>2]|=(128|i>>6&63)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++h)),f[r>>2]|=(240|i>>18)<<o[3&r++],f[r>>2]|=(128|i>>12&63)<<o[3&r++],f[r>>2]|=(128|i>>6&63)<<o[3&r++],f[r>>2]|=(128|63&i)<<o[3&r++]);this.lastByteIndex=r,this.bytes+=r-this.start,r>=64?(this.start=r-64,this.hash(),this.hashed=!0):this.start=r}return this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=a[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,e,i,r,h,s,n,f,a=this.blocks;this.first?(t=a[0]-1,t=t<<3|t>>>29,r=(4023233417&t|2562383102&~t)+a[1]+271733878,r=r<<7|r>>>25,i=(r&t|4023233417&~r)+a[2]-1732584194,i=i<<11|i>>>21,e=(i&r|~i&t)+a[3]-271733879,e=e<<19|e>>>13):(t=this.h0,e=this.h1,i=this.h2,r=this.h3,t+=(e&i|~e&r)+a[0],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[1],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[2],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[3],e=e<<19|e>>>13),t+=(e&i|~e&r)+a[4],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[5],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[6],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[7],e=e<<19|e>>>13,t+=(e&i|~e&r)+a[8],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[9],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[10],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[11],e=e<<19|e>>>13,t+=(e&i|~e&r)+a[12],t=t<<3|t>>>29,r+=(t&e|~t&i)+a[13],r=r<<7|r>>>25,i+=(r&t|~r&e)+a[14],i=i<<11|i>>>21,e+=(i&r|~i&t)+a[15],e=e<<19|e>>>13,s=e&i,t+=(s|e&r|i&r)+a[0]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[4]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[8]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[12]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[1]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[5]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[9]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[13]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[2]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[6]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[10]+1518500249,i=i<<9|i>>>23,n=i&r,e+=(n|i&t|f)+a[14]+1518500249,e=e<<13|e>>>19,s=e&i,t+=(s|e&r|n)+a[3]+1518500249,t=t<<3|t>>>29,h=t&e,r+=(h|t&i|s)+a[7]+1518500249,r=r<<5|r>>>27,f=r&t,i+=(f|r&e|h)+a[11]+1518500249,i=i<<9|i>>>23,e+=(i&r|i&t|f)+a[15]+1518500249,e=e<<13|e>>>19,s=e^i,t+=(s^r)+a[0]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[8]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[4]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[12]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[2]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[10]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[6]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[14]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[1]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[9]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[5]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[13]+1859775393,e=e<<15|e>>>17,s=e^i,t+=(s^r)+a[3]+1859775393,t=t<<3|t>>>29,r+=(s^t)+a[11]+1859775393,r=r<<9|r>>>23,f=r^t,i+=(f^e)+a[7]+1859775393,i=i<<11|i>>>21,e+=(f^i)+a[15]+1859775393,e=e<<15|e>>>17,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=i-1732584194<<0,this.h3=r+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+i<<0,this.h3=this.h3+r<<0)},t.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15]+f[e>>4&15]+f[15&e]+f[e>>12&15]+f[e>>8&15]+f[e>>20&15]+f[e>>16&15]+f[e>>28&15]+f[e>>24&15]+f[i>>4&15]+f[15&i]+f[i>>12&15]+f[i>>8&15]+f[i>>20&15]+f[i>>16&15]+f[i>>28&15]+f[i>>24&15]+f[r>>4&15]+f[15&r]+f[r>>12&15]+f[r>>8&15]+f[r>>20&15]+f[r>>16&15]+f[r>>28&15]+f[r>>24&15]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},t.prototype.buffer=t.prototype.arrayBuffer;var b=c();h?module.exports=b:(e.md4=b,s&&define(function(){return b}))}();

export function check(url: string, tkn: string, cb: (resp: any) => any, force = true): void {
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
      rnd = Math.random().toString(36).substring(2)
      window.localStorage.setItem('rnd', rnd)
    }
    prevGclid = window.localStorage.getItem('g')
    if (currentGclid) window.localStorage.setItem('g', currentGclid)
    visitorId = window.localStorage.getItem('fp')
  }

  function pushStr(arg: string[], k: string, v: string | null): void {
    if (!v) return
    if (v.length > 120) v = v.substr(0, 120)
    arg.push(k + '=' + encodeURI(v))
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
  // function appendImg(img: HTMLElement) {
  //   const body = document.getElementsByTagName('body')
  //   if (body.length) {
  //     body[0].appendChild(img)
  //   } else {
  //     setTimeout(appendImg, 250, img)
  //   }
  // }

  function report(arg: string[], cb: (resp: any) => any) {
    if (url) {
      // const img = document.createElement('img')
      // pushArg(arg, 'sec', ((Date.now() - start) / 1000) | 0)
      pushStr(arg, 'cgid', currentGclid)
      // img.src = url + '?' + arg.join('&')
      if (~url.indexOf('?')) {
        url = url += '&'
      } else {
        url = url += '?'
      }
      url += arg.join('&')
      const d = url.replace(/[^?]+/, '')
      // @ts-ignore
      url += '&tk=' + md4(tkn + d)
      // @ts-ignore
      jQuery.post(url, { action: 'add_finger' }, cb)
    }
  }

  const arg = [] as string[]
  pushArg(arg, 'asr', getAvailableScreenResolution())
  pushArg(arg, 'sr', getScreenResolution())
  pushArg(arg, 'gd', getGlobalDim())
  pushArg(arg, 'dpr', window.devicePixelRatio)
  pushArg(arg, 'hc', navigator.hardwareConcurrency)
  pushArg(arg, '', getTouchSupport())
  pushStr(arg, 'fp', visitorId)
  pushStr(arg, 'gid', prevGclid)
  pushStr(arg, 'rnd', rnd)
  // report(arg)

  // eslint-disable-next-line no-constant-condition
  if (force || !oldrnd)
    load().then(function (fp) {
      fp.get().then(function (result) {
        // const arg: string[] = []
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
        report(arg, cb)
        // if (cb) cb(telemetry)
      })
    })
  // let nxt = 1000
  // const autoreport = function () {
  //   setTimeout(function () {
  //     report([])
  //     nxt += 1000
  //     if (nxt < 20000) autoreport()
  //   }, nxt)
  // }
  // autoreport()
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
