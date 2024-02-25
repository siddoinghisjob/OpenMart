import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Card from "../components/card";
import { useInView } from "react-intersection-observer";
import useAxios from "../utils/axiosWrapper.";
import { useEffect, useState } from "react";
import Loader from "../components/loading";

export default function Home() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let uri = "";
  if (id) {
    uri = "search?id=" + id;
  } else uri = "fetchproducts";
  const [ads, setAds] = useState([]);

  const fetch = useAxios(uri, "GET");
  useEffect(() => {
    setLoader(true);
    const helper = async () => {
      try {
        const val = await fetch();
        if (val.success) {
          setAds(val.message);
        } else throw new Error("Success error");
      } catch (e) {
        setAds([]);
      } finally {
        setLoader(false);
      }
    };
    helper();
  }, [id]);
  if (searchParams.get("error")?.length > 0) navigate("/error?" + searchParams);
  return (
    <>
      {loader && <Loader />}
      <div className="h-full w-full bg-slate-900 p-5 text-white flex-1">
        {id ? (
          <h1 className="p-2 w-full text-center pt-0 pb-5">
            You are looking for {id}
          </h1>
        ) : (
          <></>
        )}
        <div className="w-full h-full flex flex-wrap justify-center gap-5">
          {ads?.map((ele, key) => (
            <Card
              src={ele.image}
              key={key}
              title={ele.title}
              time={ele.time}
              to={ele.id}
            />
          ))}
        </div>
        <div ref={ref}>{inView}</div>
      </div>
    </>
  );
}
