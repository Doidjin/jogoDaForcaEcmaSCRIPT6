const criaJogo = sprite => {

    let etapa = 1;
    let lacunas = [];
    let palavraSecreta = '';

    const criaLacunas = () => {

        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
        }
    };

    const proximaEtapa = () => etapa = 2;

    const setPalavraSecreta = palavra => {

        if(!palavra.trim()) throw Error('Palavra invalida!');
        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    const getLacunas = () => lacunas;

    const getEtapa = () => etapa;

    const processaChute = chute => {

        if(!chute.trim()) throw Error('Chute invalido!');

        const exp = new RegExp(chute, 'gi');
        let resultado,
            acertou = false;


        while (resultado = exp.exec(palavraSecreta))
            acertou = lacunas[resultado.index] = chute;

        if (!acertou) sprite.nextFrame();
    };


    // novas funcionaliades que precisamos implementar

    const ganhou = () => lacunas.length ?
            !lacunas.some(function(lacuna){
                return lacuna == '';
            })
        :
            false;

    const perdeu = () => sprite.isFinished();


    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {
        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
    };

    // adicionou novas propriedades
    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu, 
        reinicia
    }
};