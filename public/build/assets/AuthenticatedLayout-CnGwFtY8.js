import{q as u,r as y,j as e,b as a,a as v}from"./app-EWy31Jtg.js";import{c as l}from"./createLucideIcon-UBDqu0Zv.js";import{C as w}from"./calendar-DBvHGj4G.js";import{S as N}from"./school-X_nzCirx.js";import{B as k}from"./book-open-D7ccNPnI.js";import{U as M}from"./users-BoIThwxN.js";import{C as S}from"./chevron-right-Dy7sjKNh.js";/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=l("BookUser",[["path",{d:"M15 13a3 3 0 1 0-6 0",key:"10j68g"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=l("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=l("ContactRound",[["path",{d:"M16 2v2",key:"scm5qe"}],["path",{d:"M17.915 22a6 6 0 0 0-12 0",key:"suqz9p"}],["path",{d:"M8 2v2",key:"pbkmx"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",key:"12vinp"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=l("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=l("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=l("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=l("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=l("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]),D=async()=>{try{await v.post(route("logout")),window.location.href="/login"}catch(i){console.error("Error logging out:",i)}},m=({icon:i,label:o,active:t,hasDropdown:c,onClick:n})=>e.jsxs("button",{onClick:n,className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
      ${t?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[i,e.jsx("span",{className:"flex-1 text-left",children:o}),c&&e.jsx(S,{className:"w-4 h-4"})]});function W({fullName:i,children:o}){u();const t=s=>route().current(s),c=i,[n,p]=y.useState(!0),[d,f]=y.useState(null),[x,j]=y.useState(null),{props:b}=u(),{schools:g=[]}=b;return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("nav",{className:"fixed top-0 z-50 w-full bg-white border-b border-gray-200",children:e.jsx("div",{className:"px-3 py-3 lg:px-5 lg:pl-3",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:()=>p(!n),className:"p-2 text-gray-600 rounded-lg hover:bg-gray-100",children:e.jsx(O,{className:"w-6 h-6"})}),e.jsx("h1",{className:"ml-4 text-xl font-semibold text-gray-800",children:"Attendance"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-sm text-gray-600",children:["Welcome, ",c]}),e.jsx("img",{className:"w-8 h-8 rounded-full",src:"/images/favicon.png",alt:"profile"})]})]})})}),e.jsx("aside",{className:`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform
        ${n?"translate-x-0":"-translate-x-full"}
        bg-white border-r border-gray-200`,children:e.jsxs("div",{className:"h-full px-3 py-4 overflow-y-auto",children:[e.jsxs(a,{href:route("dashboard"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("dashboard")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(H,{className:"w-5 h-5"}),"Dashboard"]}),e.jsxs(a,{href:route("printing.lecturers"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("printing.lecturers")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx($,{className:"w-5 h-5"}),"Lecturers"]}),e.jsxs(a,{href:route("printing.students"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("printing.students")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(A,{className:"w-5 h-5"}),"Students"]}),e.jsxs(a,{href:route("schedule"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("schedule")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(w,{className:"w-5 h-5"}),"Schedule"]}),e.jsxs(a,{href:route("setup"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("setup")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(U,{className:"w-5 h-5"}),"Setup"]}),e.jsxs(a,{href:route("profile.edit"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("profile.edit")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(C,{className:"w-5 h-5"}),"My Profile"]}),e.jsx("div",{className:"my-4 border-t border-gray-200"}),Array.isArray(g)&&g.map(s=>e.jsxs("div",{children:[e.jsx(m,{icon:e.jsx(N,{className:"w-5 h-5"}),label:s.name,hasDropdown:!0,active:d===s.id,onClick:()=>f(d===s.id?null:s.id)}),d===s.id&&e.jsx("div",{className:"ml-4 mt-2 space-y-1",children:Array.isArray(s.programs)&&s.programs.map(r=>e.jsxs("div",{children:[e.jsx(m,{icon:e.jsx(k,{className:"w-4 h-4"}),label:r.name,hasDropdown:!0,active:x===r.id,onClick:()=>j(x===r.id?null:r.id)}),x===r.id&&e.jsxs("div",{className:"ml-4 mt-2 space-y-1",children:[e.jsxs(a,{href:route("program"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("unit")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(L,{className:"w-4 h-4"}),r.code," Overview"]}),r.units.map(h=>e.jsx("div",{children:e.jsxs(a,{href:route("unit"),className:`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${t("unit")?"bg-gray-200 text-gray-900":"text-gray-600 hover:bg-gray-200"}`,children:[e.jsx(M,{className:"w-4 h-4"}),h.name]})},h.id))]})]},r.id))})]},s.id)),e.jsx("div",{className:"my-4 border-t border-gray-200"}),e.jsx(m,{onClick:D,icon:e.jsx(z,{className:"w-5 h-5"}),label:"Logout"})]})}),e.jsx("main",{className:`pt-16 transition-all duration-300 ${n?"ml-64":"ml-0"}`,children:e.jsx("div",{className:"p-4 min-h-screen",children:o})})]})}export{W as A};
