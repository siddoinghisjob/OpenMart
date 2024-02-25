import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import useAxios from "../utils/axiosWrapper.";
import { useEffect, useState } from "react";
import Loader from "../components/loading";

export default function Product() {
  const { id } = useParams();
  const fetch = useAxios("ad/" + id, "GET");
  const [loader, setLoader] = useState(false);
  const fallback = {
    original:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
  };
  const [data, setData] = useState();

  useEffect(() => {
    const helper = async () => {
      setLoader(true);
      try {
        const val = await fetch();
        if (val.success) setData(val.message);
        else setData({});
      } catch (e) {
        setData({});
      } finally {
        setLoader(false);
      }
    };
    helper();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="h-full bg-slate-900 flex-1 w-full p-10 grid place-items-center">
        <div className="grid w-full h-full justify-center items-center md:grid-cols-2">
          <div className="w-full md:pr-5 md:mb-0 mb-8">
            {data?.images?.length > 0 && (
              <ImageGallery
                items={data?.images}
                showBullets={true}
                showThumbnails={false}
                showPlayButton={false}
                showFullscreenButton={false}
                onErrorImageURL={fallback}
              />
            )}
          </div>{" "}
          <div className="w-full flex flex-col h-full gap-5 justify-between">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-4xl text-white">
                {data?.title} by{" "}
                <p className="md:max-w-full max-w-80 md:overflow-visible overflow-x-auto h-fit">
                  {data?.name}
                </p>
              </span>
              <span className="text-xl text-green-500 font-bold">
                ₹ {data?.cost}
              </span>
            </div>
            <span className="text-xl flex-1 flex flex-col gap-2 text-white bg-white bg-opacity-10 rounded-2xl p-5">
              <div className="border-b-2 p-2">{data?.time}</div>
              {data?.description}
            </span>
            <span className="text-lg w-full">
              <div className="p-3 justify-start items-center w-full text-center rounded-lg bg-green-200 text-green-900 border border-green-800">
                <span className="w-full px-10">Contact : {data?.number}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
