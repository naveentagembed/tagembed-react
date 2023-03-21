import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PageHeadSection from '../../pageHeadSection';
 /* trial purpose for optimization */ 
//import FullScreenButton from '../../fullScreenButton';
import WebFilters from '../../webFilters';
import {scrlBarComan} from '../customFunction';
import CustomPosts from '../../customPost';
import ThemeBanner from '../../themeBanner';
import PoweredBY from '../../poweredByComponent';
import {CUSTOM_SERVER_PATH} from '../../../constants';
import {filterPostDataAppendShowMore} from '../../../actions/themeActions';
import StorySliderExtend from './slider';
import {browserName} from "react-device-detect";

class StorySliderTheme extends PureComponent {
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
        initialCount: 0,
        heightUpdate: 'auto'

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
        setTimeout(() => window.dispatchEvent(new Event('resize')), 500)
    }

    render() {
        const {wall, appendData, webFilters} = this.props;

        let fixedHeightStyle = null;
        if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight == "0") {
            fixedHeightStyle = {overflow: 'auto', height: `${appendData.heightEvent.data.iframeHeight}px`}
        }
        return <Fragment>
            <div id="controllerContent">
                <div id="themePostWrapper"
                     ref={this.refCallback}>

                    {/* To display the title bar text on page head section Start */}
                     {/* commented due to lite does not support metadata title */}
                    <PageHeadSection PageStyle={wall.Personalization.cssStatus === 1 ? wall.Personalization.css : null}
                                    //  PageTitle={`${wall.Wall.name} | Live Socialwall - Tagembed`}
                                    //  PageMetaData={null}
                    />

                    {/* To enable the video full screen button  */}
                    {  /* trial purpose for optimization */ }
                    {/* <FullScreenButton/> */}
                    <div id="themesWrapper"
                         className={`scrollBarWrapper themesWrapper themeStart${wall.Personalization.widgetTheme} themeType${wall.Personalization.themeType} ${wall.UserRule.branding_lite === 1 ? `theme${wall.Personalization.widgetTheme}_poweredByMain` : null}`}
                         style={scrlBarComan(wall.banner.BackgroundImage != {} ? wall.banner.BackgroundImage.path : null, wall.ThemeRule.transparent, wall.Personalization.widgetTheme, false, window.innerHeight, 0, wall.banner.BackgroundImage != {} ? `${CUSTOM_SERVER_PATH}${wall.banner.BackgroundImage.path}${wall.banner.BackgroundImage.newName}` : null, wall.ThemeRule.backgroundColor, fixedHeightStyle)}
                    >
                        {wall.banner.BannerImage != {} ? <ThemeBanner wall={wall} banner={wall.banner}/> : null}

                        {/* {wall.banner.BannerImage != {} ? wall.banner.BannerImage.status === 1 ? <OwnBanner BannerImage={wall.banner.BannerImage} /> : null : null}

                    {wall.banner.CustomBanner.status === 1 && wall.banner.CustomBanner.banner_position === 1 ? <ThemeBanner wall={wall} banner={wall.banner} /> : null} */}


                        {/* To display webfilter above posts */}
                        {   /* trial purpose for optimization */ }
                    <Fragment>{wall.Personalization.filterStatus === 1 ?  <WebFilters appendData={appendData} /> : null }</Fragment>
                        <div className="themeWrap">
                            {webFilters.length >= 2 ? null : wall.UserRule.branding_lite === 1 ?
                                <PoweredBY widgetTheme={wall.Personalization.widgetTheme}
                                           wallId={wall.Wall.id}/> : null}

                            <div id="eThemePosts"
                                 className={`themeStart${wall.Personalization.widgetTheme} theme${wall.Personalization.widgetTheme}`}
                                 style={
                                     {height: 'inherit'}}>
                             

                                {/* To display the horizontal carousel slider */}
                                <StorySliderExtend/>

                            </div>

                            {/* To display the custom posts  */}
                            <CustomPosts/>
                        </div>
                        {
                            wall.banner.CustomBanner.status === 1 && wall.banner.CustomBanner.banner_position === 2 ?
                                < ThemeBanner CustomBanner={wall.banner.CustomBanner}
                                              CustomBannerImage={wall.banner.CustomBannerImage}
                                              LogoImage={wall.LogoImage}
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
export default connect(mapStateToProps, mapDispatchToProps)(StorySliderTheme);