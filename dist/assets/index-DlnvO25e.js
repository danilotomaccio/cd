(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=57;function t(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function n(e){let t=e.getDay();return t!==0&&t!==6}function r(e,r){let i=t(e),a=t(r);if(i.getTime()>a.getTime())return 0;let o=0,s=new Date(i);for(;s.getTime()<=a.getTime();)n(s)&&(o+=1),s.setDate(s.getDate()+1);return o}function i(e=new Date){let n=t(e),i=new Date(n.getFullYear(),2,31),a=n.getTime()>i.getTime();return{start:n,end:i,remainingBusinessDaysInclusive:a?0:r(n,i),isPast:a}}function a(e){e.innerHTML=`
    <div class="min-h-dvh bg-slate-950 text-slate-100 grid place-items-center">
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
  `}function o(e,t,n){return Math.min(n,Math.max(t,e))}function s(){let e=document.querySelector(`link[rel="icon"]`)??document.querySelector(`link[rel~="icon"]`);if(e)return e;let t=document.createElement(`link`);return t.rel=`icon`,t.type=`image/svg+xml`,document.head.appendChild(t),t}function c(e){let t=Math.max(0,Math.min(99,Math.trunc(e))),n=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="4" y="4" width="56" height="56" rx="14" fill="#0f172a"/>
  <rect x="4" y="4" width="56" height="10" rx="14" fill="#38bdf8"/>
  <text x="32" y="44" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system" font-size="26" font-weight="800" fill="#e2e8f0">${String(t)}</text>
</svg>
  `.trim();return`data:image/svg+xml,${encodeURIComponent(n).replace(/%0A/g,``).replace(/%20/g,` `).replace(/%3D/g,`=`).replace(/%3A/g,`:`).replace(/%2F/g,`/`)}`}function l(e){let t=s();t.type=`image/svg+xml`,t.href=c(e)}function u(t){let n=document.getElementById(`daysLeft`),r=document.getElementById(`progressFill`);if(!n)return;let i=t.isPast?0:t.remainingBusinessDaysInclusive,a=String(i);if(n.textContent=a,document.title=a,l(i),r){let t=o(i,0,e),n=t/e;r.style.transform=`scaleX(${n})`;let a=r.parentElement;a&&a.setAttribute(`aria-valuenow`,String(t))}}function d(e){let t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1).getTime()-t.getTime()+1e3;window.setTimeout(()=>{e(),window.setInterval(e,1440*60*1e3)},n)}var f=document.querySelector(`#app`);if(!f)throw Error(`Missing #app`);a(f);var p=()=>u(i(new Date));p(),d(p);