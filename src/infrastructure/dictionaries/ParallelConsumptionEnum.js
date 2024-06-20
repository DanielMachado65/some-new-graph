
    'use strict';

    const parallelConsumptionFactory = (suffix, postfix, tag) => {
        return {
            description : `${suffix ? suffix : ''} ${postfix ? postfix : ''}`,
            tag : tag
        }
    }

    let parallelConsumptionEnum = (key,postfix) => {
        switch (key) {
            case 'dspac':
                return parallelConsumptionFactory('Mensalidade Checktudo ref.',postfix,key);
            case 'fatmin':
                return parallelConsumptionFactory('Diferença Faturamento Mínimo pelo consumo',postfix,key);
            case 'abidance' :
                return parallelConsumptionFactory('Multa Fidelidade  ref.',postfix,key);
            case 'retention' :
                return parallelConsumptionFactory('Retenção',postfix,key);
            case 'discount' :
                return parallelConsumptionFactory('Desconto de: ',postfix,key);
            default:
                return null;
        }
    }

    module.exports = parallelConsumptionEnum;
