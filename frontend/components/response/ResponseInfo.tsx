"use client";

import { useResponseStore } from "@/store/responseStore";

export default function ResponseInfo() {

    const {response}=useResponseStore();

    if(!response) return null;

    return(

<div className="flex gap-6 border-b border-zinc-800 px-5 py-2 text-sm">

<div>

<b>Status</b>

<span className="ml-2 text-green-400">

{response.status_code}

</span>

</div>

<div>

<b>Time</b>

<span className="ml-2">

{response.response_time} ms

</span>

</div>

<div>

<b>Size</b>

<span className="ml-2">

{(response.response_size/1024).toFixed(2)} KB

</span>

</div>

</div>

    );

}