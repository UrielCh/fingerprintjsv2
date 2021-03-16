export interface WebGlInfo {
  version: string
  vendor: string
  vendorUnmasked: string
  renderer: string
  rendererUnmasked: string
  shadingLanguageVersion: string
  contextAttributes: string
  parameters: string
  shaderPrecisions: string
  extensions: string
  extensionParameters: string
  fingerprint: string
}

const webGLVarsShaders = ['FRAGMENT_SHADER', 'VERTEX_SHADER'] as const
const webGLVarsTypes = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'] as const

function mygetShaderPrecisionFormat(
  webgl: WebGLRenderingContextBase,
  shaderType: typeof webGLVarsShaders[number],
  precisionType: typeof webGLVarsTypes[number],
) {
  const webGLShaderPrecisionFormat = webgl.getShaderPrecisionFormat(
    webgl[shaderType] as GLenum,
    webgl[precisionType] as GLenum,
  )
  if (webGLShaderPrecisionFormat)
    return [
      webGLShaderPrecisionFormat.rangeMin,
      webGLShaderPrecisionFormat.rangeMax,
      webGLShaderPrecisionFormat.precision,
    ]
  return []
}

const webGLVarsText = [
  'MAX_TEXTURE_MAX_ANISOTROPY_EXT',
  'FRAGMENT_SHADER_DERIVATIVE_HINT_OES',
  'MAX_COLOR_ATTACHMENTS_WEBGL',
  'MAX_DRAW_BUFFERS_WEBGL',
  'DRAW_BUFFER0_WEBGL',
  'DRAW_BUFFER1_WEBGL',
  'VERTEX_ARRAY_BINDING_OES',
  'TIMESTAMP_EXT',
  'GPU_DISJOINT_EXT',
  'MAX_VIEWS_OVR',
]
const webGlVendorList1 = [
  10752,
  2849,
  2884,
  2885,
  2886,
  2928,
  2929,
  2930,
  2931,
  2932,
  2960,
  2961,
  2962,
  2963,
  2964,
  2965,
  2966,
  2967,
  2968,
  2978,
  3024,
  3042,
  3088,
  3089,
  3106,
  3107,
  32773,
  32777,
  32777,
  32823,
  32824,
  32926,
  32928,
  32936,
  32937,
  32938,
  32939,
  32968,
  32969,
  32970,
  32971,
  3317,
  33170,
  3333,
  3379,
  3386,
  33901,
  33902,
  34016,
  34024,
  34076,
  3408,
  3410,
  3411,
  3412,
  3413,
  3414,
  3415,
  34467,
  34816,
  34817,
  34818,
  34819,
  34877,
  34921,
  34930,
  35660,
  35661,
  35724,
  35738,
  35739,
  36003,
  36004,
  36005,
  36347,
  36348,
  36349,
  37440,
  37441,
  37443,
  7936,
  7937,
  7938,
]

function isValidprotoKey(propname: string): boolean {
  return 'string' == typeof propname && !propname.match(/[^A-Z0-9_x]/)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProtoFilteredKeys(object: any): string[] {
  return Object.keys(object.__proto__).filter(isValidprotoKey)
}

function extractWebGlInfo(webgl: WebGLRenderingContext): WebGlInfo {
  const contextAttributes = webgl.getContextAttributes()
  const contextAttributesList = []
  const parametersList = []
  const extensionParametersList = []
  const shaderPrecisionsList = []

  for (const contextAttribute in contextAttributes) {
    if (Object.prototype.hasOwnProperty.call(contextAttributes, contextAttribute)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextAttributesList.push(contextAttribute + '=' + (contextAttributes as any)[contextAttribute])
    }
  }

  const keyList = getProtoFilteredKeys(webgl)
  for (let p = 0; p < keyList.length; p++) {
    const x = keyList[p]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (webgl as any)[x]
    if (webGlVendorList1.indexOf(value) > -1) parametersList.push(x + '(' + value + ')=' + webgl.getParameter(value))
    else parametersList.push(x + '=' + value)
  }

  const supportedExtensions = webgl.getSupportedExtensions()
  if (supportedExtensions) {
    for (let i = 0; i < supportedExtensions.length; i++) {
      const extName = supportedExtensions[i]
      const extention = webgl.getExtension(extName)
      if (extention) {
        const keyList = getProtoFilteredKeys(extention)
        for (let j = 0; j < keyList.length; j++) {
          const key = keyList[j]
          const value = extention[key]
          if (webGLVarsText.indexOf(key) > 0)
            extensionParametersList.push(key + '(' + value + ')=' + webgl.getParameter(value))
          else extensionParametersList.push(key + '=' + value)
        }
      }
    }
  }
  for (let i = 0; i < webGLVarsShaders.length; i++) {
    const webGLVarsShader = webGLVarsShaders[i]
    for (let T = 0; T < webGLVarsTypes.length; T++) {
      const webGLVarsType = webGLVarsTypes[T]
      const fmts = mygetShaderPrecisionFormat(webgl, webGLVarsShader, webGLVarsType)
      shaderPrecisionsList.push(webGLVarsShader + '.' + webGLVarsType + '=' + fmts.join(','))
    }
  }
  extensionParametersList.sort()
  parametersList.sort()
  const webGlVersion = webgl.getParameter(webgl.VERSION)
  const webGlVendor = webgl.getParameter(webgl.VENDOR)

  const haveWebGlDebug = webgl.getExtension('WEBGL_debug_renderer_info')

  let umaskVendor = ''
  let unmaskedRenderer = ''
  if (haveWebGlDebug) {
    umaskVendor = webgl.getParameter(haveWebGlDebug.UNMASKED_VENDOR_WEBGL) || ''
    unmaskedRenderer = webgl.getParameter(haveWebGlDebug.UNMASKED_RENDERER_WEBGL) || ''
  }

  const renderer = webgl.getParameter(webgl.RENDERER) || ''
  const shadingLangVer = webgl.getParameter(webgl.SHADING_LANGUAGE_VERSION) || ''
  return {
    version: webGlVersion.toString(),
    vendor: webGlVendor.toString(),
    vendorUnmasked: umaskVendor.toString(),
    renderer: renderer.toString(),
    rendererUnmasked: unmaskedRenderer.toString(),
    shadingLanguageVersion: shadingLangVer.toString(),
    contextAttributes: contextAttributesList.join('&'),
    parameters: parametersList.join('&'),
    shaderPrecisions: shaderPrecisionsList.join('&'),
    extensions: supportedExtensions ? supportedExtensions.join(',') : '',
    extensionParameters: extensionParametersList.join(','),
    fingerprint: '',
  }
}

function fillCanvas(webgl: WebGLRenderingContext): void {
  webgl.clearColor(0, 0, 1, 1)
  const program = webgl.createProgram()
  function createShader(n: number, shaderFnc: string) {
    const shader = webgl.createShader(35633 - n)
    if (program && shader) {
      webgl.shaderSource(shader, shaderFnc)
      webgl.compileShader(shader)
      webgl.attachShader(program, shader)
    }
  }
  if (program) {
    createShader(
      0,
      'attribute vec2 p;uniform float t;void main(){float s=sin(t);float c=cos(t);gl_Position=vec4(p*mat2(c,s,-s,c),1,1);}',
    )
    createShader(1, 'void main(){gl_FragColor=vec4(1,0,0,1);}')
    webgl.linkProgram(program)
    webgl.useProgram(program)
    webgl.enableVertexAttribArray(0)
    const unif = webgl.getUniformLocation(program, 't')
    const buffer = webgl.createBuffer()
    webgl.bindBuffer(34962, buffer)
    webgl.bufferData(34962, new Float32Array([0, 1, -1, -1, 1, -1]), 35044)
    webgl.vertexAttribPointer(0, 2, 5126, false, 0, 0)
    webgl.clear(16384)
    webgl.uniform1f(unif, 3.65)
    webgl.drawArrays(4, 0, 3)
  }
}

export default function webGlInfo(): WebGlInfo | undefined {
  const canvas = document.createElement('canvas')
  const webgl_names = ['webgl', 'experimental-webgl']
  let webgl: WebGLRenderingContext | null | undefined = undefined

  for (let i = 0; i < webgl_names.length && !webgl; i++) {
    try {
      webgl = canvas.getContext(webgl_names[i] as 'webgl')
    } catch (a) {
      // no webGl
    }
  }
  if (webgl) {
    const result: WebGlInfo = extractWebGlInfo(webgl)
    fillCanvas(webgl)
    result.fingerprint = canvas.toDataURL()
    return result
  }
  return
}
