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
  }

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
  // Print out all elements in level, pre, post, and in order.
  // console.log("Level Order Elements:");
  // testTree.levelOrder((node) => console.log(node.value));
  console.log("Pre Order Elements:");
  testTree.preOrder((node) => console.log(node.value));

  // Unbalance the tree by adding several numbers > 100.
  // Confirm that the tree is unbalanced by calling isBalanced.
  // Balance the tree by calling rebalance.
  // Confirm that the tree is balanced by calling isBalanced.
  // Print out all elements in level, pre, post, and in order.
};

driver();
