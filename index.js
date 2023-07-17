//Making a Binary Search Tree

//Tree is almost working but the 45 has a red child, t


//Rules <---
//1. Every left child has a smaller value that its parent 
//2. That every right child is larger than its parent
//3. That each node only contains 0-2 children
//Rules <--- That make it a Red-Black Tree
//1. Every Nod is either red or black
//2. All NIL nodes are codisdered black
//3. A red node does not have a red child
//4. Every path from a given node to any of its decendants NIL nodes fo through the same number of black nodes.
//5. If a node N has exactly on child, it must be a red child, because if it were black, its NIL descendants would set at a diffrent depth than N's NIL child (violating rule 4) 
//6. Every Root Node is Black
//7. All leaves( null values/Nil) are black,
//8. If a node is red Both Children are Black
//9. 


//this.left and this.right are null because the data when created has no childred. They get assigned. New nodes are always red.
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.color = 'red';
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }
    leftRotate(node) {
        let tempNode = node.right
        node.right = tempNode.left
        tempNode.left = node
        tempNode.color = node.color
        node.color = 'red'
        return tempNode
    }
    rightRotate(node) {
        let tempNode = node.left
        node.left = tempNode.right
        tempNode.left = node
        tempNode.color = node.color
        tempNode.color = 'red'
        return tempNode
    }
    flipNodeColor(node) {
        node.color = node.color === 'red' ? 'black': 'red';
        node.left.color = node.left.color === 'red' ? 'black': 'red';
        node.right.color = node.right.color === 'red' ? 'black': 'red';
    }
    //Check the color of the node
    isNodeRed(node) {
        if (node === null) return false;
        return node.color === 'red'
    }

    insert(data) {
        let newNode = new Node(data)
        if (this.root === null) {
            this.root = newNode;
            this.root.color = 'black'
        } else {
            this.root = this.insertNode(this.root, newNode)
        }
    }
    //<---- After the node in inserted, there are 4 cases to the tree Balanced.
    // 1. (Uncle Node is color Red) Recolor the parent and the uncle as black and the grandparent as red. then treat the grandparent as a new node.
    // 2. (Uncle Node is Black an d new node is a right child) Do a left rotation on the parent which makes the new node the parent and the old parents the left child of th new one. 
    // 3. (Uncle Node is Black) This is the scenario where the new node is added in the between two black nodes. In this case the new nodes needs to be colored as red. 
    insertNode(node, newNode) {
        if (node === null) {
            return newNode;
        }
    
        if (newNode.data < node.data) {
            node.left = this.insertNode(node.left, newNode);
        } else if (newNode.data > node.data) {
            node.right = this.insertNode(node.right, newNode);
            console.log(`'Node ${node.data} has been created.'`)
        }
    
        if (this.isNodeRed(node.right) && !this.isNodeRed(node.left) && (!node.left || !this.isNodeRed(node.left.left))) {
            node = this.leftRotate(node);
            console.log(`'Node ${node.data} has been leftRotate'`)
        }

        if (this.isNodeRed(node.left) && this.isNodeRed(node.left.left) && !this.isNodeRed(node.right)) {
            node = this.rightRotate(node);
            console.log(`'Node ${node.data} has been rightRotate'`)
        }
    
        if (this.isNodeRed(node.left) && this.isNodeRed(node.right)) {
            this.flipNodeColor(node);
            console.log(`'Node ${node.data} color has been flipped'`)
        }
        return node
    }
}


//Adding a delete operation to the node tree. How To
//1. Node to be deleted is a leaf node. Just remove the node. If its a black node fix the Red-Black tree Property
//2. Node to be deleted has only one child Replace the node with its child and recolor the node as black.  If its a black node fix the Red-Black tree Property
//3. Node to be delteted has two children. Find the in order sucessor and predecessor and replace the node with it. Then, delte and replace the old nides position





//<-----Duplicate numbers arent working. I think data needs to be cleaned. Maybe use a hash table?
//Seed data for RedBlackTree
const RBT = new RedBlackTree();
RBT.insert(11);
RBT.insert(2);
RBT.insert(14);
RBT.insert(1);
RBT.insert(7);
RBT.insert(15);
RBT.insert(5);
RBT.insert(8);
RBT.insert(4);
RBT.insert(150);
RBT.insert(23);
RBT.insert(18);
RBT.insert(41);
RBT.insert(55);
RBT.insert(85);
RBT.insert(49);
RBT.insert(151);
RBT.insert(25);
RBT.insert(12);
RBT.insert(45);

orderedPrint(RBT.root);
// console.log(RBT.root)


//Moving Through the tree.
//left node is logged before the right because of rule 1
//if statement is used to loop because of a binary choice (binary choice is fast)
//What it's saying is if node isnt null, then check left, loft then check right, if not empty then 
function orderedPrint(node) {
    if (node !== null) {
        orderedPrint(node.left)
        console.log(node.data)
        orderedPrint(node.right)
        console.log('Node data: ', `${node.data}`)
    }
}

function printTree(node, level = 0) {
    if (node === null) {
        return;
    }
    let indent = " ".repeat(level * 4);
    console.log(indent + node.data + " (" + node.color + ")");
    printTree(node.left, level + 1);
    printTree(node.right, level + 1);
}


//prints the tree
printTree(RBT.root);
