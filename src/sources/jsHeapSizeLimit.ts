export default function jsHeapSizeLimit(): number | undefined {
  const performance = window.performance
  if (!performance) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (performance as any).memory
  if (!memory) return
  return memory.jsHeapSizeLimit
}
