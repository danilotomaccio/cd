import './style.css'

type CountdownModel = {
  start: Date
  end: Date
  remainingBusinessDaysInclusive: number
  isPast: boolean
}

function toLocalDateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isBusinessDay(d: Date): boolean {
  const day = d.getDay()
  return day !== 0 && day !== 6
}

function countBusinessDaysInclusive(start: Date, end: Date): number {
  const s = toLocalDateOnly(start)
  const e = toLocalDateOnly(end)
  if (s.getTime() > e.getTime()) return 0

  let count = 0
  const cursor = new Date(s)
  while (cursor.getTime() <= e.getTime()) {
    if (isBusinessDay(cursor)) count += 1
    cursor.setDate(cursor.getDate() + 1)
  }
  return count
}

function buildModel(now: Date = new Date()): CountdownModel {
  const today = toLocalDateOnly(now)
  const target = new Date(today.getFullYear(), 2, 31) // 31/03 dello stesso anno

  const isPast = today.getTime() > target.getTime()
  return {
    start: today,
    end: target,
    remainingBusinessDaysInclusive: isPast ? 0 : countBusinessDaysInclusive(today, target),
    isPast,
  }
}

function renderShell(root: HTMLElement) {
  root.innerHTML = `
    <div class="min-h-dvh bg-slate-950 text-slate-100 grid place-items-center">
      <div class="px-6">
        <div id="daysLeft" class="text-7xl sm:text-8xl md:text-9xl font-semibold tabular-nums tracking-tight">—</div>
      </div>
    </div>
  `
}

function getOrCreateFaviconLink(): HTMLLinkElement {
  // Prefer the standard rel="icon" link, but fall back to any icon.
  const existing =
    (document.querySelector('link[rel="icon"]') as HTMLLinkElement | null) ??
    (document.querySelector('link[rel~="icon"]') as HTMLLinkElement | null)

  if (existing) return existing

  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/svg+xml'
  document.head.appendChild(link)
  return link
}

function svgFaviconDataUrl(value: number): string {
  const clamped = Math.max(0, Math.min(99, Math.trunc(value)))
  const text = String(clamped)

  // SVG favicon with a dark background and centered number.
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="4" y="4" width="56" height="56" rx="14" fill="#0f172a"/>
  <rect x="4" y="4" width="56" height="10" rx="14" fill="#38bdf8"/>
  <text x="32" y="44" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system" font-size="26" font-weight="800" fill="#e2e8f0">${text}</text>
</svg>
  `.trim()

  // Encode safely for data URL usage.
  const encoded = encodeURIComponent(svg)
    .replace(/%0A/g, '')
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')

  return `data:image/svg+xml,${encoded}`
}

function updateFaviconNumber(value: number) {
  const link = getOrCreateFaviconLink()
  link.type = 'image/svg+xml'
  link.href = svgFaviconDataUrl(value)
}

function updateView(model: CountdownModel) {
  const daysLeftEl = document.getElementById('daysLeft')
  if (!daysLeftEl) return

  // Se la data target è nel passato, mostriamo 0 (solo numero, come richiesto).
  const value = model.isPast ? 0 : model.remainingBusinessDaysInclusive
  const text = String(value)
  daysLeftEl.textContent = text
  document.title = text
  updateFaviconNumber(value)
}

function scheduleMidnightRefresh(onTick: () => void) {
  const now = new Date()
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const ms = nextMidnight.getTime() - now.getTime() + 1000
  window.setTimeout(() => {
    onTick()
    window.setInterval(onTick, 24 * 60 * 60 * 1000)
  }, ms)
}

const root = document.querySelector<HTMLDivElement>('#app')
if (!root) throw new Error('Missing #app')

renderShell(root)

const tick = () => updateView(buildModel(new Date()))
tick()
scheduleMidnightRefresh(tick)
