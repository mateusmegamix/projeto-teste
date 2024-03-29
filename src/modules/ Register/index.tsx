import React, { useState } from 'react';
import Botao from '../../components/Botao';
import { EntradaTexto } from '../../components/EntradaTexto';
import { cadastrar } from '../../services/requisicoesFirebase';
import { Alerta } from '../../components/Alerta';
import { alteraDados, verificaCampoVazio } from '../../utils/comum';
import { input } from './constant';
import * as S from './styles';


export default function Register() {

  const [dados, setDados] = useState({
    email: '',
    senha: '',
    confirmaSenha: ''
  });

  const [statusError, setStatusError] = useState('');
  const [messageError, setMessageError] = useState('');

  function verificaSenha(){
    return dados.senha != dados.confirmaSenha
  }

  async function salvarCadastro(){
    if(verificaCampoVazio(dados, setDados)) return

    if(dados.senha != dados.confirmaSenha) {
      setStatusError(true)
      setMessageError('As senhas não conferem')
      return
    }

    const resultado = await cadastrar(dados.email, dados.senha);
    if(resultado != 'sucesso'){
      setStatusError(true)
      setMessageError(resultado)
    }
  }

  return (
    <S.Contaienr>
      {
        input.map((input) => {
          return (
            <EntradaTexto 
              key={input.id}
              {...input}
              value={dados[input.name]}
              onChangeText={valor => alteraDados(input.name, valor, dados, setDados)}
              error={input.name != 'confirmaSenha' ? false : verificaSenha() && dados.confirmaSenha != ''}
            />)
        })
      }

      <Alerta 
        mensagem={messageError}
        error={statusError}
        setError={setStatusError}
      />
      
      <Botao onPress={() => salvarCadastro()}>Salvar</Botao>
    </S.Contaienr>
  );
}