module.exports = `<div class="container"  style="display:none" id="loginForm" >
  <div class="row">
    <div class="col-lg-4"></div>
    <div class="col-lg-4">
      <div class="block-center mt-xl wd-xl">
        <div class=" col-lg-12 panel panel-flat">
          <div class="panel-heading text-center block-center ng-zoomBackDown ng-fluid ng-scope">
            <a href="#">
              <img src="integration/img/olho-no-carro-pos.png" alt="Image" class="block-center img-responsive" />
            </a>
          </div>
          <div class="panel-body">
            <p class="text-center pv"><b>AMBIENTE RESTRITO</b><br>Entre com sua conta</p>
            <form name="authForm">
              <div class="form-group">
                <label for="exampleInputEmail1">Usuário: </label>
                <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Entre com o usuário">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Senha:</label>
                <input type="password" class="form-control" id="pass" placeholder="Entre com a senha">
              </div>
              <center>
                  <div id="alertInfo" class="alert alert-danger" role="alert">
                      Usuário e/ou senha inválidos!
                    </div>
                <button id="target" type="button" class="btn btn-block btn-success mt-lg">Entrar</button>
              </center>
            </form>
          </div>
        </div>
    </div>
    <div class="col-lg-4"></div>
  </div>
</div>\n\n`