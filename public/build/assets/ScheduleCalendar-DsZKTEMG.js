import{j as t}from"./app-D3q39WAM.js";import{c as x}from"./createLucideIcon-CYCQcVJS.js";import{C as b}from"./chevron-right-CKSrtY2q.js";/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=x("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);function y({schedules:a,selectedDate:e,onSelectDate:n}){const l=new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),i=new Date(e.getFullYear(),e.getMonth(),1).getDay(),g=Array.from({length:l},(r,s)=>s+1),h=e.toLocaleString("default",{month:"long"}),c=()=>{n(new Date(e.getFullYear(),e.getMonth()-1,1))},d=()=>{n(new Date(e.getFullYear(),e.getMonth()+1,1))};return t.jsxs("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:[t.jsxs("div",{className:"flex items-center justify-between mb-6",children:[t.jsxs("h2",{className:"text-lg font-semibold text-gray-900",children:[h," ",e.getFullYear()]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:c,className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:t.jsx(f,{className:"w-5 h-5"})}),t.jsx("button",{onClick:d,className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:t.jsx(b,{className:"w-5 h-5"})})]})]}),t.jsx("div",{className:"grid grid-cols-7 gap-2 mb-2",children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(r=>t.jsx("div",{className:"text-center text-sm font-medium text-gray-600",children:r},r))}),t.jsxs("div",{className:"grid grid-cols-7 gap-2",children:[Array.from({length:i}).map((r,s)=>t.jsx("div",{className:"h-24 rounded-lg"},`empty-${s}`)),g.map(r=>{const s=new Date(e.getFullYear(),e.getMonth(),r),o=s.toDateString()===e.toDateString(),m=a.some(u=>new Date(u.day).toDateString()===s.toDateString());return t.jsxs("button",{onClick:()=>n(s),className:`h-24 rounded-lg border transition-colors relative
                ${o?"border-blue-600 bg-blue-50":"border-gray-100 hover:bg-gray-50"}
              `,children:[t.jsx("span",{className:`absolute top-2 left-2 text-sm
                ${o?"font-semibold text-blue-600":"text-gray-700"}
              `,children:r}),m&&t.jsx("div",{className:"absolute bottom-2 left-2 right-2",children:t.jsx("div",{className:"h-1.5 rounded-full bg-blue-600"})})]},r)})]})]})}export{y as default};