const INTERNAL_SERVER_ERROR_MESSAGE = "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...";
const INVALID_PARAMS  = 'Os parâmetros da requisição são inválidos ou não estão no formato correto.';
const UNKNOWN_ERROR =  'Problemas durante o processamento da cobrança. Contate a equipe de suporte! (SCR001)';
const ROBOT_ACTION_PERFORMED = 'Reconhecemos sua navegação como suspeita, em decorrência disso você não será capaz de prosseguir para o pagamento. Entre em contato conosco para sanar qualquer dúvida.';
module.exports = {
    INTERNAL_SERVER_ERROR_MESSAGE,
    INVALID_PARAMS,
    UNKNOWN_ERROR,
    ROBOT_ACTION_PERFORMED,
    AUTHENTICATION_ERROR: 'Acesso negado. Você não tem permissão para prosseguir com essa solicitação',
    INTERNAL_SERVER_ERROR: 'Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...',
    INVALID_PASSWORD: 'Senha incorreta',
};
