import{r as a,j as r}from"./app-C5UyW7-8.js";import{c as u}from"./createLucideIcon-BQPB_aAb.js";/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=u("ScanLine",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M7 12h10",key:"b7w52i"}]]);function p({onScanComplete:c}){const n=a.useRef(null),e=a.useRef();a.useEffect(()=>{var t;return(t=n.current)==null||t.focus(),()=>{e.current&&clearTimeout(e.current)}},[]);const o=t=>{const s=t.target.value;e.current&&clearTimeout(e.current),e.current=setTimeout(()=>{s&&(c(s),t.target.value="")},100)};return r.jsxs("div",{className:"p-4 border-b border-gray-100",children:[r.jsxs("div",{className:"relative",children:[r.jsx(l,{className:"w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"}),r.jsx("input",{ref:n,type:"text",className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Scan student ID or registration number...",onChange:o,autoComplete:"off"})]}),r.jsx("p",{className:"mt-2 text-sm text-gray-600",children:"Place cursor here and scan student ID to mark attendance automatically"})]})}export{p as default};