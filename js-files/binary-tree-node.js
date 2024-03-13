class Node {

    static SIZE = 40;
    static HORIZONTALSPACING = 30;
    static VERTICALSPACING = 50;

    constructor(parent = null, size = Node.SIZE) {
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.value = null;
        this.size = size;
        this.x = null;
        this.y = null;
        this.rightSpacing = 0;
        this.leftSpacing = 0;
        this.cumulativeRightSpacing = 0;
        this.cumulativeLeftSpacing = 0;
        this.colorBlue = color(8, 143, 143)
    }

    addValue(value) {
        if (this.value === null) {
            this.value = value;
            this.left = new Node(this);
            this.right = new Node(this);
            //this.drawNode(1);
            //await sleep(5000);
            return this;
        }
        else if (this.value > value) {
            let initialLeftSpacing = this.left.cumulativeRightSpacing + Node.HORIZONTALSPACING;
            let shiftedNode = this.left.addValue(value);
            this.leftSpacing = this.left.cumulativeRightSpacing + Node.HORIZONTALSPACING;
            this.cumulativeLeftSpacing = this.left.cumulativeLeftSpacing + this.leftSpacing;
            if (this.leftSpacing !== initialLeftSpacing) {
                return this.left;
            }
            return shiftedNode;
        }
        else {
            let initialRightSpacing = this.left.cumulativeLeftSpacing + Node.HORIZONTALSPACING;
            let shiftedNode = this.right.addValue(value);
            this.rightSpacing = this.right.cumulativeLeftSpacing + Node.HORIZONTALSPACING;
            this.cumulativeRightSpacing = this.right.cumulativeRightSpacing + this.rightSpacing;
            if (this.rightSpacing !== initialRightSpacing) {
                return this.right;
            }
            return shiftedNode;
        }
    }

    setCoordinates(x, y) {
        if (this.value !== null) {
            if (typeof x === "undefined" && typeof y === "undefined") {
                if (this.value < this.parent.value) {
                    this.x = this.parent.x - this.parent.leftSpacing;
                } 
                else {
                    this.x = this.parent.x + this.parent.rightSpacing;
                }
                this.y = this.parent.y + Node.VERTICALSPACING;
            } 
            else {
                this.x = x;
                this.y = y;
            }
            this.left.setCoordinates();
            this.right.setCoordinates();
        }
    }

    drawNode(mode = 0) {
        if (this.left.value !== null) {
            line(this.x, this.y, this.left.x, this.left.y);
        }
        if (this.right.value !== null) {
            line(this.x, this.y, this.right.x, this.right.y);
        }
        if (mode == 1) {
            fill(this.colorBlue);
        }
        else if (mode == 2) {
            fill(this.colorGreen);
        }
        else {
            fill(255);
        }
        ellipse(this.x,this.y,this.size,this.size);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(this.size - 15);
        text(this.value,this.x,this.y+1);
    }

    printNode() {
        this.drawNode();
        if (this.left.value !== null) {
            this.left.printNode();
        }
        if (this.right.value !== null) {
            this.right.printNode();
        }
    }

    searchNode(value) {
        if (value == this.value) {
            alert('This value is already in Tree');
            return false;
        }
        else if (value < this.value) {
            if (this.left === null) {
                return true;
            }
            return this.left.searchNode(value);
        }
        else if (value > this.value) {
            if (this.right === null) {
                return true;
            }
            return this.right.searchNode(value);
        }
    }

} 

