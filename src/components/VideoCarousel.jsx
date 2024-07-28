import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants/Index';
import gsap from 'gsap';
import { playImg, replayImg, pauseImg } from '../utils/Index';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(() => {
    gsap.to("#video", {
        scrollTrigger: {
            trigger: "#video",
            toggleActions: 'restart none none none',
        },
        onComplete: () => {
            setVideo((prevVideo) => ({
                ...prevVideo,
                startPlaying: true,
                isPlaying: true,
            }))
        }
    })
  },[isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        videoRef.current[videoId].play();
      }
    }
  }, [startPlaying, isPlaying, videoId, loadedData]);

  const handleLodedMetaData = (i, e) => setLoadedData
  ((prevLoadedData) => [...prevLoadedData, e]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate video progress
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          let progress = Math.ceil(anim.progress() * 100);

          if(progress != currentProgress){
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760
              ? '10vw'
              : window.innerWidth < 1200
              ? '10vw'
              : '4vw',
            });

            gsap.to(span[videoId], {
                width: `${currentProgress}%`,
                backgroundColor: 'white',
            })
          }
        },
        onComplete: () => {
          if(isPlaying){
            gsap.to(videoDivRef.current[videoId], {
                width: '12px'
            })
            gsap.to(span[videoId], {
                backgroundColor: '#afafaf',
            })
          }
        },
      });

      if(videoId === 0){
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
      }

      if(isPlaying){
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

    }
  }, [videoId, startPlaying]);

  const handleProcess = (type, i) => {
    switch (type) {
        case 'video-end':
            setVideo((prevVideo) => ({
                ...prevVideo,
                isEnd: true,
                videoId: i + 1,
            }))
            break;
        case 'video-last':
            setVideo((prevVideo) => ({
                ...prevVideo,
                isLastVideo: true,
            }))
            break;
        case 'video-reset':
            setVideo((prevVideo) => ({
                ...prevVideo,
                isLastVideo: false,
                videoId: 0,
            }))
            break;
        case 'play':
            setVideo((prevVideo) => ({
                ...prevVideo,
                isPlaying: !prevVideo.isPlaying,
            }))
            break;
    
        default:
            return video;
    }
  };

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
                  onLoadedMetadata={(e) => handleLodedMetaData(i, e)}
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>
              <div className='absolute top-12 left-[5%] z-10'>
                {list.textLists.map((text) => (
                  <p className='md:text-xl text-l font-medium' key={text}>
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
