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

(x)- Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados
 de email inválidos no banco. 
É desejável que essa validação não seja responsabilidade exclusiva do front.

(x)- É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.

(x)- O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações
 desnecessárias (como turmas antigas).

(x)- O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar 
melhor as matrículas.

(x)- O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas 
relativas a este estudante 
automaticamente passassem a constar como “canceladas”.

Durante o projeto vamos analisar esta lista e transformar esses requisitos em novas funcionalidades.

------------------------------------------------------------------------------------------------------------------------------
##Soft delete (exclusão suave)

    - Para começar vamos impedir que o usuário destrua realmente os dados ao deleter, usando o method Soft delete do sql,
    na documentação do Sequelize encontra-se como adicionar este method ao nosso código. 
    -Primeiro vá até a pasta models e para cada arquivo das Table no final do código adicionar como o exemplo
    -Estes dados são inseridos em Modelos;

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

    -Este dados devem ser criados em migration
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
    existe um method que pode ser usado para construir Defaultscope com este method o filtro findAll recebe um 
    parametro de busca e sempre procura buscas correspondentes, como no exemplo.

    -Este dados são inseridos em modelos

    +----------------------------------------------------------------
    |            {
    |            sequelize,
    |            modelName: 'Pessoas',
    |            paranoid: true,
    |            defaultScope: {where: { ativo : true } },
    |            scopes:{ 
    |            todos:{
    |                where: {  } 
    |            } }
    |        });
    |        return Pessoas;
    |        };
    |
    +-----------------------------------------------------------------

    neste caso também adicionei o filtro scopes que define novos parametros de buscas
    que podem ser passados na pesquisa findAll como regra automática, no caso aciam 
    apago todos filtros para que todos dados seja buscado, para invocar este parametro em 
    findAll precisamos.
   - os dados são inseridos em controller

    +-----------------------------------------------------------------
    |        static async FindAll(req, res){
    |            try{
    |                const Values = await database.Pessoas.scope('todos').findAll();
    |                return res.status(200).json(Values);
    |
    |            }
    |            catch(error){
    |                res.status(400).json(error.message)
    |            }
    |        }
    +------------------------------------------------------------------

    É possivel definir também validação no código,como exemplo do campo e-mail, o ORM traz
    alguams técnicas para validar os dados no backend como.:

    os comandos devem ser adicionados em modelos:

    +-----------------------------------------------------------------
    |            Pessoas.init({
    |            nome: DataTypes.STRING,
    |            ativo: DataTypes.BOOLEAN,
    |            email: {
    |            type: DataTypes.STRING,
    |            validate: {
    |                isEmail:{
    |                args: true,
    |                msg: 'dados do tipo e-mail inválidos'
    |                }
    |            }
    |            },
    |
    +-------------------------------------------------------------------------

    Na documentação do SQL existe diversos tipos de lista para validações.

##Escopo de associação e operadores 

    - podemos também declarar methods especiais para pesquisas diretamente no dentro da foregnkey como no exemplo 
    abaixo.:

    este código é adicionado em modelos.
        +-------------------------------------------------------------------
        |    static associate(models) {
        |    Pessoas.hasMany(models.Matriculas, {
        |        foreignKey: "estudante_id",
        |        scope: {status: 'confirmado'},
        |        as: 'AulasMatriculadas'});
        |
        |    Pessoas.hasMany(models.Turmas, {foreignKey: "docentes_id"});
        |    }
        +--------------------------------------------------------------------

    - Este tipo de declaração é usada dentro do method envocado neste caso o controller.


    +=--------------------------------------------------------------------------
    |        static async findOneMatriculasConfirmadas(req, res){
    |            const { id } = req.params;
    |            try{
    |                const Values = await database.Pessoas.findOne({where: { id: Number.parseInt(id)}});
    |                const matriculas = await Values.getAulasMatriculadas();
    |                return res.status(200).json(matriculas);
    |            }
    |            catch(error){
    |                return res.status(400).json(error.message)
    |            }
    |        }
    +------------------------------------------------------------------------------

    -Neste caso também podemos fazer validações pelo escopo chamando alguns argumentos. ex.:

    este codigo colocamos em controller.
    
    +----------------------------------------------------------------------------
    |       const Sequelize = require('sequelize')
    |       const Op = Sequelize.Op 
    |
    |        static async FindBydata(req, res){
    |            const { data_begin, data_end } = req.query;
    |            const where = {}
    |            data_begin || data_end ? where.data_inicio = {}: null;
    |            data_begin ? where.data_inicio[Op.gte] = data_begin: null;
    |            data_end ? where.data_inicio[Op.lte] = data_end: null;
    |            try{
    |                const Values = await database.Turmas.findAll({where});
    |                return res.status(200).json(Values);
    |            }
    |            catch(error){
    |                return res.status(400).json(error.message)
    |            }
    |        }
    +------------------------------------------------------------------------------

    para envocar o chamado basta turmas?data_begin=2020-01-12&data_end=2020-01-12

    fará uma pesquisa entre data informada.

    - A proxima solicitação o cliente quer consultar a matricula por turmas.: podemos usar o 
    method findAndCountAll() este method encontra todos valores informados e retorna um count dos
    valores;

    +--------------------------------------------------------------------------------+
    |    static async FindbyIdTurmas(req, res){                                      |
    |        const { id } = req.params;                                              |
    |        try{                                                                    |
    |            const Values = await database.Matriculas.findAndCountAll(           |
    |                {where: {                                                       |
    |                turmas_id: Number.parseInt(id),                                 |
    |                status: "confirmado",                                           |
    |                },                                                              |
    |                limit: 20,                                                      |
    |                order: [['estudante_id', 'ASC']]                                |
    |            });                                                                 |
    |            return res.status(200).json(Values);                                |
    |        }                                                                       |
    |        catch(error){                                                           |
    |            return res.status(400).json(error.message)                          |
    |        }                                                                       |
    |    }                                                                           |
    +--------------------------------------------------------------------------------+

    - alguns atributos podem ser adicionados a busca para agrupar determinados valores
    tais como os exemplos abaixo;

            attribute: ['matricula_id']
            group: ['matricula_id']
            having: Sequelize.literal( 'count(matricula_id) >= 2' )

    -Siquelie.literal permite que seja escritos comandos do SQL no sequelize para executar
    algumas tarefas.


    Neste caso podemos passar mais parametros de busca como limit: 20, busca até 20 valores ou 
    methods como order: [['valor coluna', 'tipo ASC ou DESC']]



##Transações 
    Conforme a ultima regra de negócio onde todas matriculas deveriam desativar caso os status dos estudantes 
    tenham sido desativos, então foi necessário realizar um único caminho com o method UPDATE uma vez para estudante
    parasando os status para false e para matricula passando o status para cancelado, e entao usando o ID para buscar
    em Pessoas o id e em Matricula a foregnkey estudante_id;

    - Cancelando todas matriculas dos estudantes e passando status ativo para false e cancelado em matricula.

    - method transation faz um callback na transação e retorna se tudo ocorreu como esperado. Este method protege
    nossos dados ue sejam alterados parcialmente, ou todos dados são alterados ou se não ocorrer então retorna a mensagem.

     database.Sequelize.Transation(async transaction =>{
        await database.pessoas.update(valores, {where :{}}, {transaction: transaction})

    })


##Refatoração com serviços 

    - Para refatorar o código e deixar ele mais simpes, podemos ultilizar os serviços.
    Criando uma pasta chamada serviços no projeto e então instanciando uma nova class chamadas
    Servicos e adicionar os methods comuns entre nossas tabelas para os controladores.

    
