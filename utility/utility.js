var show_menu_id = "";

function switchMenu(id) {
    switch (id) {
        case "BG_menu":
            hideMenu("dress_menu");
            //hideMenu("face_menu");
            break;
        case "dress_menu":
            hideMenu("BG_menu");
            //hideMenu("face_menu");
            break;
        /*case "face_menu":
            hideMenu("dress_menu");
            hideMenu("BG_menu");
            break;*/
    }
    showMenu(id);
}

function showMenu(id) {
    if (show_menu_id === "") {
        let menu = document.getElementById(id);
        menu.style.setProperty("bottom", "0vh");
        menu.style.setProperty("opacity", "100");
        show_menu_id = id;
    }
}
function hideMenu(id) {
    let menu = document.getElementById(id);
    menu.style.setProperty("bottom", "-100vh");
    menu.style.setProperty("opacity", "0");
    show_menu_id = "";
}

function setBG(element) {
    let card = element.parentElement;
    let img_src = card.querySelector(".image img").src;
    document.querySelector(".bg_img").src = img_src;
}

function setDress(element) {
    let card = element.parentElement;
    let img_src = card.querySelector(".image img").src;
    document.querySelector(".sprite_img").src = img_src.replace("thumbnail/", "");
}

function printTouch(area) {
    let touch = document.getElementById("touch_area");
    touch.textContent = area;
}





function randomBlink() {
    if (Math.random() > 0.8) {
        console.log('blink');
        displayBlink();
    }
}

function delay(time) {   
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('delay '+time+' seconds'); // ms
        }, time);
    });
}

async function displayBlink() {
    let open = document.getElementById("face_open");
    let half_close = document.getElementById("face_half_close");
    let close = document.getElementById("face_close");
    for (let blink_counter = 0; blink_counter < 10; blink_counter++) {
        switch (blink_counter) {
            case 4:
                open.classList.add('hide');
                half_close.classList.remove('hide');
                close.classList.add('hide');
                break;
            case 5:
                open.classList.add('hide');
                half_close.classList.add('hide');
                close.classList.remove('hide');
                break;
            case 4:
                open.classList.add('hide');
                half_close.classList.remove('hide');
                close.classList.add('hide');
                break;
            default:
                open.classList.remove('hide');
                half_close.classList.add('hide');
                close.classList.add('hide');
                break;
        }
        await delay(50);
    }
}

window.onload = () => {
    var sprite = document.getElementById("sprite_wrapper");
    var x_print = document.getElementById("mouse_x");
    var y_print = document.getElementById("mouse_y");
    var page = document.querySelector(".bg_img");

    var sprite_head = document.querySelector(".sprite_head");
    var sprite_chest = document.querySelector(".sprite_chest");
    var sprite_stomach = document.querySelector(".sprite_stomach");
    var sprite_legs = document.querySelector(".sprite_legs");

    const scale = 0.01;
    const window_h = window.innerWidth;
    const window_v = window.innerWidth;


    window.addEventListener('pointermove', (event) => {
        //console.log(event);
        x_print.textContent = Math.round(event.clientX);
        y_print.textContent = Math.round(event.clientY);
        sprite.style.setProperty('top', `${20+event.clientY*scale*0.2}px`);
        sprite.style.setProperty('left', `${250+event.clientX*scale*0.2}px`);
        page.style.setProperty('top', `${(event.clientY-window_v)*scale}px`);
        page.style.setProperty('left', `${(event.clientX-window_h)*scale}px`);
    }, false);


    // print touch area on debug text
    sprite_head.addEventListener('pointerover', (event) => {
        printTouch("head");
    })
    sprite_chest.addEventListener('pointerover', (event) => {
        printTouch("chest");
    })
    sprite_stomach.addEventListener('pointerover', (event) => {
        printTouch("stomach");
    })
    sprite_legs.addEventListener('pointerover', (event) => {
        printTouch("legs");
    })
    sprite_head.addEventListener('pointerleave', (event) => {
        printTouch("none");
    })
    sprite_chest.addEventListener('pointerleave', (event) => {
        printTouch("none");
    })
    sprite_stomach.addEventListener('pointerleave', (event) => {
        printTouch("none");
    })
    sprite_legs.addEventListener('pointerleave', (event) => {
        printTouch("none");
    })

    // blink action
    var test_blink = window.setInterval(randomBlink, 1000);


    // load menu
    const menu_data = JSON.parse(document.getElementById("menu_data").innerText)
    
    // load dress_menu
    var dress_list = document.getElementById("dress_list");
    //console.log(menu_data);
    for (let cate of menu_data.dress) {
        let cate_html = `<div class="ui horizontal divider">${cate.type}</div>`;
        let cards_html = "";
        for (let dress of cate.list) {
            cards_html += `
            <div class="ui card">
                <div class="image">
                    <img src="assets/sprite/dress/thumbnail/${dress.file}.png" alt="">
                </div>
                <div class="content">
                    <div class="header">${dress.name}</div>
                    <div class="meta">${dress.meta}</div>
                </div>
                <div class="ui bottom attached button" onclick="setDress(this)">設定</div>
            </div>
            `;
        }
        dress_list.innerHTML += `
            ${cate_html}
            <div class="ui six cards">
                ${cards_html}
            </div>
        `;
    }

    // load BG_menu
    var BG_list = document.getElementById("BG_list");
    for (let cate of menu_data.BG) {
        let cate_html = `<div class="ui horizontal divider">${cate.type}</div>`;
        let cards_html = "";
        for (let BG of cate.list) {
            cards_html += `
            <div class="ui card">
                <div class="image">
                    <img src="assets/background/${BG.file}.jpg" alt="">
                </div>
                <div class="content">
                    <div class="header">${BG.name}</div>
                    <div class="meta">${BG.meta}</div>
                </div>
                <div class="ui bottom attached button" onclick="setBG(this)">設定</div>
            </div>
            `;
        }
        BG_list.innerHTML += `
            ${cate_html}
            <div class="ui six cards">
                ${cards_html}
            </div>
        `;
    }
    
    

}




        
