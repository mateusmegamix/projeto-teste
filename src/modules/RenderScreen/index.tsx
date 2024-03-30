import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Objeto } from '../../components/Objeto';
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
    <View style={{flex: 1}}>
      <S.Container>
        <Header logout={deslogar} navigation={navigation} />
        <S.Texto>Usuário: {usuarioNome}</S.Texto>
      </S.Container>
      <Objeto />
    </View>
  );
}
