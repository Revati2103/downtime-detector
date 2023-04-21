(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return o(1960)}])},1960:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return r}});var a=o(5893),l=o(2175),n=o(7294),s=o(6310);let i=()=>{let[e,t]=(0,n.useState)(!1),o=s.Ry({websiteUrl:s.Z_().required("Required"),contactEmail:s.Z_().email("Invalid email").required("Required"),contactPhone:s.Z_().required("Required")}),i=async(e,o)=>{let{resetForm:a}=o;try{let o=await fetch("http://localhost:5500/api/websites",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(o.ok){let e=await o.json();console.log(e),t(!0)}t(!1)}catch(e){console.error(e)}a(),alert("Thank you for your submission, you will be notified via a text-alert whenever your website goes down")};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{className:"text-center text-gray-700 text-xl cursor-pointer m-10",children:"Website Downtime Detector"}),(0,a.jsx)(l.J9,{initialValues:{websiteUrl:"",contactEmail:"",contactPhone:""},validationSchema:o,onSubmit:i,children:e=>(0,a.jsxs)(l.l0,{className:"max-w-md mx-auto",children:[(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"websiteUrl",className:"block text-gray-700 font-bold mb-2",children:"Website URL"}),(0,a.jsx)(l.gN,{type:"text",id:"websiteUrl",name:"websiteUrl",placeholder:"https://example.com",className:"w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}),(0,a.jsx)(l.Bc,{name:"websiteUrl",component:"div",className:"error-message text-red-500"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"contactEmail",className:"block text-gray-700 font-bold mb-2",children:"Contact Email"}),(0,a.jsx)(l.gN,{type:"email",id:"contactEmail",name:"contactEmail",placeholder:"example@example.com",className:"w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}),(0,a.jsx)(l.Bc,{name:"contactEmail",component:"div",className:"error-message text-red-500"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"contactPhone",className:"block text-gray-700 font-bold mb-2",children:"Contact Phone"}),(0,a.jsx)(l.gN,{type:"tel",id:"contactPhone",name:"contactPhone",placeholder:"+1 123-456-7890",className:"w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}),(0,a.jsx)(l.Bc,{name:"contactPhone",component:"div",className:"error-message text-red-500"})]}),(0,a.jsx)("button",{type:"submit",disabled:!e.isValid||e.isSubmitting,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline",children:"Submit"})]})})]})},c=()=>(0,a.jsx)("div",{children:(0,a.jsx)(i,{})});var r=c}},function(e){e.O(0,[743,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);