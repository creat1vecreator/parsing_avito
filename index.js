const fs = require('fs');
const puppeteer = require('puppeteer');
const finders = require('./utils/finders')
let link = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?cd=1&f=ASgBAQICAUSSA8YQAkDmBxSMUsoIJIJZgFk';

(async () => {
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

            let data = await page.evaluate(async () => {
                let res = [];
                let container = await document.querySelectorAll('div.iva-item-content-rejJg');
                console.log(container);
                container.forEach(card => {


                    const price = card.querySelector('.iva-item-body-KLUuy').querySelector('.iva-item-priceStep-uq2CQ').querySelector('.price-root-RA1pj').querySelector('.price-price-JP7qe').innerText;
                    const address = card.querySelector('.iva-item-body-KLUuy').querySelector('.geo-root-zPwRk').querySelector('.geo-address-fhHd0').innerText;
                    const roomsSquareFloorsSplittedContainer = card.querySelector('.iva-item-body-KLUuy').querySelector('.title-root-zZCwT').innerText.replace(/ /g, ' ').split(' ');
                    const rooms = finders.findRoomsAvito(roomsSquareFloorsSplittedContainer);
                    const square = finders.findSquareAvito(roomsSquareFloorsSplittedContainer);
                    const floorFlat = finders.findFloorFlatAvito(roomsSquareFloorsSplittedContainer);
                    const floorHouse = finders.findFloorHouseAvito(roomsSquareFloorsSplittedContainer);

                    res.push({
                        price,
                        address,
                        rooms,
                        square,
                        floorFlat,
                        floorHouse
                    })
                });

                return res;
            });
            fs.writeFile('avito.json', JSON.stringify(data), err => {
                if (err) {
                    throw err;
                }
                console.log('saved successfully');
            })

        } catch (e) {
            console.log(e.message);
        }

    })
})()