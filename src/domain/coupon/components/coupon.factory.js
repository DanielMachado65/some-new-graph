const createCouponDto = ({ creator, couponName, rules, generator }) => ({
    creator,
    code: couponName.toUpperCase(),
    rules: {
        discountPercentage: rules.discountPercentage,
        discountValue: rules.discountValue,
        minValueToApply: rules.minValueToApply,
        expirationDate: rules.expirationDate
            ? new Date(rules.expirationDate)
            : null,
        limitUsage: rules.limitUsage
            ? rules.limitUsage
            : Number.MAX_SAFE_INTEGER,
        usageMaxToUser: rules.usageMaxToUser || 0,
        authorized: {
            queries:
                rules.authorized && rules.authorized.queries
                    ? rules.authorized.queries
                    : [],
            packages:
                rules.authorized && rules.authorized.packages
                    ? rules.authorized.packages
                    : [],
        },
    },
    generator: generator,
});

const response = () => {
    return {
        result: null,
        status: true,
        msg: null,
    };
};

const cartDto = (
    totalPrice,
    discountValue,
    totalPriceWithoutDiscount,
    couponId,
    queries,
    packages,
) => {
    return {
        coupon: couponId,
        discountValue: discountValue || 0,
        totalPriceWithoutDiscount: totalPriceWithoutDiscount || 0,
        totalPrice: totalPrice || 0,
        queries: [...queries],
        packages: [...packages],
        signatures: [],
    };
};

module.exports = {
    createCouponDto,
    cartDto,
    response,
};
