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
import ReviewSliderExtend from './slider'
import {browserName} from "react-device-detect";

class ReviewCarouselTheme extends PureComponent {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    state = {
        //windowWidth: document.getElementById('tagembed_main').clientWidth - `${browserName == "Firefox" ? 18 : 6}`,
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

    render() {
        const {wall, appendData, webFilters} = this.props;

        let fixedHeightStyle = null;
        if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight == "0") {
            fixedHeightStyle = {overflow: 'auto !important', height: `${appendData.heightEvent.data.iframeHeight}px`}
        }
        /* let scrollHeightValue = $("#ePosts").height() != undefined ? parseInt($("#ePosts").height()) : 0;
        if ($("#themeBanner").height()) scrollHeightValue = scrollHeightValue + $("#themeBanner").height() != undefined ? parseInt($("#themeBanner").height()) : $("#themeBanner").height() */

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
                        <div className="reviewCarousel themeWrap">
                            <div id="eThemePosts"

                                 className={`theme${wall.Personalization.widgetTheme} theme${wall.Personalization.widgetTheme} `}
                                 style={
                                     {height: 'inherit', width: '96%', margin: '0 auto', padding: 0}}>

                                {/* To Show the Horizontal carousel  */}
                                <ReviewSliderExtend/>
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
    const {webFilters, wall, postData} = state
    return {
        renderId: state.renderId,
        webFilters: webFilters.webFilters,
        wall: wall.wallData,
        appendData: postData.appendData,
        postData: postData.postData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        filterPostDataAppendShowMore: (timeStamp, postCount, networkId, after, postData) => dispatch(filterPostDataAppendShowMore(timeStamp, postCount, networkId, after, postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewCarouselTheme);