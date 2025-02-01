document.querySelector(".control-buttons span").onclick = function(){
    let YourName = prompt("Whats Your Name");
    
    if(YourName == null || YourName == ""){
        document.querySelector(".name span").innerHTML = 'Unknown';
    }else{
        document.querySelector(".name span").innerHTML = YourName;
    }
    document.querySelector(".control-buttons").remove();
}

let Duration = 1000;

let BlocksContainer = document.querySelector(".memory-game-blocks");

let Blocks = Array.from(BlocksContainer.children);

let OrderRange = [...Array(Blocks.length).keys()];

Shuffle(OrderRange);

Blocks.forEach((block, index) => {
    block.style.order = OrderRange[index]; 

    block.addEventListener('click',function(){
        FlipBlock(block);
    })
})

function FlipBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');

    let AllFlippedBlocks = Blocks.filter(FlippedBlocks => FlippedBlocks.classList.contains('is-flipped'));

    if(AllFlippedBlocks.length == 2){

        StopClicking();

        CheckMatchedBlocks(AllFlippedBlocks[0], AllFlippedBlocks[1]);
    }
}

function StopClicking(){
    BlocksContainer.classList.add(`no-clicking`);

    setTimeout(() => {
        BlocksContainer.classList.remove(`no-clicking`);
    }, Duration)
}

function CheckMatchedBlocks(firstblock, secondblock){

    let TriesElement = document.querySelector(".tries span");

    if(firstblock.dataset.technology === secondblock.dataset.technology ){

        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');

        firstblock.classList.add('has-match');
        secondblock.classList.add('has-match');
    }else{
        TriesElement.innerHTML = parseInt(TriesElement.innerHTML) + 1;

        setTimeout(() => {

            firstblock.classList.remove('is-flipped');
            secondblock.classList.remove('is-flipped');

        },Duration);

    }

}

function Shuffle(array){
    let Current = array.length,
        Temp,
        Random;

    while(Current > 0){
        Random = Math.floor(Math.random() * Current);

        Current--;

        Temp = array[Current];

        array[Current] = array[Random];

        array[Random] = Temp;
    }
    return array;
}
