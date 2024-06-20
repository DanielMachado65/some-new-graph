debugger;
Iugu.setAccountID("CF6FF08D6979476EB725493737A19D58");
Iugu.setTestMode(true);
Iugu.setup();

let pObject = {
    method: 'credit_card',
    test: 'true',
    data: {
        number: '4242424242424242',
        verification_value: '424',
        first_name: 'DIEGO',
        last_name: 'MOURA',
        month: '04',
        year: '2019'
    }
};

let cc = Iugu.CreditCard(
    pObject.data.number,
    pObject.data.month,
    pObject.data.year,
    pObject.data.first_name,
    pObject.data.last_name,
    pObject.data.verification_value,
)


Iugu.createPaymentToken(cc, function (response) {
    if (response.errors) {
        alert("Erro salvando cartão");
    } else {
        debugger;
        alert("Token criado:" + response.id);
    }
});