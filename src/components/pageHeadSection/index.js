import React, {PureComponent} from 'react';
import {Helmet} from "react-helmet";

export default class PageHeadSection extends PureComponent {

    render() {
        const {PageTitle, PageMetaData, PageStyle} = this.props;
        let hostUrl = window.location.origin
        let appUrl = `https://app.tagembed.com`

        return <Helmet>
            {PageMetaData != null ? <meta {...PageMetaData} /> : null}
            {PageTitle != null && hostUrl !== appUrl ? <title>{PageTitle}</title> : null}
            {PageStyle != null ? <style type="text/css">{PageStyle}</style> : null}
        </Helmet>
    }
}