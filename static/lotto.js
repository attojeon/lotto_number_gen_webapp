// script.js
function generateLottoNumbers() {
    var setCount = document.getElementById('set-count').value;
    var lottoSetsElement = document.getElementById('lotto-sets');
    lottoSetsElement.innerHTML = '';

    for (var i = 0; i < setCount; i++) {
        var numbers = generateSingleLottoSet().sort((a, b) => a - b);
        var bonusNumber = generateBonusNumber(numbers);
        
        var setElement = document.createElement('div');
        numbers.forEach(number => {
            var numberElement = createNumberElement(number);
            setElement.appendChild(numberElement);
        });
        
        var plusSign = document.createTextNode(' + ');
        setElement.appendChild(plusSign);

        var bonusNumberElement = createNumberElement(bonusNumber);
        setElement.appendChild(bonusNumberElement);
        
        lottoSetsElement.appendChild(setElement);
    }
}

function createNumberElement(number) {
    var element = document.createElement('span');
    element.className = 'lotto-number ' + getColorClass(number);
    element.textContent = number;
    return element;
}

function getColorClass(number) {
    if (number <= 10) return 'lotto-yellow';
    if (number <= 20) return 'lotto-blue';
    if (number <= 30) return 'lotto-red';
    if (number <= 40) return 'lotto-gray';
    return 'lotto-green';
}

// ... 기존의 generateSingleLottoSet 및 generateBonusNumber 함수 ...


function generateSingleLottoSet() {
    var numbers = [];
    while (numbers.length < 6) {
        var number = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }
    return numbers;
}

function generateBonusNumber(numbers) {
    var bonusNumber;
    // do {
    //     bonusNumber = Math.floor(Math.random() * 45) + 1;
    // } while (numbers.includes(bonusNumber));
    bonusNumber = Math.floor(Math.random() * 45) + 1;
    while (numbers.includes(bonusNumber)) {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    }
    return bonusNumber;
}

// 로또 번호 빈도수 분석 및 그래프 생성
async function analyzeAndDrawFrequencyChart() {
    var frequency = new Array(45).fill(0);

    // JSON 파일 읽기
    var response = await fetch('static/lotto_pretty.json');
    var data = await response.json();
    // console.log(data);

    // 빈도수 분석
    data.forEach(set => {
        for (let i = 1; i <= 6; i++) {
            var numberKey = '번호' + i;
            var number = set[numberKey];
            frequency[number - 1]++;
        }
        var bonusNumber = set['보너스번호'];
        frequency[bonusNumber - 1]++;
    });

    // 막대 그래프 그리기
    var ctx = document.getElementById('frequency-chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 45 }, (_, i) => i + 1),
            datasets: [{
                label: '당첨 횟수',
                data: frequency,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 페이지 로드 시 그래프 그리기
window.onload = analyzeAndDrawFrequencyChart;
