const ErrorHandler = require('../../../../infrastructure/helpers/Error.helper');
const ArrayUtil = require('../../../../infrastructure/utils/array.util');

const getAnnouncementsData = (query) => {
    if (query && query.responseJSON) {
        const response = query.responseJSON;
        if (response.anuncio.data && response.anuncio.placa) {
            return response.anuncio;
        }
        if (response.historicoAnuncios.length) {
            const anuncio = ArrayUtil.getLastElement(
                response.historicoAnuncios,
            );
            return {
                data: anuncio.data,
                placa: anuncio.placa,
            };
        } else {
            throw ErrorHandler.NotFoundException(
                'Nao foi encontrado os dados necessarios para deletar o anuncio',
            );
        }
    }
    throw ErrorHandler.NotFoundException('Nao possui responseJSON na consulta');
};

module.exports = {
    getAnnouncementsData,
};
