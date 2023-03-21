import React from 'react';

const defaultFinalLogo = "https://app.tagembed.com/uploaded/8651481539701.51210.png";
const BannerLogo = ({LogoImage, imagePath}) => {
    if (LogoImage.newName === 8651481539701.512) return <img src={defaultFinalLogo} className="img-responsive" style={{
        maxWidth: 240,
        width: "auto",
        paddingTop: 5,
        paddingBottom: 5,
        objectFit: "contain",
        display: "block"
    }} alt="Tagembed"/>
    else return <img src={imagePath} className="img-responsive"
                     style={{maxWidth: 240, width: "auto", paddingTop: 5, paddingBottom: 5, objectFit: "contain"}}
                     alt="Tagembed"/>
}

export default BannerLogo;