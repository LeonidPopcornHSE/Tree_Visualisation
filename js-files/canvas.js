let CANVASWIDTH = window.innerWidth;
let CANVASHEIGHT = window.innerHeight;

let TREEX = CANVASWIDTH / 2;
let TREEY = 100;

function setup() {
    createCanvas(CANVASWIDTH, CANVASHEIGHT);
    background(220);
    var tree = new Tree(TREEX, TREEY);
    document.querySelector('.add-button').addEventListener('click', function(event){
        let nodeValue = eval(document.querySelector('.input-value').value);
        if (tree.searchInTree(nodeValue)) {
            tree.addValue(nodeValue);
        }
        document.querySelector('.input-value').value = '';
        clear();
        background(220);
        tree.printTree();
    });
}
 
