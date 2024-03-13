class Tree {
    constructor(x, y) {
        this.root = new Node();
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

    printTree() {
        this.root.printNode();
    }

    searchInTree(value) {
        return this.root.searchNode(value);
    }
}  