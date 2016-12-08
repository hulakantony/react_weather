import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, changeLocalLanguage, citiesFetchData } from '../actions/items';
import '../styles/style.css';

function CityChange(props) {
    return (
        <div className="change-city-wrap">
            <input type="text" onChange={props.onChange} className="city-input"/>
            <ul className="cities-list">
                {props.cities.map((el, index) => {
                   return <li key={index} onClick={props.onClick} tabIndex={index+1} className="city-to-go">
                        {el}
                    </li>    
                })}
            </ul>
        </div>
    );
    
}
class ItemList extends Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeTemp = this.changeTemp.bind(this);
        this.state = {           
            city: 'Kharkiv',
            units: 'c'
        }
    }
    componentDidMount() {       
        this.props.fetchData(`http://api.openweathermap.org/data/2.5/weather?lang=${this.props.lang}&q=${this.state.city}&appid=1d116b536241d6598ce05b34c44408a9`);      
    }
    handleClick(){
        this.props.lang === 'en' ? this.props.changeLang('ru') : this.props.changeLang('en');        
        this.props.fetchData(`http://api.openweathermap.org/data/2.5/weather?lang=${this.props.lang}&q=${this.props.items.name}&appid=1d116b536241d6598ce05b34c44408a9`);
    }
    handleChange(e){
        var value = e.target.value;        
        this.props.getCities(value);
    }
    changeCity(e){        
        const cityToGo = e.target.textContent;
        this.props.getCities('');
        this.props.fetchData(`http://api.openweathermap.org/data/2.5/weather?lang=${this.props.lang}&q=${cityToGo}&appid=1d116b536241d6598ce05b34c44408a9`);
    }
    changeTemp(){
        this.state.units === 'c' ? this.setState({units: 'f'}) : this.setState({units: 'c'})
    }
    render() {
        const { name } = this.props.items;
        const wind = this.props.items.wind.speed;
        const tempInCel = Math.round((this.props.items.main.temp - 273).toFixed(1))
        let temp;
        if(this.state.units !== 'c'){            
            temp = (tempInCel * 1.8 + 32 ) + '°F';
        } else {
            temp = tempInCel + '°C';
        }         
        
        const icon = this.props.items.weather[0].icon;                
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }        
        return (
            <div className='weather-widget-wrap'>
                <CityChange 
                    onChange={this.handleChange} 
                    cities={this.props.cities} 
                    onClick={this.changeCity} 
                />
                <div className="weather-info-wrap clearfix">
                    <div className="weather-data-wrap">
                        <p className="weather-place weather-data">{this.props.lang==='en' ? `Place: ${name}` : `Город: ${name}`}</p>
                        <p className="weather-temp weather-data">{this.props.lang==='en' ? `Temprature: ${temp}` : `Температура: ${temp}`}</p>
                        <p className="weather-wind weather-data">{this.props.lang==='en' ? `Wind: ${wind}km/h` : `Ветер: ${wind}км/ч`}</p> 
                    </div>
                    <div className="weather-icon-wrap">              
                        <img className="weather-icon" alt="weather icon" src={`http://openweathermap.org/img/w/${icon}.png`} />
                    </div>                    
                </div>
                <button className="change-lang-but weather-button" onClick={this.handleClick}> {this.props.lang === 'en' ? 'RU' : 'EN'} </button>
                <button className="change-temp-but weather-button" onClick={this.changeTemp}> {this.state.units === 'c' ? 'F' : 'C'} </button>
            </div>
        );
    }
}

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,    
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.items,             
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        lang: state.changeLang,
        cities: state.cities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        changeLang: (lang) => dispatch(changeLocalLanguage(lang)),
        getCities: (value) => dispatch(citiesFetchData(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
