import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alerta } from './Alerta';

describe('Alerta component', () => {
  test('renderiza corretamente a mensagem de erro', () => {
    const { getByText } = render(<Alerta mensagem="Erro ocorrido!" error />);
    expect(getByText('Erro ocorrido!')).toBeTruthy();
  });

  test('não renderiza o componente quando não há erro', () => {
    const { queryByText } = render(<Alerta mensagem="Erro ocorrido!" />);
    expect(queryByText('Erro ocorrido!')).toBeNull();
  });

  test('fechar o alerta ao pressionar o botão "OK"', () => {
    const setErrorMock = jest.fn();
    const { getByText } = render(<Alerta mensagem="Erro ocorrido!" error setError={setErrorMock} />);
    const button = getByText('OK');
    fireEvent.press(button);
    expect(setErrorMock).toHaveBeenCalledWith(false);
  });
});
