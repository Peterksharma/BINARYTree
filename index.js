import chalk from 'chalk';

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.color = 'red';
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    leftRotate(node) {
        if (!node || !node.right) return node;
        
        const rightChild = node.right;
        node.right = rightChild.left;
        
        if (rightChild.left) {
            rightChild.left.parent = node;
        }
        
        rightChild.parent = node.parent;
        
        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }
        
        rightChild.left = node;
        node.parent = rightChild;
        
        return rightChild;
    }

    rightRotate(node) {
        if (!node || !node.left) return node;
        
        const leftChild = node.left;
        node.left = leftChild.right;
        
        if (leftChild.right) {
            leftChild.right.parent = node;
        }
        
        leftChild.parent = node.parent;
        
        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }
        
        leftChild.right = node;
        node.parent = leftChild;
        
        return leftChild;
    }

    insert(data) {
        this.size++;
        const newNode = new Node(data);
        
        if (!this.root) {
            this.root = newNode;
            this.root.color = 'black';
            return;
        }

        let current = this.root;
        let parent = null;

        while (current) {
            parent = current;
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        newNode.parent = parent;
        if (data < parent.data) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        this.fixInsert(newNode);
    }

    fixInsert(node) {
        while (node.parent && node.parent.color === 'red') {
            if (node.parent === node.parent.parent?.left) {
                const uncle = node.parent.parent.right;
                
                if (uncle?.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.leftRotate(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rightRotate(node.parent.parent);
                }
            } else {
                const uncle = node.parent.parent?.left;
                
                if (uncle?.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rightRotate(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.leftRotate(node.parent.parent);
                }
            }
            if (node === this.root) break;
        }
        this.root.color = 'black';
    }

    printTree() {
        console.log('\n' + chalk.cyan('=== Red-Black Tree Visualization ===\n'));
        this._printTreeHelper(this.root, '', true);
        console.log('\n' + chalk.green(`Tree size: ${this.size} nodes\n`));
    }

    _printTreeHelper(node, prefix, isLeft) {
        if (!node) return;

        const nodeStr = `${node.data}${node.color === 'red' ? '*' : ''}`;
        const colorFn = node.color === 'red' ? chalk.red : chalk.white;
        const branch = isLeft ? '└── ' : '┌── ';
        const nextPrefix = prefix + (isLeft ? '    ' : '│   ');

        console.log(prefix + branch + colorFn(nodeStr));

        this._printTreeHelper(node.right, nextPrefix, false);
        this._printTreeHelper(node.left, nextPrefix, true);
    }

    getPerformanceMetrics() {
        const metrics = {
            treeHeight: this._getHeight(this.root),
            totalNodes: this.size,
            blackHeight: this._getBlackHeight(this.root),
            isBalanced: this._checkBalance(),
            maxDepth: this._getMaxDepth(this.root),
            minDepth: this._getMinDepth(this.root)
        };

        console.log(chalk.yellow('\nTree Performance Metrics:'));
        console.log(chalk.yellow('======================='));
        Object.entries(metrics).forEach(([key, value]) => {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
            console.log(chalk.cyan(formattedKey + ':'), value);
        });
        console.log(chalk.yellow('=======================\n'));
    }

    _getHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    }

    _getBlackHeight(node) {
        if (!node) return 0;
        const leftHeight = this._getBlackHeight(node.left);
        const rightHeight = this._getBlackHeight(node.right);
        return Math.max(leftHeight, rightHeight) + (node.color === 'black' ? 1 : 0);
    }

    _getMaxDepth(node) {
        if (!node) return 0;
        return 1 + Math.max(this._getMaxDepth(node.left), this._getMaxDepth(node.right));
    }

    _getMinDepth(node) {
        if (!node) return 0;
        return 1 + Math.min(this._getMinDepth(node.left), this._getMinDepth(node.right));
    }

    _checkBalance() {
        const blackHeights = new Set();
        
        const checkPathBlackHeight = (node, blackCount) => {
            if (!node) {
                blackHeights.add(blackCount);
                return;
            }
            
            const newCount = blackCount + (node.color === 'black' ? 1 : 0);
            checkPathBlackHeight(node.left, newCount);
            checkPathBlackHeight(node.right, newCount);
        };
        
        checkPathBlackHeight(this.root, 0);
        return blackHeights.size === 1;
    }
}

// Test the tree
const tree = new RedBlackTree();

console.log(chalk.cyan('\nInserting nodes...\n'));
[11, 2, 14, 1, 7, 15, 5, 8, 4, 150, 23, 18, 41, 55, 85, 49, 151, 25, 12, 45]
    .forEach(num => {
        tree.insert(num);
        console.log(chalk.green(`Inserted ${num}`));
    });

tree.printTree();
tree.getPerformanceMetrics();

console.log(chalk.cyan('Legend:'));
console.log(chalk.white('White nodes: Black'));
console.log(chalk.red('Red nodes: Red (marked with *)'));