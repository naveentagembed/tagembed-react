/* trial purpose for optimization */ 
// import React, {PureComponent} from 'react';

// class FullScreenButton extends PureComponent {
//     state = {
//         enableFullScreenBtnActive: false
//     }

//     componentDidMount() {
//         setInterval(() => this.onEnableFullScreenBtnActive(), 7000);
//     }

//     /* To enable the video full screen button */
//     enableFullScreen = event => {
//         let elem = document.documentElement;
//         if (elem.requestFullscreen) {
//             elem.requestFullscreen();
//         } else if (elem.mozRequestFullScreen) { /* Firefox */
//             elem.mozRequestFullScreen();
//         } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//             elem.webkitRequestFullscreen();
//         } else if (elem.msRequestFullscreen) { /* IE/Edge */
//             elem.msRequestFullscreen();
//         }
//         this.onEnableFullScreenBtnActive();
//     }
//     onEnableFullScreenBtnActive = () => this.setState({enableFullScreenBtnActive: false})

//     render() {
//         const {enableFullScreenBtnActive} = this.state;
//         return <a className="commanBtn btn-sm triggerFullScreen" onClick={this.onEnableFullScreenBtnActive}
//                   style={{display: enableFullScreenBtnActive ? 'block' : 'none'}}><i
//             className="icon-size-fullscreen icons"></i>&nbsp; Enable Full Screen</a>
//     }
// }

// export default FullScreenButton;