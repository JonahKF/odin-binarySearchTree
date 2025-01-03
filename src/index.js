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

  insert(value) {
    const recursiveInsert = (root, value) => {
      if (root === null) return new Node(value);
      if (root.value === value) return root;

      if (value < root.value) {
        root.left = recursiveInsert(root.left, value);
      } else if (value > root.value) {
        root.right = recursiveInsert(root.right, value);
      }

      return root;
    };

    this.root = recursiveInsert(this.root, value);
  }

  deleteItem(value) {
    const getSuccessor = (currentNode) => {
      currentNode = currentNode.right;
      while (currentNode !== null && currentNode.left !== null) {
        currentNode = currentNode.left;
      }
      return currentNode;
    };

    const recursiveDelete = (root, value) => {
      if (root === null) return root;
      if (root.value > value) {
        root.left = recursiveDelete(root.left, value);
      } else if (root.value < value) {
        root.right = recursiveDelete(root.right, value);
      } else {
        // If value matches
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;
        let successor = getSuccessor(root);
        root.value = successor.value;
        root.right = recursiveDelete(root.right, successor.value);
      }
      return root;
    };

    this.root = recursiveDelete(this.root, value);
  }

  find(value) {
    const recursiveFind = (root, value) => {
      if (root === null || root.value === value) return root;
      if (value < root.value) {
        return recursiveFind(root.left, value);
      } else {
        return recursiveFind(root.right, value);
      }
    };

    return recursiveFind(this.root, value);
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    let queue = [];
    if (this.root === null) return;

    queue.push(this.root);
    while (queue.length != 0) {
      let currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const recursiveInOrder = (root, callback) => {
      if (root === null) return;
      recursiveInOrder(root.left, callback);
      callback(root);
      recursiveInOrder(root.right, callback);
    };

    recursiveInOrder(this.root, callback);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const recursivePreOrder = (root, callback) => {
      if (root === null) return;
      callback(root);
      recursivePreOrder(root.left, callback);
      recursivePreOrder(root.right, callback);
    };

    recursivePreOrder(this.root, callback);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const recursivePostOrder = (root, callback) => {
      if (root === null) return;
      recursivePostOrder(root.left, callback);
      recursivePostOrder(root.right, callback);
      callback(root);
    };

    recursivePostOrder(this.root, callback);
  }

  height(node) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    const recursiveDepth = (root, node, currentDepth = 0) => {
      if (root === null) return -1;
      if (root === node) return currentDepth;
      if (node.value < root.value) {
        return recursiveDepth(root.left, node, currentDepth + 1);
      } else {
        return recursiveDepth(root.right, node, currentDepth + 1);
      }
    };

    return recursiveDepth(this.root, node);
  }

  isBalanced() {
    // A balanced tree is one where the difference between heights of the
    // left subtree and the right subtree of every node is not more than 1.
    const checkBalance = (node) => {
      if (node === null) return true;

      let heightDiff = Math.abs(
        this.height(node.left) - this.height(node.right),
      );

      return heightDiff <= 1 &&
        checkBalance(node.left) &&
        checkBalance(node.right)
        ? true
        : false;
    };

    return checkBalance(this.root);
  }

  rebalance() {
    let values = [];
    this.inOrder((node) => values.push(node.value));

    this.arr = this.sortArray(values);
    this.root = this.buildTree(this.arr);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const generateRandomArray = (size) => {
  let arr = [];
  for (let n = 1; n <= size; n++) {
    let num = Math.floor(Math.random() * 100);
    arr.push(num);
  }
  return arr;
};

const driver = () => {
  const randArrSize = 12;
  const arr = generateRandomArray(randArrSize);
  const testTree = new Tree(arr);
  prettyPrint(testTree.root);

  // Call isBalanced()
  console.log("Is balanced?", testTree.isBalanced());

  // Print out all elements in level, pre, post, and in order.
  console.log("Level Order Elements:");
  testTree.levelOrder((node) => console.log(node.value));
  console.log("Pre Order Elements:");
  testTree.preOrder((node) => console.log(node.value));
  console.log("Post Order Elements:");
  testTree.postOrder((node) => console.log(node.value));
  console.log("In Order Elements:");
  testTree.inOrder((node) => console.log(node.value));

  // Unbalance the tree by adding several numbers > 100.
  testTree.insert(100);
  testTree.insert(101);
  testTree.insert(102);
  testTree.insert(103);

  // Confirm that the tree is unbalanced by calling isBalanced.
  prettyPrint(testTree.root);
  console.log("Is balanced?", testTree.isBalanced());

  // Balance the tree by calling rebalance.
  testTree.rebalance();

  // Confirm that the tree is balanced by calling isBalanced.
  prettyPrint(testTree.root);
  console.log("Is balanced?", testTree.isBalanced());

  // Print out all elements in level, pre, post, and in order.
  console.log("Level Order Elements:");
  testTree.levelOrder((node) => console.log(node.value));
  console.log("Pre Order Elements:");
  testTree.preOrder((node) => console.log(node.value));
  console.log("Post Order Elements:");
  testTree.postOrder((node) => console.log(node.value));
  console.log("In Order Elements:");
  testTree.inOrder((node) => console.log(node.value));
};

driver();
