import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, changeLang, cities } from './items';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    changeLang,
    cities,
});
