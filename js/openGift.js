const app = new PIXI.Application({
    width: 500,         // default: 800
    height: 400,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    autoResize: true,
    resolution: devicePixelRatio
});

const appendElement = document.getElementById('openGift');
appendElement.appendChild(app.view);
window.addEventListener('resize', resize);


let btcSprite;
let bobaSprite;
let teaSprite;
let cupSprite;

PIXI.loader
    .add([
        "./images/btc/boba.svg",
        "./images/btc/tea.svg",
        "./images/btc/cup.svg"
    ])
    .load(setup);


function setup() {
    btcSprite = new PIXI.Sprite();
    bobaSprite = new PIXI.Sprite(
        PIXI.Texture.fromImage("./images/btc/boba.svg", true, 0, 0.2)
    );
    teaSprite = new PIXI.Sprite(
        PIXI.Texture.fromImage("./images/btc/tea.svg", true, 0, 0.2)
    );
    cupSprite = new PIXI.Sprite(
        PIXI.Texture.fromImage("./images/btc/cup.svg", true, 0, 0.2)
    );

    var basicText = new PIXI.Text('Take me',{fontFamily : 'Open Sans', fontSize: 16, fill : 0xe84e4e});

    btcSprite.addChild(cupSprite, teaSprite, bobaSprite);

    var giftFilter = new PIXI.filters.BlurFilter(6, 2, 8, 5);
    btcSprite.filters = [giftFilter];

    app.stage.addChild(btcSprite, basicText);

    let rad = 0;
    let rad2 = 0;
    let rad3 = 0;
    let rad4 = 0;

    let animate = true;

    // click event
    btcSprite.interactive = true;
    btcSprite.buttonMode = true;
    btcSprite.on('pointerdown', click);
    function click() {
        animate = !animate;
        let name = document.getElementById('btcPlayerName').value;
        basicText.text = name;
        btcSprite.filters = null;
    };

    // animation
    app.ticker.add(function(delta) {
        if (!animate) {
            return;
        }

        const xOffset = (app.screen.width - btcSprite.getLocalBounds().width) / 2;
        const yOffset = (app.screen.height - btcSprite.getLocalBounds().height) / 2;

        rad += delta / 6;
        if (rad >= Math.PI * 2) {
            rad -= Math.PI * 2;
        }

        rad2 += delta / 100;
        if (rad2 >= Math.PI) {
            rad2 -= Math.PI;
        }

        rad3 += delta / 75;
        if (rad3 >= Math.PI) {
            rad3 -= Math.PI;
        }

        rad4 += delta / 125;
        if (rad4 >= Math.PI) {
            rad4 -= Math.PI;
        }

        const r = Math.sin(rad2) * 255;
        const g = Math.sin(rad3) * 255;
        const b = Math.sin(rad4) * 255;
        teaSprite.tint = (r << 16) + (g << 8) + (b << 0);

        btcSprite.x = xOffset + Math.sin(rad) * 100;
        btcSprite.y = yOffset + Math.cos(rad) * 100;

        basicText.x = btcSprite.x + 80;
        basicText.y = btcSprite.y + 100;
    });
}

function resize() {
	// Resize the renderer
	app.renderer.resize(appendElement.offsetWidth || window.innerWidth, 600);
}

resize();