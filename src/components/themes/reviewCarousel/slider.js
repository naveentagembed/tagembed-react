import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from "react-slick";
import { convertHtmlStringToRender } from '../../themes/customFunction'
import { getDataNextSteps, preRenderDataUpdateToParent } from '../../../actions/themeActions'
import { CLOUD_URL } from '../../../actions/api'
import ShareActions from '../../cardPost/shareActions'
import PopupData from '../../popup';
import PostAuthor from '../../cardPost/postAuthor'
import '../../../scss/theme/reviewCarousel.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContentConversion from './contentConversion'
import ShareWrapper from '../../cardPost/themeContentPost/shareWrapper'



const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', color: 'rgb(0, 0, 0)' }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', color: 'rgb(0, 0, 0)' }}
            onClick={onClick}
        />
    );
}

class ReviewCarouselTheme extends PureComponent {
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

    /* To update data on request of requestData function with certain delay */
    onUpdateData = () => {
        // setTimeout(() => this.requestData(), 500)
    }

    /* To Append new data once post limit react its given value in Theme Settings Start */
    requestData = () => {
        const { appendData, wall, postData, wallId } = this.props;
        const tstamp = Math.floor(Date.now() / 1000);
        let postCount = wall.ThemeRule.numberOfPosts;
        if (appendData.networkID && appendData.networkID != 0) {
            const filteredArr = Object.keys(postData.preRender).filter(item => postData.preRender[item].network.id == appendData.networkID);
            if (filteredArr.length > 0) {
                this.props.preRenderDataUpdateToParent(filteredArr);
            }
            if (filteredArr.length < postCount) {
                this.props.getDataNextSteps(wallId, tstamp, postCount - filteredArr.length, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent, true);
            }
            this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);


        } else {
            if (Object.keys(postData.preRender).length > 0) {
                this.props.preRenderDataUpdateToParent(postData.preRender);
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);

            } else {
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
                this.props.preRenderDataUpdateToParent(postData.preRender);
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
            }

        }
    }

    /* To Append new data once post limit react its given value in Theme Settings End */

    /* To Open the popup on click Start */
    onLoadTagembedPopup = (itemIndex, item) => event => {
        const { wall, appendData, postData, languageSetting, completeDataObject } = this.props;

        if (wall.Personalization.mobilePopup === 1) window.open(item.link, '_blank')
        else {
            if (appendData.heightEvent != null && wall.Personalization.postFeatured === 1) {
                var obj = {
                    type: 'showPopUp',
                    data: {
                        card: item,
                        idArray: postData.postData.map(item => completeDataObject[item]),
                        index: itemIndex,
                        viewOnText: languageSetting.viewOnText,
                        shareText: languageSetting.shareText,
                        personalization: wall.Personalization,
                        themeRule: wall.ThemeRule,
                        userDetail: wall.UserDetail,
                        wall: wall.Wall, 
                    },
                }
                appendData.heightEvent.source.postMessage(obj, appendData.heightEvent.origin);

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

    /* To Open the popup on click End */

    /* To Show the popup on modal Start */
    handleOpenModal = (itemIndex, item) => event => {
        const { wall, postData, languageSetting, completeDataObject } = this.props;
        if (wall.Personalization.mobilePopup === 1) window.open(item.link, '_blank')
        else {
            if (wall.Personalization.postFeatured === 1) {
                let dataPopup = {
                    card: item,
                    idArray: postData.postData.map(item => completeDataObject[item]),
                    index: itemIndex,
                    viewOnText: languageSetting.viewOnText,
                    shareText: languageSetting.shareText,
                    personalization: wall.Personalization,
                    themeRule:wall.ThemeRule,
                    userDetail: wall.UserDetail,
                    wall: wall.Wall, 
                }

                this.setState({ setModalShow: true, dataPopup: dataPopup });

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

    /* To Show the popup on modal End */


    /* To Close the popup on Modal Start */
    handleCloseModal = () => {
        this.setState({ setModalShow: false });
    }

    /* To Close the popup on Modal End  */

    componentDidMount() {
        let hostUrl = window.location.origin
        let appUrl = `https://app.tagembed.com`

        // if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') {
        //     this.setState({ popupStatus: false });
        // }

        // if (window.location.search === '?wix' || window.location.href.includes("")  || hostUrl === appUrl) {
        //     this.setState({ popupStatus: false });
        // }
        const { appendData } = this.props;
        if (window.location.href.includes("viewURL") && appendData.heightEvent != null) this.setState({ popupStatus: true })
        else this.setState({ popupStatus: false });


    }

    readmore = () => {
        //const { popupStatus } = this.state;
        this.setState = ({ setModalShow: false })
    }

    render() {
        const { wallId, wall, postData, loader, completeDataObject, hasMoreData } = this.props;
        const { popupStatus } = this.state;

        var settings = {
            autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
            autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
            className: "center",
            infinite: wall.Personalization.columnCount == 5 && postData.postData.length < 5 ? false : wall.Personalization.columnCount == 4 && postData.postData.length < 4 ? false : wall.Personalization.columnCount == 3 && postData.postData.length < 3 ? false : wall.Personalization.columnCount == 2 && postData.postData.length < 2 ? false : wall.Personalization.columnCount == 0 && postData.postData.length < 2 ? false : true ,
            lazyLoad: false,
            initialSlide: 0,
            slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
            slidesToScroll: 1,

            swipeToSlide: true,
            nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
            prevArrow: <SamplePrevArrow />,
            afterChange: (current) => {
                if (parseInt(current) + 1 == parseInt(postData.postData.length) - 2) this.onUpdateData()
            },
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
                        initialSlide: 0,
                        slidesToScroll: 1,
                        infinite: wall.Personalization.columnCount == 5 && postData.postData.length < 5 ? false : wall.Personalization.columnCount == 4 && postData.postData.length < 4 ? false : wall.Personalization.columnCount == 3 && postData.postData.length < 3 ? false : wall.Personalization.columnCount == 2 && postData.postData.length < 2 ? false : wall.Personalization.columnCount == 0 && postData.postData.length < 2 ? false : true,
                        lazyLoad: true,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 == parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        initialSlide: 0,
                        slidesToShow: wall.Personalization.columnCountMobile == 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        slidesToScroll: 1,
                        infinite: true,
                        lazyLoad: false,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 == parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        initialSlide: 0,
                        slidesToShow: wall.Personalization.columnCountMobile == 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        slidesToScroll: 1,
                        infinite: true,
                        lazyLoad: false,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 == parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },
                    }
                }
            ]
        };

        return <div>
            <Slider ref={c => (this.slider = c)}    {...settings}>{
                !loader.webFilterLoader && postData && postData.postData && postData.postData.length && postData.postData.map((itemData, index) => {
                    let item = completeDataObject[itemData];

                    return <div id={`postId${item.id}`} key={index}
                        className={`feedId${item.feedId} postItem item flatThemeCard ${item.type == 1 ? `onlyTextCard` : `objectCard`}`}
                        data-post-id={item.id} data-highlight={item.highlight} data-pin={item.pin}
                        data-created={item.createdAt}>

                        <div className={`post ${item.customClass}`} style={{ backgroundColor: wall.ThemeRule.cardColor, borderRadius: wall.ThemeRule.cardCurve + 'px',  cursor: wall.Personalization.mobilePopup === 1 ? 'pointer' : '', }}>
                            <div className="postContent"
                                onClick={(popupStatus) ? this.onLoadTagembedPopup(index, item) : this.handleOpenModal(index, item)}>
                                <div className="postCardContent">
                                    {item.rating ? <div className="postRating">
                                        <img src={`${CLOUD_URL}/images/rating/${item.network.id}/${item.rating}.png`}
                                            alt="" />
                                    </div> : null}
                                    {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                                        href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                                        rel="stylesheet" /> : null}
                                    <div className="postAuthorClassic"
                                        style={{ bottom: ((item.cta || item.socialAction) && item.type === 1) ? '30px' : '' }}>
                                    </div>
                                    {item.content ?
                                        <div
                                            className={wall.ThemeRule.fontText ? `postedText ${item.textDecoClass}` : `postedText ${item.textDecoClass} setFont font${wall.ThemeRule.font} line` +wall.ThemeRule.lineTrim }
                                            style={{
                                                display: (wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'none' : '-webkit-box',
                                                fontSize: wall.ThemeRule.fontSize,
                                                color: wall.ThemeRule.fontColor,
                                                fontFamily: `${wall.ThemeRule.fontText ? wall.ThemeRule.fontText : " "}`,
                                                textAlign: wall.ThemeRule.textAlignment
                                            }}>
                                            <ContentConversion  trimContent={Math.trunc(1000 / 5)} fdata={item} key={index}
                                                contentData={item.content} fullcontentData={item.content}
                                                personalization={wall.Personalization}
                                                onclick={this.readmore} />
                                        </div> : null
                                    }

                                    {item.cta ? convertHtmlStringToRender(item.cta) : null}

                                    <PostAuthor network={item.network} item={item} wall={wall} />

                                </div>
                                <ShareWrapper network={item.network} item={item}/>
                            </div>
                            {wall.ThemeRule.socialAction ?
                                <ShareActions item={item} widgetTheme={wall.Personalization.widgetTheme} /> : null}

                        </div>
                    </div>
                })
            }
            </Slider>

            {this.state.setModalShow &&
                <PopupData
                    wall={wall}
                    wallId={wallId}
                    show={this.state.setModalShow}
                    onHide={this.handleCloseModal}
                    data={(this.state.dataPopup) ? this.state.dataPopup : null}
                />}

        </div>
    }

}

const mapStateToProps = state => {
    const { wallId, wall, postData, loader } = state
    return {
        wallId: wallId.wallID,
        wall: wall.wallData,
        languageSetting: state.languageSetting,
        appendData: postData.appendData,
        loader: loader,
        postData: postData,
        completeDataObject: postData.completeDataObject,
        networkId: postData.appendData.networkID,
        hasMoreData: state.postData.hasMoreData[0] ? state.postData.hasMoreData[0].hasMoreData == false ? false : state.postData.hasMoreData[state.postData.appendData.networkID] ? state.postData.hasMoreData[state.postData.appendData.networkID].hasMoreData : true : true
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow)),
        preRenderDataUpdateToParent: (postData) => dispatch(preRenderDataUpdateToParent(postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewCarouselTheme);