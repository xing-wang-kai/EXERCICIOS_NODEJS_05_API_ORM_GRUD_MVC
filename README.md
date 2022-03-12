# EXERCICIOS_NODEJS_05_API_ORM_GRUD_MVC
 Exercícios com nodejs aplicando API com ORM GRUD MVC


#ORM com NodeJS: avançando nas funcionalidades do Sequelize

##introdução::


Recebemos uma lista de funcionalidades que o cliente deseja implementar, agora que o CRUD básico foi feito 
e o sistema está funcionando.

(x) - O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente
 do banco de dados.

(x)- Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos 
somente os usuários ativos.

()- Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados
 de email inválidos no banco. 
É desejável que essa validação não seja responsabilidade exclusiva do front.

()- É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.

()- O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações
 desnecessárias (como turmas antigas).

()- O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar 
melhor as matrículas.

()- O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas 
relativas a este estudante 
automaticamente passassem a constar como “canceladas”.

Durante o projeto vamos analisar esta lista e transformar esses requisitos em novas funcionalidades.

------------------------------------------------------------------------------------------------------------------------------
##Soft delete (exclusão suave)

    - Para começar vamos impedir que o usuário destrua realmente os dados ao deleter, usando o method Soft delete do sql,
    na documentação do Sequelize encontra-se como adicionar este method ao nosso código. 
    -Primeiro vá até a pasta models e para cada arquivo das Table no final do código adicionar como o exemplo

    +-----------------------------------------------+
    |    Turmas.init({
    |            data_inicio: DataTypes.DATEONLY
    |        }, {
    |            sequelize,
    |            modelName: 'Turmas',
    |            paranoid: true,
    |            deletedAt: 'destroyTime'
    |        });
    |
    +------------------------------------------------+

    -Conforme observado o method adicionado se chama Paranoid e recebe o valor boolean True o campo pode ser nomeado
    campo deletedAt: 'destroyTime';

    -Segundo passso criar 3 arquivos em migration, com ANOMESDIAHORAMINUTOSSEGUNDOSMILESSIMOS-addColumn-(nomedatabela).js   
    dentro desta pasta apagar todos aquivos de criação de columns e então escrever no corpo allowNull: true;
    type: sequelize.DATE

    ao lado do nome da Table colocar virgula e o nome 'deletedAt' que será o nome da column, mudar também o nome da funcão
    para addColumn e fazer o mesmo em down

    o codigo ficará assim:

        +---------------------------------------------------------------------+
        |    'use strict';                                                    |
        |        module.exports = {                                           |
        |        async up(queryInterface, Sequelize) {                        |
        |            await queryInterface.addColumn('Pessoas', 'deletedAt', { |
        |                                                                     |
        |                allowNull: true,                                     |
        |                type: Sequelize.DATE                                 |
        |                                                                     |
        |        })                                                           |
        |        },                                                           |
        |        async down(queryInterface, Sequelize) {                      |
        |            await queryInterface.removeColumn('Pessoas', 'deleteAt');|
        |        }                                                            |
        |        };                                                           |
        |                                                                     |
        +---------------------------------------------------------------------+

    Então rodar o comando no terminal npx sequelize-cli db:migrate

    os dados serão migrados e colunas adicionadas, este processo não deleta a base atual.



------------------------------------------------------------------------------------------------------------------------------
##Escopo de modelo e validações


##Escopo de associação e operadores 
##Transações 
##Refatoração com serviços 
