'use strict'

module.exports.NATIONAL_TRANSACTION_AUTHORIZED_WITH_SUCCESS =  {
    description: 'Transação Nacional Autorizada com sucesso',
    action: '',
};

module.exports.TRANSACTION_REFER_BY_EMITTER = {
    description: 'Transação referida pelo emissor',
    action: 'Oriente o portador a contatar o emissor do cartão',
}

module.exports.NOT_FOUND_TRANSACTION = {
    description: 'Não foi encontrada a transação',
    action: 'Este erro pode ser: * número de parcelas ultrapassa o permitido. * nódigo de segurança inválido. * número do cartão inválido. * instabilidade no sistema da adquirente.',
}

module.exports.RESTRICTION_ON_CARD = {
    description: 'Cartão com restrição',
    action: 'Oriente o portador a contatar o emissor do cartão (Problemas com o cartão)',
};

module.exports.TRANSACTION_NOT_AUTHORIZED = {
    description: 'Transação não autorizada',
    action: 'Oriente o portador a contatar o emissor do cartão (não autorizada pelo emissor)',
};

module.exports.TRY_AGAIN =  {
    description: 'Tente novamente',
    action: 'Problemas ocorridos na transação eletrônica, instabilidade da adquirente.',
};

module.exports.SECURITY_CODE_INVALID = {
    description: 'Código de segurança inválido',
    action: 'O código de segurança foi informado errado no momento da compra',
};

module.exports.NOT_AVAILABLE_SENT_CART = {
    description: 'Não é permitido o envio do cartão',
    action: 'Adquirente está com os serviços instáveis, caso o erro continue ocorrendo entre em contato com nosso suporte técnico',
};

module.exports.INTERNATIONAL_TRANSACTION_AUTHORIZED = {
    description: 'Transação Internacional Autorizada com sucesso',
    action: '',
};

module.exports.INVALID_TRANSACTION = {
    description: 'Transação inválida',
    action: 'Venda não autorizada pelo banco emissor do cartão. Cartão informado no momento da compra está incorreto',
};

module.exports.INVALID_VALUE = {
    description: 'Valor inválido',
    action: 'Verifique valor mínimo de R$5,00 para parcelamento',
};

module.exports.INVALID_CREDIT_CARD = {
    description: 'Cartão inválido',
    action: '',
};

module.exports.INVALID_EMITTER = {
    description: 'Emissor inválido',
    action: 'Emissor sem comunicação.',
};

module.exports.MUST_REMAKE_TRANSACTION_AGAIN = {
    description: 'Refaça a transação ou tente novamente mais tarde.',
    action: 'Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde.',
};

module.exports.WAS_NOT_CANCELED = {
    description: 'Cancelamento não efetuado.',
    action: 'Não foi possível processar o cancelamento.',
};

module.exports.INVALID_INSTALLMENTS = {
    description: 'Parcelamento inválido. Número de parcelas inválidas.',
    action: 'Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados.',
}

module.exports.INVALID_AMOUNT_INSTALLMENTS = {
    description: 'Quantidade de parcelas inválido',
    action: 'Não foi possível processar a transação. Quantidade de parcelas inválido',
};

module.exports.TRANSACTION_UNPROCESSED = {
    description: 'Não foi possível processar a transação. Solicite ao portador que reveja os dados e tente novamente.',
    action: 'Não foi possível processar a transação. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a loja virtual.',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_ERROR_ON_EMITTER_AGENT = {
    description: 'Transação não autorizada. Erro no banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
};

module.exports.INSUFFICIENT_FUNDS = {
    description: 'Saldo insuficiente',
    action: 'Cliente deve entrar em contato com o banco',
};

module.exports.EXPIRED_CARD = {
    description: 'Cartão vencido',
    action: 'Caso os dados informados estejam corretos, cliente deve entrar em contato com o banco para verificar se cartão ainda é valido',
}

module.exports.INVALID_PASSWORD = {
    description: 'Senha Inválida',
    action: 'Senha informada está errada',
}

module.exports.TRANSACTION_NOT_AUTHORIZED_OR_PERMITTED = {
    description: 'Transação não permitida ou não autorizada',
    action: 'Venda não autorizada pelo emissor do cartão, pois o cartão utilizado não faz parte da rede  Verified by Visa ou o sistema de prevenção do banco não autorizou a compra, neste caso o cliente deverá realizar contato com banco emissor do cartão e informar que está tentando realizar uma compra no valor R$XXX e não está sendo autorizada.',
};

module.exports.TRANSACTION_NOT_PERMITTED = {
    description: 'Transação não permitida',
    action: '',
}

module.exports.UNAVAILABLE_AGENT_EMITTER = {
    description: 'Banco emissor Visa indisponível.',
    action: 'Transação não autorizada. Tente novamente. Se o erro persistir, entre em contato com seu banco emissor.',
};

module.exports.LIMIT_EXCEEDED = {
    description: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
};

module.exports.CARD_NOT_BLOCKED_BY_OWNER = {
    description: 'Cartão não foi desbloqueado pelo portador',
    action: 'Cartão bloqueado. Oriente o portador a desbloqueá-lo junto ao emissor do cartão.',
};

module.exports.TRANSACTION_DENIED = {
    description: 'Transação negada',
    action: '',
};

module.exports.TRANSACTION_NOT_PERMITTED_WITH_FAIL = {
    description: 'Transação não permitida. Falha da operação',
    action: 'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão.',
};

module.exports.ERROR_ON_TRANSACTION = {
    description: 'Erro na transação.',
    action: 'Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.',
};

module.exports.UNAVAILABLE_BANK = {
    description: 'Banco indisponível',
    action: 'Emissor sem comunicação. Oriente cliente a aguardar alguns minutos e tente novamente.',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_TIME_EXCEEDED = {
    description: 'Transação não autorizada. Tempo de comunicação excedido',
    action: 'Transação não autorizada. Tempo de comunicação excedido',
};

module.exports.SYSTEM_UNAVAILABLE = {
    description: 'Sistema do banco temporariamente fora de operação.',
    action: 'Tente novamente mais tarde',
};

module.exports.TIME_EXCEEDED = {
    description: 'Tempo Excedido',
    action: 'Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.',
};

module.exports.DEBIT_CARD_USED_AS_CREDIT_CARD = {
    description: 'Cartão de débito sendo usado com crédito.',
    action: 'Cartão de débito sendo usado com crédito. Portador deve usar um cartão de Crédito',
};

module.exports.TRY_LATER = {
    description: 'Tente Mais Tarde',
    action: 'Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_AUTHENTICATION_NOT_DOES = {
    description: 'Transação não autorizada. Autenticação não foi realizada.',
    action: 'Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação.',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_INVALID_DATA =  {
    description: 'Transação não autorizada. Dados Inválidos',
    action: 'Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.',
};

module.exports.TRANSACTION_NOT_PERMITTED_DAILY_LIMIT_EXCEEDED = {
    description: 'Transação não autorizada. Limite diário excedido.',
    action: 'Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_CARD_OR_ACCOUNT_HAS_BEEN_BLOCKED = {
    description: 'Transação não autorizada. Cartão ou conta bloqueado.',
    action: 'Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com seu banco emissor.',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_VALIDATION_FAIL = {
    description: 'Transação não autorizada. Falha na validação dos dados.',
    action: 'Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.',
};

module.exports.NOT_PERMITTED_TRANSACTION_INSTALLMENTS_VALUE_TOO_SMALL = {
    description: 'Transação não permitida. Valor da parcela inferior ao mínimo permitido.',
    action: 'Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.',
};

module.exports.NOT_AUTHORIZED_TRANSACTION_AMEX = {
    description: 'Transação não autorizada',
    action: 'Transação não autorizada AMEX',
};

module.exports.TRANSACTION_NOT_AUTHORIZED_CALL_TO_EMITTER = {
    description: 'Transação não autorizada. Ligue Emissor',
    action: 'Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.',
};
