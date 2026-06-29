"use client";

import { useResponseStore } from "@/store/responseStore";

export default function ResponseTabs(){

const{

activeTab,

setActiveTab

}=useResponseStore();

const tabs=[

"pretty",

"raw",

"headers"

];

return(

<div className="flex border-b border-zinc-800">

{tabs.map(tab=>(

<button

key={tab}

onClick={()=>setActiveTab(tab as any)}

className={`

px-5

py-3

capitalize

border-b-2

${

activeTab===tab

?

"border-orange-500 text-orange-500"

:

"border-transparent"

}

`}

>

{tab}

</button>

))}

</div>

);

}