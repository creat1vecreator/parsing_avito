const fs = require('fs');
const puppeteer = require('puppeteer');
const finders = require('./utils/finders')
let link = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?cd=1&f=ASgBAQICAUSSA8YQAkDmBxSMUsoIJIJZgFk';

const startScrapping = async () => {
    await puppeteer.launch({
        defaultViewport: {
            width: 1400,
            height: 900
        },
        headless: false,
        devtools: true
    }).then(async browser => {
        let page = (await browser.pages())[0];
        await page.goto(link, {waitUntil: 'domcontentloaded'});
        try {
            await page.waitForSelector('.footer-nav-XJtpf');

            let dataCardsAvito = await page.evaluate(async () => {
                let res = [];
                let container = await document.querySelectorAll('div.iva-item-content-rejJg');
                const serviceName = 'avito';
                let counter = 1;
                console.log(container);
                for (const card of container) {
                    let id = serviceName + counter++;
                    const findRoomsAvito = (arr) => {
                        let rooms = '';
                        for (let i = 0; i < arr[0].length; i++) {
                            if (Number(arr[0][i])) {
                                rooms += arr[0][i];
                            } else return rooms;
                        }
                    }

                    const findSquareAvito = (arr) => {
                        return arr[2];
                    }
                    const findFloorFlatAvito = (arr) => {
                        return arr[4].split('/')[0];
                    }
                    const findFloorHouseAvito = (arr) => {
                        return arr[4].split('/')[1];
                    }

                    const link = card.querySelector('.iva-item-slider-pYwHo').querySelector('.iva-item-sliderLink-uLz1v').href;
                    const price = card.querySelector('.iva-item-body-KLUuy').querySelector('.iva-item-priceStep-uq2CQ').querySelector('.price-root-RA1pj').querySelector('.price-price-JP7qe').innerText.replace(/ /g, ' ');
                    const address = card.querySelector('.iva-item-body-KLUuy').querySelector('.geo-root-zPwRk').querySelector('.geo-address-fhHd0').innerText;
                    const roomsSquareFloorsSplittedContainer = card.querySelector('.iva-item-body-KLUuy').querySelector('.title-root-zZCwT').innerText.replace(/ /g, ' ').split(' ');
                    const rooms = findRoomsAvito(roomsSquareFloorsSplittedContainer);
                    const square = findSquareAvito(roomsSquareFloorsSplittedContainer);
                    const floorFlat = findFloorFlatAvito(roomsSquareFloorsSplittedContainer);
                    const floorHouse = findFloorHouseAvito(roomsSquareFloorsSplittedContainer);


                    res.push({
                        id,
                        link,
                        price,
                        address,
                        rooms,
                        square,
                        floorFlat,
                        floorHouse,


                    });

                }

                return res;
            });
            console.log('starting loop:');
            for (let i = 0; i < dataCardsAvito[i].length; i++) {
                console.log('going to page...')
                await page.goto(dataCardsAvito[i].link, {waitUntil: 'domcontentloaded'});
                await page.waitForSelector('.js-abuse-button button button-origin').catch(e => {
                    console.log(e.message);
                });
                let description = page.evaluate(async () => {
                    return document.querySelector('.item-description-text').innerText;
                });

                dataCardsAvito[i].description = description;

            }


            fs.writeFile('avitoDataCards.json', JSON.stringify(dataCardsAvito), err => {
                if (err) {
                    throw err;
                }
                console.log('saved successfully the information of cards.');
            })

        } catch (e) {
            await browser.close();
            console.log(e.message);
        }

    })
}
startScrapping().then(r => console.log('the program has stopped'));