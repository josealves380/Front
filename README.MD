### Manual de instruções ###

## Criar parceiro antes de criar clientes

## Parceiro não pode ter o mesmo nome já existente

## Email de usuário sempre será único

## Senha sempre será no mínimo 6 caracteres

## Para configurar um usuário com acesso as config. da f2b basta copiar e colar seu token, na pág de pesquisa usuário

## Para o parceiro gerar o seu próprio boleto, é necessário todo dia 1º ele liberar o cliente

## Para corrigir o bug de login não pode esquecer a pasta public dentro da dist do front pois senão trava todo projeto

### Botões de controle do cliente 


## Botão de gerar um boleto direciona para página, com três opções, montar o boleto, enviar para f2b por meio de agendamento e via boleto

## Botão de visualizar os dados do cliente

## Botão de desativar um cliente pelo botão da pág. de pesquisa cliente gerará um boleto
##


## ***************Configurações Banco de Dados******************

## Para criar um novo banco basta executar o comando npx prisma migrate dev

## Para executar a api em desenvolvimento, executar o comando npm run dev

## É necessario inserir direto no banco o tipo de boleto no banco de dados

## É necessário inserir direto no banco os status de ativo e desativo na tabela ativação

### Controle de Versão

## Historico 

## versão 65 para versão 66, adicionar cliente passou a ter, valores calculados dinamicamente, o cliente deixou de visualizar o dashboard do parceiro

## Versão 66 para 67, adicionado botão de desativar boletos na página de envio para f2b pois estava travando o envio dos boletos sendo executado junto, ajustado o gerar da pág. de criação individual dos boletos do clientes 

## Versão 67 para 68 foi alterado os gráficos, deixando a consulta dinâmica e apresentando na tela, o tamanho da fonte do título dos gráficos, acrescentado um gráfico ao dashboard do parceiro, o cliente não tem mais acesso aos gráficos do parceiro, retirado o botão de baixar o boleto da tela de pesquisa cliente.

## Versão 68 para 69 foram alterados onde o cliente pede o suporte, adicionando campos para identificr qual sistema ele está tendo problema, um campo para possíveis soluções antes de acionar o suporte, foi adicionado uma label para definir quem estará atendendo o suporte, os botões ganharam icones e titulos.

## Versão 69 para 70 foram feitas as seguintes alterações: na página editar valor pagamento e percentual que passaram a ser dinâmicos;

## Versão 70 para 71 foram feitas as seguintes alterações: editcliente, cadastrocliente, viewcliente e na api foi acrescentado o campo tipo de envio;

## Versão 71 para 72 foi corrigido a lentidão, alterado o campo de data no editcliente, o suporte esta em fase de teste foi alterado a forma de postar a resolução do problema ficando dinâmico a comunicação com o cliente

## Versão 72 para 73 corrigindo a questão de consulta de token usando o refresh token em algumas partes da aplicação

## Versão 73 para 74 a página de suporte, foram adicionadas as funcionalidades de envio e recebimento de mensagens instantâneas, ajustado a questão de recarregamento, os botões desaparecem quando o ticket é cancelado ou concluído

## Versão 74 para 75 a página de suporte, foi a adicionado a data do suporte, quando o cliente solicita o suporte ele é redirecionado para a página para ver o seu atendimento, e seus componentes foram ajustado dentro da página.

## Versão 75 para 76 a página de consulta e controle de cliente passou a recarregar sem o reload após clicar no botão, foi implementado o bloqueio dos clientes quando atrasam a o boleto gerado na plataforma

## Versão 76 para 77 a página de editar dados dos clientes foi mudada, pois a edição do campo valor pago pelo cliente não estava calculando corretamente 

## Versão 77 para 78 o email cliente e o parceiro deixa de ser único na aplicação.

## Versao 79 acrescentado página para editar o valor pago pelo cliente, e mensagem de erro caso não edite os dados do cliente

## Versão 80 acrescentado mensagem de erro quando falha o envio de boleto com nome do cliente, os cliente estão em ordem alfabética, os boleto para envio estão em ordem alfabética, cadastro de cliente está com mensagem quando é enviado com sucesso, ajustado a questão de editar o cliente para voltar para página de montar boleto

## Versão 80 adicionado botão para cadastrar dados do cliente na f2b e um botão voltar quando desativar o cliente e não quiser gravar na f2b o boleto

## Versão 81 adicionando paginação na página cliente
## versão 82 botao da paginação começando a funcionar

## Versão 83 o botão finalizar deixou de existir e o boleto passou a ser finalizado no momento de envio

## Versão 84 botão cadastro de um boleto no boletoapi

## Versão 85 botão cadastrar cliente passar a enviar a razão social para f2b

## Versão 86 quando envia o boleto o cadastra na api f2b, e o status boleto sendo modificado, a consulta na página doo cliente passou a ser por cnpj, implemetando paginação a página de consulta de boletos, na página cliente ações conjuntas para os clientes selecionados

## Versão 87 botão em envia boleto para excluir os boletos e checkbox, o campo de consulta de cliente passou a consultar em qualquer posição basta conter o que foi digitado

## Versão 88 geraboleto só será possivel se o cliente estiver ativo, e o botão de gerar boleto só ficará ativo se o cliente estiver ativo, a ação de desativar e ativar cliente foi desmenbrada em ações em cliente selecionados, os boleto só poderão se enviado para f2b se existir o campo mês referente 

## Versão 89 basic token deixou de ser salvo no localstorage, correção do boleto que estava sendo salvo com status ativo e aparecendo no boletoapi

## v- 90 foi corrigido a rota de atualizar o cadastro do boleto quando chega registrado, foi acrescentado campos na página de desativar para gravar na f2b

## v -91 corrigido o retorno dos boletos, o parceiro estava sem retorno do dados foi corrigido

## v- 92 Criado as seguintes funções: rota alternativa para permitir que o cliente acesse via url, registro de login url e senha, componente de configurações esta sendo implementado o retorno do registro dos login, tabela de cadastro do contador no banco, cadastro do contador no front.

## v- 93 Criação do botão para permitir acesso aos clientes aos seus boletos no pesquisa clientes

## v- 94 busca por cnpj funcionando via url, cadastro de basic na hora de cadastrar o cliente 

## v- 95 corrigido o limpar aos ids depois de executar as funções conjuntas da página de clientes, adicionado um botão para baixar os arquivos xml para teste em dash adm

## v- 96 mudança da url para https, para possibilitar baixar os arquivos fiscais

## v - 97 acrescentado pasta public na raiz do projeto para baixar os arquivos ficais

## v- 99 Foi retirado o pesquisa boleto e ajustado a tabela para retirar a segunda-via

## v- 98 acrescentado em arquivos fiscais, uma tabela com os arquivos ficais do cliente mapeados pelo cnpj, e acrescido em na api uma rota para listar todos arquivos ficais. 

## V- 100 ACRESCENTADO DASHBOARD CONTADOR, PESQUISA DE ARQUIVOS DOS SEUS CLIENTES, CONTADOR BAIXAR OS ARQUIVOS.

## v- 101 valor retornando do banco

## v- 102 Razão social sendo enviada para f2b

## v-103 criado log de erro na api para gravar dentro de um txt

## v-104 correção das urls do cliente, do contador, 

## v- 105 Ajustando urls e bugs na consulta do boleto do cliente

## v - 106 configurações para alterar a mensalidade quando mudar o salário corrente, adicionado resposta de erro quando cria um usuário

## v - 107 corrigindo consulta dos boletos na f2b

## v - 108 corrigindo consulta boleto pela url

## v- 109 ajustando paginação, tirando bloqueio automatico

## v- 110 quantidade de boletos gerados em boletos

## v- 111 ajustando recarregamento da página de pesquisa cliente, adicionando a contagem dos boletos gerados mensal e geral

## v - 112 Página de pesquisa cliente recarregando no local atual e sem reload

## v - 113 Modificado o pagination página pesquisa de boletos, acrescentado table para registrar os ultimos ips logados, confirmar com Francisco e Evaldo na tela do cliente 

## V - 114 PESQUISA CLIENTE PARCEIRO O SEARCH PASSOU A FUNCIONAR, FOI ACRESCENTADO O BOTÃO DE CADASTRO NA F2B PARA O CLIENTE E QUANDO O CLIENTE ESTÁ DESATIVADO O BOTÃO DE GERAR BOLETO NÃO APARECE

## v  - 115 PesquisaCLienteParceiro foi adicionado novas funcionalidades, paginação, adicionado mensagem de erro quando logar na aplicação

## v - 116 Corrigindo css menu, gráfico de consulta por cidade consultando somente cliente ativos na aplicação

## v - 117 Adicionando novos gráficos no dashboard parceiro e adm, mudado o texto de informações para icones no dash adm

## v -118 Adicionando funcionalidades de somar o total de boletos que estão sendo gerados e o total de seus valores, acrescentando a pesquisa de clientes com boleto gerados por nome e cnpj

## v -119 Remodelando a paginação da página de pesquisa de cliente, com opção de escolher a quantidade de clientes por página de pesquisa, o botão para realizar ações em conjunto foi adicionado a palavra cliente, viewcliente foi adicionado os campos para ver data de vencimento e data implantação

## v- 120 Pesquisa cliente mais implementação em paginação e o botão de ações so aparecerá quando selecionar um cliente no checkebox

## v- 121 Valor do salario vindo do banco, recarregamento da tela pesquisa cliente modificado, alter a senha usuário dentro de configurações 

## v- 122 Implementação de troca de senha tanto em configurações, quanto na pesquisa de usuários, divisão de serviço na página de configurações, paginação em boletos.

## v- 123 Verificação se a senha que foi digitada é igual para enviar para o banco de dados, paginação em boletos so aparecer quando for feito uma consulta, aparecimento do mês na quantidade de boletos gerados, corrigido no cadastramento do cliente o bug de inserção de valores, configurações foram separadas as trocas de senha, troca de salário, configurações de sistema da f2b.

## v- 124 Correção de bugs na criação de parceiros para pesquisa de seus clientes, botão de ações conjuntas no boleto api so aparecer quando for selecionados os boletos, aparecimento dos acessos a aplicação aparecer so quando for solicitado em configurações

## v-125 Acrescentado o valor editado e percentual editado no edit cliente

## v-126 Adicionado botão para excluir todos os boletos gerados incorretamente, como também a data que o boleto foi gerado foi acrescentado na tabela 

## v - 127 Mudança dos botões de gerar boleto, inseridos titulos nas páginas, e corrigido o bug da data do boleto