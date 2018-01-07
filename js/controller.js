const criaController = jogo => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    let palavraSecreta = '';

    const exibeLacunas = () => {
        
        $lacunas.empty();
        jogo.getLacunas().forEach(lacuna => {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    const mudaPlaceHolder = texto => $entrada.attr('placeholder', texto);

    const guardaPalavraSecreta =  palavra => {

        try{
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('texto');
            exibeLacunas();
        } catch(err){
            alert(err.message);
        }

    };

    const reinicia = () => {

        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('palavra secreta')
    };

    const leChute = () => {

        try{
            // lê a entrada do usuário
            jogo.processaChute($entrada.val().trim().substr(0, 1));

            // limpa a entrada do usuário
            $entrada.val('');
            // solicita ao jogo que processe o chute. Se errou, o próprio jogo solicita ao sprite que vá para o próximo frame

            // exibe as lacunas para refletir possíveis acertos
            exibeLacunas();

            // A cada chute executar o jogo para saber se perdeu ou ganhou
            // Caso acertar -> Alert dizendo que acertou
            // Caso errou -> Alert dizendo que errou
            // Independente se ganhou um acertou -> Reiniciar o jogo
            if(jogo.ganhouOuPerdeu()){

                setTimeout(() => {

                    if(jogo.ganhou()){
                        alert('Parabens, você ganhou!');
                    } else if(jogo.perdeu()){
                        alert('Que pena, tente novamente!');
                    }
                    reinicia();
                }, 200);

            }
        }catch(err){
            alert(err.message);
        }

    }

    const inicia = () => {

        $entrada.keypress(event => {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();

                        //jogo.proximaEtapa();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };
    return { 
        inicia,
    };
};