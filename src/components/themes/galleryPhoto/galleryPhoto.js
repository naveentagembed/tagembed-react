import React, {PureComponent} from 'react';
import Masonry from 'react-masonry-component';
import CardPost from '../../cardPost'
import { browserName } from "react-device-detect";

class GalleryPhotoTheme extends PureComponent {

    state = {
        //windowWidth: document.getElementById('tagembed_main').clientWidth,
        //windowWidth:window.innerWidth,
        //windowWidth : document.getElementById("tagembed_main").clientWidth - `${browserName == "Firefox" ? 18 : 6}`,
        windowWidth:window.innerWidth - `${browserName == "Firefox" ? 18 : 6}`,
        postData: []
    }

    /*Used for calculate the post length  */
    calculationData = (length, cardNumber1, columnCount, totalPostBestFit) => {
        if (length > totalPostBestFit && length > (totalPostBestFit + columnCount)) return {
            totalPostBestFit: (totalPostBestFit + columnCount),
            isLastRow: true
        };
        else return {totalPostBestFit: totalPostBestFit, isLastRow: false};
    }

    componentDidMount() {
        const {postData} = this.props;
        this.setState({postData})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.postData !== this.props.postData) {
            this.setState({postData: this.props.postData})
        }
    }

    render() {
        const {postData} = this.state;
        const {
            wall,
            onHeightTestUpdate,
            loader,
            completeDataObject,
            initialCount,
            windowWidth,
            windowHeight,
            adjustWidth,
            cardNumber
        } = this.props;
        if (wall) {
            var totalPostBestFit = {totalPostBestFit: 0, isLastRow: false};
            let cardNumber2 = cardNumber;

            if (wall.Personalization.columnCount === 0) {
                let adjustMinimumPostWidth = wall.Personalization.minimumPostWidth;
                cardNumber2 = (windowWidth) / (adjustMinimumPostWidth);
                let rowCard = Math.trunc(cardNumber2)
                wall.Personalization.columnCount = rowCard
            }
            if (postData.length > parseInt(cardNumber)) {
                let columnCountValue = wall.Personalization.columnCount;
                let cardNumber1 = parseInt(cardNumber);
                if (columnCountValue === 4) {
                    cardNumber1 = 9;
                } else if (columnCountValue === 2) {
                    cardNumber1 = 3;
                } else if (columnCountValue === 3) {
                    cardNumber1 = 6;
                } else if (columnCountValue === 5) {
                    cardNumber1 = 12;
                }
                if (windowWidth < 768) cardNumber1 = parseInt(cardNumber);

                let bestFitEachRow = postData.length / parseInt(cardNumber1);
                totalPostBestFit = (parseInt(cardNumber1) * parseInt(bestFitEachRow));
                totalPostBestFit = this.calculationData(postData.length, cardNumber1, columnCountValue, totalPostBestFit)
            }
        }

        let columnCount = wall.Personalization.columnCount + 1;
        return <Masonry
            id="eThemePosts"
            className={`galleryPhoto theme${wall.Personalization.widgetTheme}`}
            elementType={'div'}
            options={{
                transitionDuration: 0,
            }}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            imagesLoadedOptions={{}}
            style={{width: '100%!important'}}
            enableResizableChildren={true}
            onLayoutComplete={onHeightTestUpdate}>

            {!loader.webFilterLoader && postData && postData.length ? postData.map((item, index) => {
                    let actualPostWidth = adjustWidth;
                    if (wall.Personalization.columnCount === 3 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + (wall.Personalization.columnCount * 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 2 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + (wall.Personalization.columnCount + 1);
                        columnCount = nextCount;

                    } else if (wall.Personalization.columnCount === 4 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 1);
                        columnCount = nextCount;

                    } else if (wall.Personalization.columnCount === 5 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 6 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 7 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 8 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 9 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 10 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 11 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 12 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    } else if (wall.Personalization.columnCount === 13 && columnCount === (index + 1)) {
                        actualPostWidth = (adjustWidth * 2);
                        let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
                        columnCount = nextCount;
                    }


                    if (windowWidth < 768) actualPostWidth = adjustWidth;
                    return parseInt(totalPostBestFit.totalPostBestFit) >= parseInt((index + 1)) ?
                        <CardPost itemIndex={index}
                                  key={index}
                                  item={completeDataObject[item]}
                                  minimumWidth={wall.Personalization.minimumPostWidth}
                                  windowWidth={windowWidth}
                                  windowHeight={windowHeight}
                                  adjustWidth={actualPostWidth}
                                  initialAnimateCssStatus={parseInt(index) < parseInt(initialCount) ? true : false}
                        /> : parseInt(totalPostBestFit.totalPostBestFit) === 0 ? <CardPost itemIndex={index}
                                                                                           key={index}
                                                                                           item={completeDataObject[item]}
                                                                                           minimumWidth={wall.Personalization.minimumPostWidth}
                                                                                           windowWidth={windowWidth}
                                                                                           windowHeight={windowHeight}
                                                                                           adjustWidth={actualPostWidth}
                                                                                           initialAnimateCssStatus={parseInt(index) < parseInt(initialCount) ? true : false}
                        /> : null

                }
            ) : null
            } </Masonry>
    }
}

export default GalleryPhotoTheme;