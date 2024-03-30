hand talk 

yarn

cd ios && pod install && cd ..

yarn android ou yarn ios

defafio dos objetos 3D


A aplicação deverá:

1. Utilizar `React Native` (Plataformas como Expo podem ser utilizadas) e `Typescript`;
2. A aplicação deverá ter 3 telas, separadas em 3 views:
    1. Autenticação;
    2. Renderização;
    3. Configurações.
3. A tela de autenticação deve ser com login e senha; 
    1. **Use `Firebase Authentication`**
    2. Pelo menos duas contas funcionais
    3. Os dados de autenticação das contas devem ser informados na hora da entrega;
    4. Será possível realizar logout.
4. Na tela de renderização terá os 3 objetos 3D que serão renderizados com `THREE.js`, usando os dados da configuração;
5. Na tela de configurações serão escolhidos:
    1. Os tipos de formas dentre: cone, cubo, dodecaedro;
    2. Cor de cada um dos objetos;
    3. Rotação de cada um.
6. As configurações devem ser salvas nos respectivos usuários 
    1. **Use `Realtime Database`**
    2. Configurações definidas pela pessoa  usuária devem ser resgatadas.
7. Devem existir as seguintes configurações pré-definidas:
    1. Objeto 1
    forma: cubo
    cor: vermelho
    rotação: 90
    2. Objeto 2
    forma: cone
    cor: amarelo
    rotação: 45
    3. Objeto 3
    forma: dodecaedro
    cor: amarelo
    rotação: 0
    4. Apresentação de 1 elemento de cada um na tela de renderização;
    5. Usar `remote config` para resgatar configuração padrão;
    6. Configurações definidas pela pessoa usuária sobrescrevem as pré-definidas.
8. Usar pelo menos 1 padrão de projeto.
9. Implementar pelo menos 2 testes unitários
