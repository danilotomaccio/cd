import './style.css'

const MAX_DAYS = 57

type CountdownModel = {
  start: Date
  end: Date
  remainingBusinessDaysInclusive: number
  isPast: boolean
}

type DetailsModel = {
  value: number
  weeks: number
  extraBusinessDays: number
  sameWeekdayRemaining: number
  weekdayLabelIt: string
  weekdayCounts: Record<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri', number>
  totalWorkHours: number
}

const fmtWeekdayIt = new Intl.DateTimeFormat('it-IT', { weekday: 'long' })

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
    <div class="min-h-dvh bg-slate-950 text-slate-100 relative">
      <button
        id="debugBtn"
        type="button"
        class="opacity-0 transition-opacity duration-150 absolute top-4 right-4 rounded-full bg-slate-100/10 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-inset ring-slate-100/20 backdrop-blur hover:bg-slate-100/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        Dettagli
      </button>

      <div id="mainView" class="min-h-dvh grid place-items-center">
        <div class="px-6 w-full max-w-xl">
          <div id="daysLeft" class="text-center text-7xl sm:text-8xl md:text-9xl font-semibold tabular-nums tracking-tight">—</div>
          <div class="mt-8">
            <div
              class="h-3 w-full overflow-hidden rounded-full bg-slate-800/70 ring-1 ring-inset ring-slate-700/60"
              role="progressbar"
              aria-label="Countdown progress"
              aria-valuemin="0"
              aria-valuemax="57"
            >
              <div
                id="progressFill"
                class="h-full w-full origin-right rounded-full bg-gradient-to-l from-indigo-400 via-sky-400 to-fuchsia-400"
                style="transform: scaleX(1)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div id="detailsView" class="hidden min-h-dvh">
        <div class="mx-auto max-w-2xl px-6 py-12">
          <div class="flex items-center justify-between gap-4">
            <div class="text-2xl font-semibold tabular-nums" id="detailsTitle">—</div>
            <button
              id="backBtn"
              type="button"
              class="rounded-full bg-slate-100/10 px-4 py-2 text-sm font-medium text-slate-100 ring-1 ring-inset ring-slate-100/20 hover:bg-slate-100/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Indietro
            </button>
          </div>

          <div class="mt-8 grid grid-cols-1 gap-4">
            <div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <div class="text-sm text-slate-400">Settimane rimanenti (giorni lavorativi)</div>
              <div class="mt-2 text-3xl font-semibold tabular-nums" id="weeksRemaining">—</div>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <div class="text-sm text-slate-400" id="sameWeekdayLabel">Quanti giorni come oggi rimangono</div>
              <div class="mt-2 text-3xl font-semibold tabular-nums" id="sameWeekday">—</div>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <div class="text-sm text-slate-400">Ore totali (lun–gio 8h, ven 4h)</div>
              <div class="mt-2 text-3xl font-semibold tabular-nums" id="totalHours">—</div>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <div class="text-sm text-slate-400">Conteggio giorni (lun–ven)</div>
              <div class="mt-3 grid grid-cols-5 gap-2 text-center">
                <div class="rounded-xl bg-slate-950/40 py-2">
                  <div class="text-xs text-slate-400">Lun</div>
                  <div class="mt-1 font-semibold tabular-nums" id="cMon">—</div>
                </div>
                <div class="rounded-xl bg-slate-950/40 py-2">
                  <div class="text-xs text-slate-400">Mar</div>
                  <div class="mt-1 font-semibold tabular-nums" id="cTue">—</div>
                </div>
                <div class="rounded-xl bg-slate-950/40 py-2">
                  <div class="text-xs text-slate-400">Mer</div>
                  <div class="mt-1 font-semibold tabular-nums" id="cWed">—</div>
                </div>
                <div class="rounded-xl bg-slate-950/40 py-2">
                  <div class="text-xs text-slate-400">Gio</div>
                  <div class="mt-1 font-semibold tabular-nums" id="cThu">—</div>
                </div>
                <div class="rounded-xl bg-slate-950/40 py-2">
                  <div class="text-xs text-slate-400">Ven</div>
                  <div class="mt-1 font-semibold tabular-nums" id="cFri">—</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 text-xs text-slate-500">
            <p>Premi Esc per tornare indietro.</p>
          </div>
        </div>
      </div>
    </div>
  `
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function computeDetails(model: CountdownModel): DetailsModel {
  const value = model.isPast ? 0 : model.remainingBusinessDaysInclusive

  const weekdayLabelIt = fmtWeekdayIt.format(model.start)

  const weekdayCounts: DetailsModel['weekdayCounts'] = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
  }

  // "Quanti giorni come oggi" (stesso giorno della settimana), su calendario.
  const wantedDow = model.start.getDay()
  let sameWeekdayRemaining = 0

  // Ore totali: solo giorni lavorativi (lun–gio 8h, ven 4h).
  let totalWorkHours = 0

  if (!model.isPast) {
    const cursor = new Date(model.start)
    while (cursor.getTime() <= model.end.getTime()) {
      const dow = cursor.getDay()

      if (dow === wantedDow) sameWeekdayRemaining += 1

      if (dow !== 0 && dow !== 6) {
        if (dow === 1) weekdayCounts.Mon += 1
        else if (dow === 2) weekdayCounts.Tue += 1
        else if (dow === 3) weekdayCounts.Wed += 1
        else if (dow === 4) weekdayCounts.Thu += 1
        else if (dow === 5) weekdayCounts.Fri += 1

        if (dow >= 1 && dow <= 4) totalWorkHours += 8
        else if (dow === 5) totalWorkHours += 4
      }

      cursor.setDate(cursor.getDate() + 1)
    }
  }

  const weeks = Math.floor(value / 5)
  const extraBusinessDays = value % 5

  return {
    value,
    weeks,
    extraBusinessDays,
    sameWeekdayRemaining,
    weekdayLabelIt,
    weekdayCounts,
    totalWorkHours,
  }
}

function showDetailsView(show: boolean) {
  const mainView = document.getElementById('mainView')
  const detailsView = document.getElementById('detailsView')
  if (!mainView || !detailsView) return
  if (show) {
    mainView.classList.add('hidden')
    detailsView.classList.remove('hidden')
  } else {
    detailsView.classList.add('hidden')
    mainView.classList.remove('hidden')
  }
}

function setDebugButtonVisible(visible: boolean) {
  const btn = document.getElementById('debugBtn')
  if (!btn) return
  btn.classList.toggle('opacity-100', visible)
  btn.classList.toggle('opacity-0', !visible)
}

function updateDetailsView(details: DetailsModel) {
  const titleEl = document.getElementById('detailsTitle')
  const weeksEl = document.getElementById('weeksRemaining')
  const sameLabelEl = document.getElementById('sameWeekdayLabel')
  const sameEl = document.getElementById('sameWeekday')
  const hoursEl = document.getElementById('totalHours')
  const cMon = document.getElementById('cMon')
  const cTue = document.getElementById('cTue')
  const cWed = document.getElementById('cWed')
  const cThu = document.getElementById('cThu')
  const cFri = document.getElementById('cFri')

  if (titleEl) titleEl.textContent = details.value.toString()

  if (weeksEl) {
    const w = details.weeks
    const d = details.extraBusinessDays
    const wLabel = w === 1 ? 'settimana' : 'settimane'
    const dLabel = d === 1 ? 'giorno' : 'giorni'
    weeksEl.textContent = `${w} ${wLabel} e ${d} ${dLabel}`
  }

  if (sameLabelEl) {
    sameLabelEl.textContent = `Quanti ${details.weekdayLabelIt} rimangono`
  }

  if (sameEl) sameEl.textContent = details.sameWeekdayRemaining.toString()
  if (hoursEl) hoursEl.textContent = details.totalWorkHours.toString()
  if (cMon) cMon.textContent = details.weekdayCounts.Mon.toString()
  if (cTue) cTue.textContent = details.weekdayCounts.Tue.toString()
  if (cWed) cWed.textContent = details.weekdayCounts.Wed.toString()
  if (cThu) cThu.textContent = details.weekdayCounts.Thu.toString()
  if (cFri) cFri.textContent = details.weekdayCounts.Fri.toString()
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
  const progressFillEl = document.getElementById('progressFill')
  if (!daysLeftEl) return

  // Se la data target è nel passato, mostriamo 0 (solo numero, come richiesto).
  const value = model.isPast ? 0 : model.remainingBusinessDaysInclusive
  const text = String(value)
  daysLeftEl.textContent = text
  document.title = text
  updateFaviconNumber(value)

  if (progressFillEl) {
    const clampedValue = clamp(value, 0, MAX_DAYS)
    const ratio = clampedValue / MAX_DAYS
    ;(progressFillEl as HTMLElement).style.transform = `scaleX(${ratio})`
    // Keep ARIA in sync without showing text.
    const container = progressFillEl.parentElement
    if (container) container.setAttribute('aria-valuenow', String(clampedValue))
  }

  // Keep details in sync (even if currently hidden).
  updateDetailsView(computeDetails(model))
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

let dPressed = false
setDebugButtonVisible(false)
showDetailsView(false)

// Button is visible only while holding "d", but remains clickable even when invisible.
window.addEventListener('keydown', (e) => {
  if (e.key === 'd' || e.key === 'D') {
    if (!dPressed) {
      dPressed = true
      setDebugButtonVisible(true)
    }
  }

  if (e.key === 'Escape') {
    showDetailsView(false)
  }
})

window.addEventListener('keyup', (e) => {
  if (e.key === 'd' || e.key === 'D') {
    dPressed = false
    setDebugButtonVisible(false)
  }
})

window.addEventListener('blur', () => {
  dPressed = false
  setDebugButtonVisible(false)
})

document.getElementById('debugBtn')?.addEventListener('click', () => {
  showDetailsView(true)
})

document.getElementById('backBtn')?.addEventListener('click', () => {
  showDetailsView(false)
})

const tick = () => updateView(buildModel(new Date()))
tick()
scheduleMidnightRefresh(tick)
