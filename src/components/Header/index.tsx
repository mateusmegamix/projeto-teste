import Icon from 'react-native-vector-icons/Feather';
import * as S from './styles';
import React from 'react';
import { Props } from './type';

export default function Header({ logout, navigation }: Props) {

  return (
    <S.Container>
       <S.BotaoConfig 
        accessibilityLabel='botão de configuração'
        style={{left: 20, position: 'absolute'}}
        onPress={() => navigation.navigate('SettingsScreen')}>
        <Icon 
          name={'settings'} 
          size={28} 
          color="#FFF"
        />
      </S.BotaoConfig>
      <S.Texto>Teste Hand Talk</S.Texto>
      <S.BotaoConfig 
        accessibilityLabel='botão de logout'
        style={{right: 20, position: 'absolute'}}
        onPress={logout}
      >
        <Icon
          name={'log-out'} 
          size={28} 
          color="#FFF"
        />
      </S.BotaoConfig>
    </S.Container>
  );
}
