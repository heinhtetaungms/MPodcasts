import { useState } from "react";
import { Checkbox } from "../components/CardForUserDetail";
import { useNavigate } from "react-router-dom";
import { ForUserData } from "../api/userDetail";
import authStore from "../zustand/authStore";
import { useEffect } from "react";

const UserDetail = () => {
  const navigate = useNavigate();
  const [authToken] = authStore((state) => [state.token]);
  const [userId] = authStore((state) => [state.userId]);

  const [userData, setUserData] = useState();
  const [userPost, setUserPost] = useState([]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  useEffect(() => {
    console.log("dfsfsfsdfsdffds");
    ForUserData({ authToken, id: userId }).then((response) => {
      if (response.httpResponse === 200) {
        console.log(response.data);
        setUserData(response.data);
        setUserPost(response?.data?.podcasts);
        // return data.data;
      } else {
        throw new Error("Failed to fetch candidates");
      }
    });
  }, []);

  console.log("dfsdfsdfsdf", userPost);

  const openSubTaskPage = () => {
    navigate("/postcreate");
  };
  return (
    <>
      <div className="w-full h-full py-24 px-40 overflow-y-auto backdrop-blur-md bg-opacity-20 bg-primary text-black dark:text-white dark:bg-dark">
        <div className="w-full  mb-16">
          <div className="flex flex-row items-center text-black dark:text-white">
            <img
              src={userData?.profileImageUrl}
              alt=""
              style={{ width: "150px", height: "150px", borderRadius: "100%" }}
            />
            <div className="ms-10">
              <p className="mb-4">{userData?.userName}</p>
              <p>
                <span className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg">
                  1M
                </span>
                <span className="ms-5 text-sm">Followers</span>
              </p>
              <div className="mt-10 flex ">
                <button
                  type="button"
                  className=" text-gray-900 hover:text-white border border-gray-800  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-black dark:text-white">
          <div className="text-center mb-6 flex justify-between px-5">
            <p>Albums</p>
            <p className="cursor-pointer" onClick={() => openSubTaskPage()}>
              + Add Playlist
            </p>
          </div>
          <div className="flex flex-wrap ps-3">
            {userPost.map((podcast) => (
              <div key={podcast.id} className=" m-2">
                <Checkbox
                  label={podcast.title}
                  description={podcast.body}
                  type="submit"
                  date={formatDate(podcast.createdAt)}
                  image={podcast?.imageUrl}
                  writer={podcast?.writer.name}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className=" mt-10 text-black dark:text-white">
          <p>abouty ye la</p>
          <p>
            麦莉·赛勒斯（1992年11月23日—），美国新生代女演员兼女流行乐歌手，乡村歌手比利雷·赛勒斯的女儿。凭借迪士尼频道电视剧《汉娜·蒙塔娜》中饰演14岁女孩——麦莉·斯图尔特而成为家喻户晓的明星。她是歌影视三栖的全方位艺人，麦莉与师姐林赛·罗韩一样被封为新一代小天后、流行乐公主及青少年偶像。后来她与好莱坞唱片公司签约制作唱片，并联合发布了专辑《Montana
            2: Meet Miley
            Cyrus》，仅在美国就卖出超过三百万份，是美国公告牌二百强专辑榜的头号冠军。在2010年《福布斯》100名人榜中，塞勒斯排名第13。
          </p>
        </div> */}
      </div>
    </>
  );
};
export default UserDetail;
