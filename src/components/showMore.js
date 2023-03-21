import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    filterPostDataAppendHorizontalSlider,
    getDataNextSteps,
    preRenderDataUpdateToParent
} from '../actions/themeActions'
/* trial purpose for optimization */ 
//import LoaderComponent from './loaderComponent'
import {loaderTopHeightSetting} from '../constants'



class ShowMore extends PureComponent {
    state = {
        scrollPosition: 0
    }

    /* To display more data on click of show more button start  */
    onClickToDataAppend = event => {
        let scrlBarComanW = document.querySelector("#themesWrapper");
        let scrlBarComanWGET = document.getElementById("themesWrapper");
        const {appendData} = this.props;
        if (scrlBarComanW != null && appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight === 0) {
            this.setState({scrollPosition: (scrlBarComanWGET.scrollHeight - 200)}, () => this.onClickToUpdateFix())
        } else this.onClickToUpdateFix();
    }

    /* to display more data on click of show more button end  */

    /*   Need to check code  start */
    onClickToUpdateFix = () => {
        const {appendData, wall, postData, wallId, imageList} = this.props;
        const tstamp = Math.floor(Date.now() / 1000);
        let postCount = wall.ThemeRule.numberOfPosts;

        if (appendData.networkID && appendData.networkID !== 0) {
            const filteredArr = Object.keys(postData.preRender).filter(item => postData.preRender[item].network.id === appendData.networkID);
            if (filteredArr.length > 0) {
                this.props.preRenderDataUpdateToParent(filteredArr);
            }
            if (filteredArr.length < postCount) {
                this.props.getDataNextSteps(wallId, tstamp, postCount - filteredArr.length, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent, true);
            }
            this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
            if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight === 0) {
                setTimeout(() => {
                    let elmnt = document.getElementById("themesWrapper");
                    elmnt.scrollTop = this.state.scrollPosition;
                }, 200);
            }
        } else {
            if (Object.keys(postData.preRender).length > 0) {
                this.props.preRenderDataUpdateToParent(postData.preRender);
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
            } else {
                this.props.preRenderDataUpdateToParent(postData.preRender);
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
            }
            if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight === 0)
                setTimeout(() => {
                    let elmnt = document.getElementById("themesWrapper");
                    elmnt.scrollTop = this.state.scrollPosition;
                }, 100);
        }
    }

    /*   Need to check code  end */
    render() {
        const {languageSetting, loader, wall, imageList} = this.props;
        let loaderTopStyle = 0;
        if (wall && wall != null) {
            loaderTopStyle = loaderTopHeightSetting();
        }
        return <div
                className={`loadMoreWrapper loadmorebtn${wall.Personalization.widgetTheme} loadmoreThemetype${wall.Personalization.themeType}`}
                id="eMorePosts"
                style={{display: wall.Personalization.loadMoreStatus === 1 || this.props.hasMoreData === false ? 'block' : 'none',marginBottom :wall.Personalization.loadMoreStatus === 1 || this.props.hasMoreData === false ? 30 : 0}}>
                <div className="appendLoader"
                     style={{display: !loader.webFilterLoader ? 'none' : 'block', marginBottom: '30px'}}>
                    <img width="30px" src="https://cdn.tagembed.com/app/image/loader.svg" alt="loader"/>
                </div>
                {(this.props.hasMoreData) &&
                    <button id="appendBtn"
                            className={`loadMoreBtn btnStyle sm ${wall.Personalization.widgetTheme === 53 ? 'showMoreStyle2' : ''}`}
                            data-style="zoom-in" data-spinner-color="#1f1b1b" style={{
                        cursor: "pointer",
                        border: '1px solid rgb(31, 27, 27)',
                        display: 'inline',
                        marginBottom: '20px',
                        backgroundColor: wall.ThemeRule.cardColor,
                        borderColor: wall.ThemeRule.fontColor === "#ffffff" ? 'black' : wall.ThemeRule.fontColor,
                        color: wall.Personalization.widgetTheme === 50 || wall.Personalization.widgetTheme === 4  ? 'black' : (wall.ThemeRule.fontColor === wall.ThemeRule.cardColor ? 'black' : wall.ThemeRule.fontColor)

                    }} onClick={this.props.hasMoreData ? this.onClickToDataAppend : null} data-offset="20"
                            data-time="1596187609" data-wall="36512" data-lastid="">{loader.isShowMoreLoader ?
                        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> :
                        (wall.Personalization.widgetTheme === 53) ?
                            <i className="fa fa-angle-down"></i> : this.props.hasMoreData ? languageSetting.buttonName : languageSetting.no_more
                    }</button>
                }
            </div>
    }

}

const mapStateToProps = state => {
    return {
        wallId: state.wallId.wallID,
        wall: state.wall.wallData,
        postData: state.postData,
        languageSetting: state.languageSetting,
        networkId: state.postData.appendData.networkID,
        loader: state.loader,
        imageList: state.imageList,	
        hasMoreData: state.postData.hasMoreData[0] ? state.postData.hasMoreData[0].hasMoreData === false ? false : state.postData.hasMoreData[state.postData.appendData.networkID] ? state.postData.hasMoreData[state.postData.appendData.networkID].hasMoreData : true : true

    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterPostDataAppendHorizontalSlider: (wallID, timeStamp, postCount, networkId, after, postData) => dispatch(filterPostDataAppendHorizontalSlider(wallID, timeStamp, postCount, networkId, after, postData)),
        getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow)),
        preRenderDataUpdateToParent: (postData) => dispatch(preRenderDataUpdateToParent(postData))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);