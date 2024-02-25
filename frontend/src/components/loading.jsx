import React from "react";

export default function Loader() {
  return (
    <div className="w-full bg-black h-full absolute bg-opacity-40 grid place-items-center">
      <div className="z-[999] w-full pt-10 h-full grid place-content-center">
        <img src = "/loading-gif.gif" className="h-8 w-8"/>
      </div>
    </div>
  );
}
