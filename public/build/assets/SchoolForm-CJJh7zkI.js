import{r as a,j as e}from"./app-C5UyW7-8.js";import m from"./AddSchool-DPao9ViF.js";import{S as u}from"./school-BbYStD1V.js";import{P as h}from"./plus-BXJR4P_m.js";import{A as x}from"./arrow-right-B_wJ9GbS.js";import"./TextInput-q_58wK0n.js";import"./InputLabel-CkMSuUqt.js";import"./x-BDFNV2sA.js";import"./createLucideIcon-BQPB_aAb.js";function w({onSubmit:r,schools:i}){const[d,o]=a.useState(!1),[t,l]=a.useState({id:""}),c=s=>{s.preventDefault(),t.id&&r({id:t.id})},n=s=>{l({id:s.id}),o(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[e.jsx("div",{className:"p-2 bg-blue-50 rounded-lg",children:e.jsx(u,{className:"w-6 h-6 text-blue-600"})}),e.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"School Details"})]}),e.jsxs("button",{onClick:()=>o(!0),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:[e.jsx(h,{className:"w-4 h-4"}),"Add School"]})]}),d&&e.jsx(m,{onClose:()=>o(!1),onSubmit:n}),e.jsxs("form",{onSubmit:c,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-medium my-2 text-gray-600",children:["To get started, please select the school you want to setup.",e.jsx("br",{}),'If the school is not listed, click the "Add School" button above to add a new school.']}),e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",htmlFor:"school",children:"Select School"}),e.jsxs("select",{id:"school",required:!0,className:"w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500",value:t.id,onChange:s=>l({id:s.target.value}),children:[e.jsx("option",{value:"",children:"Select School"}),i.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs("button",{type:"submit",disabled:!t.id,className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",children:["Next",e.jsx(x,{className:"w-4 h-4"})]})})]})]})}export{w as default};