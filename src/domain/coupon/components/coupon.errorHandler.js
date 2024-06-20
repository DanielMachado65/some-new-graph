const {
    ContentAlreadyExists,
} = require('../../../infrastructure/helpers/Error.helper');
const {
    COUPON_MESSAGES: { COUPON_ALREADY_EXISTS_WITH_REMAIN_USAGE },
} = require('../../../infrastructure/constants/messagesHandler');

const couponAlreadyExist = (coupon) => {
    if (coupon) {
        throw ContentAlreadyExists(COUPON_ALREADY_EXISTS_WITH_REMAIN_USAGE);
    }
};

module.exports = {
    couponAlreadyExist,
};
