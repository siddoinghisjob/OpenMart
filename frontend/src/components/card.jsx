import { Link } from "react-router-dom";

export default function Card({src, title, time, to}) {
  return (
    <div className="bg-slate-800 hover:scale-105 transition-all rounded-md min-w-80 max-w-80 shadow-md flex flex-col">
      <span className="relative w-full">
        <img
          className="rounded-t-md w-full h-56"
          src={src}
        />
      </span>
      <span className="flex flex-col items-start h-full">
        <span className="p-2 justify-start flex flex-col w-full font-sans gap-2 text-xl font-bold">
          {title}
          <span className="font-sans text-sm text-slate-100 font-normal">
            {time}
          </span>
        </span>
        <span className="p-4 w-full flex justify-center items-center"> 
        <Link to={"/product/" + to} className="bg-black w-full text-center hover:text-black hover:bg-white p-1 rounded-lg">View Details</Link>
        </span>
      </span>
    </div>
  );
}
