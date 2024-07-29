import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import ModelView from './ModelView'
import { yellowImg } from '../utils/Index'

import * as THREE from 'three'
import { View } from '@react-three/drei'

const Model = () => {

  const [size,setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });

  // Camera controls for model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
   

  useGSAP(() => {
    gsap.to("#heading", {opacity: 1,delay: 1.5,y: 0})
  },[])

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look
        </h1>
        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModelView 
              index={1}
              groupRef={small}
              gsapType='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView 
              index={2}
              groupRef={large}
              gsapType='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <canvas
              className='w-full h-full'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </canvas>

          </div>
        </div>
      </div>
    </section> 
  )
}

export default Model