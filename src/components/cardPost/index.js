import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { isMobile, isTablet } from "react-device-detect";
import CardPostFile from './cardPostFile'
import ShareActions from './shareActions'
import { renderScreenSize } from '../../constants'
import ShareWrapper from './themeContentPost/shareWrapper'
import PopupData from '../popup';
class CardPost extends PureComponent {
    constructor() {
        super();
        this.state = {
            setModalShow: false,
            dataPopup: {},
            popupStatus: true
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    onLoadFunction = () => {
        const { item, windowWidth } = this.props;
        let platform = window.navigator.platform;
        let cardNumber = null;
        let adjustSpacing = null;
        let spacing = null;
        let adjustWidth = null;
        if (platform === 'Win32') cardNumber = (windowWidth) / (item.cardWidth)
        else cardNumber = (windowWidth) / (item.cardWidth);
        let rowCard = Math.trunc(cardNumber)
        if (platform === 'Win32') {
            spacing = (windowWidth) % item.cardWidth
            adjustSpacing = spacing / rowCard;
        } else {
            spacing = (windowWidth) % item.cardWidth
            adjustSpacing = spacing / rowCard;
        }
        if (cardNumber >= 1) adjustWidth = (item.cardWidth + adjustSpacing);
        else adjustWidth = (item.cardWidth - adjustSpacing);
        return { rowCard, cardNumber, adjustSpacing, spacing, adjustWidth };
    }

    /*   To show popup on load of page Start*/
    onLoadTagembedPopup = event => {
       
        const { item, wall, postData, itemIndex, languageSetting, completeDataObject, startEmbed } = this.props;
        if (wall.Personalization.mobilePopup === 1) window.open(item.link, '_blank')
        else {
            if (startEmbed.heightEvent != null && wall.Personalization.postFeatured === 1) {
                var obj = {
                    type: 'showPopUp',
                    data: { card: item, idArray: postData.map(item => completeDataObject[item]), index: itemIndex, viewOnText: languageSetting.viewOnText, shareText: languageSetting.shareText, personalization: wall.Personalization, themeRule: wall.ThemeRule, userDetail: wall.UserDetail, wall: wall.Wall, },
                }
                startEmbed.heightEvent.source.postMessage(obj, startEmbed.heightEvent.origin);
                axios.post(
                    "https://web.tagembed.com/app/api/postClick",
                     {wallId: wall.Wall.id, userId: wall.Wall.owner, feedId: item.feedId, postId: item.id}
                ).then(result => {
                    // Work here with the result
                    //console.log(result.data);
                    // res.send(result.data);
                }).catch(error => {
                    if (error.response) {
                        // If server responded with a status code for a request
                        // console.log("Data", error.response.data);
                        // console.log("Status", error.response.status);
                        // console.log("Headers", error.response.headers);
                    } else if (error.request) {
                        // Client made a request but response is not received
                        // console.log("<<<<<<<Response Not Received>>>>>>>>");
                        // console.log(error.request);
                    } else {
                        // Other case
                        // console.log("Error", error.message);
                    }
                    
                });
            }
        }
    }
    /*   To show popup on load of page End */

    /*   To handle open modal popup on load of page Start*/
    handleOpenModal = () => {
        const { item, wall, postData, itemIndex, languageSetting, completeDataObject } = this.props;
        if (wall.Personalization.mobilePopup === 1) {
            window.open(item.link, '_blank')
            
        } else {
            if (wall.Personalization.postFeatured === 1) {
                //console.log("get clicked");
                let dataPopup = { card: item, idArray: postData.map(item => completeDataObject[item]), index: itemIndex, viewOnText: languageSetting.viewOnText, shareText: languageSetting.shareText, personalization: wall.Personalization, themeRule: wall.ThemeRule, userDetail: wall.UserDetail, wall: wall.Wall }
                this.setState({ setModalShow: true, dataPopup: dataPopup });
                //console.log("get", dataPopup);
                
                axios.post(
                    "https://web.tagembed.com/app/api/postClick",
                    {wallId: wall.Wall.id, userId: wall.Wall.owner, feedId : item.feedId, postId: item.id}
                    ).then(result => {
                    // Work here with the result
                    //console.log(result.data);
                    //this.setState({data: result.data})
                    // res.send(result.data);
                }).catch(error => {
                    if (error.response) {
                        // If server responded with a status code for a request
                        // console.log("Data", error.response.data);
                        // console.log("Status", error.response.status);
                        // console.log("Headers", error.response.headers);
                    } else if (error.request) {
                        // Client made a request but response is not received
                        // console.log("<<<<<<<Response Not Received>>>>>>>>");
                        // console.log(error.request);
                    } else {
                        // Other case
                        // console.log("Error", error.message);
                    }
                    
                });



            }
        }
    }
    /*   To handle modal open popup on load of page End */

    /*   To handle Close modal popup on load of page Start */
    handleCloseModal = () => { this.setState({ setModalShow: false }); }
    /*   To handle Close modal popup on load of page End */

    componentDidMount() {

        let hostUrl = window.location.origin
        let appUrl = `https://app.tagembed.com`
       

        // if (window.location.href.includes("?wix") || window.location.href.includes("")  || hostUrl === appUrl) {
        //     this.setState({ popupStatus: false });
        // }
        const { startEmbed } = this.props;
        if (window.location.href.includes("viewURL") && startEmbed.heightEvent != null) this.setState({ popupStatus: true })
        else this.setState({ popupStatus: false });

        // if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') this.setState({ popupStatus: false });
        window.addEventListener("resize", () => { this.handleCloseModal(); });
    }

    render() {
        const { wall, item, adjustWidth, windowWidth, wallId, imageList, postData } = this.props;
        const { popupStatus } = this.state;
       
        const newCardWidth = renderScreenSize(wall.Personalization.widgetTheme, item.highlight, isMobile, isTablet, adjustWidth, item.cardWidth, wall.Personalization.columnCount)
        return <Fragment>
            <div id={`postId${item.id}`}
                className={`feedId${item.feedId} postItem item flatThemeCard ${item.network.class} ${(item.type === 1) ? `onlyTextCard` : `objectCard`} try_animate`}
                data-post-id={item.id} data-created={item.createdAt} data-highlight={item.highlight} data-pin={item.pin}
                style={{
                    padding: wall.Personalization.padding / 2, margin: 0, cursor: wall.Personalization.mobilePopup === 1 ? 'pointer' : '',
                    //height: wall.ThemeRule.aspectRatio === 0 ? (wall.Personalization.widgetTheme === 4 || wall.Personalization.widgetTheme === 50 ? wall.Personalization.widgetTheme === 50 && (isMobile && !isTablet) ? '' : newCardWidth : 'auto') : '',
                    height: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? (wall.Personalization.widgetTheme === 4 || wall.Personalization.widgetTheme === 50 ? wall.Personalization.widgetTheme === 50 && (isMobile && !isTablet) ? '' : newCardWidth : 'auto') : '',

                    width: (isMobile && !isTablet) ? (wall.Personalization.widgetTheme === 4 || wall.Personalization.widgetTheme === 50) && parseInt(wall.Personalization.minimumPostWidth) < 175 ? newCardWidth :
                        (wall.Personalization.widgetTheme === 49) ? '97%' : wall.Personalization.columnCount > 0 ? newCardWidth : '100%' : (wall.Personalization.widgetTheme === 49 && windowWidth > newCardWidth) ? '97%' : newCardWidth,
                    maxWidth: (isMobile && !isTablet) ? wall.Personalization.columnCount > 0 ? newCardWidth : '100%' : (wall.Personalization.widgetTheme === 49) ? (windowWidth > newCardWidth) ? '97%' : newCardWidth : newCardWidth,
                    minWidth: 'auto',
                    //minHeight:wall.ThemeRule.aspectRatio === 0 ? (wall.Personalization.widgetTheme === 4 ? wall.Personalization.widgetTheme === 4 && (isMobile && !isTablet) ? '' : newCardWidth : 'auto') : '',
                    minHeight: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? (wall.Personalization.widgetTheme === 4 ? wall.Personalization.widgetTheme === 4 && (isMobile && !isTablet) ? '' : newCardWidth : 'auto') : '',
                }}>
                <div className="post" style={{ backgroundColor: wall.ThemeRule.cardColor, borderRadius: wall.ThemeRule.cardCurve + 'px', overflow: wall.Personalization.widgetTheme === 4 || wall.Personalization.widgetTheme === 19 || wall.Personalization.widgetTheme === 49 || wall.Personalization.widgetTheme === 3 || wall.Personalization.widgetTheme === 5 || wall.Personalization.widgetTheme === 50 ? 'hidden' : '' }}>
                    {/*/............................ trim content for maximum theme............................... */}
                    <div className={wall.Personalization.trimcontent == 0 ? '' : "trimContenTrue"} style={{ height: '100%' }}>
                        <div className="postContent" onClick={(popupStatus) ? this.onLoadTagembedPopup : () => this.handleOpenModal()}>
                            {/* cardPost data as per themeId  Start */}
                            <CardPostFile item={item} wall={wall} imgWidth={adjustWidth >= (item.cardWidth) ? adjustWidth : item.cardWidth} widgetTheme={wall.Personalization.widgetTheme} wallId={wallId} />
                            { /* CardPost data as per themeId  End */}
                        </div>
                        {/* To show Share action link on card post Start  */}
                        {wall.ThemeRule.socialAction ? <ShareActions item={item} widgetTheme={wall.Personalization.widgetTheme} wall={wall} /> : null}
                        {wall.Personalization.widgetTheme === 49 ? <ShareWrapper item={item} network={item.network} /> : null}
                        {/* To show Share action link on card post End */}
                    </div>
                </div>
                {this.state.setModalShow &&
                    /* To Show Data on Popup  Start */
                    <PopupData wall={wall} wallId={wallId} imageList={postData.imageList} show={this.state.setModalShow} onHide={this.handleCloseModal} data={(this.state.dataPopup) ? this.state.dataPopup : null} />
                    /* To Show Data on Popup  End  */
                }
            </div>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return { wallId: state.wallId.wallID, wall: state.wall.wallData, postData: state.postData.postData, completeDataObject: state.postData.completeDataObject, appendData: state.postData.appendData, languageSetting: state.languageSetting, startEmbed: state.startEmbed }
}

export default connect(mapStateToProps)(CardPost);
