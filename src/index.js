class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.sortArray(arr);
    this.root = this.buildTree(this.arr);
  }

  sortArray(arr) {
    return [...new Set(arr)].sort((a, b) => a - b);
  }

  buildTree(arr) {
    let len = arr.length;
    if (len === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);

    // Left subtree gets elements before mid
    root.left = this.buildTree(arr.slice(0, mid));
    // Right subtree gets elements after mid
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert() {}

  deleteItem() {}

  find() {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const generateRandomArray = () => {};

const driver = () => {
  const arr = generateRandomArray();
  const testTree = new Tree(arr);
  prettyPrint(testTree.root);

  // Call isBalanced()
  // Print out all elements in level, pre, post, and in order.
  // Unbalance the tree by adding several numbers > 100.
  // Confirm that the tree is unbalanced by calling isBalanced.
  // Balance the tree by calling rebalance.
  // Confirm that the tree is balanced by calling isBalanced.
  // Print out all elements in level, pre, post, and in order.
};

driver();
