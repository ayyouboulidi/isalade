const formula = [
    { id: 'formule5', label: '5 Ingrédients & 1 Toppings', price: 29, maxIngr: 5, maxToppings: 1 },
    { id: 'formule9', label: '9 Ingrédients & 2 Toppings', price: 49, maxIngr: 9, maxToppings: 2  },
    { id: 'formule28', label: '28 Ingrédients & 4 Toppings', price: 79, maxIngr: 28, maxToppings: 4  },
    { id: 'formule34', label: '34 Ingrédients & 5 Toppings', price: 120, maxIngr: 34, maxToppings: 5  }
];
const bases = [
    { id: 'rice', label: 'Riz' },
    { id: 'pasta', label: 'Pâtes' },
    { id: 'ebly', label: 'Ebly' },
    { id: 'quiona', label: 'Quiona', supp: true }
];
const ingredients = [
    { id: 'cucumber', label: 'Concombre' },
    { id: 'potato', label: 'Pomme de terre' },
    { id: 'tomato', label: 'Tomates' },
    { id: 'poivron', label: 'Poivrons' },
    { id: 'mais', label: 'Maïs' },
    { id: 'champignons', label: 'Champignons' },
    { id: 'olives', label: 'Olives' },
    { id: 'onions', label: 'Oignons' },
    { id: 'bettrave', label: 'Bettrave' },
    { id: 'avocado', label: 'Avocat' },
];
const toppings = [
    { id: 'surimi', label: 'Surimi' },
    { id: 'chicken', label: 'Poulet' },
    { id: 'mozza', label: 'Mozzarella' },
    { id: 'emmeental', label: 'Emmental' },
    { id: 'tuna', label: 'Thon' },
    { id: 'crouton', label: 'Croûtons' },
    { id: 'eggs', label: 'Oeufs' },
    { id: 'salmon', label: 'Saumon' },
];

const sauces = [
    { id: 'ketchup', label: 'Ketchup' },
    { id: 'mostard', label: 'Moutarde' },
    { id: 'mayo', label: 'Mayonnaise' }
];

export default {
    formula,
    bases,
    ingredients,
    toppings,
    sauces
};
  