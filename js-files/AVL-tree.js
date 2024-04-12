class AVLTree {
    constructor(x, y) {
        this.root = new AVLNode();
        this.x = x;
        this.y = y;
    }
    
    addValue(value) {
        let shiftedNode = this.root.addValue(value);
        this.setCoordinates(shiftedNode);
    }

    setCoordinates(node) {
        if (node === this.root) {
            node.setCoordinates(this.x, this.y);
        } 
        else {
            node.setCoordinates();
        }
    }

    printTree(value) {
        this.root.printNode(1, value);
    }

    searchInTree(value) {
        return this.root.searchNode(value);
    }

    getBalanceFactor() {
        alert(`${this.root.getBalanceFactor()}`);
    }
} 