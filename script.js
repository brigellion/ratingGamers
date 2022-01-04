/*
* ЗАДАНИЕ:
* 1. Есть массив игроков с результатами последних 8 боёв. Сформировать массив объектов gamersRating следующего вида:
* [
*   {
*       gamerName: 'Gendalf',
*       tank: 'T34',
*       finalPoints: 10235
*   },
*   {
*       gamerName: 'Aragorn',
*       tank: 'Tiger-II',
*       finalPoints: 8652
*   },
* ]
* Финальное количество очков считать по следующим правилам:
* - сумма очков по всем боям(массив points), плюс по 500 очков за каждый фраг(массив frags), при наличии
* премиум аккаунта сумма очков увеличивается на 30% с округлением в меньшую сторону.
* 2. Отсортировать gamersRating по убыванию количества очков, то есть, чтобы первым был объект самого результативного игрока.
* 3. Вывести его в консоль
* 4. С помощью prompt запросить у пользователя имя игрока
* Если в массиве gamersRating найден игрок с таким именем, то вывести в alert строку вида:
* "user: Gendalf, points: 12325, rating: 2"
* Если не найден, то вывести "Такой игрок не найден"
* */

'use strict';

const gamers = [
    {
        name: "Gendalf",
        tank: 'T34',
        points: [325, 6532, -452, -32, 6587, -1254, 325, 1254],
        frags: [0, 4, 0, 0, 3, 1, 0, 1],
        premium: true
    },
    {
        name: "Saruman",
        tank: 'IS-7',
        points: [2365, 4215, 325, 5256, -124, -1254, 2541, -1],
        frags: [1, 3, 0, 4, 0, 0, 1, 0],
        premium: false
    },
    {
        name: "Aragorn",//ник игрока
        tank: 'Tiger-II',//танк
        points: [-451, 1254, 659, 215, 3654, -56, 5640, -124],//очки за каждый бой
        frags: [1, 0, 1, 1, 3, 0, 3, 1],   //количество фрагов (уничтоженных противников)
        premium: true   //наличие премиум аккунта
    },
    {
        name: "Frodo",
        tank: 'ИСУ-152',
        points: [-235, 1234, -235, 6982, -1230, 2365, -456, 2235],
        frags: [0, 1, 1, 2, 0, 1, 1, 1],
        premium: false
    }
];

let gamersRating = [];

gamers.forEach(element => {
    let sumPoints = element.points.reduce((a, b) => {
        return a + b;
    });
    let sumFrags = element.frags.reduce((a, b) => {
        return a + b;
    });
    sumPoints += sumFrags * 500;
    if (element.premium) {
        sumPoints = Math.floor(sumPoints + (sumPoints * 0.3));
    }
    const newGamer = {
        gamerName: element.name,
        tank: element.tank,
        finalPoints: sumPoints
    };
    gamersRating.push(newGamer);
});

gamersRating.sort((a, b) => {
    if (a.finalPoints > b.finalPoints) {
        return -1;
    }
    if (a.finalPoints < b.finalPoints) {
        return 1;
    }
    return 0;
});

console.log(gamersRating);

let nameGamer = prompt('Введите имя игрока');
let blockMessage = false;

gamersRating.forEach((element, index) => {
    if (element.gamerName === nameGamer) {
        blockMessage = true;
        alert(`user: ${element.gamerName}, points: ${element.finalPoints}, rating: ${index}`);
    }
});

if (!blockMessage) {
    alert('Такой игрок не найден');
}