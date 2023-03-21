import React, {PureComponent, Fragment} from 'react';
import {CLOUD_URL} from '../../../actions/api'

class ReviewHeader extends PureComponent {

    render() {
        return (
            <Fragment>
                <div className={`reviewHeader`}>
                    <div className="reviewHeaderBrand">
                        <i className="fa fa-google-new"></i>
                        <div className="reviewRatingWrapper">
                            <div className="brandName">Your Brand Name</div>
                            <div className="reviewRating"><span className="f5">5.0</span>
                                <span>
                                    <img src={`${CLOUD_URL}/images/rating/4/5.png`}/></span>
                                <span>(4,563)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <a href="#" className="btnStyle primary sm writeReviewBtn"><i
                            className="fa fa-pencil"></i> Write A Review</a>
                        <span className="recommendation">
                            <img src="https://cdn.tagembed.com/app/img/recomdation.png" alt="recommended"
                                 className="img-fluid"/>
                            <i>Recommended by 4, 672 people</i>
                        </span>
                    </div>
                </div>
            </Fragment>
        )

    }
}

export default ReviewHeader;