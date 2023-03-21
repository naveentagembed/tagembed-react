import React from 'react';

const MiddleBanner = ({CustomBanner}) => <div className="headerBannerMiddle">
    <div className="headBannerHeading">
        <span className={`setFont font${CustomBanner.subTitleFontStyle}`} style={{
            fontSize: CustomBanner.subTitle_font_size,
            color: CustomBanner.subTitle_font_color
        }}>{CustomBanner.subTitle}</span>
        <h1 className={`setFont font${CustomBanner.titleFontStyle}`} style={{
            fontSize: CustomBanner.title_font_size,
            color: CustomBanner.title_font_color
        }}>{CustomBanner.title}</h1>
    </div>
</div>

export default MiddleBanner;