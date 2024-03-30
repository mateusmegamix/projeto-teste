
import { cadastrar, logar } from '../../src/config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn()
}));

describe('Testes para as funções de autenticação', () => {
  test('cadastrar: retorna "sucesso" ao cadastrar usuário com sucesso', async () => {
    createUserWithEmailAndPassword.mockResolvedValue('dadosDoUsuario');

    const resultado = await cadastrar('email@teste.com', '123456');

    expect(resultado).toBe('sucesso');
  });

  test('cadastrar: retorna mensagem de erro ao falhar ao cadastrar usuário', async () => {
    const erro = { code: 'auth/email-already-in-use' };
    createUserWithEmailAndPassword.mockRejectedValue(erro);

    const resultado = await cadastrar('email@teste.com', '123456');

    expect(resultado).toBe('Esse email já está em uso');
  });

  test('logar: retorna "sucesso" ao logar usuário com sucesso', async () => {
    signInWithEmailAndPassword.mockResolvedValue('dadosDoUsuario');

    const resultado = await logar('email@teste.com', '123456');

    expect(resultado).toBe('sucesso');
  });

  test('logar: retorna "erro" ao falhar ao logar usuário', async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('Erro de login'));

    const resultado = await logar('email@teste.com', '123456');

    expect(resultado).toBe('erro');
  });
});
