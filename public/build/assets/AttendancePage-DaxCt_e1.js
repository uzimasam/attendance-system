import{r as s,j as t,a as $}from"./app-D3q39WAM.js";import L from"./StudentList-BfRAx02O.js";import{A as C,U}from"./AttendanceStats-CKNkeXWq.js";import z from"./ScannerInput-COoYVl1-.js";import E from"./FinalizeAttendance-B1SWDRFB.js";import{A as F}from"./arrow-left-DL5fsa6o.js";import{S as M}from"./search-BJqxr_iN.js";import"./createLucideIcon-CYCQcVJS.js";import"./circle-alert-BC3IYxFI.js";import"./users-CUpRfQpU.js";import"./x-BP4F4MUk.js";function O({schedule:o}){const[m,x]=s.useState("list"),[h,g]=s.useState(""),[p,d]=s.useState(!1),[a,f]=s.useState(o.attendances),[c,y]=s.useState([]),[i,S]=s.useState([]),[Q,b]=s.useState(!1);s.useEffect(()=>{a.length>0&&S(a.map(e=>e.student))},[a]),s.useEffect(()=>{const e=setInterval(()=>{i.length===c.length&&b(!0),y(a)},50);return()=>clearInterval(e)},[i,c]);const l=(e,n)=>{$.post(route("attendance.mark"),{student_id:e,status:n,schedule_id:o.id}),console.log("Marking attendance",e,n),console.log(a),f(a.map(r=>r.student_id===e?{...r,attendance_status:n}:r))},j=e=>{const n=i.find(r=>r.registration_number===e);n&&l(n.id,"present")},w=async e=>{e.forEach(n=>{l(Number(n),"excused")}),i.forEach(n=>{c.some(u=>u.student_id===n.id)||l(n.id,"absent")}),d(!1)},v=(e,n,r)=>{const u=new Date(e).toLocaleDateString("en-US",{weekday:"long"}),N=new Date(e).toLocaleDateString("en-US",{month:"long"}),A=new Date(e).toLocaleDateString("en-US",{day:"numeric"}),k=new Date(e).toLocaleDateString("en-US",{year:"numeric"}),D=new Date(`${e} ${n}`).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}),_=new Date(`${e} ${r}`).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});return`${u}, ${A} ${N} ${k}, ${D} - ${_}`};return t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{className:"flex items-center gap-4",children:[t.jsx("button",{onClick:()=>window.history.back(),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:t.jsx(F,{className:"w-5 h-5"})}),t.jsxs("div",{children:[t.jsx("h1",{className:"text-2xl font-semibold text-gray-900",children:o.unit.name}),t.jsxs("p",{className:"text-sm text-gray-600",children:[v(o.day,o.start_time,o.end_time)," • ",o.venue]})]})]}),t.jsx("button",{onClick:()=>d(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Finalize Attendance"})]}),t.jsx(C,{total:a.length,present:a.filter(e=>e.attendance_status==="present").length,absent:a.filter(e=>e.attendance_status==="absent").length,excused:a.filter(e=>e.attendance_status==="excused").length}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100",children:[t.jsx("div",{className:"border-b border-gray-100",children:t.jsx("div",{className:"flex gap-4 p-4",children:t.jsxs("button",{onClick:()=>x("list"),className:`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${m==="list"?"bg-blue-600 text-white":"text-gray-600 hover:bg-gray-100"}`,children:[t.jsx(U,{className:"w-5 h-5"}),"Student List"]})})}),t.jsx(z,{onScanComplete:j}),m==="list"&&t.jsxs("div",{className:"p-4",children:[t.jsxs("div",{className:"relative mb-4",children:[t.jsx(M,{className:"w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"}),t.jsx("input",{type:"text",placeholder:"Search students...",value:h,onChange:e=>g(e.target.value),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),t.jsx(L,{students:i,attendance:c,searchQuery:h,onMarkAttendance:l})]})]}),p&&t.jsx(E,{students:i,attendance:a,markedAttendance:c,onClose:()=>d(!1),onFinalize:w})]})}export{O as default};