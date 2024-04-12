let CANVASWIDTH = window.innerWidth;
let CANVASHEIGHT = window.innerHeight;

let TREEX = CANVASWIDTH / 2;
let TREEY = 100;

function setup() {
    createCanvas(CANVASWIDTH, CANVASHEIGHT);
    background(220);
    var tree = new Tree(TREEX, TREEY);
    document.querySelector('.add-button').addEventListener('click', function(event){
        let array = (document.querySelector('.input-value').value).split(',');
        let nodeValue;
        for (let i = 0; i < array.length; i++) {
            nodeValue = eval(array[i]);
            if (tree.searchInTree(nodeValue)) {
                tree.addValue(nodeValue);
                clear();
                background(220);
                tree.printTree(nodeValue);
                tree.getBalanceFactor();
            }
        }
        document.querySelector('.input-value').value = '';
    });
    document.querySelector('.clear-tree-button').addEventListener('click', function(event){
        tree = null;
        clear();
        background(220);
        tree = new Tree(TREEX, TREEY);
    });
}



 
