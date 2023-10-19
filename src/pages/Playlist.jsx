import React, { useEffect, useState } from 'react'
import { PlayListRequest } from '../api/playListRequest';
import authStore from '../zustand/authStore';
import { BsPlayBtnFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import PodcastAudioPlayer from '../components/PodcastAudioPlayer'
import {PodCastViewRequest} from '../api/podCastView'

const Playlist = () => {
    // const [playlistData, setPlaylistData] = useState([]);
    const store = authStore.getState();
    const [authToken] = authStore((state) => [state.token]);
    const [storedUserID] = authStore((state)=>[state.userId]);
    const [playlistData, setPlaylistData] = useState([]);
    const [openMusicPlayerValue, setOpenMusicPlayerValue] = useState();
    const [storedMusicPlayerState] = authStore((state)=>[state.musicplayerState]);
    let myUrl = "";
    // let bookTitle = "";
    // let writer = "";
    const [fileUrl, setFileUrl] = useState("")
    const [podTitle, setPodTitle] = useState("");
    const [podWriter, setPodWriter] = useState("");

    useEffect(()=>{
        PlayListRequest({authToken,userId:storedUserID})
        .then((response)=>{  
        console.log("Responsponse data ", response.data);   
        if(response.data.httpResponse === 200){
          console.log("Writer list data",response.data.data);
            setPlaylistData(response.data.data)
        }
      })
      .catch((error)=>{    
        if(error.response.data.httpResponse === 502){
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
      })
    },[]);

    const playHandler = (podId)=>{
        console.log("Clcik",podId);
        PodCastViewRequest({authToken,userId:storedUserID,podcastId:podId})
        .then((response)=>{  
        console.log("Responsponse data ", response.data);   
        if(response.data.httpResponse === 200){
          console.log("Audios data",response.data.data);

          const responseFileUrl = response.data.data.fileUrl;
          console.log("Response file url",responseFileUrl)
            const delimiter = 'https://storage.googleapis.com/m-podcats.appspot.com/';

            const urlResult = responseFileUrl.split(delimiter);
            myUrl = urlResult[1].replace(/\s+/g, '');

            setFileUrl(myUrl);
            setPodTitle(response.data.data.title);
            setPodWriter(response.data.data.writer.name);
        }
      })
      .catch((error)=>{    
        console.log("Error",error);
      })
        store.setMusicPlayerState(!storedMusicPlayerState);
    }

  return (
    <div>
        <div className='w-full h-full relative py-20 px-40 dark:bg-dark bg-gray'>
            <h1 className='text-3xl mb-[40px] dark:text-white'>My Playlist</h1>
            {
                playlistData.map((item)=>
                {
                    // bookTitle = item.title;
                    // writer = item.writer.name;
                    // console.log("Url ", writer);
                
                    return (
                        <div key={item.id} className='flex items-center px-5 py-6 mb-3 w-full playlistcard bg-white 
                            dark:bg-cardDark transition duration-300 ease-in-out hover:z-20 hover:shadow-lg 
                            hover:dark:shadow-3xl'>
                            <span className='top-no w-[10%] dark:text-white text-sm flex items-center'>
                                <FaPlay className='text-sm mr-3 cursor-pointer' onClick={()=>playHandler(item.id)}/>
                                <span className='top-no dark:text-white '>{item.id}</span>
                            </span>
                            <span className='top-no w-[40%] dark:text-white'>{item.title}</span>
                            <span className='top-no w-[25%] dark:text-white'>{item.viewCount}&nbsp;views</span>
                            <span className='top-no w-[25%] dark:text-white '>{item.writer.name}</span>
                        </div>
                    )      
                }
                )  
            }
            {storedMusicPlayerState ? <PodcastAudioPlayer title={podTitle} writer={podWriter} fileName={fileUrl}
            /> : <></>}
        </div>
    </div>
  )
}

export default Playlist