/// <reference path='../node_modules/@types/howler/index.d.ts' />
/// <reference path='../node_modules/@types/tween.js/index.d.ts' />

var loaded:number = 0;
var object:{value:number} = {value:0};

var sounds:Howl[] = [
    new Howl({src: ['sound/Music_Layer_1.ogg'], onload:load, loop: true}),
    new Howl({src: ['sound/Music_Layer_2.ogg'], onload:load, loop: true}),
    new Howl({src: ['sound/Music_Layer_3.ogg'], onload:load, loop: true}),
    new Howl({src: ['sound/Music_Layer_4.ogg'], onload:load, loop: true}),
    new Howl({src: ['sound/Music_Layer_5.ogg'], onload:load, loop: true})
];

var loadingBar:HTMLDivElement = <HTMLDivElement>document.getElementById('loading-bar');

var containers:HTMLDivElement[] = [
    <HTMLDivElement>document.getElementById('container1'),
    <HTMLDivElement>document.getElementById('container2')
];

var progressBars:HTMLDivElement[] = [
    <HTMLDivElement>document.getElementById('track1'),
    <HTMLDivElement>document.getElementById('track2'),
    <HTMLDivElement>document.getElementById('track3'),
    <HTMLDivElement>document.getElementById('track4'),
    <HTMLDivElement>document.getElementById('track5')
];

function soundLevel(progress:number):void {
    let numberOfSegments:number = sounds.length - 1;
    let segment:number = Math.floor((progress / 100) * numberOfSegments);
    let segmentSize:number = 100 / numberOfSegments
    let segmentMin:number = segment * segmentSize;
    
    progress = (progress - segmentMin) / segmentSize;

    let percentage:number = progress * 100;

    for(let index in progressBars) {
        let progressBar:HTMLDivElement = progressBars[index];
        let sound:Howl = sounds[index];
        let volume:number;

        if(+index == segment) {
            progressBar.style.width = (100 - percentage) + '%';
            volume = 1 - progress;
        }
        else if(+index == segment + 1) {
            progressBar.style.width = percentage + '%';
            volume = progress;
        }
        else {
            progressBar.style.width = '0';
            volume = 0;
        }
        sound.volume(volume);
    }
}

function tweenFunc(sliderValue:number):void {
    TWEEN.removeAll();
    let tween:TWEEN.Tween =  new TWEEN.Tween(object)
        .to({value:sliderValue}, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(() => {
            soundLevel(object.value);
        }
    ).start();
}

function update(slider:HTMLInputElement):void {
    tweenFunc(+slider.value);
}

function load():void {
    if(++loaded == sounds.length) {
        for(let sound of sounds) {
            sound.play();
        }
        containers[0].hidden = true;
        containers[1].hidden = false;
        soundLevel(0);
    }
    loadingBar.style.width = (loaded / sounds.length) * 100 + '%';
}

animate();
function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
}
