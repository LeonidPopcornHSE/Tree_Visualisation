class SplayNode {
    
    static SIZE = 45;
    static HORIZONTALSPACING = 30;
    static VERTICALSPACING = 50;

    constructor(parent = null, value = null, size = SplayNode.SIZE) {
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.value = value;
        this.size = size;
        this.x = null;
        this.y = null;
        this.rightSpacing = 0;
        this.leftSpacing = 0;
        this.cumulativeRightSpacing = 0;
        this.cumulativeLeftSpacing = 0;
        this.colorBlue = color(8, 143, 143);
        this.colorGreen = color(34, 139, 34);
    }

    setSpacing() {
        if (this.left.value != null) {
            this.left.setSpacing();
        }
        if (this.right.value != null) {
            this.right.setSpacing();
        }
        if (this.left.value == null && this.right.value == null) {
            this.cumulativeLeftSpacing = 0;
            this.cumulativeRightSpacing = 0;
            this.leftSpacing = 0;
            this.rightSpacing = 0;
        }
        else {
            if (this.left.value) {
                this.cumulativeLeftSpacing = this.left.cumulativeLeftSpacing + this.left.cumulativeRightSpacing + SplayNode.HORIZONTALSPACING;
                this.leftSpacing = this.left.cumulativeRightSpacing + SplayNode.HORIZONTALSPACING;
            }
            else {
                this.cumulativeLeftSpacing = 0;
                this.leftSpacing = 0;
            }
            if (this.right.value) {
                this.cumulativeRightSpacing = this.right.cumulativeLeftSpacing + this.right.cumulativeRightSpacing + SplayNode.HORIZONTALSPACING;
                this.rightSpacing = this.right.cumulativeLeftSpacing + SplayNode.HORIZONTALSPACING;
            }
            else {
                this.cumulativeRightSpacing = 0;
                this.rightSpacing = 0;
            }
        }

    }

    rotateRight() {
        let parent = this.parent;
        this.parent = this.left;
        this.parent.parent = parent;
        if (this.parent.parent !== null) {
            if (this.parent.parent.value < this.value) {
                this.parent.parent.right = this.left;
            }
            else {
                this.parent.parent.left = this.left;
            }
        }
        this.left = this.parent.right;
        this.parent.right = this;
        this.left.parent = this;
    }

    rotateLeft() {
        let parent = this.parent;
        this.parent = this.right;
        this.parent.parent = parent;
        if (this.parent.parent !== null) {
            if (this.parent.parent.value < this.value) {
                this.parent.parent.right = this.right;
            }
            else {
                this.parent.parent.left = this.right;
            }
        }
        this.right = this.parent.left;
        this.parent.left = this;
        this.right.parent = this;
    }

    insert(value) {
        if (this.value === null) {
            this.value = value;
            this.left = new SplayNode(this);
            this.right = new SplayNode(this);
            return this;
        }
        if (value < this.value) {
            return this.left.insert(value);
        } 
        else if (value > this.value) {
            return this.right.insert(value);
        }
    }
    
    splay(node) {
        while (node.parent) {
            if (!node.parent.parent) {
                if (node === node.parent.left) {
                    node.parent.rotateRight();
                } else {
                    node.parent.rotateLeft();
                }
            } else {
                const parent = node.parent;
                const grandparent = parent.parent;
                if (node === parent.left && parent === grandparent.left) {
                    grandparent.rotateRight();
                    parent.rotateRight();
                } else if (node === parent.right && parent === grandparent.right) {
                    grandparent.rotateLeft();
                    parent.rotateLeft();
                } else if (node === parent.right && parent === grandparent.left) {
                    parent.rotateLeft();
                    grandparent.rotateRight();
                } else {
                    parent.rotateRight();
                    grandparent.rotateLeft();
                }
            }
        }
    }

    findElement(value) {
        let element = this;
        while (this.value !== value) {
            if (value < this.value) {
                element = this.left.findElement(value);
            }
            else if (value > this.value) {
                element = this.right.findElement(value);
            }
        }
        return element;
    }

    checkTree() {
        console.log(this);
        if (this.left.value) {
            this.left.checkTree();
        }
        if (this.right.value) {
            this.right.checkTree();
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
                this.y = this.parent.y + SplayNode.VERTICALSPACING;
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
        textSize(this.size - 20);
        text(this.value,this.x,this.y+1);
    }

    printNode(mode, value = null) {
        if (((this.left.value === null) && (this.right.value === null) && (value !== null)) || (this.value == value)) {
            this.drawNode(2);
        }
        else if (value === null) {
            this.drawNode(0);
        }
        else {
            this.drawNode(mode);
        }
        if (this.left.value !== null) {
            if (this.value > value) {
                this.left.printNode(1, value);
            }
            else if (this.value <= value) {
                this.left.printNode(0);
            }
        }
        if (this.right.value !== null) {
            if (this.value >= value) {
                this.right.printNode(0);
            }
            else if (this.value < value) {
                this.right.printNode(1, value);
            }
        }
    }

    searchNode(value, mode) {
        if (value == this.value && mode == 1) {
            document.getElementById('notification').innerText = value + ' is already in Tree!';
            setTimeout(function() {
                document.getElementById('notification').innerText = '';
            }, 3000)
            return false;
        }
        else if (value == this.value && mode == 0) {
            return this;
        }
        else if (value < this.value) {
            if (this.left === null) {
                return this;
            }
            return this.left.searchNode(value, mode);
        }
        else if (value > this.value) {
            if (this.right === null) {
                return this;
            }
            return this.right.searchNode(value, mode);
        }
    }

}
