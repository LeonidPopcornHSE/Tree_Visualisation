class SplayTree {
    constructor(x, y) {
        this.root = new SplayNode();
        this.newNode = new SplayNode();
        this.x = x;
        this.y = y;
    }
    
    addValue(value) {
        if (this.root.value === null) {
            this.root = this.root.insert(value);
        }
        else {
            this.newNode = this.root.insert(value);
        }
        if (this.newNode.value) {
            this.root.splay(this.newNode);
            this.root = this.newNode;
        }
        this.root.checkTree();
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