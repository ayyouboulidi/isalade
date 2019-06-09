import { AsyncStorage } from 'react-native';

async function _getApiTokenFormStorage() {
    let value;
    try {
        value = await AsyncStorage.getItem('apiTokenId_v1');
    } catch (error) {
    // Error retrieving data
    }

    return value;
}
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
export async function getAllProductsTypes() {
    const token = await _getApiTokenFormStorage();
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
export async function getListProducts(id) {
    const token = await _getApiTokenFormStorage();
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
export async function getAllComponentsTypes() {
    const token = await _getApiTokenFormStorage();
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
export async function getListComponents(id) {
    const token = await _getApiTokenFormStorage();
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
export async function getAllTypesCommand() {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/command/types/');
}

/* hadi bach katsifet un feed back  */
export async function SendFeddBack() {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/feedback/Send');
}

/* hadi bach katjbed ga3 les feedback  */
export async function getListFeddBack() {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/feedback/All');
}


/* connexion avec google  kaydir test wach deja kayan sinn kaydir lik creation dyal compte wfl7alat bjouj kay dir return l objet dyalk fih name,img_path,token*/
export async function SendCnxGoogle() {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/compte/createByGoogle');
}

/**
 * facebook connect
 * 
 * @param {object} data
 */
export async function SendCnxFacebook(data) {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/compte/createByFacebook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

/**
 * 
 * @param {object} order 
 */
export async function SendCommand(order) {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/command/Send', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userToken: token,
            ...order
        })
    });
}

export async function SendCnxEmail(email, password) {
    const token = await _getApiTokenFormStorage();
    return fetch('https://isaladeapi.herokuapp.com/compte/verificationauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })
}

export async function getUserProfile() {
    const token = await _getApiTokenFormStorage();

    return fetch('https://isaladeapi.herokuapp.com/compte/getinfobytoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            apitoken: token,
        })
    })
}

export async function getHistory() {
    const token = await _getApiTokenFormStorage();

    return fetch('https://isaladeapi.herokuapp.com/command/Get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            apitoken: token,
        })
    })
}