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
const mathAcos = Math.acos || defMath
const mathAcosh = Math.acosh || defMath
const mathAsin = Math.asin || defMath
const mathAsinh = Math.asinh || defMath
const mathAatanh = Math.atanh || defMath
const mathAtan = Math.atan || defMath
const mathSin = Math.sin || defMath
const mathSinh = Math.sinh || defMath
const mathCos = Math.cos || defMath
const mathCosh = Math.cosh || defMath
const mathTan = Math.tan || defMath
const mathTanh = Math.tanh || defMath
const mathExp = Math.exp || defMath
const mathExpm1 = Math.expm1 || defMath
const mathLog1p = Math.log1p || defMath
const mathPiPow = function mathPiPow(expo: number) {
  return Math.pow(Math.PI, expo)
}
const mathSqrtAprox = function mathSqrtAprox(e: number) {
  return Math.log(e + Math.sqrt(e * e + 1))
}
const mathLogAprox1 = function mathLogAprox1(e: number) {
  return Math.log((1 + e) / (1 - e)) / 2
}
const mathExpAprox1 = function mathExpAprox1(e: number) {
  return Math.exp(e) - 1 / Math.exp(e) / 2
}
const mathExpAprox2 = function mathExpAprox2(e: number) {
  return (Math.exp(e) + 1 / Math.exp(e)) / 2
}
const mathExpAprox3 = function mathExpAprox3(e: number) {
  return Math.exp(e) - 1
}
const mathExpAprox4 = function mathExpAprox4(e: number) {
  return (Math.exp(2 * e) - 1) / (Math.exp(2 * e) + 1)
}
const mathLogAprox2 = function mathLogAprox2(e: number) {
  return Math.log(1 + e)
}

export default function mathPrecision(): mathReturn {
  const big = 1e154
  return {
    acos: mathAcos(0.12312423423423424),
    acosh: mathAcosh(1e308),
    acoshPf: Math.log(big + Math.sqrt(big * big - 1)),
    asin: mathAsin(0.12312423423423424),
    asinh: mathAsinh(1),
    asinhPf: mathSqrtAprox(1),
    atanh: mathAatanh(0.5),
    atanhPf: mathLogAprox1(0.5),
    atan: mathAtan(0.5),
    sin: mathSin(-1e300),
    sinh: mathSinh(1),
    sinhPf: mathExpAprox1(1),
    cos: mathCos(10.000000000123),
    cosh: mathCosh(1),
    coshPf: mathExpAprox2(1),
    tan: mathTan(-1e300),
    tanh: mathTanh(1),
    tanhPf: mathExpAprox4(1),
    exp: mathExp(1),
    expm1: mathExpm1(1),
    expm1Pf: mathExpAprox3(1),
    log1p: mathLog1p(10),
    log1pPf: mathLogAprox2(10),
    powPI: mathPiPow(-100),
  }
}
