export default function haveWebdriverHook(): boolean {
  const wind = window
  const docu = document
  const documentElement = document.documentElement
  return (
    'webdriver' in wind ||
    '_Selenium_IDE_Recorder' in wind ||
    'callSelenium' in wind ||
    '_selenium' in wind ||
    '__webdriver_script_fn' in docu ||
    '__driver_evaluate' in docu ||
    '__webdriver_evaluate' in docu ||
    '__selenium_evaluate' in docu ||
    '__fxdriver_evaluate' in docu ||
    '__driver_unwrapped' in docu ||
    '__webdriver_unwrapped' in docu ||
    '__selenium_unwrapped' in docu ||
    '__fxdriver_unwrapped' in docu ||
    '__webdriver_script_func' in docu ||
    null !== documentElement.getAttribute('selenium') ||
    null !== documentElement.getAttribute('webdriver') ||
    null !== documentElement.getAttribute('driver')
  )
}
