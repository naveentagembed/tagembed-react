import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
    heightEvent,
    filterPostDataAppendShowMore,
    getDataNextSteps,
    preRenderDataUpdateToParent,
    setUrlAccessed,
    getThemeDataWithWallID,
    postEmbedUrlWithID
} from './actions/themeActions'
import ErrorExtends from './components/themes/error'
import Theme from './components/themes'
import './scss/custom.scss';
import { install } from "resize-observer";

import { scriptAndLink, onGetWallID, getWallID } from './utils'

class App extends PureComponent {
    constructor(props) {
        super(props);
        window.onload = () => {
            scriptAndLink();
        }
        this.state = {
            wallID: getWallID()

        }

    }

    /*--Start--Manage AutoLoad For React*/
    AutoLoadScrollData = () => {
        let wallEditor = document.getElementsByClassName("wall-editor");
        wallEditor.length > 0 && wallEditor[0].addEventListener("scroll", (event) => {
            let fixedHeightScrollBar = wallEditor[0];
            let documentHeight = document.body.scrollHeight;
            if ((documentHeight + fixedHeightScrollBar.scrollTop) >= (fixedHeightScrollBar.scrollHeight - 10)) {
                this.onAutoScrollQueryRequest().then((scrollResponse) => {
                })
            }
        });
    }

    /*--End--Manage AutoLoad For React*/

    componentDidMount() {
        let hostUrl = window.location.href;
        if (hostUrl.includes("https://app.tagembed.com/")) {
            this.AutoLoadScrollData();
        }

        const { appendData } = this.props;
        window.scroll({ behavior: 'smooth' });
        window.scrollBy({ behavior: 'smooth' });
        

        //let wallId = window.wallUrl;
        this.props.getThemeDataWithWallID(this.state.wallID, appendData.heightEvent)
        setTimeout(() => {
            if (!this.postEmbedUrl()) this.props.postEmbedUrlWithID(this.state.wallID)
        }, 5000)
        window.addEventListener("message", this.onMessageReceived);
        install();
        window.addEventListener("scroll", this.autoLoadScrollData);
        // const resizeObserver = new ResizeObserver((entries) => {
        //     window.dispatchEvent(new Event('resize'));
        // })
        // resizeObserver.observe(document.getElementById("tagembed_main"));
    }

    autoLoadScrollData = event => {
        if (!window.location.href.includes("?view")) {
            const { appendData } = this.props;
            const body = document.body;
            const html = document.documentElement;
            const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            if ((window.innerHeight + window.pageYOffset) >= (parseInt(height) - parseInt(50))) {
                //if (!(loaderData && loaderData.isShowMoreLoading)) {
                    this.onAutoScrollQueryRequest().then((scrollResponse) => {
                        var obj = { type: 'loadComplete', loadstatus: true }
                        if (appendData.heightEvent != null) {
                            appendData.heightEvent.source.postMessage(obj, appendData.heightEvent.origin)
                        }
                    })
               // }
            }
        }
    }

    postEmbedUrl = () => {
        const { startEmbed, postData } = this.props;
        if (startEmbed && startEmbed.heightEvent && startEmbed.heightEvent.data !== undefined) {
            const embedUrl = startEmbed.heightEvent.data.url;
            return postData.getThemeDataWithWallID.includes(embedUrl);
        }
        // commeneted due to embedUrl request need to send to Lite code
        // else {
        //     return postData.getThemeDataWithWallID;
        // }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.wall && this.props.wall.ThemeRule && this.props.wall.ThemeRule.numberOfPosts && this.props.postData.postData.length < this.props.wall.ThemeRule.numberOfPosts && this.props.postData.appendData.networkID && prevProps.postData.postData.after !== this.props.postData.after) {
            const { wall, wallId } = this.props;
            const tstamp = Math.floor(Date.now() / 1000);
            this.props.getDataNextSteps(wallId, tstamp, wall.ThemeRule.numberOfPosts - this.props.postData.postData.length, this.props.appendData.networkID, this.props.appendData.after, this.props.postData.preRender, this.props.appendData.heightEvent, true);
        }
    }

    checkRestangularNullData = (data) => {
        if (data && data.hasMoreData !== undefined && data.hasMoreData === false) return false;
        else return true;
    }
    checkWidgetThemeAutoScrollEnable = (widgetTheme) => {
        let autoScrollDisableWidgetTheme = [16, 47, 54, 55, 56];
        return !autoScrollDisableWidgetTheme.includes(widgetTheme);
    }

    /*   Need to check code  start */
    onAutoScrollQueryRequest = async () => {
        const { wall, wallId, imageList } = this.props;
        if (wall && wall.Personalization.autoScrollStatus === 1 && this.checkRestangularNullData(this.props.postData.hasMoreData[this.props.postData.currentFilterNetworkId !== undefined ? 0 : this.props.postData.currentFilterNetworkId]) && this.checkWidgetThemeAutoScrollEnable(wall.Personalization.widgetTheme)) {
            const tstamp = Math.floor(Date.now() / 1000);
            let postCount = wall.ThemeRule.numberOfPosts;

            if (this.props.appendData.networkID && this.props.appendData.networkID !== 0) {
                const filteredArr = Object.keys(this.props.postData.preRender).filter(item => this.props.postData.preRender[item].network.id === this.props.appendData.networkID);
                if (filteredArr.length > 0) {
                    this.props.preRenderDataUpdateToParent([]);
                }
                if (filteredArr.length < postCount) {
                    await this.props.getDataNextSteps(wallId, tstamp, postCount - filteredArr.length, this.props.appendData.networkID, this.props.appendData.after, this.props.postData.preRender, this.props.appendData.heightEvent, true);
                }
                await this.props.getDataNextSteps(wallId, tstamp, postCount, this.props.appendData.networkID, this.props.appendData.after, this.props.postData.preRender, this.props.appendData.heightEvent);
            } else {
                if (Object.keys(this.props.postData.preRender).length > 0) {
                    this.props.preRenderDataUpdateToParent(this.props.postData.preRender);
                    this.props.getDataNextSteps(wallId, tstamp, postCount, this.props.appendData.networkID, this.props.appendData.after, this.props.postData.preRender, this.props.appendData.heightEvent);
                } else {
                    this.props.getDataNextSteps(wallId, tstamp, postCount, this.props.appendData.networkID, this.props.appendData.after, this.props.postData.preRender, this.props.appendData.heightEvent);
                }

            }

        }
    }

    /*   Need to check code end */

    onMessageReceived = event => {
        if (event && typeof (event) === 'object' && event.data.hasOwnProperty("type"))
            if (event.data.type === "startEmbed") {
                this.props.heightEvent(event);
                setInterval(() => {

                    const { wall, postData, startEmbed, errorWithMessage, imageList } = this.props;
                    if (wall && wall != null && postData && postData.appendData && startEmbed.heightEvent && startEmbed.heightEvent.data) {
                        let scrollHeight = document.body.scrollHeight;
                        let referersData = {}
                        if (wall && wall != null) {
                            referersData = { refererlink: wall.refere.referePageLink, referer: wall.refere.referePage }
                        }
                        if (startEmbed.heightEvent.data.fixedHeight === 0) {
                            var obj = {
                                type: 'getHeight',
                                data: {
                                    height: startEmbed.heightEvent.data.iframeHeight,
                                    iframe: this.props.startEmbed.heightEvent.data.id, ...referersData
                                }
                            }
                            window.top.postMessage(obj, "*");
                        } else {

                            var obj = {
                                type: 'getHeight',
                                data: {
                                    height: !scrollHeight ? 0 : scrollHeight,
                                    iframe: this.props.startEmbed.heightEvent.data.id, ...referersData
                                }
                            }
                            window.top.postMessage(obj, "*");
                        }
                    } else {
                        if (errorWithMessage.errorWithMessage != null) {
                            let scrollHeight = document.body.scrollHeight;

                            let referersData = {}
                            var obj = {
                                type: 'getHeight',
                                data: {
                                    height: !scrollHeight ? 0 : scrollHeight,
                                    iframe: this.props.startEmbed.heightEvent.data.id, ...referersData
                                }
                            }
                            window.top.postMessage(obj, "*");
                        }
                    }

                }, 5);
            } else if (event.data.type === "loadMore") {
                const { appendData } = this.props;
                this.onAutoScrollQueryRequest().then((scrollResponse) => {
                    var obj = { type: 'loadComplete', loadstatus: true }
                    if (appendData.heightEvent != null) {
                        appendData.heightEvent.source.postMessage(obj, appendData.heightEvent.origin)
                    }
                })


            }
    }


    render() {
        const { loader, appendData, errorWithMessage, imageList } = this.props;
        return loader && loader.loader != null && errorWithMessage.errorWithMessage == null ?
            <Theme appendData={appendData}
                loadMoreRequest={this.onAutoScrollQueryRequest} /> : errorWithMessage.errorWithMessage != null ?
                <ErrorExtends innerHeight={window.innerHeight} /> : null
    }
}

const mapStateToProps = state => {
    return {
        startEmbed: state.startEmbed,
        loader: state.loader,
        wallId: state.wallId.wallID,
        wall: state.wall.wallData,
        postData: state.postData,
        appendData: state.postData.appendData,
        urlsAccessed: state.postData.urlsAccessed,
        errorWithMessage: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getThemeDataWithWallID: (Id, heightEvent) => dispatch(getThemeDataWithWallID(Id, heightEvent)),
        postEmbedUrlWithID: (Id) => dispatch(postEmbedUrlWithID(Id)),

        heightEvent: (event) => dispatch(heightEvent(event)),
        filterPostDataAppendShowMore: (wallID, timeStamp, postCount, networkId, after, postData, imageList) => dispatch(filterPostDataAppendShowMore(wallID, timeStamp, postCount, networkId, after, postData, imageList)),
        getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInState) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInState)),
        preRenderDataUpdateToParent: (postData) => dispatch(preRenderDataUpdateToParent(postData)),
        setUrlAccessed: (url) => dispatch(setUrlAccessed(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);