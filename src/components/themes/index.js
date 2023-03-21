import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import { getDataNextSteps, wallThemeUpdate } from '../../actions/themeActions'
import ModerCardWidgetTheme from './modernCard';
import WidgetCardTheme from './widgetCard';

import SnapCardWidgetTheme from './snapCard';
import ClassicCardTheme from './classicCard'
import Polaroid from './polaroid'
import SquareSpaceTheme from './squareSpace'
import GalleryPhotoTheme from './galleryPhoto'
import ErrorExtends from './error'
import HorizontalCarouselTheme from './horizontalCarousel'
import ClassicCarouselTheme from './classicCarousel'
import ReviewBoxTheme from './reviewBox'
import ReviewTableTheme from './reviewTable'
import ReviewCarouselTheme from './reviewCarousel'
import SliderCarouselTheme from './sliderCarousel'
import StoryCarouselTheme from './storySlider'
import { loaderTopHeightSetting } from '../../constants'
import '../../scss/themes.scss'

const ThemeLoadWithThemeID = (widgetTheme, loadMoreRequest) => {
    return <Fragment>
        {
            widgetTheme === 20 ? <ModerCardWidgetTheme loadMoreRequest={loadMoreRequest} /> : 
                widgetTheme === 5 ? <ClassicCardTheme loadMoreRequest={loadMoreRequest} /> :
                    widgetTheme === 3 ? <Polaroid loadMoreRequest={loadMoreRequest} /> :
                        widgetTheme === 4 ? <SquareSpaceTheme loadMoreRequest={loadMoreRequest} /> :
                            widgetTheme === 19 ? <SnapCardWidgetTheme loadMoreRequest={loadMoreRequest} /> :
                                widgetTheme === 50 ? <GalleryPhotoTheme loadMoreRequest={loadMoreRequest} /> :
                                    widgetTheme === 16 ? <HorizontalCarouselTheme /> :
                                        widgetTheme === 49 ? <WidgetCardTheme loadMoreRequest={loadMoreRequest} /> :
                                            widgetTheme === 47 ? <ClassicCarouselTheme /> :
                                                widgetTheme === 52 ?
                                                    <ReviewBoxTheme loadMoreRequest={loadMoreRequest} /> :
                                                    widgetTheme === 53 ?
                                                        <ReviewTableTheme loadMoreRequest={loadMoreRequest} /> :
                                                        widgetTheme === 54 ? <ReviewCarouselTheme /> :
                                                           widgetTheme === 55 ? <SliderCarouselTheme /> :
                                                           widgetTheme === 56 ? <StoryCarouselTheme /> : 
                                                           null


        }

    </Fragment>
}

class Themes extends PureComponent {
    state = {
        isFirstAppend: true
    }

    componentDidMount() {
        this.onDataWallThemeUpdate();
    }

    onDataWallThemeUpdate = () => {
        const { startEmbed, loader } = this.props;
        if (startEmbed.heightEvent && startEmbed.heightEvent.data && startEmbed.heightEvent && startEmbed.heightEvent.data.theme != null && parseInt(startEmbed.heightEvent.data.theme)) {
            this.props.wallThemeUpdate(parseInt(startEmbed.heightEvent.data.theme), loader.loader.wall)
        }

    }

    onAfterLoadedData = () => {
        const { appendData, wall, postData, wallId } = this.props;
        if (wall) {
            const tstamp = Math.floor(Date.now() / 1000);
            let postCount = wall.ThemeRule.numberOfPosts;
            this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.postData.postData, appendData.heightEvent);
        }
    }

    render() {
        const { loader, wall, error, loadMoreRequest } = this.props;
        let loaderTopStyle = 0;
        if (wall && wall != null && wall.Personalization.widgetTheme !== 49) {
            loaderTopStyle = loaderTopHeightSetting();
        }

        return (!loader.themeLoader && wall && Object.keys(wall).length>0) ? error && error.errorData !== null ? <ErrorExtends innerHeight={window.innerHeight} /> : ThemeLoadWithThemeID(wall.Personalization.widgetTheme, loadMoreRequest): null
    }

}

const mapStateToProps = state => {
    return {
        loader: state.loader,
        wallId: state.wallId.wallID,
        wall: state.wall.wallData,
        postData: state.postData,
        error: state.error.themeError,
        startEmbed: state.startEmbed
    }
}
const mapDispatchToProps = dispatch => {
    return {
        wallThemeUpdate: (themeID, wallData) => dispatch(wallThemeUpdate(themeID, wallData)),
        getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInState) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInState)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Themes);

