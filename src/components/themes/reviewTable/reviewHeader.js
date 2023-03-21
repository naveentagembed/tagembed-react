// import React, {PureComponent, Fragment} from 'react';
// import {CLOUD_URL} from '../../../actions/api'

// class ReviewHeader extends PureComponent {

//     render() {

//         const {postData , completeDataObject} = this.props
        
//         let netwrk = []
//         {
//             postData.map((item, index) =>
//                 netwrk = completeDataObject[item]
//             )
//         }

//         

//         return (
//             netwrk.length != 0 ? netwrk.network.id == 4 ? <Fragment>
//                 <div className="reviewHeader">
//                     <div className="reviewHeaderBrand">
//                         <i className="fa fa-google-new"></i>
//                         <div className="reviewRatingWrapper">
//                             <div className="brandName">{netwrk.network.name}</div>
//                             <div className="reviewRating"><span className="f5">5.0</span>
//                                 <span>
//                                     <img src={`${CLOUD_URL}/images/rating/4/5.png`} alt=""/>
//                                 </span>
//                                 <span>(4,563)</span></div>
//                         </div>
//                     </div>
//                     <div><a href="#" className="btnStyle primary sm writeReviewBtn"><i
//                         className="fa fa-pencil"></i> Write A Review</a></div>
//                 </div>
//             </Fragment> : null : null
//         )

//     }
// }

// export default ReviewHeader;