import{q as u,r as m,j as e,b as a,a as v}from"./app-C5UyW7-8.js";import{c as l}from"./createLucideIcon-BQPB_aAb.js";import{C as N}from"./calendar-D-0QT5XE.js";import{S as w}from"./school-BbYStD1V.js";import{B as k}from"./book-open-jWZG4tOG.js";import{U as S}from"./users-Dhx-ymKi.js";import{C as A}from"./chevron-right-AjjOmew2.js";/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=l("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=l("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=l("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=l("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=l("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=l("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]),D=async()=>{try{await v.post(route("logout")),window.location.href="/login"}catch(i){console.error("Error logging out:",i)}},y=({icon:i,label:n,active:t,hasDropdown:c,onClick:o})=>e.jsxs("button",{onClick:o,className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
      ${t?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[i,e.jsx("span",{className:"flex-1 text-left",children:n}),c&&e.jsx(A,{className:"w-4 h-4"})]});function R({fullName:i,children:n}){u();const t=s=>route().current(s),c=i,[o,p]=m.useState(!0),[d,f]=m.useState(null),[x,j]=m.useState(null),{props:b}=u(),{schools:g=[]}=b;return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("nav",{className:"fixed top-0 z-50 w-full bg-white border-b border-gray-200",children:e.jsx("div",{className:"px-3 py-3 lg:px-5 lg:pl-3",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:()=>p(!o),className:"p-2 text-gray-600 rounded-lg hover:bg-gray-100",children:e.jsx(O,{className:"w-6 h-6"})}),e.jsx("h1",{className:"ml-4 text-xl font-semibold text-gray-800",children:"Attendance"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-sm text-gray-600",children:["Welcome, ",c]}),e.jsx("img",{className:"w-8 h-8 rounded-full",src:"/images/favicon.png",alt:"profile"})]})]})})}),e.jsx("aside",{className:`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform
        ${o?"translate-x-0":"-translate-x-full"}
        bg-white border-r border-gray-200`,children:e.jsxs("div",{className:"h-full px-3 py-4 overflow-y-auto",children:[e.jsxs(a,{href:route("dashboard"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("dashboard")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx($,{className:"w-5 h-5"}),"Dashboard"]}),e.jsxs(a,{href:route("schedule"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("schedule")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(N,{className:"w-5 h-5"}),"Schedule"]}),e.jsxs(a,{href:route("setup"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("setup")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(z,{className:"w-5 h-5"}),"Setup"]}),e.jsxs(a,{href:route("profile.edit"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("profile.edit")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(C,{className:"w-5 h-5"}),"My Profile"]}),e.jsx("div",{className:"my-4 border-t border-gray-200"}),Array.isArray(g)&&g.map(s=>e.jsxs("div",{children:[e.jsx(y,{icon:e.jsx(w,{className:"w-5 h-5"}),label:s.name,hasDropdown:!0,active:d===s.id,onClick:()=>f(d===s.id?null:s.id)}),d===s.id&&e.jsx("div",{className:"ml-4 mt-2 space-y-1",children:Array.isArray(s.programs)&&s.programs.map(r=>e.jsxs("div",{children:[e.jsx(y,{icon:e.jsx(k,{className:"w-4 h-4"}),label:r.name,hasDropdown:!0,active:x===r.id,onClick:()=>j(x===r.id?null:r.id)}),x===r.id&&e.jsxs("div",{className:"ml-4 mt-2 space-y-1",children:[e.jsxs(a,{href:route("program"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("unit")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(M,{className:"w-4 h-4"}),r.code," Overview"]}),r.units.map(h=>e.jsx("div",{children:e.jsxs(a,{href:route("unit"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("unit")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(S,{className:"w-4 h-4"}),h.name]})},h.id))]})]},r.id))})]},s.id)),e.jsx("div",{className:"my-4 border-t border-gray-200"}),e.jsx(y,{onClick:D,icon:e.jsx(L,{className:"w-5 h-5"}),label:"Logout"})]})}),e.jsx("main",{className:`pt-16 transition-all duration-300 ${o?"ml-64":"ml-0"}`,children:e.jsx("div",{className:"p-4 min-h-screen",children:n})})]})}export{R as A};