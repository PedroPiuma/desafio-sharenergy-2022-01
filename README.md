# Desafio para o processo seletivo SHARENERGY 2022/01

Repositório que representa uma aplicação web e mobile capaz de requisitar e obter dados do [Spaceflight News API](https://spaceflightnewsapi.net/) a fim de mostrá-los para o usuário final. Utilizou-se ReactJS e React Router DOM para as rotas, além de apresentar uma interface amigável, bonita e limpa, na qual o usuário possa navegar através de botões.

# Getting Started

[Passo Opcional: Criar o arquivo (.env.local) na past src. Neste arquivo (.env.local) colar (REACT_APP_API_URL = https://api.spaceflightnewsapi.net/v3)<br/>
Em seguida substituir em providers/client.js a variável `apiURL = 'https://api.spaceflightnewsapi.net/v3'` para `apiURL = process.env.REACT_APP_API_URL`.]

1º Passo: `npm install` para instalar todas dependências.<br/>
2º Passo: `npm start` para iniciar o projeto.<br/>
A execucação pode ser aberta em [http://localhost:3000](http://localhost:3000) para visualizar em seu navegador.
A execucação também pode ser aberta em dispositivo mobile conectado na mesma rede que seu computador através do seu ip local, como por exemplo: [http://(Seu ip local):3000](http://localhost:3000) para visualizar em seu navegador.
A página será recarregada se ocorrer alterações.
Você também pode ver erros no console caso ocorra.

## Aplicação

- A tela inicial exibe em uma lista os `articles` mais recentes e vistos também os 3 últimos vistos pelo usuário, exibindo `title` e `publishedAt`.
-
- A tela inicial contêm botões para paginar os `articles`.
-
- A tela inicial contêm um select que permita ao usuário configurar o tamanho da lista, de forma a listar 10 (padrão), 25, 50 ou 100 `articles` por vez.
- A tela inicial contêm um input para pesquisa por texto do `title`, utilizando endpoint `https://api.spaceflightnewsapi.net/v3/articles?title_contains=TEXTO`, incluindo "texto com espaços e outros caracteres especiais".
- A tela inicial permite ao usuário a pesquisa de artigos por data de publicação entre duas datas (inicial e final) filtrando a partir da request realizada previamente.
- Ao clicar em um elemento da lista, a aplicação navega para uma página que exiba todos os detalhes do `article`, a imagem deste, e salva no localStorage sua visualização.
-
- A página de detalhes de `article` deve conter botões para navegar para o próximo e para o anterior (ordenados por `id`, notando que é possível haver saltos no número do id.

## Sobre mim

<p align="left">
  Meu LinkedIn - 
  <a href="https://www.linkedin.com/in/luisppiuma/">
    <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn Button">
  </a>
</p>
