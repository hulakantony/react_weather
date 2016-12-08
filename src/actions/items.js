
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function changeLocalLanguage(str) {
	return {
		type: 'CHANGE_LANGUAGE',
		lang: str
	}
}

export function citiesFetchSuccess(cities) {
	return {
		type: 'CITIES_FETCH_SUCCESS',
		cities
	}
}

export function citiesFetchData(value){
	return (dispatch) => {
		fetch('./cities.json')
			.then((response) => {
				if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
			})
			.then((response) => response.json())
			.then((cities) => {  
                if(!value){
                    dispatch(citiesFetchSuccess([]));
                    return;
                }              
				var sorted = cities.filter(el => {
					var cityName = el.toLowerCase();
					return cityName.indexOf(value.toLowerCase()) !== -1;
				})
				dispatch(citiesFetchSuccess(sorted));
			})
			
	}
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }               
                dispatch(itemsIsLoading(false));              

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
