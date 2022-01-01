const puppeteer = require("puppeteer");
require('dotenv').config()

const arg = [
    {
        descriptionPost: "Teste 1",
        image: './assets/coffee.jpg'
    }
]

async function startIntagramBot() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log("Vamos lá?");
    console.log("Só um instante...");

    console.log("Acessando página de login 🖥...");
    const INSTAGRAM_LOGIN_URL = 'https://instagram.com/accounts/login';

    await page.goto(INSTAGRAM_LOGIN_URL);
    await timeout(2500)

    let instUsernameField = await page.$("input[name='username']");
    let instPassField = await page.$("input[name='password']");

    console.log("Entrando no usuário😀...");
    await instUsernameField.click();
    await page.keyboard.type(process.env.INST_USERNAME, { delay: 50 })

    await instPassField.click();
    await page.keyboard.type(process.env.INST_PASS, { delay: 50 })

    let button = await page.$("button.sqdOP[type='submit']");
    await button.click();

    console.log("Entramos 🔓...");
    await page.waitForNavigation();
    
    await timeout(2500);
    
    console.log("Acessando página inicial 💻...");

    await timeout(2500);

    console.log("Começando processo de postagem..");
    
    await page.$eval("button.wpO6b.ZQScA", e => ( e.click() ));

    await page.waitForSelector("input[type='file']");

    let fileInputs = await page.$$('input[type="file"]');
    let input = fileInputs[fileInputs.length - 1];

    console.log("Selecionando imagem 🎞...");

    await timeout(2500);

    console.log("Configurando envio de imagem 🔥...");

    await input.uploadFile(arg[0].image);

    await timeout(2500);

    console.debug('Próxima etapa ✔...');

    await page.$eval(".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.XfCBB.g6RW6 .sqdOP", nxtButton => nxtButton.click());

    await timeout(1500);

    await page.$eval(".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.XfCBB.g6RW6 button", nxtButton => nxtButton.click());

    if (arg[0].descriptionPost) {
        console.log("Adicionando descrição 📄...");
        await page.waitForSelector(".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm textarea.lFzco");

        await page.click(".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm textarea.lFzco");

        await page.keyboard.type(arg[0].descriptionPost, { delay: 50 });
    }

    console.log("Enviando post 📌...");
    
    await page.$eval(".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.XfCBB.g6RW6 button", sendBtn => sendBtn.click() );

    console.log("Conseguimos!! 🎉...");

    await timeout(6000);

    await browser.close();

    console.log("Post enviado com sucesso!! ✅ 🎉");    
}

startIntagramBot();

function timeout(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}