
import "../style/foruserCard.css";
import HeartReaction from "./HeartReaction";

export const Checkbox = ({ label,image, writer, description, prize,date }) => {
  return (
    <>
      <div className=" w-[200px] cursor-pointer">
        <div className="flip-card mb-1">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={image}
                alt="Avatar"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="flip-card-back relative flex flex-col text-start text-sm text-black p-5">
              <div className=" flex mb-3 text-white">
                <h1 className=""> Writer--</h1>
                <span className="">{writer} </span>
              </div>
              <div>
                <div className="mb-2 flex text-white">
                  <h1 className="">Filesize-25Mb</h1>
                </div>
              </div>
              <div>
                <div className="mb-2 flex text-white">
                  <h1 className="">+ Add to YoLaylist</h1>
                </div>
              </div>
              <div className="flex flex-row absolute bottom-2 right-2 text-white">
                <div className="p-2 ">
                  <HeartReaction />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <h1>{label} ({description})</h1>
          <p> {date}</p>
        </div>
      </div>
    </>
  );
};
