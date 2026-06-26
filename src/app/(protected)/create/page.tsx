import React from "react";
import FormHabbit from "./component/FormHabbit";

export default function Createhabbit() {
  return (
    <div className="p-4 sm:p-8 flex items-center rounded justify-center min-h-screen flex-col  ">
      <div className="border sm:p-4 ">
        <h1 className="tracking-tight text-3xl p-4  ">Create Habbit To Track</h1>
        <FormHabbit />
      </div>

      {/* <hr className="my-4" /> */}
    </div>
  );
}
