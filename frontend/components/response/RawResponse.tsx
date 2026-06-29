"use client";

interface Props{

body:string;

}

export default function RawResponse({

body

}:Props){

return(

<pre className="h-full overflow-auto whitespace-pre-wrap p-5 text-sm">

{body}

</pre>

);

}