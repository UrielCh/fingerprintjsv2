const M = Math // To reduce the minified code size
export interface mathReturn {
  acos: number
  acosh: number
  acoshPf: number
  asin: number
  asinh: number
  asinhPf: number
  atanh: number
  atanhPf: number
  atan: number
  sin: number
  sinh: number
  sinhPf: number
  cos: number
  cosh: number
  coshPf: number
  tan: number
  tanh: number
  tanhPf: number
  exp: number
  expm1: number
  expm1Pf: number
  log1p: number
  log1pPf: number
  powPI: number
}

const defMath = function defMath() {
  return 0
}
const acos = M.acos || defMath
const acosh = M.acosh || defMath
const asin = M.asin || defMath
const asinh = M.asinh || defMath
const atanh = M.atanh || defMath
const atan = M.atan || defMath
const sin = M.sin || defMath
const sinh = M.sinh || defMath
const cos = M.cos || defMath
const cosh = M.cosh || defMath
const tan = M.tan || defMath
const tanh = M.tanh || defMath
const exp = M.exp || defMath
const expm1 = M.expm1 || defMath
const log1p = M.log1p || defMath

const powPI = (expo: number) => M.pow(M.PI, expo)
const acoshPf = (value: number) => M.log(value + M.sqrt(value * value - 1))
const asinhPf = (e: number) => M.log(e + M.sqrt(e * e + 1))
const atanhPf = (e: number) => M.log((1 + e) / (1 - e)) / 2
const sinhPf = (e: number) => M.exp(e) - 1 / M.exp(e) / 2
const coshPf = (e: number) => (M.exp(e) + 1 / M.exp(e)) / 2
const expm1Pf = (e: number) => M.exp(e) - 1
const tanhPf = (e: number) => (M.exp(2 * e) - 1) / (M.exp(2 * e) + 1)
const log1pPf = (e: number) => M.log(1 + e)

export default function mathPrecision(): mathReturn {
  return {
    acos: acos(0.123124234234234242),
    acosh: acosh(1e308),
    acoshPf: acoshPf(1e154), // 1e308 will not work for polyfill
    asin: asin(0.123124234234234242),
    asinh: asinh(1),
    asinhPf: asinhPf(1),
    atanh: atanh(0.5),
    atanhPf: atanhPf(0.5),
    atan: atan(0.5),
    sin: sin(-1e300),
    sinh: sinh(1),
    sinhPf: sinhPf(1),
    cos: cos(10.000000000123),
    cosh: cosh(1),
    coshPf: coshPf(1),
    tan: tan(-1e300),
    tanh: tanh(1),
    tanhPf: tanhPf(1),
    exp: exp(1),
    expm1: expm1(1),
    expm1Pf: expm1Pf(1),
    log1p: log1p(10),
    log1pPf: log1pPf(10),
    powPI: powPI(-100),
  }
}
