const getFirstNElements = (array = [], position) => {
    return array.slice(0, position);
};

const getLastNElements = (array = [], position) => {
    return array.slice(-position);
};

const getLastElement = (array = []) => {
    return array[array.length - 1];
};

const sumBy = (arr, func) => {
    let sum = new Decimal(0);
    arr.map(func).forEach((item) => (sum = sum.plus(item)));
    return sum.todp(DEFAULT_DECIMAL_PLATES).toNumber();
};

function getArrayOfSpecificFieldFromArray(array, key) {
    return Array.isArray(array) && array.map((item) => item[key]);
}

module.exports = {
    getFirstNElements,
    getLastNElements,
    getLastElement,
    sumBy,
    getArrayOfSpecificFieldFromArray,
};
