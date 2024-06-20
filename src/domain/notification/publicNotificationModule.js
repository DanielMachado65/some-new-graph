'use strict';

const { MNotification } = require('mongoose').models;
const PublicNotificationTypesEnum = require('../../infrastructure/dictionaries/PublicNotificationTypesEnum');

const createNew = async (data) => {
    if (data) {
        let objectEnum = PublicNotificationTypesEnum(data.type);
        let obj = {
            type: objectEnum.type,
            icon: objectEnum.IconCssClass,
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            redirectTo: data.redirectTo,
            redirectBlog: data.redirectBlog,
        };
        await MNotification.create(obj);
    }
};

const getLastsNotifications = async () => {
    await MNotification.updateMany({}, { $set: { visualized: true } });
    return MNotification.find({}).sort({ createAt: -1 }).limit(5).lean();
};

const getAll = async () => {
    return MNotification.find({}).sort({ createAt: -1 }).lean();
};

const deleteById = async (id) => {
    return MNotification.deleteOne({ _id: id });
};

const removeAll = async () => {
    return MNotification.deleteMany({});
};

module.exports = {
    createNew,
    getLastsNotifications,
    deleteById,
    removeAll,
    getAll,
};
