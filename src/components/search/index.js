import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './style.css'
import {searchTextUpdate} from '../../actions/themeActions'

class SearchBar extends PureComponent {
    state = {
        search: null
    }

    componentDidMount() {
        this.onSearchTextData();
    }

    componentWillUnmount() {
        this.setState({})
    }

    onSearchTextData = () => {
        let input = document.getElementById('search-text');
        const {wallId, appendData} = this.props;
        if (input) {
            let timeout = null;
            input.addEventListener('keyup', e => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.props.searchTextUpdate(input.value, wallId, appendData),
                    1000);
            });
        }
    }
    onSearchChange = event => {
        this.setState({search: event.target.value})
    }

    render() {
        const {isMobile, searchBar} = this.props;
        const {search} = this.state
        return <div className={isMobile ? `` : `search-container`}>
            <div className={`searchBar ${isMobile ? `search-mobile` : ``}`}>
                <div className={isMobile ? `search__container__mobile` : `search__container`}>
                    <input autocomplete="off" id="search-text" placeholder="Search" className="search__input"
                           type="text" value={search} onChange={this.onSearchChange}/>
                    {searchBar.isSearchLoader ?
                        <img class="searchLoader" src="https://cdn.tagembed.com/app/image/loader.svg" alt="loader"/>
                        : ''}
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        wall: state.wall.wallData,
        searchBar: state.searchBar,
        wallId: state.wallId.wallID,
        appendData: state.postData.appendData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchTextUpdate: (searchText, wallId, appendData) => dispatch(searchTextUpdate(searchText, wallId, appendData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);