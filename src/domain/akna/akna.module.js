'use strict';

const aknaService = require('../../infrastructure/services/akna/aknaService');
const _ = require('lodash');
const parseString = require('xml2js').parseString;

function htmlSanitize(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const getUserDataFromList = async (listTitle, email) => {
    let data = await aknaService.getUserDataFromList(listTitle, email);
    let response = { status: null, data: null };
    let obj = null;
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].CONTATO) {
                    let resp = jsonData.MAIN.EMKT[0].CONTATO[0];
                    obj = {
                        code: resp.$ && resp.$.CODIGO ? resp.$.CODIGO : null,
                        activity: resp.ATIVIDADE ? resp.ATIVIDADE[0] : null,
                        celphone: resp.CELULAR ? resp.CELULAR[0] : null,
                        zipcode: resp.CEP ? resp.CEP[0] : null,
                        city: resp.CIDADE ? resp.CIDADE[0] : null,
                        cpf: resp.CPF ? resp.CPF[0] : null,
                        birthDate: resp.DATA_NASCIMENTO
                            ? resp.DATA_NASCIMENTO[0]
                            : null,
                        email: resp.EMAIL ? resp.EMAIL[0] : null,
                        company: resp.EMPRESA ? resp.EMPRESA[0] : null,
                        address: resp.ENDERECO ? resp.ENDERECO[0] : null,
                        state: resp.ESTADO ? resp.ESTADO[0] : null,
                        fax: resp.FAX ? resp.FAX[0] : null,
                        age: resp.IDADE ? resp.IDADE[0] : null,
                        type: resp.INFOADC1 ? resp.INFOADC1[0]._ : null,
                        acessionDate: resp.INFOADC2 ? resp.INFOADC2[0]._ : null,
                        cnpj: resp.INFOADC3 ? resp.INFOADC3[0]._ : null,
                        socialName: resp.INFOADC4 ? resp.INFOADC4[0]._ : null,
                        name: resp.NOME ? resp.NOME[0] : null,
                        country: resp.PAIS ? resp.PAIS[0] : null,
                        profession: resp.PROFISSAO ? resp.PROFISSAO[0] : null,
                        gender: resp.SEXO ? resp.SEXO[0] : null,
                        phoneNumber1: resp.TELEFONE1 ? resp.TELEFONE1[0] : null,
                        phoneNumber2: resp.TELEFONE2 ? resp.TELEFONE2[0] : null,
                        phoneNumber3: resp.TELEFONE3 ? resp.TELEFONE3[0] : null,
                        typeAddress: resp.TIPOEND ? resp.TIPOEND[0] : null,
                    };
                    response.status = 'ok';
                    response.data = obj;
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = null;
                    response.status = resp._;
                }
            }
        });
    }
    return response;
};

const getLists = async () => {
    let data = await aknaService.getLists();
    let response = { status: null, data: null };
    let lists = [];
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].LISTA) {
                    let resp = jsonData.MAIN.EMKT[0].LISTA;
                    _.forEach(resp, (o) => {
                        let obj = {
                            name: o._ ? o._ : null,
                            listId: o.$.ID ? parseInt(o.$.ID) : null,
                            active: o.$.ARQUIVADA === 'N' ? true : false,
                            validUsers: o.$.CONTATOS_VALIDOS
                                ? parseInt(o.$.CONTATOS_VALIDOS)
                                : null,
                            index: o.$.INDICE ? o.$.INDICE : null,
                        };
                        lists.push(obj);
                    });
                    response.data = lists;
                    response.status = 'ok';
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = null;
                    response.status = resp._;
                }
            }
        });
    }
    return response;
};

const importUserToList = async (user) => {
    let response = { status: null, data: null };
    if (!user.listName) {
        response.status = 'Obrigatório o nome da lista.';
        return response;
    }
    let data = await aknaService.importUserToList(user);
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (
                    jsonData.MAIN.EMKT[0].RETURN &&
                    jsonData.MAIN.EMKT[0].RETURN[0].$.ID === '00'
                ) {
                    response.status = 'ok';
                    response.data = user;
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = null;
                    if (jsonData.MAIN.EMKT[0].RETURN[0].$.ID === '99')
                        response.status = resp._;
                    else if (resp.EMAIL_INVALIDO)
                        response.status = resp.EMAIL_INVALIDO[0]._;
                    else
                        response.status =
                            'Erro ao adicionar usuário em uma lista';
                }
            }
        });
    }
    return response;
};

const getAllTransactionalActions = async () => {
    let data = await aknaService.getAllTransactionalActions();
    let response = { status: null, data: null };
    let actions = [];
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].ACAO) {
                    let resp = jsonData.MAIN.EMKT[0].ACAO;
                    _.forEach(resp, (o) => {
                        let obj = {
                            actionName: o._ ? o._ : null,
                            actionId: o.$.ID ? parseInt(o.$.ID) : 0,
                        };
                        actions.push(obj);
                    });
                    response.data = actions;
                    response.status = 'ok';
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = null;
                    response.status = resp._;
                }
            }
        });
    }
    return response;
};

const createTransactionalAction = async (transactionalAction) => {
    let data = await aknaService.createTransactionalAction(transactionalAction);
    let response = { status: null, data: null };
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (
                    jsonData.MAIN.EMKT[0].RETURN &&
                    jsonData.MAIN.EMKT[0].RETURN[0].$.ID === '00'
                ) {
                    response.data = transactionalAction;
                    response.status = 'ok';
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = resp._;
                }
            }
        });
    }
    return response;
};

const mailSenderTestAction = async (testAction) => {
    let data = await aknaService.mailSenderTestAction(testAction);
    let response = { status: null, data: null };
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (
                    jsonData.MAIN.EMKT[0].RETURN &&
                    jsonData.MAIN.EMKT[0].RETURN[0].$.ID === '00'
                ) {
                    response.data = null;
                    response.status = 'ok';
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = resp._;
                }
            }
        });
    }
    return response;
};

const getTotalsAction = async (actionTitle) => {
    let data = await aknaService.getTotalsAction(actionTitle);
    let response = { status: null, data: null };
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].CAMPANHA) {
                    let _campanha = jsonData.MAIN.EMKT[0].CAMPANHA[0];
                    let _errors = [];
                    if (_campanha.ERRO) {
                        _campanha.ERRO.forEach((o) => {
                            let errorObj = {
                                errorName: null,
                                total: null,
                            };
                            errorObj.errorName = o.TITULO[0];
                            errorObj.total =
                                o.TOTAL[0] != '\n        '
                                    ? parseInt(o.TOTAL[0])
                                    : 0;
                            _errors.push(errorObj);
                        });
                    }
                    let obj = {
                        totalRecipients:
                            _campanha.TOTALDESTINATARIOS[0] != '\n      '
                                ? parseInt(_campanha.TOTALDESTINATARIOS[0])
                                : 0,
                        totalSends:
                            _campanha.TOTALENVIADO[0] != '\n      '
                                ? parseInt(_campanha.TOTALENVIADO[0])
                                : 0,
                        totalDelivered:
                            _campanha.TOTALENTREGUE[0] != '\n      '
                                ? parseInt(_campanha.TOTALENTREGUE[0])
                                : 0,
                        totalErrors:
                            _campanha.TOTALERROS[0] != '\n      '
                                ? parseInt(_campanha.TOTALERROS[0])
                                : 0,
                        totalVisualized:
                            _campanha.TOTALVISUALIZACAO[0] != '\n      '
                                ? parseInt(_campanha.TOTALVISUALIZACAO[0])
                                : 0,
                        totalIndications:
                            _campanha.TOTALINDICACOES[0] != '\n      '
                                ? parseInt(_campanha.TOTALINDICACOES[0])
                                : 0,
                        totalRemotions:
                            _campanha.TOTALREMOCOES[0] != '\n      '
                                ? parseInt(_campanha.TOTALREMOCOES[0])
                                : 0,
                        totalClicks:
                            _campanha.TOTALCLICKS[0] != '\n      '
                                ? parseInt(_campanha.TOTALCLICKS[0])
                                : 0,
                        errors: _errors,
                    };
                    response.data = obj;
                    response.status = 'ok';
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = resp._;
                }
            }
        });
    }
    return response;
};

const actionInformation = async (actionTitle) => {
    let data = await aknaService.actionInformation(actionTitle);
    let response = { status: null, data: null };
    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].ACAO) {
                    let _acao = jsonData.MAIN.EMKT[0].ACAO[0];
                    let obj = {
                        interestArea: _acao.AREA_INTERESSE
                            ? _acao.AREA_INTERESSE[0]
                            : null,
                        subject: _acao.ASSUNTO ? _acao.ASSUNTO[0] : null,
                        contacts: {
                            totalSender: _acao.CONTATOS[0].ENVIADO[0]
                                ? parseInt(_acao.CONTATOS[0].ENVIADO[0])
                                : 0,
                            total: _acao.CONTATOS[0].TOTAL[0]
                                ? parseInt(_acao.CONTATOS[0].TOTAL[0])
                                : 0,
                        },
                        createAt: _acao.CRIACAO[0],
                        sendDate: _acao.ENVIO ? _acao.ENVIO[0] : null,
                        message: {
                            html: _acao.MENSAGEM[0].HTML[0]
                                ? _acao.MENSAGEM[0].HTML[0]
                                : null,
                            alternativeText: _acao.MENSAGEM[0]
                                .TEXTO_ALTERNATIVO[0]
                                ? _acao.MENSAGEM[0].TEXTO_ALTERNATIVO[0]
                                : null,
                            title: _acao.MENSAGEM[0].TITULO[0]
                                ? _acao.MENSAGEM[0].TITULO[0]
                                : null,
                        },
                        sender: {
                            name:
                                _acao.REMETENTE[0].NOME[0] != '\n        '
                                    ? _acao.REMETENTE[0].NOME[0]
                                    : null,
                            email: _acao.REMETENTE[0].EMAIL[0]
                                ? _acao.REMETENTE[0].EMAIL[0]
                                : null,
                            returnEmail: _acao.REMETENTE[0].RETORNO[0]
                                ? _acao.REMETENTE[0].RETORNO[0]
                                : null,
                        },
                        title: _acao.TITULO[0] ? _acao.TITULO[0] : null,
                    };
                    response.data = obj;
                    response.status = 'ok';
                } else {
                    let resp = jsonData.MAIN.EMKT[0].RETURN[0];
                    response.data = resp._;
                }
            }
        });
    }
    return response;
};

const addInterestedArea = async (nameArea) => {
    let data = await aknaService.addInterestedArea(nameArea);
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0].RETURN[0]._;
                response.status = resp;
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const deleteInterestedArea = async (nameArea) => {
    let data = await aknaService.deleteInterestedArea(nameArea);
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0].RETURN[0]._;
                response.status = resp;
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const listAllInterestedArea = async () => {
    let data = await aknaService.listAllInterestedArea();
    let interestedAreas = [];
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].CATEGORIA) {
                    let resp = jsonData.MAIN.EMKT[0].CATEGORIA[0].DESCRICAO;

                    _.forEach(resp, (o) => {
                        let obj = {
                            name: o._ ? o._ : null,
                            code: o.$.CODIGO ? parseInt(o.$.CODIGO) : null,
                        };
                        interestedAreas.push(obj);
                    });
                }
            }
        });
        response.data = interestedAreas;
        response.status = 'Ok';
    } else {
        response.status = 'Error';
    }

    return response;
};

const updateInterestedArea = async (name, newName) => {
    let data = await aknaService.updateInterestedArea(name, newName);
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0].RETURN[0]._;
                response.status = resp;
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const createNewMessage = async (message) => {
    message.html = htmlSanitize(message.html);

    let data = await aknaService.createNewMessage(message);
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0].RETURN[0]._;
                response.status = resp;
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const listAllMessage = async () => {
    let data = await aknaService.listAllMessage();
    let messages = [];
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].MENSAGEM) {
                    let resp = jsonData.MAIN.EMKT[0].MENSAGEM;

                    _.forEach(resp, (o) => {
                        let obj = {
                            title: o.TITULO[0] ? o.TITULO[0] : null,
                            date: o.DATA[0] ? o.DATA[0] : null,
                        };
                        messages.push(obj);
                    });
                }
            }
        });
        response.data = messages;
        response.status = 'Ok';
    } else {
        response.status = 'Error';
    }

    return response;
};

const getMessage = async (title) => {
    let data = await aknaService.getMessage(title);
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0];
                if (resp.RETURN) {
                    response.status = resp.RETURN[0]._;
                } else {
                    response.status = 'Ok';

                    let resp = jsonData.MAIN.EMKT[0].MENSAGEM[0];

                    let obj = {
                        title: resp.TITULO[0] ? resp.TITULO[0] : null,
                        date: resp.DATA[0] ? resp.DATA[0] : null,
                        html: resp.HTML[0] ? resp.HTML[0] : null,
                        alternativeText: resp.TEXTO_ALTERNATIVO[0]
                            ? resp.TEXTO_ALTERNATIVO[0]
                            : null,
                    };
                    response.data = obj;
                }
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const shootTransactionalAction = async (users, actionName) => {
    let data = await aknaService.shootTransactionalAction(users, actionName);
    let response = {
        status: null,
        data: {
            invalidEmails: null,
            insertFailed: null,
        },
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0].RETURN[0]._;
                response.status = resp;
                if (jsonData.MAIN.EMKT[0].RETURN.length >= 2) {
                    if (jsonData.MAIN.EMKT[0].RETURN[1].EMAIL_INVALIDO) {
                        resp = jsonData.MAIN.EMKT[0].RETURN[1].EMAIL_INVALIDO;
                        let emails = [];
                        _.forEach(resp, (o) => {
                            emails.push(o._);
                        });
                        response.data.invalidEmails = emails;
                    }
                    if (jsonData.MAIN.EMKT[0].RETURN[1].FALHA_INSERIR) {
                        resp = jsonData.MAIN.EMKT[0].RETURN[1].FALHA_INSERIR;
                        let emails = [];
                        _.forEach(resp, (o) => {
                            emails.push(o._);
                        });
                        response.data.insertFailed = emails;
                    }
                }
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const shootTransactionalActionSMSCorporate = async (
    sender,
    phones,
    message,
) => {
    let data = await aknaService.shootTransactionalActionSMSCorporate(
        sender,
        phones,
        message,
    );
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                let resp = jsonData.MAIN.EMKT[0].RETURN[0]._;

                if (resp.indexOf(' ') > -1) {
                    //it's not a code
                    response.status = resp;
                } else {
                    response.status = 'Ok';
                    response.data = resp;
                }
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const verifyStatusSent = async (code) => {
    let data = await aknaService.verifyStatusSent(code);
    let sms = [];
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].RETURN) {
                    response.status = jsonData.MAIN.EMKT[0].RETURN[0]._;
                } else if (jsonData.MAIN.EMKT[0].SMS) {
                    let resp = jsonData.MAIN.EMKT[0].SMS;

                    _.forEach(resp, (o) => {
                        let obj = {
                            status: o.STATUS[0] ? o.STATUS[0] : null,
                            phone: o.TELEFONE[0] ? o.TELEFONE[0] : null,
                        };
                        sms.push(obj);
                    });
                    response.status = 'Ok';
                    response.data = sms;
                }
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const verifyRecipientResponse = async (code) => {
    let data = await aknaService.verifyRecipientResponse(code);
    let sms = [];
    let response = {
        status: null,
        data: null,
    };

    if (data) {
        parseString(data, (err, jsonData) => {
            if (err) {
                response.status = 'error';
            } else {
                if (jsonData.MAIN.EMKT[0].RETURN) {
                    response.status = jsonData.MAIN.EMKT[0].RETURN[0]._;
                } else if (jsonData.MAIN.EMKT[0].SMS) {
                    let resp = jsonData.MAIN.EMKT[0].SMS;

                    _.forEach(resp, (o) => {
                        let obj = {
                            message: o.MENSAGEM[0] ? o.MENSAGEM[0] : null,
                            phone: o.TELEFONE[0] ? o.TELEFONE[0] : null,
                            date: o.DATA_RECEBIMENTO[0]
                                ? o.DATA_RECEBIMENTO[0]
                                : null,
                        };
                        sms.push(obj);
                    });
                    response.status = 'Ok';
                    response.data = sms;
                }
            }
        });
    } else {
        response.status = 'Error';
    }

    return response;
};

const invalidEmailsAction = async (actionTitle) => {
    //@todo module do william
};

module.exports = {
    getUserDataFromList,
    getLists,
    importUserToList,
    getAllTransactionalActions,
    createTransactionalAction,
    mailSenderTestAction,
    getTotalsAction,
    actionInformation,
    addInterestedArea,
    deleteInterestedArea,
    listAllInterestedArea,
    updateInterestedArea,
    createNewMessage,
    listAllMessage,
    getMessage,
    shootTransactionalAction,
    shootTransactionalActionSMSCorporate,
    verifyStatusSent,
    verifyRecipientResponse,
};
