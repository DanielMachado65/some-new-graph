'use strict';

const { MPackage } = require('mongoose').models;

const createNew = async (obj) => {
    return MPackage.create(obj);
};

const getById = async (id) => {
    return MPackage.findOne({ _id: id }).select('-shelfLife');
};

const getEnables = async () => {
    return MPackage.find({ status: true }).select('-shelfLife');
};

const getBatchByIds = async (packagesIds) => {
    if (!packagesIds || !Array.isArray(packagesIds) || packagesIds.length === 0)
        return { result: [] };

    try {
        const prePackages = await MPackage.find({
            _id: { $in: packagesIds },
        }).lean();
        const hasAllPackages = prePackages.length === new Set(packagesIds).size;
        if (hasAllPackages) {
            const packages = packagesIds.map((packageId) => {
                return prePackages.find(
                    (prePackage) => prePackage._id.toString() === packageId,
                );
            });
            return { result: packages };
        } else {
            return {
                error: 'INVALID_PACKAGE_ERROR',
                data: { hasAllPackages },
            };
        }
    } catch (error) {
        const data =
            error instanceof Error
                ? { stack: error.stack, message: error.message }
                : error;
        return { error: 'UNKNOWN_PACKAGE_ERROR', data: data };
    }
};

const getByIds = async (packagesIds, projection = {}) =>
    MPackage.find({ _id: { $in: packagesIds } }, projection).lean();

module.exports = {
    createNew,
    getById,
    getByIds,
    getEnables,
    getBatchByIds,
};
