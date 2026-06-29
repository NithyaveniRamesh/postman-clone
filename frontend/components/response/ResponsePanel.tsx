"use client";

import { useResponseStore } from "@/store/responseStore";

import ResponseInfo from "./ResponseInfo";

import ResponseTabs from "./ResponseTabs";

import PrettyResponse from "./PrettyResponse";

import RawResponse from "./RawResponse";

import HeadersResponse from "./HeadersResponse";

export default function ResponsePanel(){

const{

loading,

response,

activeTab

}=useResponseStore();

if(loading)

return(

<div className="p-10">

Sending Request...

</div>

);

if(!response)

return(

<div className="p-10">

Send a request.

</div>

);

return(

<div className="flex h-full flex-col">

<ResponseInfo/>

<ResponseTabs/>

<div className="flex-1 overflow-hidden">

{

activeTab==="pretty" &&

<PrettyResponse

body={response.body}

/>

}

{

activeTab==="raw" &&

<RawResponse

body={response.body}

/>

}

{

activeTab==="headers" &&

<HeadersResponse

headers={response.headers}

/>

}

</div>

</div>

);

}