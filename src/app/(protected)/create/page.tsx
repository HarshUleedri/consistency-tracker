import React from "react";
import FormHabbit from "./component/FormHabbit";

export default function Createhabbit() {
  return (
    <div className="p-8 flex items-center justify-center min-h-screen flex-col  ">
      <div className="border p-4 ">
        <h1 className="tracking-tight text-3xl px-4  ">Create Habbit To Track</h1>
        <FormHabbit />
      </div>

      {/* <hr className="my-4" /> */}
    </div>
  );
}
