import { OrbitControls, PerspectiveCamera, View, Html } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import Iphone from './Iphone'

const ModelView = ({index,groupRef,gsapType,controlRef,item,size,setRotationState}) => {
  return (
    <View
        index={index}
        id={gsapType}
        className={`w-full h-full ${index === 2} ? 'right-[-100%]' : ''`}
    >
        {/* Ambient Lighting */}
        <ambientLight intensity={0.5} />

        <PerspectiveCamera makeDefault position={[0, 0, 4]} ref={controlRef} />

        <Lights />

        <OrbitControls 
            makeDefault
            ref={controlRef}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            
        />

        <group ref={groupRef} name={`${index === 1} ? 'small' : 'large'`} position={[0, 0, 0]}>
            <Suspense fallback={<Html><div>Loading</div></Html>}>
                <Iphone />
            </Suspense>
        </group>

        

    </View>
  )
}

export default ModelView