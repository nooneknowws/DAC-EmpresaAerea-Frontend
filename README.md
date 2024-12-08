# DAC-EmpresaAerea-Frontend

## Clonar o respositório.
`git clone + url`

## Executar o Gateway
`node gateway.js`

## Executar os microsserviços em spring ou docker

## Executar o PostgreSQL/RabbitMQ/MongoDB no docker

## Postman para registrar funcionario 1
`http://localhost:3000/funcionarios/cadastro`
```json
{
  "cpf": "12345678901",
  "nome": "João da Silva",
  "email": "xd@mailteste.com",
  "perfil": "Funcionario",
  "telefone": "+5511999999999",
  "senha": "3342",
  "endereco": {
    "cep": "12345678",
    "logradouro": "Rua Exemplo",
    "numero": 100,
    "complemento": "Apt 101",
    "bairro": "Centro",
    "cidade": "Curitiba",
    "estado": "PR"
  },
  "funcStatus": "ATIVO"
}
```
+ Versão ? do [Node](). 
+ Versão ? do [npm]().
+ Versão ? do [Java](). 
+ Versão ? do [Springboot]().
+ Versão ? do [Angular]().
+ Versão ? do [TS](). 

Após isso você deve conferir se estão adicionadas ao PATH nas variaveis de ambiente.

1. Em variaveis de sistema adicione **JAVA_HOME** com o caminho para a sua versão do java e **ANDROID_HOME**.
2. Depois adicione à Path o bin do seu java **%JAVA_HOME%\bin**.
3. Demais configurações....

## Instalando o ambiente
### json-server 
É necessário instalar porque não vai pro package.json
> npm install -g json-server

**Rodar:**
> json-server --watch db.json --port 3000

## Após clonar e configurar tudo você irá installar as libs utilizando o comando:

1. `npm install`
2. Demais comandos...

## Requisitos Mínimos para Entrega e Defesa
- **Front-end**:
  - Implementado em **Angular + TypeScript**
  - Interface visual bem elaborada
  - **Acessa o API Gateway** via **HTTP-REST**
  - **Não** utiliza **Local Storage** ou **json-server** para armazenamento

- **Back-end**:
  - Implementado em **Spring Boot** (Java ou Kotlin)
  - Arquitetura baseada em **microsserviços**
  - Cada microsserviço usa um banco de dados distinto
  - Login e cadastros básicos funcionando completamente
  - Implementação completa de uma **SAGA** para gerenciamento de transações distribuídas
  - **Mensageria** via **RabbitMQ**

- **API Gateway**:
  - Implementado um **API Gateway básico** para comunicação entre frontend e backend

- **Outros requisitos**:
  - Interface de usuário com design refinado (não pode ser HTML puro ou interface mal projetada)

# Requisitos Não-Funcionais e Comentários

## 1. Documentação de Suposições
- **Qualquer suposição feita pela equipe que não esteja definida no escopo deve ser documentada e entregue em formato PDF, junto ao projeto final.

## 2. Tecnologias a Serem Utilizadas
- **Front-end:** Angular 13 ou superior.
- **Back-end:** Node.js, Spring Boot (Java ou Kotlin), Spring Data JPA.
- **Bancos de Dados:** PostgreSQL e MongoDB.
- **Containerização:** Docker para cada microsserviço e banco de dados.
- **Mensageria:** RabbitMQ para comunicação assíncrona entre microsserviços.
- **Pesquisa:** Implementação de RabbitMQ para a mensageria e SAGA Orquestrada (necessário aprendizado autônomo).
- **API Gateway:** Para comunicação entre front-end e microsserviços.

## 3. Restrições
- **Proibição de Geradores de Código:** O uso de geradores automáticos de código não é permitido, incentivando o desenvolvimento manual.
- **Independência dos Microsserviços:** Cada microsserviço deve ter seu próprio banco de dados e não pode acessar o banco de dados de outro serviço.
  - **Seguir o padrão *Database Per Service*.
- **MongoDB para Autenticação:** O microsserviço de autenticação deve utilizar o MongoDB, enquanto os outros microsserviços utilizarão PostgreSQL.

## 4. Padrões Arquiteturais
- **Arquitetura de Microsserviços:** Os serviços devem ser independentes e especializados.
- **API Gateway:** O front-end Angular se comunica apenas com o API Gateway, que distribui as requisições aos microsserviços.
- **Mensageria Assíncrona (RabbitMQ):** Comunicação assíncrona entre microsserviços via RabbitMQ.
- **SAGA Orquestrada:** Utilização do padrão SAGA para transações distribuídas.

## 5. Modelagem e Maturidade
- **Modelo de Maturidade Richardson (Nível 2):** Implementar HATEOAS no nível 2 para navegação entre recursos via links.

## 6. Containerização e Deploy
- **Cada microsserviço, banco de dados e o API Gateway devem ser empacotados em containers Docker. 
  - **A geração e execução das imagens deve ser automatizada via scripts de shell.

## 7. CQRS no Microsserviço de Reserva
- **CQRS (Command Query Responsibility Segregation):** Implementar CQRS no microsserviço de Reservas.
  - **A base de comando deve ser normalizada e a base de consulta pode ser desnormalizada.
  - **Comunicação assíncrona via RabbitMQ para a atualização da base de consulta.

## 8. Segurança e Criptografia
- **Criptografia de Senhas:** Usar o algoritmo SHA-256 com SALT para criptografar as senhas.

## 9. Validação e Formatação
- **Validação de Campos:** Todos os campos que necessitarem de validação devem ser implementados no front-end.
- **Formatação Brasileira:** Datas e valores monetários devem seguir o padrão brasileiro (ex.: `dd/mm/aaaa` e `R$ xxx,xx`).
- **Máscara de Entrada:** Campos com formatação (ex.: CPF, CEP, telefone) devem ter máscaras de entrada.

## 10. Interface e Usabilidade
- **Front-end:** A interface deve ser construída com Angular e usar Bootstrap, Tailwind ou Material.
- **Compatibilidade:** O sistema será testado no **Firefox**, versão mais recente.

## 11. Execução e Build Automatizado
- **O processo de build, geração de imagens Docker e execução deve ser automatizado com um shell script.

---

## Comentários Adicionais
- **Padrões Arquiteturais:** A arquitetura de microsserviços oferece escalabilidade, mas aumenta a complexidade no gerenciamento de transações distribuídas.
- **Desempenho e Escalabilidade:** A mensageria com RabbitMQ garante escalabilidade e tolerância a falhas.
- **Orquestração de Sagas:** A orquestração de Sagas será desafiadora, especialmente no tratamento de falhas.
- **Testes no Firefox:** Garantir compatibilidade no Firefox, testando regularmente durante o desenvolvimento.
