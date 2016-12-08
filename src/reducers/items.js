export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function changeLang(state = 'en', action) {
    switch (action.type){
        case 'CHANGE_LANGUAGE':
            return  action.lang;

        default:
            return state;
    }
}
const initialState = {
    name: '',
    wind: {
        speed: 0
    },
    main: {
        temp: 0
    },
    weather: [{
        icon: '09d'
    }]
}
export function items(state = initialState, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}
export function cities(state = [], action) {
    switch (action.type) {
        case 'CITIES_FETCH_SUCCESS':
            return action.cities;

        default:
            return state;
    }
}
