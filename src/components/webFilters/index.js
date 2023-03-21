import React, {PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';
import {
    /* trial purpose for optimization */ 
    /* networkIdUpdate, */
    flagfilterPostDataAppendWebFilter,
    filterPostDataAppendWebFilter,
    filteredDataApplyUpdatePostDataExtendWithNetwordID,
    /* trial purpose for optimization */ 
    /* saveNetworkIdOnFilter, */
} from '../../actions/themeActions'
import './filters.scss'
import tagembedIcon from '../../assets/icons/tagembed-icon52x52.png';
import Helmet from 'react-helmet'

class WebFilters extends PureComponent {
    state = {
        filterColor: -1,
        filterColorOne: -1,
        allActive: false,
    }

    /* Once click on any web filters Start */
    onClickWebFilters = (networkk, ntid, indexKey) => event => {
        //this.props.saveNetworkIdOnFilter(ntid);
        const filterSettings = {
            button: false,
            allButton: "off",
            netButton: "on",
            loaderFilter: true,
            filterColorOne: -1
        }
        
        let filterColor = null;
        if (indexKey === indexKey) filterColor = indexKey;
        else filterColor = 100;
        let data = [];
        this.setState({...filterSettings, allActive: false, filterColor: filterColor, netId: ntid, counter: 0},
            () => this.onClickWhenUpdateFilter(ntid, data, indexKey)
        );

    }

    /* Once click on any web filters End */

    /* Once click on All web filters Start */
    onClickWebFiltersAll = event => {
        //this.props.saveNetworkIdOnFilter(0); // need to make it "0"
        const {wallId, appendData} = this.props;
       
        this.setState({
            allActive: true,
            netId: 0, counter: 0, allButton: "on", netButton: "off", filterColorOne: 1, filterColor: -1
        }, () => this.props.filteredDataApplyUpdatePostDataExtendWithNetwordID(wallId, 0, appendData.heightEvent));
    };
    /* Once click on All web filters End */

    sendHeightToParent = () => {

        const {postData} = this.props;
        if (postData && postData.appendData && postData.appendData.heightEvent && postData.appendData.heightEvent.data) {
            let scrollHeight = document.body.scrollHeight;
            var obj = {
                type: 'getHeight',
                data: {
                    height: !scrollHeight ? 150 : scrollHeight,
                    iframe: this.props.postData.appendData.heightEvent.data.id
                }
            }
            window.top.postMessage(obj, "*");
        }

    }

    /* Once click on any web filters and after loading data updation Start  */
    onClickWhenUpdateFilter = (networkID, data, indexKey) => {
        const tstamp = Math.floor(Date.now() / 1000);
        const {appendData, wall, postData, wallId} = this.props;
        if (appendData.networkID != networkID) {
            let postCount = wall.ThemeRule.numberOfPosts;
            this.props.filterPostDataAppendWebFilter(wallId, tstamp, postCount, networkID, appendData.after, data, appendData.heightEvent, postData.completeData);
        } else if (data.length === wall.ThemeRule.numberOfPosts) this.setState({loaderFilter: false});

    }

    /* Once click on any web filters and after loading data updation End  */

    render() {
        const {appendData, wall, webFilters, languageSetting} = this.props;
        const {filterColor, filterColorOne, allActive} = this.state;

        return wall.Personalization.filterStatus === 1 ? <Fragment>
            {
                webFilters.length >= 2 ?
                    <div id="filterStatusID"
                         className={`filterWrapper filter filter${wall.Personalization.filter_type} `}
                         style={{textAlign: "center"}}>
                        <Helmet>
                            <script src="https://kit.fontawesome.com/2c8c0b245c.js" crossorigin="anonymous"></script>
                        </Helmet>
                        <>{wall.UserRule.branding_lite === 1 ? <div className="poweredbyWithFilters"
                             style={{display: wall.UserRule.branding_lite !== 1 ? 'none' : ''}}>
                            <a href={`https://tagembed.com/?utm_source=free_plan_widget_${wall.Personalization.widgetTheme}&utm_medium=${this.props.wallId}&utm_campaign=powered-by-logo`}
                               target="_blank"
                               style={{backgroundColor: '#ffffff', color: '#1f1b1b', border: '1px solid #1f1b1b'}}
                               rel="noopener noreferrer">
                                <div className="poweredby">
                                    <span>Powered By</span>
                                    <img src={tagembedIcon} width="24" alt=""/>
                                </div>
                            </a>
                        </div> : null }</>
                         
                        
                        <div className={`ff-filter-holder isotopeFIlter${wall.Personalization.widgetTheme}`}>
                            <span className="ff-filter ff-type-all">
                                <a data-network="0" data-filter="*"
                                   className={allActive && appendData.networkID == 0 ? `f_network${0} filterActive ${wall.Personalization.widgetTheme == 50 && (wall.Personalization.filter_type == 2 || wall.Personalization.filter_type == 1) ? `galleryFilter50Active` : ``}` : ` ${wall.Personalization.widgetTheme == 50 && (wall.Personalization.filter_type == 2 || wall.Personalization.filter_type == 1) ? `galleryFilter50` : ``}`}
                                   style={{

                                       backgroundColor: wall.Personalization.filter_type === 4 || wall.Personalization.filter_type === 3 ? '' :
                                           (wall.Personalization.filter_type === 1 && filterColorOne === -1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColorOne === -1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.cardColor :
                                               (wall.Personalization.filter_type === 1 && filterColorOne === 1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColorOne === 1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.fontColor :

                                                   (wall.Personalization.filter_type === 1 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && this.state.filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.cardColor :
                                                       (wall.Personalization.filter_type === 1 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.fontColor :

                                                           (wall.Personalization.filter_type === 1 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'black' :
                                                               (wall.Personalization.filter_type === 1 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'white' : 'yellow',
                                       border: '1 solid',
                                       borderColor: wall.Personalization.filter_type !== 3 ? wall.ThemeRule.fontColor : '',

                                       color: wall.Personalization.filter_type === 4 || wall.Personalization.filter_type === 3 ? '' :
                                           (wall.Personalization.filter_type === 1 && filterColorOne === -1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColorOne === -1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.fontColor :
                                               (wall.Personalization.filter_type === 1 && filterColorOne === 1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColorOne === 1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.cardColor :

                                                   (wall.Personalization.filter_type === 1 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.fontColor :
                                                       (wall.Personalization.filter_type === 1 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.cardColor :

                                                           (wall.Personalization.filter_type === 1 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'white' :
                                                               (wall.Personalization.filter_type === 1 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColorOne === 1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'black' :

                                                                   'red'

                                   }}

                                   onClick={this.onClickWebFiltersAll}>
                                       
                                    <i className="fa fa-all"
                                       style={{display: wall.Personalization.filter_type === 1 || wall.Personalization.filter_type === 2 ? 'none' : 'inline-block'}}> <i
                                        className="fa fa-group"></i></i>

                                    {wall.Personalization.filter_type !== 3 ? languageSetting.filterButton : ''}

                                </a></span>

                            {webFilters.map((wp, key) => {
                                let netwrk = wp.Network.icon ? wp.Network.icon.substring(3) : "";
                                return (
                                    <span className={`ff-filter ff-type-${wp.Network.name}`} key={key}
                                          style={{textTransform: 'capitalize'}}
                                          onClick={this.onClickWebFilters(netwrk, wp.Network.id, key)}>

                                        <a data-network={wp.Network.id}
                                           className={appendData.networkID != 0 && wp.Network.id == appendData.networkID ? `f_network${appendData.networkID} filterActive ${wall.Personalization.widgetTheme == 50 && (wall.Personalization.filter_type == 2 || wall.Personalization.filter_type == 1) ? `galleryFilter50Active` : ``}` : `${wall.Personalization.widgetTheme == 50 && (wall.Personalization.filter_type == 2 || wall.Personalization.filter_type == 1) ? `galleryFilter50` : ``}`}
                                           style={{
                                               backgroundColor: wall.Personalization.filter_type === 3 || wall.Personalization.filter_type === 4 ? '' :
                                                   (wall.Personalization.filter_type === 1 && filterColor === -1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColor === -1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.cardColor :
                                                       (wall.Personalization.filter_type === 1 && filterColor === key && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColor === key && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.fontColor :

                                                           (wall.Personalization.filter_type === 1 && filterColor !== key && filterColor !== -1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColor !== key && filterColor !== -1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.cardColor :

                                                               (wall.Personalization.filter_type === 1 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.cardColor :
                                                                   (wall.Personalization.filter_type === 1 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.fontColor :

                                                                       (wall.Personalization.filter_type === 1 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'black' :
                                                                           (wall.Personalization.filter_type === 1 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? wall.ThemeRule.fontColor
                                                                               :

                                                                               (wall.Personalization.filter_type === 1 && filterColor !== key && filterColor !== -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor !== key && filterColor !== -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'black' :
                                                                                   (wall.Personalization.filter_type === 1 && filterColor !== key && filterColor !== -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor !== key && filterColor !== -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? 'white'
                                                                                       : 'pink'
                                               , border: '1 solid',

                                               borderColor: wall.Personalization.filter_type !== 3 ? wall.ThemeRule.fontColor : '',

                                               color: wall.Personalization.filter_type === 4 || wall.Personalization.filter_type === 3 ? '' :
                                                   (wall.Personalization.filter_type === 1 && filterColor === -1 && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColor === -1 && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.fontColor :
                                                       (wall.Personalization.filter_type === 1 && filterColor === key && wall.Personalization.widgetTheme !== 4) || (wall.Personalization.filter_type === 2 && filterColor === key && wall.Personalization.widgetTheme !== 4) ? wall.ThemeRule.cardColor :
                                                           (wall.Personalization.filter_type === 1 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.fontColor :
                                                               (wall.Personalization.filter_type === 1 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor !== "#ffffff") ? wall.ThemeRule.cardColor :

                                                                   (wall.Personalization.filter_type === 1 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === -1 && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? wall.ThemeRule.fontColor :
                                                                       (wall.Personalization.filter_type === 1 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") || (wall.Personalization.filter_type === 2 && filterColor === key && wall.Personalization.widgetTheme === 4 && wall.ThemeRule.fontColor === "#ffffff") ? 'black'
                                                                           : wall.ThemeRule.fontColor


                                           }}>
                                            {
                                                (wp.Network.name == "Workplace") ?
                                                    <i className={`fa ${wp.Network.icon}`}></i> : (wp.Network.name == "YouTube") ?
                                                        <i className={`fa fa-youtube-play`}></i> : (wp.Network.name == "TikTok") ?
                                                        <i className={`fab fa-tiktok`}></i> :
                                                        <i className={netwrk == 'slack' ? 'fab fa-slack' : `fa fa-${netwrk}`}></i>
                                            }
                                            {wall.Personalization.filter_type === 4 && netwrk !== 'vimeo-square' && wp.Network.name !== 'Workplace' && wp.Network.id !== 26 && wp.Network.id !== 7 ? netwrk :
                                                wall.Personalization.filter_type === 4 && netwrk === 'vimeo-square' || wall.Personalization.filter_type === 4 && wp.Network.name === 'Workplace' || wall.Personalization.filter_type === 4 && wp.Network.name === 'Giphy' || wall.Personalization.filter_type === 4 && wp.Network.name === 'YouTube' ? wp.Network.name : ''
                                            }
                                        </a></span>

                                )

                            }, this)
                            }

                        </div>
                    </div> : null
            }

        </Fragment> : null
    }
}

const mapStateToProps = state => {
    return {
        wallId: state.wallId.wallID,
        webFilters: state.webFilters.webFilters,
        wall: state.wall.wallData,
        postData: state.postData,
        languageSetting: state.languageSetting,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        filteredDataApplyUpdatePostDataExtendWithNetwordID: (wallId, networkId, heightEvent) => dispatch(filteredDataApplyUpdatePostDataExtendWithNetwordID(wallId, networkId, heightEvent)),

        filterPostDataAppendWebFilter: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, completeData) => dispatch(filterPostDataAppendWebFilter(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, completeData))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebFilters);

