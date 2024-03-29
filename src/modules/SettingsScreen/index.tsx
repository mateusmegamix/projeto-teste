import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Botao from '../../components/Botao';
import * as S from './styles';
import Slider from '@react-native-community/slider';
import { auth } from '../../config/firebase';
import { firebase as remoteConfigFirebase } from '@react-native-firebase/remote-config';
import { firebaseConfig } from '../../config/firebase';
import appFirebase from '@react-native-firebase/app';
import '@react-native-firebase/database';


const SettingsScreen = ({navigation}) => {
  const [objects, setObjects] = useState([]);
  const [selectedRotationCubo, setSelectedRotationCubo] = useState(0);
  const [selectedRotationCone, setSelectedRotationCone] = useState(0);
  const [selectedRotationDodecaedro, setSelectedRotationDodecaedro] = useState(0);
  const [colors, setColors] = useState({
    Cubo: '',
    Cone: '',
    Dodecaedro: '',
  });

  const authenticated = {firebaseConfig}

  useEffect(() => {
    if (!remoteConfigFirebase.apps.length) {
      remoteConfigFirebase.initializeApp(authenticated.firebaseConfig);
    }
  
    const fetchRemoteConfig = async () => {
      try {
        console.log('Iniciando busca do Remote Config');
        const remoteConfig = remoteConfigFirebase.remoteConfig();
  
        
        await remoteConfig.fetch(60000);
  
        await remoteConfig.activate();
  
        console.log('Busca do Remote Config concluída');
        const defaultConfig = remoteConfig.getValue('objeto_config_padrao').asString();
        

        const objectsArray = JSON.parse(defaultConfig).defaultConfig.objects;
        
        setObjects(objectsArray);
        console.log(objects, objectsArray)
  
        setSelectedRotationCubo(objectsArray.find(obj => obj.type === 'Cubo').rotation);
        setSelectedRotationCone(objectsArray.find(obj => obj.type === 'Cone').rotation);
        setSelectedRotationDodecaedro(objectsArray.find(obj => obj.type === 'Dodecaedro').rotation);
        setColors({
          Cubo: objectsArray.find(obj => obj.type === 'Cubo').color,
          Cone: objectsArray.find(obj => obj.type === 'Cone').color,
          Dodecaedro: objectsArray.find(obj => obj.type === 'Dodecaedro').color,
        });
      } catch (error) {
        console.error('Erro ao buscar o Remote Config:', error);
      }
    };
  
    fetchRemoteConfig();
  }, []);
  
  const handleChangeColor = (forma, color) => {
    setColors((prevColors) => ({ ...prevColors, [forma]: color }));
  };

  const handleChangeRotationCubo = (rotation) => {
    setSelectedRotationCubo(rotation);
  };

  const handleChangeRotationCone = (rotation) => {
    setSelectedRotationCone(rotation);
  };

  const handleChangeRotationDodecaedro = (rotation) => {
    setSelectedRotationDodecaedro(rotation);
  };

  const salvarConfig = () => {
    remoteConfigFirebase.initializeApp(authenticated.firebaseConfig);
    const usuario = auth.currentUser;
    
    if (usuario) {
      const userID = usuario.uid;
    
      const objectsArray = [
        {
          type: 'cubo',
          rotation: selectedRotationCubo,
          color: colors.Cubo,
        },
        {
          type: 'cone',
          rotation: selectedRotationCone,
          color: colors.Cone,
        },
        {
          type: 'dodecaedro',
          rotation: selectedRotationDodecaedro,
          color: colors.Dodecaedro,
        },
      ];
  
      appFirebase.database().ref(`usuarios/${userID}/defaultConfig`).set({ objects: objectsArray })
        .then(() => {
          Alert.alert('Configuração salva com sucesso')
          navigation.navigate('RenderScreen');
        })
        .catch((error) => {
          Alert.alert('Erro ao salvar a configuração');
        });
    } else {
      console.error('Usuário não autenticado');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <S.Container accessibilityLabel='Cubo'>
        <S.TextoForma>Cubo</S.TextoForma>
        <S.OptionContainer>
          <S.Texto accessibilityLabel='escolha a cor'>Escolha a cor: {colors.Cubo}</S.Texto>
          <S.ColorOptions>
            <S.TouchableOption
              accessibilityLabel='vermelho'
              style={{ backgroundColor: '#FF0000' }}
              onPress={() => handleChangeColor('Cubo', 'Vermelho')}
            />
            <S.TouchableOption
              accessibilityLabel='amarelo'
              style={{ backgroundColor: '#FFFF00' }}
              onPress={() => handleChangeColor('Cubo', 'Amarelo')}
            />
            <S.TouchableOption
              accessibilityLabel='verde'
              style={{ backgroundColor: '#00FF00' }}
              onPress={() => handleChangeColor('Cubo', 'Verde')}
            />
          </S.ColorOptions>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.Texto accessibilityLabel='escolha a rotação'>Escolha a rotação: {selectedRotationCubo}°</S.Texto>
          <Slider
            style={{ width: 250, height: 50 }}
            minimumValue={0}
            maximumValue={90}
            step={45}
            value={selectedRotationCubo}
            onValueChange={(value) => handleChangeRotationCubo(value)}
          />
        </S.OptionContainer>
      </S.Container>
      <S.Container accessibilityLabel='Cone'>
        <S.TextoForma>Cone</S.TextoForma>
        <S.OptionContainer>
          <S.Texto accessibilityLabel='escolha a cor'>Escolha a cor: {colors.Cone}</S.Texto>
          <S.ColorOptions>
            <S.TouchableOption
            accessibilityLabel='vermelho'
              style={{ backgroundColor: '#FF0000' }}
              onPress={() => handleChangeColor('Cone', 'Vermelho')}
            />
            <S.TouchableOption
              accessibilityLabel='amarelo'
              style={{ backgroundColor: '#FFFF00' }}
              onPress={() => handleChangeColor('Cone', 'Amarelo')}
            />
            <S.TouchableOption
              accessibilityLabel='verde'
              style={{ backgroundColor: '#00FF00' }}
              onPress={() => handleChangeColor('Cone', 'Verde')}
            />
          </S.ColorOptions>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.Texto accessibilityLabel='escolha a rotação'>Escolha a rotação: {selectedRotationCone}°</S.Texto>
          <Slider
            style={{ width: 250, height: 50 }}
            minimumValue={0}
            maximumValue={90}
            step={45}
            value={selectedRotationCone}
            onValueChange={(value) => handleChangeRotationCone(value)}
          />
        </S.OptionContainer>
      </S.Container>
      <S.Container accessibilityLabel='Dodecaedro'>
        <S.TextoForma>Dodecaedro</S.TextoForma>
        <S.OptionContainer>
          <S.Texto accessibilityLabel='escolha a cor'>Escolha a cor: {colors.Dodecaedro}</S.Texto>
          <S.ColorOptions>
            <S.TouchableOption
              accessibilityLabel='vermelho'
              style={{ backgroundColor: '#FF0000' }}
              onPress={() => handleChangeColor('Dodecaedro', 'Vermelho')}
            />
            <S.TouchableOption
              accessibilityLabel='amarelo'
              style={{ backgroundColor: '#FFFF00' }}
              onPress={() => handleChangeColor('Dodecaedro', 'Amarelo')}
            />
            <S.TouchableOption
              accessibilityLabel='verde'
              style={{ backgroundColor: '#00FF00' }}
              onPress={() => handleChangeColor('Dodecaedro', 'Verde')}
            />
          </S.ColorOptions>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.Texto accessibilityLabel='escolha a rotação'>Escolha a rotação: {selectedRotationDodecaedro}°</S.Texto>
          <Slider
            style={{ width: 250, height: 50 }}
            minimumValue={0}
            maximumValue={90}
            step={45}
            value={selectedRotationDodecaedro}
            onValueChange={(value) => handleChangeRotationDodecaedro(value)}
          />
        </S.OptionContainer>
      </S.Container>
      <View style={{ marginBottom: 50 }}>
        <Botao onPress={() => salvarConfig()}>Salvar configurações</Botao>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
