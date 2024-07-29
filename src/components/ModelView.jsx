import { PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import Iphone from './Iphone'

const ModelView = ({index,groupRef,gsapType,controlRef,item,size,setRotationState}) => {
  return (
    <View
        index={index}
        id={gsapType}
        className={`border-2 border-red-200 w-full h-full ${index === 2} ? 'right-[-100%]' : ''`}
    >
        {/* Ambient Lighting */}
        <ambientLight intensity={0.5} />

        <PerspectiveCamera makeDefault position={[0, 0, 4]} ref={controlRef} />

        <Lights />

        <Suspense fallback={null}>
            <Iphone />
        </Suspense>

    </View>
  )
}

export default ModelView