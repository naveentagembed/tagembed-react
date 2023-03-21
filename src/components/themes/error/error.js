import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
/* import $ from "jquery"; */
import { API_URL } from '../../../actions/api'
import { ERROR_BACKGROUND_IMG, ERROR_ERROR } from '../../../constants'
import './error.scss'


const styles = {
    addBtn: {
        border: '1px solid #2b2b2b',
        color: '#2b2b2b',
        fontSize: '14px',
        textTransform: 'uppercase',
        padding: '12px 20px',
        borderRadius: '5px', margin: 8
    },
    showDemoPost: {
        fontSize: '14px',
        textTransform: 'uppercase',
        padding: '12px 20px',
        borderRadius: '5px', margin: 8, color: '#fff',
        border: 'none'
    },
    demoWallErrorStyle: {
        maxWidth: '100%',
        width: '100%',
        left: 'auto',
        right: '0px',
        transform: 'none',
        bottom: 'auto',
        top: '0px',
        zIndex: 9998,
        position: 'relative',
        padding: '10px 15px',
        borderTop: '1px solid rgb(244, 244, 244)',
        borderRadius: '0px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(255, 255, 255)'
    },
    hideBtnStyle: {
        color: 'rgb(194, 14, 94)',
        textTransform: 'capitalize',
        background: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(194, 14, 94)',
        borderImage: 'initial',
        padding: '10px 15px',
        margin: '3px'
    },
    strongCss: {
        color: '#c20e5e',
        fontWeight: 600,
        textTransform: 'capitalize'
    }
}

class Error extends PureComponent {
    onClickToadd = event => {
        let data = [];
        data['type'] = 'create_feed';
        window.parent.postMessage(data, '*');
    }
    onClickToDemoPost = event => {
        const { wall } = this.props;
        let wallId = wall.Wall.id;
        let status = wall.Personalization.demoWall;
        /* $.ajax({
            url: `${API_URL}wall/demoStatus/${wallId}/${status}`,
            cache: false,
            dataType: "json",
            timeout: (1000 * 60 * 7),
            success: function (response) {
                window.location.reload();
            }
        }); */

        fetch('${API_URL}wall/demoStatus/${wallId}/${status}', {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: false,
            timeout: (1000 * 60 * 7),
            success: function (response) {
                window.location.reload();
            }
        });


    }

    onClicktoUrl = (path) => event => {
        window.top.location.href = path;
    }


    render() {

        const { error, wall, innerHeight, errorMessage, errorWithMessage } = this.props;
        let editor = window.location.pathname.includes('/editor');
        return (errorMessage != null ?
            <React.Fragment>
                <div className="noPostSec" id="noPosts"
                    style={{
                        backgroundImage: 'url(' + ERROR_BACKGROUND_IMG + ')'
                        , height: innerHeight, backgroundSize: 'cover'
                    }}>
                    <div className="noContentPost">
                        <div className="noPostBlockMsg">
                            <h2><a href="https://app.tagembed.com" target="_blank" rel="noopener noreferrer"> Wall is
                                not active.</a></h2>

                        </div>
                    </div>
                </div>
            </React.Fragment> :
            <React.Fragment>
                {
                    error.errorData.errorCode === 404 ? <React.Fragment>
                        <div className="noPostSec" id="noPosts"
                            style={{
                                backgroundImage: 'url(' + ERROR_BACKGROUND_IMG + ')'
                                , height: innerHeight, backgroundSize: 'cover'
                            }}>
                            <div className="noContentPost">
                                <div className="limitExceed-wrap">
                                    <div className="limitExceed">
                                        <div className="limitExceed-content">
                                            {error.errorData.errorHeading == "" ? '' : <h2>{error.errorData.errorHeading}</h2>}
                                            <p>{error.errorData.errorMessage}</p>
                                            {error.errorData.errorMessage.errorBtnLink == "" ? '' : <button className={`upgrade-btn ${(error.errorData.errorBtnLink == null) ? `off` : `on`}`}><a href={error.errorData.errorBtnLink} target="_blank"
                                                rel="noopener noreferrer">{error.errorData.errorBtnTxt}</a>
                                            </button>}

                                        </div>
                                        <div className="tagembedBranding">
                                            <span>Powered by</span>
                                            <a href="https://app.tagembed.com" target="_blank"
                                                rel="noopener noreferrer" title="tagembed" alt="tagembed">
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGtmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0wOS0xOFQxNDoyNTozMSswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMTAtMzFUMTA6NDQ6MDErMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMTAtMzFUMTA6NDQ6MDErMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODgzYzhmZWEtMTYyMi1hMzRkLWI4MTAtMjYyOWVkNmU3Y2ViIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZmI2YzAxMzUtNThhNy0xZTRhLWFkNDUtYzBmODg1Y2NkYWYxIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2JkZmJjZjgtNGNiZC1hNjRhLTg4ZWYtZGY3ODFjZjI3OWI4Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYmRmYmNmOC00Y2JkLWE2NGEtODhlZi1kZjc4MWNmMjc5YjgiIHN0RXZ0OndoZW49IjIwMTktMDktMThUMTQ6MjU6MzErMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1MmVjNDMyLTE2YjAtMzU0NS1hNmRkLTgzMjJhOGMxYTE1YyIgc3RFdnQ6d2hlbj0iMjAxOS0wOS0xOFQxNDoyNjo0NiswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODgzYzhmZWEtMTYyMi1hMzRkLWI4MTAtMjYyOWVkNmU3Y2ViIiBzdEV2dDp3aGVuPSIyMDIwLTEwLTMxVDEwOjQ0OjAxKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PikKGikAAAfJSURBVGiB3dpbjFx1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" width="20px" height="20px" alt="tagembed"></img>
                                            </a>

                                        </div>

                                    </div>
                                </div>
                                {/* <div className="noPostBlockMsg">
                                        <h2><a href="https://app.tagembed.com" target="_blank"
                                               rel="noopener noreferrer"> Wall is not active.</a></h2>
                                    </div> */}
                            </div>
                        </div>
                    </React.Fragment>
                        : error.errorData.errorCode === 201 ? <React.Fragment>
                            <h2>No Posts!</h2>
                            <p>If Moderation is ON, then the posts might be in the moderation section and you need to
                                approve them by going to MODERATION.</p>
                            <p>Else, there might not be any posts on feeds which you have added.</p>
                        </React.Fragment> : error.errorData.errorCode === 202 ? <React.Fragment>
                            {wall.Personalization.demoWall === 1 && editor ?
                                <div style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 10px', ...styles.demoWallErrorStyle }}>
                                    <h2 style={{ display: 'none' }}>No Feeds!</h2>
                                    <p style={{
                                        fontFamily: 'Open Sans",sans-serif', fontSize: '18px',
                                        color: 'rgb(110, 112, 115)',
                                        fontWeight: 300,
                                        margin: '0px'
                                    }}>It seems you have not added any Feed. Please Add Social Networks !</p><span
                                        style={{ padding: '0px 15px' }}><a href="javascript:;"
                                            className="loadDemoWall btn hideBtn"
                                            onClick={this.onClickToDemoPost}>HIDE DEMO POSTS</a></span>
                                </div> : <React.Fragment>
                                    <h2>No Feeds!</h2>
                                    <p style={{ fontFamily: 'Open Sans",sans-serif' }}>It seems Feeds are not added by admin
                                        to be displayed.</p>

                                    {editor ? <div style={{ margin: '20px 0 0' }}>
                                        <a className="btnStyle primary" style={styles.addBtn} onClick={this.onClickToadd}>
                                            Add Feed </a>
                                        <a href="javascript:;" className="loadDemoWall btnStyle" style={styles.showDemoPost}
                                            onClick={this.onClickToDemoPost}>SHOW DEMO POSTS</a>
                                    </div> : null}</React.Fragment>}


                        </React.Fragment> : error.errorData.errorCode === 203 ? <React.Fragment>
                            {wall.Personalization.demoWall === 1 && editor ?
                                <div style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 10px', ...styles.demoWallErrorStyle }}>
                                    <h2 style={{ display: 'none' }}>Feed Not Activated!</h2>
                                    <p style={{
                                        fontFamily: 'Open Sans",sans-serif', fontSize: '18px',
                                        color: 'rgb(110, 112, 115)',
                                        fontWeight: 300,
                                        margin: '0px'
                                    }}>It seems Feeds are not activated by admin of the website.
                                    </p><span style={{ padding: '0px 15px' }}><a href="javascript:;"
                                        className="loadDemoWall btn hideBtn"
                                        onClick={this.onClickToDemoPost}>HIDE DEMO POSTS</a></span>
                                </div> : <React.Fragment>
                                    <h2>Feed Not Activated!</h2>
                                    <p>It seems Feeds are not activated by admin of the website.
                                    </p>
                                    {editor ? <div style={{ margin: '20px 0 0' }}>
                                        <a className="btnStyle primary" style={styles.addBtn} onClick={this.onClickToadd}>
                                            Add Another Feed </a>
                                        <a href="javascript:;" className="loadDemoWall btnStyle" style={styles.showDemoPost}
                                            onClick={this.onClickToDemoPost}>SHOW DEMO POSTS</a>
                                    </div> : null}
                                </React.Fragment>}</React.Fragment> : error.errorData.errorCode === 204 ?
                            <React.Fragment>
                                <h2>Feed Not Authorized!</h2>
                                <p>It seems you have not authorized any Feed. Please <a
                                    href={`${API_URL}widget/wall/index/${wall.Wall.id}`} className="manage-feed">Click
                                    here</a> to authorize Feed !</p>
                            </React.Fragment> : error.errorData.errorCode === 205 ? <React.Fragment>
                                {wall.Personalization.demoWall === 1 && editor ? <div
                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 10px', ...styles.demoWallErrorStyle }}><h2
                                        style={{ display: 'none' }}>No {error.posts}!</h2>
                                    <p style={{
                                        fontFamily: 'Open Sans",sans-serif', fontSize: '18px',
                                        color: 'rgb(110, 112, 115)',
                                        fontWeight: 300,
                                        margin: '0px'
                                    }}>It seems there are no {error.posts} available on the entered <span
                                        style={styles.strongCss}>{ERROR_ERROR[`${error.errorData.olderDays}`]}{error.errorData.olderDays}</span>.
                                        All Upcoming posts will appear here.</p><span style={{ padding: '0px 15px' }}><a
                                            href="javascript:;" className="loadDemoWall btn hideBtn"
                                            onClick={this.onClickToDemoPost}>HIDE DEMO POSTS</a></span></div> :
                                    <React.Fragment>
                                        <h2>No {error.posts}!</h2>
                                        <p>It seems there are no {error.posts} available on the entered <span
                                            style={styles.strongCss}>{ERROR_ERROR[`${error.errorData.olderDays}`]}{error.errorData.olderDays}</span>.
                                            All Upcoming posts will appear here.</p>
                                        <p className="tweets-or-section">OR</p>
                                        <p>You can Click here to create another feed.</p>
                                        {editor ? <div style={{ margin: '20px 0 0' }}>
                                            <a className="btnStyle primary" style={styles.addBtn}
                                                onClick={this.onClickToadd}>
                                                Add Another Feed </a>
                                            <a href="javascript:;" className="loadDemoWall btnStyle"
                                                style={styles.showDemoPost} onClick={this.onClickToDemoPost}>SHOW DEMO
                                                POSTS</a>
                                        </div> : null}

                                    </React.Fragment>} </React.Fragment> : error.errorData.errorCode === 206 ?
                                <React.Fragment>
                                    {wall.Personalization.demoWall === 1 && editor ? <div
                                        style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 10px', ...styles.demoWallErrorStyle }}>
                                        <h2 style={{ display: 'none' }}>No Tweets!</h2>
                                        <p style={{
                                            fontFamily: 'Open Sans",sans-serif', fontSize: '18px',
                                            color: 'rgb(110, 112, 115)',
                                            fontWeight: 300,
                                            margin: '0px'
                                        }}>It seems there are no tweets available on the entered <span
                                            style={styles.strongCss}>{ERROR_ERROR[`${error.errorData.olderDays}`]}{error.errorData.olderDays} </span>.
                                            All Upcoming tweets will appear here.</p><span style={{ padding: '0px 15px' }}><a
                                                href="javascript:;" className="loadDemoWall btn hideBtn"
                                                onClick={this.onClickToDemoPost}>HIDE DEMO POSTS</a></span></div> : <React.Fragment>
                                        <h2>No Tweets!</h2>
                                        <p>It seems there are no tweets available on the entered <span
                                            style={styles.strongCss}>{ERROR_ERROR[`${error.errorData.olderDays}`]}{error.errorData.olderDays}</span>.
                                            All Upcoming tweets will appear here.</p>
                                        <p className="tweets-or-section">OR</p>
                                        <p>Tweets are older than days.</p>
                                        {editor ? <div style={{ margin: '20px 0 0' }}>
                                            <a className="btnStyle primary" style={styles.addBtn}
                                                onClick={this.onClickToadd}>
                                                Add Another Feed </a>
                                            <a href="javascript:;" className="loadDemoWall btnStyle"
                                                style={styles.showDemoPost} onClick={this.onClickToDemoPost}>SHOW DEMO
                                                POSTS</a>
                                        </div> : null}
                                    </React.Fragment>}</React.Fragment> : error.errorData.errorCode === 207 ?
                                    <React.Fragment>
                                        <h2>No Posts!</h2>
                                        <p>It seems your all posts are private. Please go to <a
                                            href={`cdn.tagembed.com/app/moderation/index/${wall.Wall.id}`} target="_blank"
                                            rel="noopener noreferrer">Moderation</a> and make some posts public.</p>
                                    </React.Fragment> : error.errorData.errorCode === 208 ?
                                        <React.Fragment>
                                            <h2>No Posts!</h2>
                                            <p>It seems available posts are older
                                                than {error.errorData.olderDays !== 8 ? `${error.errorData.olderDays} Days` : moment(new Date(error.errorData.olderDays * 1000)).format('LL')}
                                                {'. '} All new posts will appear here.</p>
                                        </React.Fragment> : error.errorData.errorCode === 209 ?
                                            <React.Fragment>
                                                <h2>No Posts!</h2>
                                                <p>It seems there are no posts with image and video.</p>
                                            </React.Fragment> : error.errorData.errorCode === 211 ?
                                                <React.Fragment>
                                                    <h2>No Posts!</h2>
                                                    <p>It seems there are no posts available on the
                                                        entered {ERROR_ERROR[`${error.errorData.olderDays}`]}{error.errorData.olderDays}.
                                                        All Upcoming posts will appear here.</p>
                                                    <p className="tweets-or-section">OR</p>
                                                    <p>Post are older than 24 hours.</p>
                                                </React.Fragment> : error.errorData.errorCode === 212 ?
                                                    <React.Fragment>
                                                        <h2>No Posts!</h2>
                                                        <p>Only newly posted Instagram {error.errorData.olderDays} will be
                                                            displayed. Unlike other feed
                                                            sources, {error.errorData.olderDays} posted in the past will not
                                                            be retrieved.</p>
                                                    </React.Fragment> : null}
            </React.Fragment>)
    }

}

export default Error;


