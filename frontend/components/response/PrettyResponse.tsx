"use client";

import Editor from "@monaco-editor/react";

interface Props{

body:string;

}

export default function PrettyResponse({

body

}:Props){

let formatted=body;

try{

formatted=JSON.stringify(

JSON.parse(body),

null,

2

);

}

catch{}

return(

<Editor

height="100%"

language="json"

theme="vs-dark"

value={formatted}

options={

{

readOnly:true,

minimap:{enabled:false}

}

}

/>

);

}