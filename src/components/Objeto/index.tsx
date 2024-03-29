import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { BoxGeometry, ConeGeometry, DodecahedronGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, Scene } from 'three';

export default function Objeto({ forma }) {
  const canvasRef = useRef<GLView>();

  useEffect(() => {
    console.log('entrou')
    const onContextCreate = async (gl) => {
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
      const scene = new Scene();
      const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);

      const geometry = forma === 'cubo' ? new BoxGeometry() :
                       forma === 'cone' ? new ConeGeometry() :
                       forma === 'dodecaedro' ? new DodecahedronGeometry() :
                       null;

      const material = new MeshBasicMaterial({ color: 0x00ff00 });
      const objeto = new Mesh(geometry, material);
      scene.add(objeto);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);

        objeto.rotation.x += 0.01;
        objeto.rotation.y += 0.01;

        renderer.render(scene, camera); // Corrigindo o erro aqui
      };

      animate();
    };

    const gl = canvasRef.current?.context;
    if (gl) {
      onContextCreate(gl);
    }
  }, [forma]);

  return (
    <View style={styles.container}>
      <GLView style={styles.glView} ref={canvasRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glView: {
    width: 200,
    height: 200,
  },
});
