import{r,j as e}from"./app-C5UyW7-8.js";import m from"./ScheduleForm-DuApNNlJ.js";import d from"./ScheduleCalendar-CXcCXoXZ.js";import p from"./ScheduleList-DJm4GXZ6.js";import{P as x}from"./plus-BXJR4P_m.js";import"./search-D0BwLcNF.js";import"./createLucideIcon-BQPB_aAb.js";import"./x-BDFNV2sA.js";import"./chevron-right-AjjOmew2.js";import"./clock-8w_Uv8jZ.js";import"./map-pin-CeUvoo5N.js";import"./users-Dhx-ymKi.js";function F({units:a,schedules:l,cohorts:i}){const[o,s]=r.useState(!1),[t,c]=r.useState(new Date),n=u=>{s(!1)};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h1",{className:"text-2xl font-semibold text-gray-900",children:"Schedule Management"}),e.jsxs("button",{onClick:()=>s(!0),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:[e.jsx(x,{className:"w-4 h-4"}),"Add Class Schedule"]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:"lg:col-span-2",children:e.jsx(d,{schedules:l,selectedDate:t,onSelectDate:c})}),e.jsx("div",{children:e.jsx(p,{schedules:l,selectedDate:t})})]}),o&&e.jsx(m,{onClose:()=>s(!1),onSubmit:n,initialDate:t,units:a,cohorts:i})]})}export{F as default};