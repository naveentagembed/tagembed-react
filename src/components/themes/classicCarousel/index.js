import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
/* import $ from "jquery"; */
import PageHeadSection from '../../pageHeadSection'
//import FullScreenButton from '../../fullScreenButton'
import WebFilters from '../../webFilters'
import {scrlBarComan} from '../customFunction'
import CustomPosts from '../../customPost'
import ThemeBanner from '../../themeBanner'
import PoweredBY from '../../poweredByComponent'
import {CUSTOM_SERVER_PATH} from '../../../constants'
import {filterPostDataAppendShowMore} from '../../../actions/themeActions'
import HorizontalSliderExtend from './slider'

class ClassicCarousel extends PureComponent {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    state = {
        //windowWidth: document.getElementById('tagembed_main').clientWidth - 1,
        windowWidth:window.innerWidth,
        windowHeight: window.innerHeight,
        wPostHeight: null,
        actualHeight: 150,
        initialCount: 0

    }

    componentWillMount() {
        const { renderId } = this.props.renderId
        this.setState({
          windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth
        })
      }

    componentDidMount() {
        const { renderId } = this.props.renderId
        window.addEventListener("resize", () => {
            this.setState({windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth, windowHeight: window.innerHeight})
        });

        const {postData} = this.props;
        if (postData.length) this.setState({initialCount: postData.length})
    }

    /* To adjust width for multiple browsers start */
    onLoadFunction = () => {
        const {windowWidth} = this.state;
        const {wall} = this.props;
        let platform = window.navigator.platform;
        /* -- firefox works the same way as ie --*/
        let cardNumber = null;
        let adjustSpacing = null;
        let spacing = null;
        let adjustWidth = null;

        if (platform === 'Win32') cardNumber = (windowWidth) / (wall.Personalization.minimumPostWidth)
        else cardNumber = (windowWidth) / (wall.Personalization.minimumPostWidth);
        let rowCard = Math.trunc(cardNumber)

        if (platform === 'Win32') {
            spacing = (windowWidth) % wall.Personalization.minimumPostWidth
            adjustSpacing = spacing / rowCard;
        } else {
            spacing = (windowWidth) % wall.Personalization.minimumPostWidth
            adjustSpacing = spacing / rowCard;
        }
        if (cardNumber >= 1) adjustWidth = (wall.Personalization.minimumPostWidth + adjustSpacing);
        else adjustWidth = (wall.Personalization.minimumPostWidth - adjustSpacing);
        adjustWidth = (adjustWidth - 2);
        return {rowCard, cardNumber, adjustSpacing, spacing, adjustWidth};
    }

    /* To adjust width for multiple browsers end */

    render() {
        const {wall, appendData, webFilters} = this.props;
        const {adjustWidth} = this.onLoadFunction();

        let fixedHeightStyle = null;
        if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight == "0") {
            fixedHeightStyle = {overflow: 'auto !important', height: `${appendData.heightEvent.data.iframeHeight}px`}
        }
       /* let scrollHeightValue = $("#ePosts").height() != undefined ? parseInt($("#ePosts").height()) : 0;
        if ($("#themeBanner").height()) scrollHeightValue = scrollHeightValue + $("#themeBanner").height() != undefined ? parseInt($("#themeBanner").height()) : $("#themeBanner").height()
        let horizontalThemeSetMarginTop = (parseInt(window.outerHeight) - scrollHeightValue) / 2; */
        return <Fragment>
            <div id="controllerContent">
                {webFilters.length >= 2 ? null : wall.UserRule.branding_lite === 1 ?
                    <PoweredBY widgetTheme={wall.Personalization.widgetTheme} wallId={wall.Wall.id}/> : null}
                <div id="themesPostWrapper"
                     ref={this.refCallback} style={fixedHeightStyle}>

                    {/* To display the title bar text on page head section Start */}
                    {/* commented due to lite does not support metadata title */}

                    <PageHeadSection PageStyle={wall.Personalization.cssStatus === 1 ? wall.Personalization.css : null}
                                    
                    />

                    {/* To display the title bar text on page head section End */}

                    {/* To enable the video full screen button  */}
                    {/* <FullScreenButton/> */}
                    <div id="themesWrapper"
                         className={`scrollBarWrapper themesWrapper themeStart${wall.Personalization.widgetTheme} themeType${wall.Personalization.themeType} ${wall.UserRule.branding_lite === 1 ? `theme${wall.Personalization.widgetTheme}_poweredByMain` : null}`}
                         style={scrlBarComan(wall.banner.BackgroundImage != {} ? wall.banner.BackgroundImage.path : null, wall.ThemeRule.transparent, wall.Personalization.widgetTheme, false, window.innerHeight, 0, wall.banner.BackgroundImage != {} ? `${CUSTOM_SERVER_PATH}${wall.banner.BackgroundImage.path}${wall.banner.BackgroundImage.newName}` : null, wall.ThemeRule.backgroundColor, fixedHeightStyle)}
                    >
                        {wall.banner.BannerImage.status === 1 || (wall.banner.CustomBanner.status === 1 && wall.banner.CustomBanner.banner_position === 1) ? <ThemeBanner wall={wall} banner={wall.banner} /> : null}


                        {/* To display webfilter above posts */}
                        {   /* trial purpose for optimization */ }
                    <Fragment>{wall.Personalization.filterStatus === 1 ?  <WebFilters appendData={appendData} /> : null }</Fragment>
                        <div className="horizontalColumns themeWrap">
                            <div id="eThemePosts"
                                 className={`theme${wall.Personalization.widgetTheme} theme${wall.Personalization.widgetTheme} slider responsive slick-initialized slick-slider`}
                                 style={
                                     {height: 'inherit', width: '94%', margin: '0 auto', padding: 6}}>

                                {/* To display the horizontal carousel slider */}
                                <HorizontalSliderExtend/>
                            </div>

                            {/* To display the custom posts  */}
                            <CustomPosts/>
                        </div>
                        {
                        wall.banner.CustomBanner.status === 1 && wall.banner.CustomBanner.banner_position === 2 ?
                            < ThemeBanner wall={wall}
                                banner={wall.banner}
                            /> : null
                    }

                    </div>

                </div>
            </div>
        </Fragment>
    }
}

const mapStateToProps = state => {
    const {wallId, webFilters, 
        /*announcements,*/ 
        wall, postData, customPostData, loader} = state
    return {
        renderId: state.renderId,
        wallId: wallId.wallID,
        webFilters: webFilters.webFilters,
        /*announcements: announcements.announcements,*/
        wall: wall.wallData,
        customPostData: customPostData.customPostData,
        appendData: postData.appendData,
        loader: loader,
        postData: postData.postData,
        completeDataObject: postData.completeDataObject,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        filterPostDataAppendShowMore: (wallID, timeStamp, postCount, networkId, after, postData) => dispatch(filterPostDataAppendShowMore(wallID, timeStamp, postCount, networkId, after, postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassicCarousel);