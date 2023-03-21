import React, {PureComponent, Fragment} from 'react';

class ShareActions extends PureComponent {
    state = {
        share: false,
    }

    componentDidMount() {
        this.onClosePopOver();
    }

    onClosePopOver = () => {
        document.body.addEventListener("click", (event) => {
            this.onHide();
            this.setState({share: false})
        });
    }
    onShareClick = event => {
        this.onHide();
        const {share} = this.state;
        this.setState({share: !share})
        //event.stopImmediatePropagation()
        event.stopPropagation()
    }
    onHide = () => {
        var popOver = document.querySelectorAll(".popover-content");
        var i = 0;
        for (i = 0; i < popOver.length; ++i) {
            if (popOver[i].style.display != "none") popOver[i].style.display = "none";
        }
    }

    render() {
        const {item, widgetTheme, wall, themeRule} = this.props;
        var newURL = item.link;
        var splitactionURL = newURL.toString().split("/");



        return widgetTheme === 5 || widgetTheme === 3 || widgetTheme === 19 || widgetTheme === 47 ?
            <div className="socialPostAction" style={{color: item.iconColor, display: 'flex', 
                //borderRadius: wall.ThemeRule.cardCurve + 'px' == '24px' ? '0px 0px 24px 24px' : ''
            }}>
                {
                    item.network.id === 1 ? <Fragment>
                            <a target="_blank" rel="noopener noreferrer"
                               href={`https://twitter.com/intent/favorite?tweet_id=${splitactionURL[5]}`} title="Favorite">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 46" width="45" height="46">
                                    <defs>
                                        <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                            <path d="M-13 -17L60 -17L60 65L-13 65L-13 -17Z"/>
                                        </clipPath>
                                    </defs>
                                    <g id="Clip-Path: Artboard_1" clipPath="url(#cp1)">
                                        <g id="Artboard_1">
                                            <path id="Icon_feather-thumbs-up" fill="none" strokeWidth="2"
                                                  stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                  d="M12.36 44.71L5.92 44.71C5.36 44.71 4.8 44.6 4.28 44.39C3.76 44.17 3.29 43.85 2.89 43.46C2.49 43.06 2.17 42.58 1.96 42.06C1.74 41.54 1.63 40.98 1.63 40.42L1.63 25.4C1.63 24.83 1.74 24.28 1.96 23.76C2.17 23.23 2.49 22.76 2.89 22.36C3.29 21.96 3.76 21.65 4.28 21.43C4.8 21.22 5.36 21.11 5.92 21.11L12.36 21.11"/>
                                            <path id="Icon_feather-thumbs-up" fill="none" strokeWidth="2"
                                                  stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                  d="M27.38 16.81L27.38 8.23C27.38 7.38 27.22 6.55 26.89 5.76C26.57 4.98 26.1 4.27 25.5 3.68C24.9 3.08 24.19 2.6 23.41 2.28C22.63 1.96 21.79 1.79 20.94 1.79L12.36 21.11L12.36 44.71L36.57 44.71C37.08 44.72 37.59 44.63 38.08 44.46C38.56 44.28 39.01 44.02 39.4 43.69C39.79 43.36 40.12 42.96 40.37 42.51C40.62 42.06 40.78 41.57 40.86 41.06L43.82 21.75C43.92 21.13 43.88 20.51 43.7 19.91C43.53 19.31 43.23 18.76 42.82 18.29C42.41 17.82 41.9 17.44 41.34 17.19C40.77 16.93 40.15 16.81 39.53 16.81L27.38 16.81Z"/>
                                        </g>
                                    </g>
                                </svg>
                                {/* Like */}
                                {item.like_count !== 0 ? (item.like_count === 0 ? '': item.like_count) : ''}
                            </a>
                            <a target="_blank" rel="noopener noreferrer"
                               href={`https://twitter.com/intent/tweet?in_reply_to=${splitactionURL[5]}`} title="Reply">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 47" width="50" height="47">
                                    <defs>
                                        <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                            <path d="M-10 -18L61 -18L61 64L-10 64L-10 -18Z"/>
                                        </clipPath>
                                    </defs>

                                    <g id="Clip-Path: Artboard_2" clipPath="url(#cp1)">
                                        <g id="Artboard_2">
                                            <path id="Icon_material-reply" fill="none" strokeWidth="2"
                                                  stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                  d="M19.23 13.18L19.23 2.95L1.31 20.86L19.23 38.77L19.23 28.28C32.02 28.28 40.98 32.38 47.37 41.33C44.81 28.54 37.14 15.74 19.23 13.18Z"/>
                                        </g>
                                    </g>
                                </svg>
                                {/* Reply */}
                            </a>

                            <a target="_blank" rel="noopener noreferrer"
                               href={`https://twitter.com/intent/retweet?tweet_id=${splitactionURL[5]}`} title="Retweet">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 40" width="55" height="40">
                                    <defs>
                                        <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                            <path d="M-16 -24L69 -24L69 63L-16 63L-16 -24Z"/>
                                        </clipPath>
                                    </defs>

                                    <g id="Clip-Path: Artboard_3" clipPath="url(#cp1)">
                                        <g id="Artboard_3">
                                            <g id="Group_3861">
                                                <path id="Path_5228" fill="none" strokeWidth="2"
                                                      stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                      d="M7.83 6.26C5.88 8.09 4.57 9.47 3.08 10.64C2.89 10.73 2.71 10.81 2.51 10.88C2.32 10.95 2.13 11.01 1.93 11.07C1.73 11.12 1.53 11.17 1.33 11.2C1.12 11.23 0.92 11.26 0.72 11.27C0.92 10.47 0.88 9.45 1.37 8.92C1.86 8.36 2.36 7.81 2.87 7.27C3.38 6.72 3.9 6.19 4.42 5.67C4.95 5.15 5.49 4.63 6.04 4.13C6.59 3.63 7.14 3.13 7.71 2.65C7.95 2.5 8.21 2.39 8.49 2.31C8.76 2.22 9.04 2.18 9.33 2.17C9.61 2.16 9.9 2.18 10.18 2.24C10.46 2.3 10.73 2.4 10.98 2.52C11.57 3.02 12.14 3.53 12.71 4.05C13.28 4.57 13.84 5.1 14.38 5.65C14.93 6.19 15.47 6.74 16 7.3C16.52 7.85 17.04 8.42 17.55 9C18.01 9.51 17.88 10.57 18.02 11.37C17.83 11.36 17.65 11.33 17.46 11.3C17.28 11.27 17.1 11.23 16.92 11.18C16.74 11.12 16.56 11.07 16.39 11C16.22 10.93 16.05 10.85 15.88 10.77C14.4 9.56 13.07 8.16 11.17 6.35C11.1 6.61 11.04 6.87 10.99 7.13C10.93 7.39 10.88 7.65 10.84 7.91C10.79 8.17 10.75 8.43 10.71 8.7C10.68 8.96 10.64 9.22 10.62 9.49C10.58 15.85 10.52 22.21 10.63 28.58C10.73 34.13 12.82 36.05 18.41 36.06C21.8 36.07 25.19 36 28.57 36.13C29.29 36.16 29.98 36.92 30.69 37.35C29.99 37.78 29.3 38.56 28.6 38.58C24.29 38.69 19.97 38.79 15.67 38.58C14.69 38.54 13.72 38.31 12.83 37.9C11.94 37.5 11.13 36.92 10.46 36.21C9.78 35.5 9.25 34.66 8.89 33.75C8.53 32.84 8.36 31.86 8.37 30.88C8.21 24.11 8.3 17.33 8.25 10.56C8.24 9.39 8.03 8.23 7.83 6.26Z"/>
                                                <path id="Path_5229" fill="none" strokeWidth="2"
                                                      stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                      d="M23.85 1.97C24.07 1.91 24.29 1.85 24.52 1.79C24.74 1.74 24.96 1.69 25.19 1.64C25.41 1.6 25.64 1.56 25.87 1.53C26.09 1.49 26.32 1.47 26.55 1.44C30.45 1.39 34.35 1.35 38.24 1.47C43.08 1.63 46.12 4.57 46.23 9.39C46.38 16.06 46.28 22.73 46.33 29.39C46.34 30.56 46.51 31.73 46.67 33.74C48.72 31.82 50.12 30.4 51.65 29.14C51.82 29.05 51.98 28.97 52.15 28.9C52.32 28.82 52.5 28.76 52.67 28.7C52.85 28.64 53.03 28.59 53.21 28.54C53.39 28.5 53.57 28.47 53.75 28.44C53.65 29.25 53.83 30.33 53.38 30.82C51.17 33.24 48.84 35.57 46.41 37.77C46.23 37.87 46.05 37.96 45.85 38.02C45.66 38.07 45.46 38.11 45.25 38.12C45.05 38.13 44.85 38.11 44.65 38.07C44.45 38.02 44.26 37.96 44.08 37.87C41.5 35.52 39.04 33.04 36.66 30.5C36.25 30.07 36.37 29.14 36.24 28.44L37.05 27.91L43.5 33.5C43.56 33.25 43.61 33 43.66 32.75C43.7 32.5 43.75 32.25 43.78 31.99C43.82 31.74 43.86 31.49 43.89 31.23C43.92 30.98 43.94 30.72 43.97 30.47C44 24.21 44.05 17.95 43.96 11.7C43.87 5.81 41.86 3.89 35.88 3.76C32.91 3.7 29.93 3.79 26.95 3.72C26.69 3.69 26.44 3.66 26.18 3.63C25.92 3.6 25.66 3.56 25.41 3.52C25.15 3.47 24.89 3.43 24.64 3.38C24.38 3.32 24.13 3.27 23.88 3.21L23.85 1.97Z"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                {/* Retweet */}
                                {item.comment_count !== 0 ? (item.comment_count === 0 ? '': item.comment_count) : ''}
                            </a>

                        </Fragment>
                        : (item.network.id === 2 || item.network.id === 3 || item.network.id === 7 || item.network.id === 8 || item.network.id === 10 || item.network.id === 18) ?
                            <Fragment>
                                <a href={item.link}
                                   title={(item.network.id === 6 || item.network.id === 8) ? 'Like' : 'Like'}
                                   target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 46" width="45" height="46">
                                        <defs>
                                            <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                                <path d="M-13 -17L60 -17L60 65L-13 65L-13 -17Z"/>
                                            </clipPath>
                                        </defs>
                                        <g id="Clip-Path: Artboard_1" clipPath="url(#cp1)">
                                            <g id="Artboard_1">
                                                <path id="Icon_feather-thumbs-up" fill="none" strokeWidth="2"
                                                      stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                      d="M12.36 44.71L5.92 44.71C5.36 44.71 4.8 44.6 4.28 44.39C3.76 44.17 3.29 43.85 2.89 43.46C2.49 43.06 2.17 42.58 1.96 42.06C1.74 41.54 1.63 40.98 1.63 40.42L1.63 25.4C1.63 24.83 1.74 24.28 1.96 23.76C2.17 23.23 2.49 22.76 2.89 22.36C3.29 21.96 3.76 21.65 4.28 21.43C4.8 21.22 5.36 21.11 5.92 21.11L12.36 21.11"/>
                                                <path id="Icon_feather-thumbs-up" fill="none" strokeWidth="2"
                                                      stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                      d="M27.38 16.81L27.38 8.23C27.38 7.38 27.22 6.55 26.89 5.76C26.57 4.98 26.1 4.27 25.5 3.68C24.9 3.08 24.19 2.6 23.41 2.28C22.63 1.96 21.79 1.79 20.94 1.79L12.36 21.11L12.36 44.71L36.57 44.71C37.08 44.72 37.59 44.63 38.08 44.46C38.56 44.28 39.01 44.02 39.4 43.69C39.79 43.36 40.12 42.96 40.37 42.51C40.62 42.06 40.78 41.57 40.86 41.06L43.82 21.75C43.92 21.13 43.88 20.51 43.7 19.91C43.53 19.31 43.23 18.76 42.82 18.29C42.41 17.82 41.9 17.44 41.34 17.19C40.77 16.93 40.15 16.81 39.53 16.81L27.38 16.81Z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    {/* Like */}
                                    {(item.network.id === 10) || (item.network.id === 18) ? (item.like_count === 0 ? '': item.like_count) : ''}
                                </a>
                                <a href={item.link} title="Comment" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 45" width="46" height="45">
                                        <defs>
                                            <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                                <path d="M-15 -20L58 -20L58 62L-15 62L-15 -20Z"/>
                                            </clipPath>
                                        </defs>

                                        <g id="Clip-Path: Artboard_5" clipPath="url(#cp1)">
                                            <g id="Artboard_5">
                                                <path id="Icon_awesome-comment-alt" fill="none" strokeWidth="2"
                                                      stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                      d="M38.88 1.06L6.68 1.06C5.98 1.06 5.28 1.2 4.63 1.47C3.98 1.74 3.39 2.14 2.89 2.64C2.39 3.13 2 3.73 1.73 4.38C1.46 5.03 1.32 5.72 1.32 6.43L1.32 30.57C1.32 31.28 1.46 31.98 1.73 32.63C2 33.28 2.39 33.87 2.89 34.37C3.39 34.86 3.98 35.26 4.63 35.53C5.28 35.8 5.98 35.94 6.68 35.94L14.73 35.94L14.73 42.98C14.73 43.17 14.78 43.35 14.88 43.51C14.98 43.66 15.12 43.79 15.28 43.88C15.45 43.96 15.63 44 15.82 43.98C16 43.97 16.18 43.9 16.33 43.79L26.8 35.94L38.88 35.94C39.58 35.94 40.28 35.8 40.93 35.53C41.58 35.26 42.17 34.86 42.67 34.37C43.17 33.87 43.56 33.28 43.83 32.63C44.1 31.98 44.24 31.28 44.24 30.57L44.24 6.43C44.24 5.72 44.1 5.03 43.83 4.38C43.56 3.73 43.17 3.13 42.67 2.64C42.17 2.14 41.58 1.74 40.93 1.47C40.28 1.2 39.58 1.06 38.88 1.06L38.88 1.06Z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    {/* Comment */}
                                    {(item.network.id === 10) || (item.network.id === 18) ? (item.comment_count === 0 ? '': item.comment_count) : ''}
                                </a> </Fragment>
                            : item.network.id === 4 ?
                                <a href={item.link} title="Comment" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 45" width="46" height="45">
                                        <defs>
                                            <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                                <path d="M-15 -20L58 -20L58 62L-15 62L-15 -20Z"/>
                                            </clipPath>
                                        </defs>

                                        <g id="Clip-Path: Artboard_5" clipPath="url(#cp1)">
                                            <g id="Artboard_5">
                                                <path id="Icon_awesome-comment-alt" fill="none" strokeWidth="2"
                                                      stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                                      d="M38.88 1.06L6.68 1.06C5.98 1.06 5.28 1.2 4.63 1.47C3.98 1.74 3.39 2.14 2.89 2.64C2.39 3.13 2 3.73 1.73 4.38C1.46 5.03 1.32 5.72 1.32 6.43L1.32 30.57C1.32 31.28 1.46 31.98 1.73 32.63C2 33.28 2.39 33.87 2.89 34.37C3.39 34.86 3.98 35.26 4.63 35.53C5.28 35.8 5.98 35.94 6.68 35.94L14.73 35.94L14.73 42.98C14.73 43.17 14.78 43.35 14.88 43.51C14.98 43.66 15.12 43.79 15.28 43.88C15.45 43.96 15.63 44 15.82 43.98C16 43.97 16.18 43.9 16.33 43.79L26.8 35.94L38.88 35.94C39.58 35.94 40.28 35.8 40.93 35.53C41.58 35.26 42.17 34.86 42.67 34.37C43.17 33.87 43.56 33.28 43.83 32.63C44.1 31.98 44.24 31.28 44.24 30.57L44.24 6.43C44.24 5.72 44.1 5.03 43.83 4.38C43.56 3.73 43.17 3.13 42.67 2.64C42.17 2.14 41.58 1.74 40.93 1.47C40.28 1.2 39.58 1.06 38.88 1.06L38.88 1.06Z"/>
                                            </g>
                                        </g>
                                    </svg>

                                </a> : null
                }
                <div className="social-shareWrapper">
                    <a className="share-icon cursor-pointer" title="share" onClick={this.onShareClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 45" width="54" height="45">
                            <defs>
                                <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                    <path d="M-13 -22L65 -22L65 65L-13 65L-13 -22Z"/>
                                </clipPath>
                            </defs>
                            <g id="Clip-Path: Artboard_4" clipPath="url(#cp1)">
                                <g id="Artboard_4">
                                    <path id="Icon_awesome-reply" fill="none" strokeWidth="2"
                                          stroke={(item.iconColor) ? item.iconColor : '#4c4d4e'}
                                          d="M51.58 16.66L33.96 2.34C33.61 2.05 33.2 1.87 32.75 1.8C32.31 1.74 31.86 1.79 31.44 1.97C31.03 2.15 30.68 2.44 30.42 2.8C30.16 3.17 30.01 3.6 29.98 4.05L29.98 11.59C13.91 11.77 1.16 14.8 1.16 29.14C1.16 34.93 5.12 40.66 9.5 43.66C10.86 44.6 12.81 43.42 12.31 41.91C7.77 28.24 14.46 24.62 29.98 24.41L29.98 32.69C30.01 33.14 30.16 33.57 30.42 33.94C30.67 34.31 31.03 34.59 31.44 34.77C31.85 34.95 32.31 35.01 32.75 34.95C33.2 34.88 33.61 34.69 33.96 34.41L51.58 20.08C51.83 19.88 52.04 19.62 52.19 19.32C52.33 19.03 52.41 18.7 52.41 18.37C52.41 18.04 52.33 17.72 52.19 17.42C52.04 17.12 51.83 16.86 51.58 16.66Z"/>
                                </g>
                            </g>
                        </svg>
                        {/* Share */}
                    </a>
                    <div
                        className={`popover-content ${(item.network.id !== 1 || item.network.id !== 7) ? 'onlyShare' : ''}`}
                        data-color="" style={{display: !this.state.share ? 'none' : 'block'}}>
                        <div className="popover-content-inner" style={{backgroundColor: wall.ThemeRule.cardColor}}>
                            {(item.network.id !== 1 && item.type !== 1) ?
                                <a href={item.share.facebook} className="fbShare" target="_blank" style={{color: wall.ThemeRule.fontColor}}
                                   rel="noopener noreferrer"><i className="fa fa-facebook icon" aria-hidden="true">
                                </i>Share on Facebook</a> : null}
                            <a href={item.share.twitter} className="twShare" target="_blank" style={{color: wall.ThemeRule.fontColor}} rel="noopener noreferrer">
                                <i className="fa fa-twitter" aria-hidden="true"></i> Share on Twitter
                            </a>

                            <a href={item.share.linkedin} className="liShare" target="_blank" style={{color: wall.ThemeRule.fontColor}} rel="noopener noreferrer">
                                <i className="fa fa-linkedin" aria-hidden="true">
                                </i>Share on Linkedin </a>
                        </div>
                    </div>
                </div>

            </div> : <div className="socialPostAction" style={{color: item.iconColor, 
                borderRadius: wall.ThemeRule.cardCurve + 'px' == '24px' ? '0px 0px 24px 24px' : ''
                }}>
                {
                    item.network.id === 1 ? <Fragment>
                            {(widgetTheme === 49) &&
                                <a target="_blank" href={item.link} className="fa fa-eye" title="View"
                                   rel="noopener noreferrer"> </a>
                            }

                            <a target="_blank" href={`https://twitter.com/intent/tweet?in_reply_to=${splitactionURL[5]}`}
                               className="fa fa-share-square-o tooltips" title="Reply" rel="noopener noreferrer"> </a>

                            <a target="_blank" href={`https://twitter.com/intent/retweet?tweet_id=${splitactionURL[5]}`}
                               className="fa fa-retweet tooltips" title="Retweet"
                               rel="noopener noreferrer"> {item.comment_count !== 0 ? (item.comment_count === 0 ? '': item.comment_count) : ''}</a>

                            <a target="_blank" href={`https://twitter.com/intent/favorite?tweet_id=${splitactionURL[5]}`}
                               className="fa fa-heart-o tooltips" title="Favorite"
                               rel="noopener noreferrer"> {item.like_count !== 0 ? (item.like_count === 0 ? '': item.like_count) : ''}</a>
                        </Fragment>
                        : (item.network.id === 2 || item.network.id === 3 || item.network.id === 7 || item.network.id === 8 || item.network.id === 10 || item.network.id === 18) ?
                            <Fragment>

                                {(widgetTheme === 49) &&
                                    <a target="_blank" href={item.link} className="fa fa-eye" title="View"
                                       rel="noopener noreferrer"> </a>
                                }
                                <a href={item.link} className="fa fa-thumbs-o-up tooltips"
                                   title={(item.network.id === 6 || item.network.id === 8) ? 'Follow' : 'Like'}
                                   target="_blank"
                                   rel="noopener noreferrer"> {(item.network.id === 10) || (item.network.id === 18) ? (item.like_count === 0 ? '': item.like_count) : ''}</a>
                                <a href={item.link} className="fa fa-comment-o tooltips" title="Comment" target="_blank"
                                   rel="noopener noreferrer"> {(item.network.id === 10) || (item.network.id === 18) ? (item.comment_count === 0 ? '': item.comment_count) : ''}</a></Fragment>
                                   
                            : item.network.id === 4 ?
                                <a href={item.link} className="fa fa-comment-o tooltips" title="Comment" target="_blank"
                                   rel="noopener noreferrer"></a> : (widgetTheme === 49) ?
                                    <a target="_blank" href={item.link} className="fa fa-eye" title="View"
                                       rel="noopener noreferrer"> </a>
                                    : null
                }
                <div className="clear"></div>
            </div>
    }
}

export default ShareActions;