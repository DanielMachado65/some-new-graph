debugger;
console.log("Comunicação script is running");

const LOGIN = "barbara@olhonocarro.com.br";
const PASSWORD = "893159fa";

const URL = "http://app.akna.com.br/emkt/int/integracao.php";

let xmlHttpRequest = new XMLHttpRequest();

let body = 
    `<main>
        <func trans="01.10">
            <dados_usuario>
                <email>${LOGIN}</email>
                <nome>[NOME]</nome>
                <senha>[SENHA]</senha>
                <confirma_senha>[SENHA]</confirma_senha><equipe codigo=[99]>[NOME_EQUIPE]</equipe>
                <documento>[DOCUMENTO]</documento>
                <idioma>[pt-br/es/en]</idioma>
                <telefone>[TELEFONE]</telefone>
                <tel_movel>[TELEFONE]</tel_movel>
                <supervisor>[S/N]</supervisor>
                <acesso_nivel_inferior>[S/N]</acesso_nivel_inferior>
            </dados_usuario>
            <seguranca>
                <restricao_ip>[S/N]</restricao_ip>
                <ip_restrito>[999.999.999.999];(...)</ip_restrito>
                <data_bloqueio>[AAAA-MM-DD]</data_bloqueio>
                <acesso_admin>[S/N]</acesso_admin>
            </seguranca>
        </func>
    </main>`

xmlHttpRequest.onreadystatechange = (evt) => {
    if(xmlHttpRequest.readyState == XMLHttpRequest.DONE && xhr.status === 200){
        debugger;
        console.log("finish");
        console.log(xmlHttpRequest.responseText);
    }
}

xmlHttpRequest.open();
xmlHttpRequest.send();