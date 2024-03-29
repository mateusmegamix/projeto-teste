import React, { useState } from 'react';
import { Alert } from 'react-native';
import Header from '../../components/Header';
import Objeto from '../../components/Objeto';
import { auth } from '../../config/firebase';
import { configPadrao } from '../../config/configPadrao';
import * as S from './styles';

export default function RenderScreen({ navigation }) {

  const [rotate, setRotate] = useState(0)
  const usuario = auth.currentUser;
  const usuarioNome = usuario.email.match(/^[^@]*/)[0];

  function deslogar() {
    Alert.alert(
      '',
      'Deseja fazer logout?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Ação cancelada'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {auth.signOut(),
          navigation.replace('AuthScreen')}
        },
      ],
      { cancelable: false }
    );   
  }

  return (
    <S.Container>
      <Header logout={deslogar} navigation={navigation}/>
      <S.Texto>Usuário: {usuarioNome}</S.Texto>

      {/* { configPadrao.map((config) => {
          return (
            <Objeto 
              key={config.objetoId}
              forma={config.forma}
              cor={config.cor}
              rotacao={config.rotacao}
              onChangeText={rotate => setRotate(rotate)}
            />)
        })} */}
     </S.Container>
  );
}
