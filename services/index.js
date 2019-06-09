/**
 * API Sample
 * [
        {
            id: 1,
            name: "salade",
            description: null,
            img_path: "assets/images/products_types/1.jpg"
        },
        {
            id: 2,
            name: "offre spécial",
            description: null,
            img_path: "assets/images/products_types/2.jpg"
        }
    ]
 */
export function getAllProductsTypes() {
    return fetch('https://isaladeapi.herokuapp.com/products/types');
}

/**
 * 
 * [
        {
            id: 125,
            name: "Petite",
            description: "Maximum 6 Ingrédients + 1 Toppings",
            img_path: "/assets/images/products/1.jpg",
            price: 29,
            availability: 1,
            max_ingredients: 6,
            max_toppings: 1,
            product_type_id: 1,
            created_at: null,
            updated_at: null,
            type_product_name: "salade"
        },
        {
            id: 126,
            name: "Moyenne",
            description: "Maximum 9 Ingrédients + 2 Toppings",
            img_path: "/assets/images/products/1.jpg",
            price: 49,
            availability: 1,
            max_ingredients: 9,
            max_toppings: 2,
            product_type_id: 1,
            created_at: null,
            updated_at: null,
            type_product_name: "salade"
        },
    ]
 * @param {string} id 
 */
export function getListProducts(id) {
    return fetch('https://isaladeapi.herokuapp.com/products/liste/' + id);
}

/**
 * [
        {
            id: 1,
            label: "base",
            description: null,
            img_path: null
        },
        {
            id: 2,
            label: "ingredient",
            description: null,
            img_path: null
        },
        {
            id: 3,
            label: "topping",
            description: null,
            img_path: null
        },
        {
            id: 4,
            label: "sauce",
            description: null,
            img_path: null
        }
    ]
 */
export function getAllComponentsTypes() {
    return fetch('https://isaladeapi.herokuapp.com/components/types');
}

/**
 * [
        {
            id: 1,
            name: "EBLY",
            description: "assets/images/assets/images/components/1_2.jpg",
            img_path: "assets/images/assets/images/components/1_1.jpg",
            price: 2,
            availability: 1,
            type_component_id: 1
        }
    ]
 * 
 * @param {string} id 
 */
export function getListComponents(id) {
    return fetch('https://isaladeapi.herokuapp.com/components/liste/' + id);
}

/**
 * API Sample
 * [
        {
            id: 1,
            name: "livraison",
            description: ""
        },
        {
            id: 2,
            name: "emporter",
            description: ""
        },
        {
            id: 3,
            name: "table",
            description: ""
        }
    ]
 */
export function getAllTypesCommand() {
    return fetch('https://isaladeapi.herokuapp.com/command/types/');
}

/* hadi bach katsifet un feed back  */
export function SendFeddBack() {
    return fetch('https://isaladeapi.herokuapp.com/feedback/Send');
}

/* hadi bach katjbed ga3 les feedback  */
export function getListFeddBack() {
    return fetch('https://isaladeapi.herokuapp.com/feedback/All');
}

/* connexion avec facebook  kaydir test wach deja kayan sinn kaydir lik creation dyal compte wfl7alat bjouj kay dir return l objet dyalk fih name,img_path,token*/
export function SendCnxFacebook() {
    return fetch('https://isaladeapi.herokuapp.com/compte/createByFacebook');
}

/* connexion avec google  kaydir test wach deja kayan sinn kaydir lik creation dyal compte wfl7alat bjouj kay dir return l objet dyalk fih name,img_path,token*/
export function SendCnxGoogle() {
    return fetch('https://isaladeapi.herokuapp.com/compte/createByGoogle');
}


/**
 * 
 * @param {object} order 
 */
export function SendCommand(order) {
    return fetch('https://isaladeapi.herokuapp.com/command/Send', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
}