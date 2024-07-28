import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants/Index';
import gsap from 'gsap';
import { playImg, replayImg } from '../utils/Index';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [loadedData, setLoadedData] = useState([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlaying: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, isLastVideo, isPlaying, startPlaying, videoId } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        videoRef.current[videoId].play();
      }
    }
  }, [startPlaying, isPlaying, videoId, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate video progress
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // Update logic here
        },
        onComplete: () => {
          // Completion logic here
        },
      });
    }
  }, [videoId, startPlaying]);

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
          <div id='slider' className='sm:pr-20 pr-10' key={list.id}>
            <div className='video-carousel_container'>
              <div className='bg-black w-full h-full rounded-3xl flex-center overflow-hidden'>
                <video
                  id='video'
                  playsInline={true}
                  muted
                  preload='auto'
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>
              <div className='absolute top-12 left-[5%] z-10'>
                {list.textLists.map((text) => (
                  <p className='md:text-2xl text-xl font-medium' key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex-center mt-10'>
        <div className='bg-gray-300 backdrop-blur rounded-full flex-center py-5 px-7'>
          {videoRef.current.map((_,i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className='mx-2 w-3 h-3 bg-gray-200 rounded-full cursor-pointer relative'
            >
                <span className='absolute h-full w-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)} />
            </span>
          ))}
        </div>

        <button className='control-btn'>
            <img src={isLastVideo
                ? replayImg
                : !isPlaying ? playImg
                : pauseImg }
                alt={isLastVideo
                    ? 'replay'
                    : !isPlaying ? 'play'
                    : 'pause'
                }
                onClick={isLastVideo
                    ? () => handleProcess('video-reset')
                    : !isPlaying
                    ? () => handleProcess('play')
                    : () => handleProcess('pause')
                }
            />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
