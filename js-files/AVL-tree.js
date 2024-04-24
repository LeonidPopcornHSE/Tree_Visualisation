class AVLTree {
    constructor(x, y) {
        this.root = new AVLNode();
        this.x = x;
        this.y = y;
    }
    
    addValue(value) {
        this.root = this.root.insert(value);
        this.root.setSpacing(value);
        this.setCoordinates();
    }

    checkTree() {
        this.root.checkTree();
    }

    setCoordinates() {
        this.root.setCoordinates(this.x, this.y);
    }

    printTree(value) {
        this.root.printNode(1, value);
    }

    searchInTree(value) {
        return this.root.searchNode(value, 1);
    }

} 