import * as S from './styles';
import { Props } from './types';

export default function Botao({ onPress, children }: Props) {

  return (
    <S.Botao accessibilityLabel='botão' onPress={onPress}>
      <S.TextoBotao>{children}</S.TextoBotao>
    </S.Botao>
  );
}
