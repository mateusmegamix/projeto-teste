import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { View, StyleSheet } from 'react-native';
import { auth, firebaseConfig } from '../../config/firebase';
import { firebase as remoteConfigFirebase } from '@react-native-firebase/remote-config';
import appFirebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import * as S from './styles';

function Cubo({ props, rotation, color }) {
  const [active, setActive] = useState(false);

  return (
    <mesh {...props} 
    scale={active ? 1 : 1.3}
    position={[0, 2, -2]}
    rotation={[rotation, 0, 0]}
    onClick={(event) => setActive(!active)}>
    <boxGeometry />
    <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cone({ props, rotation, color }) {
  const [active, setActive] = useState(false);

  return (
    <mesh {...props} 
      scale={active ? 1 : 0.8}
      position={[0, 0, 0]}
      rotation={[rotation, 0, 0]}
      onClick={(event) => setActive(!active)}>
      <coneGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Dodecaedro({ props,rotation, color }) {
  const [active, setActive] = useState(false);

  return (
    <mesh {...props} 
      scale={active ? 1 : 0.8}
      position={[0, -2, 0]}
      rotation={[rotation, 0, 0]}
      onClick={(event) => setActive(!active)}>
      <dodecahedronGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export { Cubo, Cone, Dodecaedro };

export function Objeto() {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const usuario = auth.currentUser;
        if (usuario) {
          const userID = usuario.uid;
          const snapshot = await appFirebase.database().ref(`usuarios/${userID}/defaultConfig`).once('value');
          const data = snapshot.val();
          console.log(data);
          if (data && data.objects) {
            setObjects(data.objects);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
      }
    };

    fetchObjects();
  }, [objects]);

  return (
    <S.Container>
      <Canvas style={{ flex: 1 }} resizeMode="contain">
        <ambientLight />
        <pointLight position={[0, 0, 0]} />
        {objects.map((object, index) => {
          let position;
          switch (object.type) {
            case 'cubo': 
              return <Cubo key={index} rotation={object.rotation} color={object.color} />;
            case 'cone':
              return <Cone key={index} rotation={object.rotation} color={object.color} />;
            case 'dodecaedro':
              return <Dodecaedro key={index} rotation={object.rotation} color={object.color} />;
            default:
              return null;
          }
        })}
      </Canvas>
    </S.Container>
  );  
}
