const publicNotificationModule = require('../../../domain/notification/publicNotificationModule');

const getAll = async () => {
    return await publicNotificationModule.getAll();
};

const createNew = async (data) => {
    return await publicNotificationModule.createNew(data);
};

const deleteById = async (id) => {
    return await publicNotificationModule.deleteById(id);
};

module.exports = {
    getAll,
    createNew,
    deleteById,
};
