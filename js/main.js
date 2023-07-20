function retornar_imc(calculo){
    if (calculo < 19.5){
        return ("Abaixo do peso.")
    }
    else if (calculo >= 19.5 && calculo < 25){
        return ("Peso normal.")
    }
    else if (calculo >= 25 && calculo < 30){
        return ("Sobrepeso.")
    }
    else if (calculo >= 30 && calculo < 35){
        return ("Obesidade grau 1.")
    }
    else if (calculo >= 35 && calculo < 40){
        return ("Obesidade grau 2.")
    }
    else{
        return ("Obesidade grau 3.")
    }
}

function Calcular_IMC(){
    const form = document.querySelector('#form');
       
    const peso = parseFloat(form.querySelector('.peso').value);
    const altura = parseFloat(form.querySelector('.altura').value);
       
    let imc = peso/(altura*altura);
    return imc;
    
}

// Calcular_IMC();

const form = document.querySelector('#form');

form.addEventListener('submit', function (e){
    e.preventDefault();
    console.log('Evento previnido.');
    setResultado(Calcular_IMC());
    
});

function criaP_Red () {
    const p = document.createElement('p');
    p.classList.add('paragrafo-resultado-vermelho');
    return p;
}

function criaP_Green () {
    const p = document.createElement('p');
    p.classList.add('paragrafo-resultado-verde');
    return p;
}

function setResultado (msg){
    let calc = parseFloat(msg);
    
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    if (isNaN(calc)){
        const p = criaP_Red();
        p.innerHTML = `Peso invalido.`;
        resultado.appendChild(p);

    }
    else if(isNaN(calc)){
        const p = criaP_Red();
        p.innerHTML = `<p>Altura invalida.</p>`;
        resultado.appendChild(p);
    }
    else{
    console.log('calculo',40-calc.toFixed(1));
    if (calc >= 40){
        dialogo(calc.toFixed(1),0);
    }
    // else if(calc >= 35 && calc < 40){
        // dialogo(calc.toFixed(1), 40 - calc.toFixed(1) - 40);
    // }
    else{
        dialogo(calc.toFixed(1), 40 - calc.toFixed(1) );
    }
    text_resultado(calc.toFixed(1));
}
}

function dialogo (var1,var2){
    const modal = document.querySelector("dialog");
    const button_cls = document.querySelector(".btn-close") ;

    modal.showModal();

    console.log('valores:',var1,var2);
    
    const chartWidht = document.querySelector('.chartBox').getBoundingClientRect().widht - 46;
    console.log(chartWidht);
    const ctx = document.getElementById('myChart').getContext('2d');
    const gradientSegment = ctx.createLinearGradient(0,0,700,0,0);
    gradientSegment.addColorStop(0,'red');
    gradientSegment.addColorStop(0.7,'yellow');
    gradientSegment.addColorStop(1,'green');
    
    const data = {
        labels: ['Score','Gray Area'],
        datasets: [{
        label: 'IMC',
        data: [2, 1],
        backgroundColor: [
            // gradientSegment,
            'rgba(255, 26, 104, 1)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
            'rgba(255, 26, 104, 1)',
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 0,
        cutout:'75%',
        circumference:180,
        rotation: 270
        }]
    };
    //gaugeText
    const gaugeChartText = {
        id: 'gaugeChartText',
        afterDatasetsDraw(chart,args,pluginOptions) {
            const {ctx,data,chartArea: {top,bottom,left,right,widht,height}, scales: {r} } = chart;

            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            const score = data.datasets[0].data[0];
            
            let rating;
            if ( score < 18.5){ rating = 'Abaixo do peso';}
            else if ( score >= 18.5 && score < 25) { rating = 'Peso Normal';}
            else if ( score >= 25 && score < 30) { rating = 'Sobrepeso';}
            else if ( score >= 30 && score < 35) { rating = 'Obesidade grau 1';}
            else if ( score >= 35 && score < 40) { rating = 'Obesidade grau 2';}
            else { rating = 'Obesidade grau 3';}

            ctx.fillRect(xCoor,yCoor,400,1);

            function textLabel(text,x,y,fontSize,textBaseLine,textAlign){
                ctx.font = `${fontSize}px sans-serif`;
                ctx.fillStyle = '#666';
                ctx.textBaseLine = textBaseLine;
                ctx.textAlign = textAlign;
                ctx.fillText(text,x,y);
            }

            var largura = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
            var altura = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
            
            if (largura <= 820) {
                textLabel('0',left + 7,yCoor + 25,20,'top','left');
                textLabel('40',right , yCoor + 25,20,'top','right');
                textLabel(score,xCoor,yCoor,50,'bottom','center');
                textLabel(rating,xCoor,yCoor - 60,20,'bottom','center');
            }
            else{
                textLabel('0',left + 15,yCoor + 15 ,20,'top','left');
                textLabel('40',right -10, yCoor +15,20,'top','right');
                textLabel(score,xCoor,yCoor,80,'bottom','center');
                textLabel(rating,xCoor,yCoor - 80,20,'bottom','center');
            }
            
        }
    }
    // config 
    const config = {
        type: 'doughnut',
        data,
        options: {
            maintainAspectRatio:false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    display: false      
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            },
            plugins: [gaugeChartText],
        scales: {
            y: {
            beginAtZero: true,
            suggestedMax: 40
            }
            
        }
        };
        

    // render init block
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    
    myChart.data.datasets[0].data[0] = var1;
    myChart.data.datasets[0].data[1] = var2;
    console.log(myChart.data.datasets[0].data[0]);
    myChart.update();
    
    button_cls.onclick = function() {
        myChart.destroy();
        modal.close();
    }
}

function criarP(){
    const p = document.createElement('p');
    return p;
}
function text_resultado(imc){
    const div_resultado = document.querySelector('#text-resultado');
    div_resultado.innerHTML = '';

    if (imc < 19.5){
        const p = criarP();
        p.classList.add('paragrafo-resultado-amarelo');
        p.innerHTML = `Você esta abaixo do peso, precisa ganhar massa com a ingestão de comida e praticas de exercicios, consulte medico ou nutricionista para lhe dar conselhos. `;
        div_resultado.appendChild(p);
    }
    else if (imc >= 19.5 && imc < 25){
        const p = criarP();
        p.classList.add('paragrafo-resultado-verde');
        p.innerHTML = `Peso normal continue com sua rotina de alimentação e exercicios.`;
        div_resultado.appendChild(p);
    }
    else if (imc >= 25 && imc < 30){
        const p = criarP();
        p.classList.add('paragrafo-resultado-yellowdark');
        p.innerHTML = `Você esta um pouco acima do peso, precisa perder massa com dieta e praticas de exercicios, consulte medico ou nutricionista para lhe dar conselhos. `;
        div_resultado.appendChild(p);
    }
    else if (imc >= 30 && imc < 35){
        const p = criarP();
        p.classList.add('paragrafo-resultado-laranja');
        p.innerHTML = `Você esta acima do peso. Procure ajuda medica, melhore alimentação e pratique exercicios fisicos.`;
        div_resultado.appendChild(p);
    }
    else if (imc >= 35 && imc < 40){
        const p = criarP();
        p.classList.add('paragrafo-resultado-larver');
        p.innerHTML = `Você esta bem acima do peso. Procure ajuda medica, melhore alimentação e pratique exercicios fisicos o mais rapido possivel.`;
        div_resultado.appendChild(p);
    }
    else{
        const p = criarP();
        p.classList.add('paragrafo-resultado-red');
        p.innerHTML = `Você esta muito acima do peso procure ajuda medica imediatamente.`;
        div_resultado.appendChild(p);
    }
}

