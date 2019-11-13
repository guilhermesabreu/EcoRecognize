var rostos = [];
var coordenadasImagem = [];
var frasesAmbientais = ["A preservação do meio ambiente " +
    "começa com pequenas atitudes diárias,que fazem toda a diferença " +
    "Uma das mais importantes é a reciclagem do lixo.",
    "A responsabilidade social e a preservação ambiental significa um compromisso com a vida.",
    "Cuidar, guardar, preservar o meio ambiente - responsabilidade de todos nós.",
    "Neste mundo moderno, onde impera a pressa e a tecnologia, as belezas naturais " +
    "estão passando despercebidas.Mude um pouco isso, veja a noite as estrelas e o luar; " +
    "encante - se com a bela imagem de um por do sol.Você sentirá, admirando tudo isso, a " +
    "presença de Deus bem perto de você.",
    "Podemos julgar o coração de um homem pela forma como ele trata os animais.",
    "Vivemos em uma época perigosa. O homem domina a natureza antes que tenha aprendido a dominar a si mesmo.",
    "Viva em harmonia com as leis da natureza e você nunca será pobre. Viva em harmonia com opiniões e nunca será rico.",
    "Só se pode vencer a natureza obedecendo-lhe.",
    "O homem fez da terra um inferno para os animais.",
    "Queres ser rico? Pois não te preocupes em aumentar os teus bens, mas sim em diminuir a tua cobiça.",
    "É dentro do coração do homem que o espetáculo da natureza existe; para vê-lo, é preciso senti-lo.",
    "Vamos olhar para a Terra e seu planetas irmãos como coexistindo com a gente, em vez de feitos para nós.",
    "Os homens são miseráveis, porque não sabem ver nem entender os bens que estão ao seu alcance.",
    "A natureza fez o comer para o viver e a gula fez o comer muito para o viver pouco.",
    "O macaco é um animal demasiado simpático para que o homem descenda dele.",
    "É mais rico aquele que se contenta com pouco, pois satisfação é a riqueza da natureza."];


function reconhecerFace() {
    $('.rect').remove();
    var img = document.getElementById('img');
    var coordenadas = [];
    var nomeUsuario = $("#nameUserlogin").val();
    var chaveLocalStorage = [];

    var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    tracker.setStepSize(1.7);
    tracking.track('#img', tracker);
    tracker.on('track', function (event) {
        event.data.forEach(function (rect) {
            var rosto = window.plot(rect.x, rect.y, rect.width, rect.height);
            coordenadas.push(rosto);
        });
        var stringCoordenadas = JSON.stringify(coordenadas);
        console.log(stringCoordenadas);
        var coordenadasLocalStorage = localStorage.getItem(nomeUsuario);
        
        var numeroRandomico = Math.floor(Math.random() * frasesAmbientais.length);
        var fraseSorteada = frasesAmbientais[numeroRandomico];

        //logando
        if (nomeUsuario == null || nomeUsuario == undefined || nomeUsuario == "") {
            var param = "<p>Insira o seu nome corretamente</p>";
            montaModal(param);
        }
        else if (stringCoordenadas == null || stringCoordenadas == undefined || stringCoordenadas == "") {
            var param = "<p>Insira a imagem do seu rosto corretamente</p>";
            montaModal(param);
        }
        else if (stringCoordenadas != coordenadasLocalStorage) {
            var param = "<p>Foto/Nome Inválidos</p>";
            montaModal(param);
        }
        else {
            var param = '<p>Seja Bem vindo ao ECO RECOGNIZE, ' + nomeUsuario + '. '+ fraseSorteada+'</p>';
            montaModal2(param);
        }
  });

    window.plot = function (x, y, w, h) {
        var rect = document.createElement('div');
        document.querySelector('.demo-container').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';

        coordenadasImagem = [x];
        var coordenadasImg = JSON.stringify(coordenadasImagem);
        return coordenadasImg;
    };
}

function armazenarRosto() {
    $('.rect').remove();
    //localStorage.clear();
    var img = document.getElementById('img');
    var coordenadas = [];
    var nomeUsuario = $("#nameUser").val();
    var chaveLocalStorage = [];

    var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    tracker.setStepSize(1.7);
    tracking.track('#img', tracker);
    tracker.on('track', function (event) {
        event.data.forEach(function (rect) {
            var rosto = window.plot(rect.x, rect.y, rect.width, rect.height);
            coordenadas.push(rosto);
        });

        var stringCoordenadas = JSON.stringify(coordenadas);
        var coordenadasLocalStorage = localStorage.getItem(nomeUsuario);

        //Passando Chaves do localStorage para array
        for (var key in localStorage) {
            chaveLocalStorage.push(key);
        }

        //cadastrando usuário
        if (allStorage().indexOf(stringCoordenadas) > -1) {
            var param = "<p>Usuário/imagem já cadastrado</p>";
            montaModal(param);
        }
        else if (chaveLocalStorage.indexOf(nomeUsuario) > -1) {
            var param = "<p>Usuário/imagem já cadastrado</p>";
            montaModal(param);
        }
        else if (nomeUsuario == null || nomeUsuario == undefined || nomeUsuario == "") {
            var param = "<p>Insira um nome válido para efetuar o cadastro</p>";
            montaModal(param);
        }
        else if (stringCoordenadas == null || nomeUsuario == undefined || nomeUsuario == "") {
            var param = "<p>Insira um nome válido para efetuar o cadastro</p>";
            montaModal(param);
        }
        else {
            var param = "<p>Você foi cadastrado com sucesso.</p>";
            montaModal2(param);
            localStorage.setItem(nomeUsuario, stringCoordenadas);
        }
    });
    window.plot = function (x, y, w, h) {
        var rect = document.createElement('div');
        document.querySelector('.demo-container').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';

        coordenadasImagem = [x];
        var coordenadasImg = JSON.stringify(coordenadasImagem);
        return coordenadasImg;
    };
}

function printarFotoEscolhida() {

    const $ = document.querySelector.bind(document);
    const previewImg = $('.preview-img');
    const fileChooser = $('.file-chooser');

    fileChooser.onchange = e => {
        const fileToUpload = e.target.files.item(0);
        const reader = new FileReader();

        // evento disparado quando o reader terminar de ler 
        reader.onload = e => previewImg.src = e.target.result;

        // solicita ao reader que leia o arquivo 
        // transformando-o para DataURL. 
        // Isso disparará o evento reader.onload.
        reader.readAsDataURL(fileToUpload);
    };
}

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

function montaModal(parametro) {
    $('#teste').html(
        '<div id="modal1" class="modal fade" role="dialog">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class= "modal-header">' +
        '<button type="button" class="close" data-dismiss="modal"></button>' +
        '<h4 class="modal-title">Erro</h4>' +
        '</div >' +
        ' <div class="modal-body">' +
        parametro +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    $('#modal1').modal("show");

}
function montaModal2(parametro) {
    $('#teste').html(
        '<div id="modal1" class="modal fade" role="dialog">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class= "modal-header">' +
        '<button type="button" class="close" data-dismiss="modal"></button>' +
        '<h4 class="modal-title">TudoCerto</h4>' +
        '</div >' +
        ' <div class="modal-body">' +
        parametro +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    $('#modal1').modal("show");

}

//armazenarRosto();
//reconhecerFace();
printarFotoEscolhida();
