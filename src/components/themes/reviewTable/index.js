import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import PageHeadSection from '../../pageHeadSection'
 /* trial purpose for optimization */ 
//import FullScreenButton from '../../fullScreenButton'
import WebFilters from '../../webFilters'
import { scrlBarComan, scrollbarComman } from '../customFunction'
import CustomPosts from '../../customPost'
import CardPost from '../../cardPost'
import ThemeBanner from '../../themeBanner'
import ShowMore from '../../showMore'
import PoweredBY from '../../poweredByComponent'
import { CUSTOM_SERVER_PATH } from '../../../constants'
import { filterPostDataAppendShowMore } from '../../../actions/themeActions'
import '../../../scss/theme/reviewTable.scss'
import { browserName } from "react-device-detect";


class ReviewTableTheme extends PureComponent {
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
            this.setState({ windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth, windowHeight: window.innerHeight })
        });
        const { appendData, postData, loadMoreRequest } = this.props;
        if (postData.length) this.setState({ initialCount: postData.length })

        if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight == "0") {
            document.getElementById("themesWrapper").addEventListener("scroll", (event) => {
                let fixedHeightScrollBar = document.getElementById("themesWrapper")
                let documentHeight = document.body.scrollHeight;
                if ((documentHeight + fixedHeightScrollBar.scrollTop) >= (fixedHeightScrollBar.scrollHeight - 150)) {
                    loadMoreRequest().then((scrollResponse) => {

                    })
                }
            });
        }

        /* SCROLLER */
        scrollbarComman(loadMoreRequest);

    }


    render() {
        const { wall, postData, loader, appendData, completeDataObject, webFilters } = this.props;
        const { windowWidth, windowHeight } = this.state;

        let fixedHeightStyle = null;
        if (appendData && appendData.heightEvent && appendData.heightEvent.data.fixedHeight == "0") {
            fixedHeightStyle = { overflow: 'hidden', height: `${appendData.heightEvent.data.iframeHeight}px` }
        }
        return <Fragment>
            {webFilters.length >= 2 ? null : wall.UserRule.branding_lite === 1 ?
                <PoweredBY widgetTheme={wall.Personalization.widgetTheme} wallId={wall.Wall.id} /> : null}
            <div id="themesPostWrapper" ref={this.refCallback} style={fixedHeightStyle}>

                {/* To display the title bar text on page head section Start */}
                 {/* commented due to lite does not support metadata title */}
                <PageHeadSection PageStyle={wall.Personalization.cssStatus === 1 ? wall.Personalization.css : null}
                    // PageTitle={`${wall.Wall.name} | Live Socialwall - Tagembed`}
                    // PageMetaData={null}
                />

                {/* To enable the video full screen button  */}
                {  /* trial purpose for optimization */ }
                {/* <FullScreenButton /> */}

                <div id="themesWrapper"
                    className={`scrollBarWrapper themesWrapper themeStart${wall.Personalization.widgetTheme} themeType${wall.Personalization.themeType} ${wall.UserRule.branding_lite === 1 ? `theme${wall.Personalization.widgetTheme}_poweredByMain` : null}`}
                    style={scrlBarComan(wall.banner.BackgroundImage != {} ? wall.banner.BackgroundImage.path : null, wall.ThemeRule.transparent, wall.Personalization.widgetTheme, false, window.innerHeight, 0, wall.banner.BackgroundImage != {} ? `${CUSTOM_SERVER_PATH}${wall.banner.BackgroundImage.path}${wall.banner.BackgroundImage.newName}` : null, wall.ThemeRule.backgroundColor, fixedHeightStyle)}
                >
                    {wall.banner.BannerImage.status === 1 || (wall.banner.CustomBanner.status === 1 && wall.banner.CustomBanner.banner_position === 1) ? <ThemeBanner wall={wall} banner={wall.banner} /> : null}
                    {/* To display webfilter above posts */}
                    {   /* trial purpose for optimization */ }
                    <Fragment>{wall.Personalization.filterStatus === 1 ?  <WebFilters appendData={appendData} /> : null }</Fragment>
                    
                    {/* <ReviewHeader postData={postData} completeDataObject={completeDataObject} /> */}

                    <div className="themeReviewTable themeWrap">
                        <Masonry
                            id="eThemePosts"
                            className={`reviewTable theme${wall.Personalization.widgetTheme}`}
                            elementType={'div'}
                            options={{
                                transitionDuration: 0,
                            }}

                            disableImagesLoaded={false}
                            updateOnEachImageLoad={false}
                            imagesLoadedOptions={{}}
                            style={{ width: '100%!important' }}
                            enableResizableChildren={true}> {!loader.webFilterLoader && postData && postData.length ? postData.map((item, index) =>
                                <CardPost itemIndex={index}
                                    key={index}
                                    item={completeDataObject[item]}
                                    minimumWidth={wall.Personalization.minimumPostWidth}
                                    windowWidth={windowWidth}
                                    windowHeight={windowHeight}
                                    initialAnimateCssStatus={parseInt(index) < parseInt(this.state.initialCount) ? true : false}

                                />) : null
                            } </Masonry>

                        {/* To display the custom posts  */}
                        <CustomPosts />
                    </div>

                    {/* To display the ShowMore button below posts  */}
                    {   /* trial purpose for optimization */ }
                    <Fragment>{wall.Personalization.loadMoreStatus === 1 ?  <ShowMore appendData={appendData} /> : null }</Fragment>
                    {
                        wall.banner.CustomBanner.status === 1 && wall.banner.CustomBanner.banner_position === 2 ?
                            < ThemeBanner wall={wall}
                                banner={wall.banner}
                            /> : null
                    }
                </div>

            </div>
        </Fragment>
    }
}

const mapStateToProps = state => {
    const { webFilters, wall, postData, loader } = state
    return {
        renderId: state.renderId,
        webFilters: webFilters.webFilters,
        wall: wall.wallData,
        appendData: postData.appendData,
        loader: loader,
        postData: postData.postData,
        completeDataObject: postData.completeDataObject,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        filterPostDataAppendShowMore: (timeStamp, postCount, networkId, after, postData) => dispatch(filterPostDataAppendShowMore(timeStamp, postCount, networkId, after, postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewTableTheme);