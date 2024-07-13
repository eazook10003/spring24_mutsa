import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 500px;
  height: 600px;
  margin-left: 180px;
  margin-top: 70px;
`;

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  return <primitive ref={ref} object={scene} />;
};

const ThreeDModel = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model url="/img/Graph.glb" />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>
    </CanvasContainer>
  );
};

export default ThreeDModel;
