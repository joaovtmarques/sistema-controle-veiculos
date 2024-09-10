# Controle de Veículos

<br>

## 👨‍💻 Tecnologias e bibliotecas

#### Este sistema foi desenvolvido com as seguintes tecnologias e bibliotecas:

- [Node.js](https://nodejs.org/en/)
- [SQLite](https://www.sqlite.org/index.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)

<br>

## ℹ️ Entidades

<pre>
User {
  id: string;
  name: string;
  warName: string;
  rank: string;
  phoneNumber: string;
  SU: string;
  vehicle?: VehicleModel;
}</pre>
<pre>
Vehicle {
  id: string;
  model: string;
  plate: string;
  color: string;
  type: string;
  userId: string;
}</pre>
<pre>
Stamp {
  id: string;
  plate: string;
  number: number;
  SU: string;
  userId: string;
  rank: string;
  warName: string;
  status: string;
}</pre>

<br>

## 🛣️ Rotas

<details open>
<summary></summary>

- Usuários

  - POST /users - cria um usuário
  - GET /users - lista todos os usuários
  - PUT /users - atualiza os dados de um usuário
  - DELETE /users - deleta um usuário

- Veículos

  - POST /vehicles - cria um veículo associado a um usuário
  - GET /vehicles - lista todos os veículos
  - PUT /vehicles - atualiza os dados de um veículo

- Selos

  - POST /stamps - cria um selo associado ao veículo/usuário
  - GET /stamps - lista todos os selos

- Upload

  - POST /uploads - realiza o upload dos arquivos do usuário

- Formulário
  - POST /forms - cria o formulário de controle do usuário
  </details>

<br>

## ℹ️ Como rodar a aplicação

### Pré-requisitos

Para clonar e rodar a aplicação, é necessário ter instalado em sua máquina as ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/) (opcional).
Além disso, é legal ter editor de código como o [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/joaovtmarques/controle-veiculos-server>

# Acesse a pasta do projeto no terminal
$ cd controle-veiculos-server

# Instale as dependências
$ npm install ou yarn install

# Faça o build da aplicação
$ npm run build ou yarn run build

# Execute
$ npm start ou yarn start

# A aplicação deve iniciar no
$ localhost:8000
```
