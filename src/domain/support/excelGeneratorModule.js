'use strict';

const excel = require('node-excel-export');
const _ = require('lodash');
const moment = require('moment');
const utils = require('../../infrastructure/utils/utils');

const styles = {
    headerDark: {
        fill: {
            fgColor: {
                rgb: 'FF000000',
            },
        },
        font: {
            color: {
                rgb: 'FFFFFFFF',
            },
            sz: 14,
            bold: true,
            underline: true,
        },
    },
    cellPink: {
        fill: {
            fgColor: {
                rgb: 'FFFFCCFF',
            },
        },
    },
    cellGreen: {
        fill: {
            fgColor: {
                rgb: 'FF00FF00',
            },
        },
    },
};

// const dataset = [
//   {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
//   {customer_name: 'HP', status_id: 0, note: 'some note'},
//   {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
// ]

// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
// const merges = [
//   { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
//   { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
//   { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
// ]

const generateCouponsXlsx = (
    dataCoupons,
    percentage,
    fixed,
    limit,
    minToApply,
    expirationDate,
) => {
    let heading = [
        [
            {
                value: 'Cupons de Desconto - #OlhoNoCarro',
                style: styles.cellGreen,
            },
            { value: '', style: styles.cellGreen },
            { value: '', style: styles.cellGreen },
            { value: '', style: styles.cellGreen },
            { value: '', style: styles.cellGreen },
            { value: '', style: styles.cellGreen },
        ],
    ];

    const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 6 } },
    ];

    let specification = {
        code: {
            // <- the key should match the actual data key
            displayName: 'Código', // <- Here you specify the column header
            headerStyle: styles.headerDark, // <- Header style
            cellStyle: styles.cellPink,
            width: 120, // <- width in pixels
        },
        percentage: {
            displayName: 'Desconto (%)',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                // <- Renderer function, you can access also any row.property
                return value ? value + '%' : '0%'; //(value == 1) ? 'Active' : 'Inactive';
            },
            width: 120, // <- width in chars (when the number is passed as string)
        },
        fixed: {
            displayName: 'Desconto (R$)',
            cellFormat: function (value, row) {
                return value ? 'R$ ' + value.toFixed(2) : 'R$ 0.00'; // return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}};
            },
            headerStyle: styles.headerDark,
            width: 120, // <- width in pixels
        },
        limit: {
            displayName: 'Limite de Uso',
            cellFormat: function (value, row) {
                return value ? value : Number.MAX_SAFE_INTEGER; // return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}};
            },
            headerStyle: styles.headerDark,
            width: 120, // <- width in pixels
        },
        minToApply: {
            displayName: 'Valor Mínimo',
            cellFormat: function (value, row) {
                return value ? 'R$ ' + value.toFixed(2) : 'R$ 0.00';
            },
            headerStyle: styles.headerDark,
            width: 120, // <- width in pixels
        },
        expirationDate: {
            displayName: 'Data de Expiração',
            cellFormat: function (value, row) {
                return value ? moment(value).format('Do MMMM YYYY') : '';
            },
            headerStyle: styles.headerDark,
            width: 120, // <- width in pixels
        },
    };

    let dataset = [];
    _.forEach(dataCoupons, (c) => {
        let obj = {
            code: c.code,
            percentage: percentage,
            fixed: fixed,
            limit: limit,
            minToApply: minToApply,
        };
        dataset.push(obj);
    });

    let report = excel.buildExport([
        // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
        {
            name: 'Cupons de Desconto - #OlhoNoCarro', // <- Specify sheet name (optional)
            heading: heading, // <- Raw heading array (optional)
            merges: merges, // <- Merge cell ranges
            specification: specification, // <- Report specification
            data: dataset, // <-- Report data
        },
    ]);
    return report;
};

const generateVouchersXlsx = (vouchers) => {
    let heading = [
        [
            {
                value: 'VOUCHERS PREMIADOS - #OlhoNoCarro',
                style: styles.cellGreen,
            },
        ],
    ];

    const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 6 } },
    ];

    let specification = {
        code: {
            displayName: 'Código',
            headerStyle: styles.headerDark,
            cellStyle: styles.cellPink,
            width: 120,
        },
        value: {
            displayName: 'Valor em crédito (R$)',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return value ? 'R$ ' + value : 'R$ 0.00';
            },
            width: 120,
        },
    };

    let dataset = [];
    _.forEach(vouchers, (c) => {
        let obj = {
            code: c.code,
            value: c.creditsToApply,
        };
        dataset.push(obj);
    });

    let report = excel.buildExport([
        {
            name: 'VOUCHERS PREMIADOS - #OlhoNoCarro',
            heading: heading,
            merges: merges,
            specification: specification,
            data: dataset,
        },
    ]);
    return report;
};

const generateStatementChildrensXlsx = (extract, month) => {
    const heading = [
        [
            {
                value: `Consultas (filhos) - ${month} - #OlhoNoCarro`,
                style: styles.cellGreen,
            },
        ],
    ];

    const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 5 } },
    ];

    const specification = {
        email: {
            displayName: 'E-mail',
            headerStyle: styles.headerDark,
            // cellStyle: styles.cellPink,
            width: 120,
        },
        refClass: {
            displayName: 'Consulta',
            headerStyle: styles.headerDark,
            // cellStyle: styles.cellPink,
            width: 120,
        },
        createAt: {
            displayName: 'Data',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return value ? utils.getBrazilianDateFormat(value) : '';
            },
            width: 120,
        },
        documentQuery: {
            displayName: 'Doc. Consultado',
            headerStyle: styles.headerDark,
            width: 120,
        },
        status: {
            displayName: 'Status',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return value ? 'SUCESSO' : 'FALHA';
            },
            cellStyle: function (value, row) {
                return value
                    ? { fill: { fgColor: { rgb: '7ecd8d' } } }
                    : { fill: { fgColor: { rgb: 'cd7e7e' } } };
            },
            width: 120,
        },
    };

    const data = extract.map((item) => ({
        email: item.user.email,
        refClass: item.refClass,
        createAt: item.createAt,
        documentQuery: item.documentQuery,
        status: item.status,
    }));
    return excel.buildExport([
        {
            name: `CONSULTAS (FILHOS) - ${month} - #OlhoNoCarro`,
            heading,
            merges,
            specification,
            data,
        },
    ]);
};

module.exports = {
    generateCouponsXlsx,
    generateVouchersXlsx,
    generateStatementChildrensXlsx,
};
