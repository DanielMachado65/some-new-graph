(function () {
    'use strict';

    const Q = require('q');
    const request = require('request-promise');

    const URL = 'http://app.akna.com.br/emkt/int/integracao.php';
    const USER = 'barbara@olhonocarro.com.br'; // "integracao@olhonocarro.com.br";//
    const PASSWORD = 'e2d2453425c25b4a7218b4df9b1e900e'; //"e10adc3949ba59abbe56e057f20f883e";//

    const createNewUser = async (user) => {
        let deferred = Q.defer();
        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <func trans="01.10">
                    <dados_usuario>
                        <email>${user.email}</email>
                        <nome>${user.name}</nome>
                        <senha>${user.pass}</senha>
                        <confirma_senha>${user.pass}</confirma_senha>
                        <equipe>${user.team}</equipe>
                        <cargo>${user.office}</cargo>
                        <documento>${user.cpf}</documento>s
                        <telefone>${user.phoneNumber}</telefone>
                        <tel_movel>${user.cellphoneNumber}</tel_movel>
                        <supervisor>${user.supervisor}</supervisor>
                        <acesso_nivel_inferior>${user.underAccess}</acesso_nivel_inferior>
                    </dados_usuario>
                    <seguranca>
                        <acesso_admin>${user.adminAccess}</acesso_admin>
                    </seguranca>
                </func>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const updateUser = async (user) => {
        let deferred = Q.defer();
        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
             <main>
                 <func trans="01.13">
                     <dados_usuario>
                         <email>${user.email}</email>
                         <nome>${user.name}</nome>
                         <senha>${user.pass}</senha>
                         <confirma_senha>${user.pass}</confirma_senha>
                         <equipe>${user.team}</equipe>
                         <cargo>${user.office}</cargo>
                         <documento>${user.cpf}</documento>s
                         <telefone>${user.phoneNumber}</telefone>
                         <tel_movel>${user.cellphoneNumber}</tel_movel>
                         <supervisor>${user.supervisor}</supervisor>
                         <acesso_nivel_inferior>${user.underAccess}</acesso_nivel_inferior>
                     </dados_usuario>
                     <seguranca>
                         <acesso_admin>${user.adminAccess}</acesso_admin>
                     </seguranca>
                 </func>
             </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const deleteUser = async (email) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <func trans="01.15">
                    <dados_usuario>
                        <email>${email}</email>
                    </dados_usuario>
                </func>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const createNewTeam = async (teamName) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <func trans="01.20">
                    <equipe>
                        <nome>${teamName}</nome>
                    </equipe>
                </func>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const listAllTeams = async () => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <func trans="01.22">
                </func>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log('done');
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                console.log('err');
                console.log('done');
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const udpateTeam = async (teamName, newTeamName) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <func trans="1.23">
                    <equipe>
                        <nome>${teamName}</nome>
                        <novo_nome>${newTeamName}</novo_nome>
                    </equipe>
                </func>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log('done');
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                console.log('err');
                console.log('done');
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const deleteTeam = async (teamName) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <func trans="1.25">
                    <equipe>
                        <nome>${teamName}</nome>
                    </equipe>
                </func>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log('done');
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                console.log('err');
                console.log('done');
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const getUserDataFromList = async (listTitle, email) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="11.01">
                    <lista>${listTitle}</lista>
                    <contato>${email}</contato>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const getLists = async () => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="11.02">
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const importUserToList = async (user) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="11.05">
                    <nome>${user.listName}</nome>
                    <destinatario>
                        <email>${user.email}</email>
                        <nome>${user.name}</nome>
                        <sexo>${user.gender}</sexo>
                        <idade>${user.age}</idade>
                        <data_nascimento>${user.birthDate}</data_nascimento>
                        <empresa>${user.company}</empresa>
                        <cpf>${user.cpf}</cpf>
                        <atividade>${user.activity}</atividade>
                        <profissao>${user.profession}</profissao>
                        <tipoend>${user.typeAddress}</tipoend>
                        <endereco>${user.address}</endereco>
                        <cidade>${user.city}</cidade>
                        <estado>${user.state}</estado>
                        <pais>${user.coutnry}</pais>
                        <cep>${user.zipcode}</cep>
                        <telefone1>${user.phoneNumber1}</telefone1>
                        <telefone2>${user.phoneNumber2}</telefone2>
                        <telefone3>${user.phoneNumber3}</telefone3>
                        <ceular>${user.cellphone}</ceular>
                        <fax>${user.fax}</fax>
                        <infoadc1>${user.type}</infoadc1>
                        <infoadc2>${user.acessionDate}</infoadc2>
                        <infoadc3>${user.cnpj}</infoadc3>
                        <infoadc4>${user.socialName}</infoadc4>
                    </destinatario>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const addInterestedArea = async (nameArea) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="12.05">
                    <categoria>
                        <nome>${nameArea}</nome>
                    </categoria>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const deleteInterestedArea = async (nameArea) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="12.20">
                    <categoria>
                        <nome>${nameArea}</nome>
                    </categoria>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const listAllInterestedArea = async () => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="12.50">
                    <categoria>
                        <nome>[TODAS]</nome>
                    </categoria>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const updateInterestedArea = async (name, newName) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="12.70">
                    <categoria>
                        <nome>${name}</nome>
                        <novo>${newName}</novo>
                    </categoria>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const createNewMessage = async (message) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="15.05">
                    <nome>${message.name}</nome>
                    <html>${message.html}</html>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const listAllMessage = async () => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="15.50">
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const getMessage = async (title) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="15.55">
                    <titulo>${title}</titulo>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const getAllTransactionalActions = async () => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.03">
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const createTransactionalAction = async (transactionalAction) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.04">
                    <nome>${transactionalAction.name}</nome>
                    <mensagem>${transactionalAction.message}</mensagem>
                    <usuario>barbara@olhonocarro.com.br</usuario>
                    <nome_remetente>${transactionalAction.senderName}</nome_remetente>
                    <email_remetente>${transactionalAction.senderEmail}</email_remetente>
                    <email_retorno>${transactionalAction.returnEmail}</email_retorno>
                    <assunto>${transactionalAction.subject}</assunto>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const schedulerActionSender = async (actionSender) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.06">
                    <titulo>${actionSender.name}</titulo>
                    <datahora>${actionSender.date}</datahora>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log('done');
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                console.log('err');
                console.log('done');
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const mailSenderTestAction = async (testAction) => {
        let deferred = Q.defer();

        let usersEmail = ``;
        testAction.emails.forEach((e) => {
            usersEmail += `
            <email>${e}</email>
            `;
        });

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.07">
                    <titulo>${testAction.name}</titulo>
                    <assunto_teste>${
                        testAction.subject ? 'S' : 'N'
                    }</assunto_teste>
                    ${usersEmail}
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const getStatisticActionByPeriod = async (startDate, endDate) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.10">
                    <datainicial>${startDate}</datainicial>
                    <datafinal>${endDate}</datafinal>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log('done');
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                console.log('err');
                console.log('done');
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition DATE');
            });
        return deferred.promise;
    };

    const getTotalsAction = async (actionTitle) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.11">
                    <titulo>${actionTitle}</titulo>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const usersViewedAction = async (actionTitle) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.31">
                    <titulo>${actionTitle}</titulo>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                console.log('done');
                console.log(resp);
                deferred.resolve(resp);
            })
            .catch((err) => {
                console.log('err');
                console.log('done');
                deferred.reject(err);
            })
            .finally(() => {
                console.log('finish requisition');
            });
        return deferred.promise;
    };

    const actionInformation = async (actionTitle) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.55">
                    <titulo>${actionTitle}</titulo>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const invalidEmailsAction = async (actionTitle) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="19.80">
                    <titulo>${actionTitle}</titulo>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    const shootTransactionalAction = async (users, actionName) => {
        let deferred = Q.defer();

        let emktBody = ``;
        users.forEach((element) => {
            emktBody += `
                <destinatario>
                    <nome>${element.name}</nome>
                    <email>${element.email}</email>
                </destinatario>
            `;
        });

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="20.05">
                    <acao>${actionName}</acao>
                    ${emktBody}
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const shootTransactionalActionSMSCorporate = async (
        sender,
        phones,
        message,
    ) => {
        let deferred = Q.defer();

        let emktBody = ``;
        phones.forEach((element) => {
            emktBody += `<sms>
                <telefone>${element}</telefone>
                <mensagem>${message}</mensagem>
            </sms>`;
        });

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="40.01">
                    <remetente>${sender}</remetente>
                    ${emktBody}
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const verifyStatusSent = async (code) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="40.02">
                    <sms>
                        <codigo>${code}</codigo>
                    </sms>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    const verifyRecipientResponse = async (code) => {
        let deferred = Q.defer();

        let formData = {
            User: USER,
            Pass: PASSWORD,
            XML: `<?xml version="1.0" encoding="UTF-8" ?>
            <main>
                <emkt trans="40.03">
                    <sms>
                        <codigo>${code}</codigo>
                    </sms>
                </emkt>
            </main>`,
        };

        request
            .post({ url: URL, formData: formData })
            .then((resp) => {
                deferred.resolve(resp);
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    module.exports = {
        createNewUser,
        updateUser,
        deleteUser,
        createNewTeam,
        listAllTeams,
        udpateTeam,
        deleteTeam,
        getUserDataFromList,
        getLists,
        importUserToList,
        addInterestedArea,
        deleteInterestedArea,
        listAllInterestedArea,
        updateInterestedArea,
        createNewMessage,
        listAllMessage,
        getMessage,
        getAllTransactionalActions,
        createTransactionalAction,
        schedulerActionSender,
        mailSenderTestAction,
        getStatisticActionByPeriod,
        getTotalsAction,
        usersViewedAction,
        actionInformation,
        invalidEmailsAction,
        shootTransactionalAction,
        shootTransactionalActionSMSCorporate,
        verifyStatusSent,
        verifyRecipientResponse,
    };
})();
