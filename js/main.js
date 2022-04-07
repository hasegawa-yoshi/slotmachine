'use strict';

{
class Panel{
    constructor(){
        const section = document.createElement('section');
        section.classList.add('panel');
    
        this.img = document.createElement('img');
        this.img.src = 'img/seven.png';

        this.timeoutId = undefined;



        this.stop = document.createElement('div');
        this.stop.textContent = 'STOP';
        this.stop.classList.add('stop', 'inactive');
        this.stop.addEventListener('click', () => {
            if(this.stop.classList.contains('inactive')){
                return;
            }
            this.stop.classList.add('inactive');
            clearTimeout(this.timeoutId)

            panelsLeft--;

            if(panelsLeft === 0){
                spin.classList.remove('inactive');
     
                displayChange();


                display.appendChild(displayimg);

                panelsLeft = 3;
                checkResult();
            }
        });

        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.querySelector('main');
        main.appendChild(section);
    }

    getRandomImage(){
        const images = [
            'img/seven.png',
            'img/bell.png',
            'img/cherry.png', 
        ];
        return images[Math.floor(Math.random() * images.length)];
    }


    spin(){

        this.img.src = this.getRandomImage();
        this.timeoutId = setTimeout(() => {
            this.spin();
        }, 50);
    }

    isUnmatched(p1, p2){
        return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    displayUnmatched(d1, d2){
        return this.img.src !== d1.img.src || this.img.src !== d2.img.src;
    }


    unmatch(){
        this.img.classList.add('unmatched');
    }

    activate(){
        this.img.classList.remove('unmatched');
        this.stop.classList.remove('inactive');
    }

}

function checkResult(){
    if(panels[0].isUnmatched(panels[1],panels[2])){
        panels[0].unmatch();
    }
    if(panels[1].isUnmatched(panels[0],panels[2])){
        panels[1].unmatch();
    }
    if(panels[2].isUnmatched(panels[0],panels[1])){
        panels[2].unmatch();
    }

}

const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
];

const display = document.getElementById('display');
const displayimg = document.createElement('img');



function displayChange(){    
    if(panels[0].displayUnmatched(panels[1],panels[2])){
        displayimg.src = 'img/hazuremoji.png';
        console.log(1);
    }else if(panels[0].img.getAttribute('src') == 'img/seven.png'){
        displayimg.src = 'img/sevenmoji.png';
        console.log(2);
    }else if(panels[0].img.getAttribute('src') == 'img/bell.png'){
        displayimg.src = 'img/bellmoji.png';
        console.log(3);
    }else{
        displayimg.src = 'img/cherrymoji.png';
        console.log(4);
    }
}

let panelsLeft = 3;

const spin = document.getElementById('spin');
spin.addEventListener('click', () => {
    if(spin.classList.contains('inactive')){
        return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
        panel.activate();
        panel.spin();
    });
    //display.removeChild(display.img);
    displayimg.remove();
});



}