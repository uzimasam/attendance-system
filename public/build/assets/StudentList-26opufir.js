import{j as r}from"./app-EWy31Jtg.js";import{c as i}from"./createLucideIcon-UBDqu0Zv.js";import{C as m}from"./circle-alert-BN40pgiF.js";/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=i("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=i("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);function b({students:c,attendance:n,searchQuery:a,onMarkAttendance:t}){const l=c.filter(e=>e.name.toLowerCase().includes(a.toLowerCase())||e.registration_number.toLowerCase().includes(a.toLowerCase())),o=e=>{var s;return(s=n.find(d=>d.student_id===Number(e)))==null?void 0:s.attendance_status};return r.jsx("div",{className:"divide-y divide-gray-100",children:l.map(e=>{const s=o(e.id);return r.jsxs("div",{className:"py-3 flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"font-medium text-gray-900",children:e.name}),r.jsx("p",{className:"text-sm text-gray-600",children:e.registration_number})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx("button",{onClick:()=>t(e.id,"present"),className:`p-2 rounded-lg transition-colors ${s==="present"?"bg-green-100 text-green-600":"hover:bg-gray-100 text-gray-400"}`,children:r.jsx(x,{className:"w-5 h-5"})}),r.jsx("button",{onClick:()=>t(e.id,"excused"),className:`p-2 rounded-lg transition-colors ${s==="excused"?"bg-amber-100 text-amber-600":"hover:bg-gray-100 text-gray-400"}`,children:r.jsx(m,{className:"w-5 h-5"})}),r.jsx("button",{onClick:()=>t(e.id,"absent"),className:`p-2 rounded-lg transition-colors ${s==="absent"?"bg-red-100 text-red-600":"hover:bg-gray-100 text-gray-400"}`,children:r.jsx(g,{className:"w-5 h-5"})})]})]},e.id)})})}export{b as default};
