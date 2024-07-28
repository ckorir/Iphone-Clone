import React from 'react'
import {hightlightsSlides} from '../constants/Index'

const VideoCarousel = () => {
  return (
    <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
            <div id='slider' className='sm:pr-20 pr-10' key={list.id}>
                <div className='video-carousel_container'>
                    <div className='bg-black w-full h-full rounded-3xl flex-center overflow-hidden'>
                        <video id='video' playsInline={true} muted preload='auto'>
                            <source  src={list.video} type='video/mp4'></source>
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
  )
}

export default VideoCarousel