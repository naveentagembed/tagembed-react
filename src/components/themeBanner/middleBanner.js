import React from 'react';

/*To display the banner for mobile or desktop if user upload it.*/
const MiddleBanner = ({CustomBanner}) => <div className="bannerMiddle">
    <div className="headBannerHashtag">
        {CustomBanner.bannerType == 6 ? '': <span className={`setFont font${CustomBanner.subTitleFontStyle}`} style={{
            fontSize: CustomBanner.subTitle_font_size,
            color: CustomBanner.subTitle_font_color
        }}>{CustomBanner.subTitle}</span>}
        
        <h1 className={`setFont font${CustomBanner.titleFontStyle}`} style={{
            fontSize: CustomBanner.title_font_size,
            color: CustomBanner.title_font_color
        }}>{CustomBanner.title}</h1>
    </div>
</div>

export default MiddleBanner;