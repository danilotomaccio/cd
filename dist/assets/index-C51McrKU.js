(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=57,t=new Intl.DateTimeFormat(`it-IT`,{weekday:`long`});function n(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function r(e){let t=e.getDay();return t!==0&&t!==6}function i(e,t){let i=n(e),a=n(t);if(i.getTime()>a.getTime())return 0;let o=0,s=new Date(i);for(;s.getTime()<=a.getTime();)r(s)&&(o+=1),s.setDate(s.getDate()+1);return o}function a(e=new Date){let t=n(e),r=new Date(t.getFullYear(),2,31),a=t.getTime()>r.getTime();return{start:t,end:r,remainingBusinessDaysInclusive:a?0:i(t,r),isPast:a}}function o(e){e.innerHTML=`
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
  `}function s(e,t,n){return Math.min(n,Math.max(t,e))}function c(e){let n=e.isPast?0:e.remainingBusinessDaysInclusive,r=t.format(e.start),i={Mon:0,Tue:0,Wed:0,Thu:0,Fri:0},a=e.start.getDay(),o=0,s=0;if(!e.isPast){let t=new Date(e.start);for(;t.getTime()<=e.end.getTime();){let e=t.getDay();e===a&&(o+=1),e!==0&&e!==6&&(e===1?i.Mon+=1:e===2?i.Tue+=1:e===3?i.Wed+=1:e===4?i.Thu+=1:e===5&&(i.Fri+=1),e>=1&&e<=4?s+=8:e===5&&(s+=4)),t.setDate(t.getDate()+1)}}return{value:n,weeks:Math.floor(n/5),extraBusinessDays:n%5,sameWeekdayRemaining:o,weekdayLabelIt:r,weekdayCounts:i,totalWorkHours:s}}function l(e){let t=document.getElementById(`mainView`),n=document.getElementById(`detailsView`);!t||!n||(e?(t.classList.add(`hidden`),n.classList.remove(`hidden`)):(n.classList.add(`hidden`),t.classList.remove(`hidden`)))}function u(e){let t=document.getElementById(`debugBtn`);t&&(t.classList.toggle(`opacity-100`,e),t.classList.toggle(`opacity-0`,!e))}function d(e){let t=document.getElementById(`detailsTitle`),n=document.getElementById(`weeksRemaining`),r=document.getElementById(`sameWeekdayLabel`),i=document.getElementById(`sameWeekday`),a=document.getElementById(`totalHours`),o=document.getElementById(`cMon`),s=document.getElementById(`cTue`),c=document.getElementById(`cWed`),l=document.getElementById(`cThu`),u=document.getElementById(`cFri`);if(t&&(t.textContent=e.value.toString()),n){let t=e.weeks,r=e.extraBusinessDays;n.textContent=`${t} ${t===1?`settimana`:`settimane`} e ${r} ${r===1?`giorno`:`giorni`}`}r&&(r.textContent=`Quanti ${e.weekdayLabelIt} rimangono`),i&&(i.textContent=e.sameWeekdayRemaining.toString()),a&&(a.textContent=e.totalWorkHours.toString()),o&&(o.textContent=e.weekdayCounts.Mon.toString()),s&&(s.textContent=e.weekdayCounts.Tue.toString()),c&&(c.textContent=e.weekdayCounts.Wed.toString()),l&&(l.textContent=e.weekdayCounts.Thu.toString()),u&&(u.textContent=e.weekdayCounts.Fri.toString())}function f(){let e=document.querySelector(`link[rel="icon"]`)??document.querySelector(`link[rel~="icon"]`);if(e)return e;let t=document.createElement(`link`);return t.rel=`icon`,t.type=`image/svg+xml`,document.head.appendChild(t),t}function p(e){let t=Math.max(0,Math.min(99,Math.trunc(e))),n=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="4" y="4" width="56" height="56" rx="14" fill="#0f172a"/>
  <rect x="4" y="4" width="56" height="10" rx="14" fill="#38bdf8"/>
  <text x="32" y="44" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system" font-size="26" font-weight="800" fill="#e2e8f0">${String(t)}</text>
</svg>
  `.trim();return`data:image/svg+xml,${encodeURIComponent(n).replace(/%0A/g,``).replace(/%20/g,` `).replace(/%3D/g,`=`).replace(/%3A/g,`:`).replace(/%2F/g,`/`)}`}function m(e){let t=f();t.type=`image/svg+xml`,t.href=p(e)}function h(t){let n=document.getElementById(`daysLeft`),r=document.getElementById(`progressFill`);if(!n)return;let i=t.isPast?0:t.remainingBusinessDaysInclusive,a=String(i);if(n.textContent=a,document.title=a,m(i),r){let t=s(i,0,e),n=t/e;r.style.transform=`scaleX(${n})`;let a=r.parentElement;a&&a.setAttribute(`aria-valuenow`,String(t))}d(c(t))}function g(e){let t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1).getTime()-t.getTime()+1e3;window.setTimeout(()=>{e(),window.setInterval(e,1440*60*1e3)},n)}var _=document.querySelector(`#app`);if(!_)throw Error(`Missing #app`);o(_);var v=!1;u(!1),l(!1),window.addEventListener(`keydown`,e=>{(e.key===`d`||e.key===`D`)&&(v||(v=!0,u(!0))),e.key===`Escape`&&l(!1)}),window.addEventListener(`keyup`,e=>{(e.key===`d`||e.key===`D`)&&(v=!1,u(!1))}),window.addEventListener(`blur`,()=>{v=!1,u(!1)}),document.getElementById(`debugBtn`)?.addEventListener(`click`,()=>{l(!0)}),document.getElementById(`backBtn`)?.addEventListener(`click`,()=>{l(!1)});var y=()=>h(a(new Date));y(),g(y);