import{W as h,j as e}from"./app-BfyFpA3k.js";import{T as n,I as c}from"./TextInput-BL91JYDV.js";import{I as m}from"./InputLabel-BWwferis.js";import{X as g}from"./x-CgFGygui.js";import"./createLucideIcon-DoPkaQZB.js";function v({onClose:s,onSubmit:u}){const{data:o,setData:r,post:i,processing:b,errors:l,reset:d}=h({name:"",code:""}),x=t=>{t.preventDefault(),i(route("school.store"),{onFinish:()=>{d("name","code"),s()}})};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg w-full max-w-lg mx-4",children:[e.jsxs("div",{className:"flex items-center justify-between p-6 border-b border-gray-100",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Add New School"}),e.jsx("button",{onClick:s,className:"p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors",children:e.jsx(g,{className:"w-5 h-5"})})]}),e.jsxs("form",{onSubmit:x,className:"p-6 space-y-4",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"name",children:"School Name"}),e.jsx(n,{id:"name",type:"text",name:"name",placeholder:"e.g., School of Science, Engineering and Technology",value:o.name,className:"mt-1 block w-full text-dark",onChange:t=>r(a=>({...a,name:t.target.value}))}),e.jsx(c,{message:l.name,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(m,{htmlFor:"code",children:"School Code"}),e.jsx(n,{id:"code",type:"text",name:"code",placeholder:"e.g., SSET",value:o.code,className:"mt-1 block w-full text-dark",onChange:t=>r(a=>({...a,code:t.target.value}))}),e.jsx(c,{message:l.code,className:"mt-2"})]}),e.jsxs("div",{className:"flex justify-between gap-3 mt-6",children:[e.jsx("button",{type:"button",onClick:s,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors",children:"Add School"})]})]})]})})}export{v as default};