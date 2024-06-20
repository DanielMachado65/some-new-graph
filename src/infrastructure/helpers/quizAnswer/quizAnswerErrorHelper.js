'use strict';

module.exports.errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg:
                    'Os parâmetros da requisição são inválidos ou não estão no formato correto.',
            };
        case 'CREATE_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    'Não foi possível salvar as repostas do Quiz. Por favor, tente novamente.',
            };
        case 'UPDATE_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    'Não foi possível atualizar os dados da resposta do Quiz. Por favor, tente novamente.',
            };
        case 'GET_QUIZ_ANSWER_BY_EMAIL_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    'Não foi possível buscar as repostas do Quiz pelo e-mail. Por favor, verifique o e-mail informado e tente novamente',
            };
        case 'GET_QUIZ_ANSWER_BY_QUIZ_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    'Não foi possível buscar as respostas do Quiz pelo ID. do Quiz respondido Por favor, verifique o ID informado e tente novamente',
            };
        case 'GET_ALL_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Não foi possível buscar todas as repostas do Quiz.',
            };
        case 'INVALID_HITS_NUMBER_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Número de acertos maior que o número de respostas.',
            };
        case 'INVALID_QUESTION_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Pergunta Inválida.',
            };
        case 'INVALID_ANSWERS_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Respostas do Quiz inválidas',
            };
        case 'INVALID_RIGHT_ANSWER_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Resposta correta inválida',
            };
        case 'INVALID_EXPLANATION_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Explicação inválida',
            };
        case 'INVALID_IMAGE_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Imagem inválida',
            };
        case 'INVALID_USER_ANSWER_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Resposta do usuário inválida',
            };
        case 'VALIDATION_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    'Não foi possível validar os dados das respostas do Quiz. Por favor verifique-as e tente novamente.',
            };
        case 'VALIDATE_EMAIL_QUIZ_ANSWER_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: 'Não possível validar o e-mail para responder o quiz',
            };
        default:
            return {
                status: ResponseStatusEnum(500),
                msg: 'Internal Server Error',
            };
    }
};
