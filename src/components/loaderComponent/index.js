/* trial purpose for optimization */ 
// import React, {PureComponent} from 'react';
// import './loader.scss'

// class LoaderComponent extends PureComponent {

//     render() {

//         const {loader, isLoading} = this.props;
//         return loader.loader_type === 0 ?
//             <div className={isLoading ? `loading` : ``}>
//                 <div className="tagembedLoader">
//                     <div className="logoAnimation flip-vertical-right">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="183.831" height="30.716"
//                              viewBox="0 0 183.831 30.716">
//                             <defs>
//                                 <clipPath id="clip-path">
//                                     <path id="Path_5101" data-name="Path 5101"
//                                           d="M900.879,569.317l-2.026,8.605,7.711.013,1.842-7.536Z"
//                                           transform="translate(-898.854 -569.317)" fill="none"/>
//                                 </clipPath>
//                             </defs>
//                             <g id="Group_3826" data-name="Group 3826" transform="translate(-211 -31)">
//                                 <g id="Group_3576" data-name="Group 3576" transform="translate(211 31)">
//                                     <path id="Path_5098" data-name="Path 5098"
//                                           d="M856.789,536.28c.879-4.167,1.737-8.218,2.585-12.271a12.107,12.107,0,0,0,.292-1.811,3.456,3.456,0,0,0-2.872-3.629,3.365,3.365,0,0,0-3.926,2.578c-1.287,5.912-2.552,11.83-3.739,17.763-.476,2.378,1.182,4.154,3.805,4.228,5.437.154,10.874.3,16.312.375a7.472,7.472,0,0,0,3.12-.529,3.244,3.244,0,0,0,1.563-3.694,3.456,3.456,0,0,0-3.394-2.654c-3.528-.109-7.057-.175-10.586-.263C858.915,536.348,857.88,536.312,856.789,536.28Z"
//                                           transform="translate(-849.048 -518.517)" fill="#00e9ff"/>
//                                     <path id="Path_5099" data-name="Path 5099"
//                                           d="M873.941,539.231c-4.259,0-8.4,0-12.54-.015a12.113,12.113,0,0,1-1.832-.09,3.455,3.455,0,0,1-2.956-3.562,3.365,3.365,0,0,1,3.336-3.306c6.05-.033,12.1-.044,18.152.024,2.425.027,3.819,2.017,3.347,4.6-.977,5.35-1.96,10.7-3.014,16.035a7.473,7.473,0,0,1-1.165,2.942,3.243,3.243,0,0,1-3.938.764,3.456,3.456,0,0,1-1.893-3.87c.625-3.474,1.291-6.94,1.937-10.41C873.567,541.325,873.747,540.305,873.941,539.231Z"
//                                           transform="translate(-854.088 -527.658)" fill="#4179ff"/>
//                                     <g id="Group_3575" data-name="Group 3575" transform="translate(16.61 16.942)">
//                                         <g id="Group_3574" data-name="Group 3574" clipPath="url(#clip-path)">
//                                             <path id="Path_5100" data-name="Path 5100"
//                                                   d="M856.789,536.28c.879-4.167,1.737-8.218,2.585-12.271a12.107,12.107,0,0,0,.292-1.811,3.456,3.456,0,0,0-2.872-3.629,3.365,3.365,0,0,0-3.926,2.578c-1.287,5.912-2.552,11.83-3.739,17.763-.476,2.378,1.182,4.154,3.805,4.228,5.437.154,10.874.3,16.312.375a7.472,7.472,0,0,0,3.12-.529,3.244,3.244,0,0,0,1.563-3.694,3.456,3.456,0,0,0-3.394-2.654c-3.528-.109-7.057-.175-10.586-.263C858.915,536.348,857.88,536.312,856.789,536.28Z"
//                                                   transform="translate(-865.658 -535.458)" fill="#00e9ff"/>
//                                         </g>
//                                     </g>
//                                 </g>
//                             </g>
//                         </svg>
//                     </div>
//                 </div>
//             </div> : <div className="tagembedLoader">
//                 <div className="loaderSpinner"></div>
//             </div>

//     }
// }

// export default (LoaderComponent);