import '../style/HeartReaction.css';
import {useEffect, useState} from 'react';
import {LikeRequest} from '../api/likeReactionRequest';
import authStore from '../zustand/authStore';

function HeartReaction(props) {
    const { initialLikeCount, podcastId, initialLikeStatus } = props;
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(initialLikeStatus);
    const [storedUserId] = authStore((state) => [state.userId]);
    const [authToken] = authStore((state) => [state.token]);

    // Initialize the like count when the component mounts
    useEffect(() => {
        setLikeCount(initialLikeCount);
    }, [initialLikeCount]);

    const toggleDisplay = () => {
        // Toggle the liked state
        setLiked((prevLiked) => !prevLiked);
        console.log("Initial initialLikeStatus .......", initialLikeStatus)
        console.log("Initial Like Count .......", initialLikeCount)
        console.log("Podcast Id.......", podcastId);
        console.log("Is like .......", !liked)

        // Send the like request to the API
        LikeRequest({podcastId: podcastId, userId: storedUserId, liked: !liked, authToken})
            .then((response) => {
                if (response.data.httpResponse === 200) {
                    // Update the like count based on the API response
                    setLikeCount(response.data.data.likeCount);
                }
            })
            .catch((error) => {
                if (error.response.data.httpResponse === 500) {
                    console.log(error.response.data.message);
                }
            });
    };

    return (
        <div className='heart'>
            <div className='heart-bg'>
                <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={toggleDisplay}></div>
            </div>
            <div className='likes-amount'>
                {likeCount}
            </div>

        </div>
    );
}

export default HeartReaction