'use strict';

// Set animation delay time
var stepDelay = 300;
var setDelay = function() {
  stepDelay = parseInt(document.getElementById('delayTime').value);
  document.getElementById('delayTime').value = '';
  duration = 0.75*stepDelay;
}

// Construtor do Heap
var Heap = function() {
  this.storage = [];
};

// Funcao Insercao no heap
Heap.prototype.insert = function(value) {
  if (value === undefined) {
    value = parseInt(document.getElementById('inputVal').value);
    document.getElementById('inputVal').value = '';
  }
  // adiciona ao storage o valor a ser inserido no heap
  this.storage.push(value);

  // atualiza a visualizacao baseado no ultimo valor inserido
  insertNode(value);

  var that = this;

  // recursiva para fazer swaps
  var reheapify = function(index) {

    // pega indice do pai
    var parentInd = Math.ceil(index/2-1);
    // caso base : valor < pai or pai is null
    if (parentInd < 0 || that.storage[index] <= that.storage[parentInd]) {
      return 'value added to index '+index;
    }
    // recursivo: troca com o pai e faz a chamada recurs
    that.storage[index] = that.storage[index] ^ that.storage[parentInd];
    that.storage[parentInd] = that.storage[index] ^ that.storage[parentInd];
    that.storage[index] = that.storage[index] ^ that.storage[parentInd];

    // atualiza a visualizacao baseado nos valores swapados
    swapNodes(index, parentInd);

    setTimeout(function(){
      return reheapify(parentInd);
    }, stepDelay);
  };
  setTimeout(function() {
    return reheapify(that.storage.length-1);
  }, stepDelay);
};

// remove valor maximo
// remove o valor maximo, rearranja o heap e retorna o valor removido
Heap.prototype.removeMax = function() {
  // verifica se o heap esta vazio
  if (this.storage.length === 0) {
    // se nao ha nada a remover retorna null
    return null;
  } else if (this.storage.length === 1) {
    // se o heap so possui um elemento remove e retorna ele mesmo
    var removed = this.storage.pop();

    // reinicia o heap
    restoreInitial();

    return removed;
  }

  // todos os casos que o heap tem mais de um no
  // preserva o valor maximo
  var maxValue = this.storage[0];
  // substitui a raiz com o ultimo nó do heap e exclui o ultimo nó
  this.storage[0] = this.storage.pop();

  swapRoot();

  var that = this;

  // Recursive function to restore the heap property of the heap
  var reheapify = function(index) {
    // Set index of max value to current node's index
    var maxIndex = index;

    // Check first child node's value against current node
    if ((2*index + 1 < that.storage.length) && (that.storage[2*index + 1] > that.storage[index])) {
      // If greater then set index of max value to first child node's index
      maxIndex = 2*index + 1;
    }
    // Check second child node's value against current max node
    if ((2*index + 2 < that.storage.length) && (that.storage[2*index + 2] > that.storage[maxIndex])) {
      // If greater then set index of max value to second child node's index
      maxIndex = 2*index + 2;
    }
    // If the index of the max value is not equal to the index of the current node
    // Then swap the nodes and reheapify at the new index of the current node
    if (maxIndex !== index) {
      // Swap node values
      that.storage[index] = that.storage[index] ^ that.storage[maxIndex];
      that.storage[maxIndex] = that.storage[index] ^ that.storage[maxIndex];
      that.storage[index] = that.storage[index] ^ that.storage[maxIndex];

      swapNodes(maxIndex, index);

      // Reheapify at new index of current node
      setTimeout(function() {
        reheapify(maxIndex);
      }, stepDelay);
    }
  };

  // Recursively move the swapped node down the heap until it's greater than both of its children
  setTimeout(function() {
    reheapify(0);
  }, stepDelay);

  // retorna valor removido
  return maxValue;
};

// instancia o heap
var heap = new Heap();
