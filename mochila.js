const prompt = require("prompt-sync")();

let backpackCapacity = prompt("Enter the backpack capacity: ");
let elementAmount = prompt("Enter the amount of elements: ");

//Simulando una tupla con objetos
let elements = [];

/* [
    { weight: 5, value: 6 },
    { weight: 4, value: 5 },
    { weight: 3, value: 4 },
    { weight: 2, value: 3 },
  ] */

for (let i = 0; i < elementAmount; i++) {
  let weight = prompt(`Enter the weight of the element N°${i + 1}: `);
  let value = prompt(`Enter the value of the element N°${i + 1}: `);

  elements.push({ weight: parseInt(weight), value: parseInt(value) });
}

let filteredElements = elements
  .filter((element) => element.weight <= parseInt(backpackCapacity)) // Filtrar elementos que no se pueden llevar
  .sort((a, b) => a.weight - b.weight); // Ordenar elementos por peso ascendente

let { totalValue, backpack } = filteredElements.reduce(
  (acc, element) => {
    if (acc.currentWeight + element.weight <= parseInt(backpackCapacity)) {
      // Si se puede llevar el elemento seleccionado porque no se pasa del peso de la mochila

      filteredElements.forEach((felement, index) => {
        // Recorrer los elementos filtrados para comparar con el elemento seleccionado y ver si hay una mejor opción
        if (
          felement.value > element.value && // Si el valor del elemento filtrado es mayor al elemento seleccionado y su peso sumado al acumulado no se pasa del peso de la mochila
          felement.weight + acc.currentWeight <= parseInt(backpackCapacity)
        ) {
          acc.backpack.push(felement);
          acc.totalValue += felement.value;
          acc.currentWeight += felement.weight;
          filteredElements.splice(index, 1); // Eliminar elemento de la lista de elementos filtrados
        } else {
          acc.backpack.push(element); // Agregar elemento a la mochila
          acc.totalValue += element.value; // Sumar su valor al valor total
          acc.currentWeight += element.weight; // Sumar su peso al peso total
        }
      });
    }
    return acc;
  },
  { totalValue: 0, currentWeight: 0, backpack: [] }
);

console.log("Elementos seleccionados: ", backpack);
console.log("Valor total: ", totalValue);
