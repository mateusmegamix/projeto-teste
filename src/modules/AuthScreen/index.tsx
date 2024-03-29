import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import Botao from '../../components/Botao';
import { EntradaTexto } from '../../components/EntradaTexto';
import { logar } from '../../services/requisicoesFirebase';
import { Alerta } from '../../components/Alerta';
import { auth } from '../../config/firebase';
import animacaoCarregando from '../../../assets/Animation.gif';
import logo from '../../../assets/handtalkLogo.jpeg';
import { alteraDados } from '../../utils/comum';
import { input } from './contants';
import { verificaCampoVazio } from '../../utils/comum';
import * as S from './styles';

export default function AuthScreen({ navigation }) {

  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });

  const [statusError, setStatusError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(usuario => {
      if (usuario) {
        navigation.replace('RenderScreen')
      }
      setCarregando(false)
    })
    return () => estadoUsuario();
  }, [])

  async function Login() {
    if(verificaCampoVazio(dados, setDados)) return

    const resultado = await logar(dados.email, dados.senha)
    if(resultado == 'erro') {
      setStatusError(true)
      setMessageError('E-mail ou senha não conferem')
      return
    }

    navigation.replace('RenderScreen')
  }

  if(carregando) {
    return (
      <S.ContainerAnimacao>
        <Image 
          source={animacaoCarregando}
          style={{width: 200, height: 200}}
        />
      </S.ContainerAnimacao>
    )
  }

  return (
    <S.Container>

      <Image 
        accessibilityLabel='Imagem de Logo Hand Talk'
        source={logo}
        style={{ width: 200, height: 200}}
      />

      {
        input.map((input) => {
          return (
            <EntradaTexto 
              key={input.id}
              {...input}
              value={dados[input.name]}
              onChangeText={valor => alteraDados(input.name, valor, dados, setDados)}
            />)
        })
      }

      <Alerta
        mensagem={messageError}
        error={statusError}
        setError={setStatusError}
      />
      
      <Botao onPress={() => Login()}>LOGIN</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Register') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </S.Container>
  );
}
