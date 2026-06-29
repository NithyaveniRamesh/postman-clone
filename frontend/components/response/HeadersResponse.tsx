"use client";

interface Props{

headers:Record<string,string>;

}

export default function HeadersResponse({

headers

}:Props){

return(

<div className="overflow-auto p-5">

<table className="w-full">

<thead>

<tr>

<th className="text-left">

Header

</th>

<th className="text-left">

Value

</th>

</tr>

</thead>

<tbody>

{

Object.entries(headers).map(

([key,value])=>(

<tr key={key}>

<td className="py-2">

{key}

</td>

<td>

{value}

</td>

</tr>

)

)

}

</tbody>

</table>

</div>

);

}