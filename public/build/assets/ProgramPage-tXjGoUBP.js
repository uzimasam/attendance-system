import{r,j as e}from"./app-D3q39WAM.js";import m from"./ProgramStats-x4hU6AaP.js";import l from"./UnitList-nPUkl_WH.js";import x from"./AddUnitModal-CA8Ax36c.js";import h from"./AddCohortModal-BLXUyykp.js";import{A as u}from"./arrow-left-DL5fsa6o.js";import{S as p}from"./school-Cnyd3AZ9.js";import{U as g}from"./users-CUpRfQpU.js";import{P as f}from"./plus-D4GH01Re.js";import"./book-open-DJ1NoW2F.js";import"./createLucideIcon-CYCQcVJS.js";import"./clock-Czap8052.js";import"./graduation-cap-mdX9QE26.js";import"./chevron-right-CKSrtY2q.js";import"./x-BP4F4MUk.js";function L(){const[a,t]=r.useState(!1),[n,o]=r.useState(!1),s={id:"1",name:"Bachelor of Science in Computer Science",code:"BSC-CS",description:"A comprehensive program covering computer science fundamentals and advanced topics",school:"School of Computing and Informatics",duration:"4 years",units:[{id:"1",code:"CSC 101",name:"Programming 101",credits:4,semester:1,year:1,cohorts:[{id:"1",name:"Year 1 2024",studentCount:45},{id:"2",name:"Year 2 2023",studentCount:38}]},{id:"2",code:"CSC 102",name:"Data Structures",credits:4,semester:2,year:1,cohorts:[{id:"3",name:"Year 1 2024",studentCount:42}]}]},i=c=>{t(!1)},d=c=>{o(!1)};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("button",{onClick:()=>window.history.back(),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:e.jsx(u,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("h1",{className:"text-2xl font-semibold text-gray-900",children:s.name}),e.jsx("span",{className:"px-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg",children:s.code})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[e.jsx(p,{className:"w-4 h-4 text-gray-400"}),e.jsx("p",{className:"text-sm text-gray-600",children:s.school})]})]})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs("button",{onClick:()=>o(!0),className:"flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors",children:[e.jsx(g,{className:"w-4 h-4"}),"Add Cohort"]}),e.jsxs("button",{onClick:()=>t(!0),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:[e.jsx(f,{className:"w-4 h-4"}),"Add Unit"]})]})]}),e.jsx(m,{program:s}),e.jsx(l,{units:s.units}),a&&e.jsx(x,{onClose:()=>t(!1),onSubmit:i}),n&&e.jsx(h,{onClose:()=>o(!1),onSubmit:d,units:s.units})]})}export{L as default};