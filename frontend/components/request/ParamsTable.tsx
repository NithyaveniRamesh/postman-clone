"use client";

import { useState } from "react";

export default function ParamsTable() {

  const [rows, setRows] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  function update(
    index: number,
    field: "key" | "value",
    value: string
  ) {
    const copy = [...rows];

    copy[index][field] = value;

    setRows(copy);
  }

  function addRow() {
    setRows([
      ...rows,
      {
        key: "",
        value: "",
      },
    ]);
  }

  return (
    <div className="p-5">

      <table className="w-full">

        <thead>

          <tr className="border-b border-zinc-800">

            <th className="p-2 text-left">
              Key
            </th>

            <th className="p-2 text-left">
              Value
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row, index) => (

            <tr
              key={index}
              className="border-b border-zinc-900"
            >

              <td>

                <input
                  value={row.key}
                  onChange={(e) =>
                    update(
                      index,
                      "key",
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent p-2 outline-none"
                />

              </td>

              <td>

                <input
                  value={row.value}
                  onChange={(e) =>
                    update(
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent p-2 outline-none"
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button
        onClick={addRow}
        className="mt-4 rounded bg-orange-500 px-4 py-2"
      >
        Add Parameter
      </button>

    </div>
  );

}