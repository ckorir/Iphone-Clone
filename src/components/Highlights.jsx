import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { rightImg, watchImg } from '../utils/Index'

const Highlights = () => {

  useGSAP(() => {
    gsap.to("#title", {opacity: 1,delay: 1.5,y: 0})
    gsap.to(".link", {opacity: 1,delay: 2.5,stagger: 0.5,y: 0})
  },[])

  return (
    <section id='highlights' className='w-screen h-full overflow-hidden common-padding bg-zinc'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full md:flex justify-between items-center '>
          <h1 id='title' className='section-heading'>
            Get the highlights
          </h1>
          <div className='flex flex-wrap gap-5 items-end'>
            <p className='link'>
              Watch the film
              <img className='ml-2' src={watchImg} alt="watch"/>
            </p>
            <p className='link'>
              Watch the event
              <img className='ml-2' src={rightImg} alt="watch" />
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Highlights