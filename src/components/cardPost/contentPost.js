import React, {PureComponent} from 'react';
import ModernCardContentPost from './themeContentPost/modernCardContentPost'
import ClassicCardContentPost from './themeContentPost/classicCardContentPost'
import SnapCardContentPost from './themeContentPost/snapCardContentPost'
import PolaroidContentPost from './themeContentPost/polaroidContentPost'
import SquareSpaceContentPost from './themeContentPost/squareSpacePost'
import GalleryPhotoContentPost from './themeContentPost/galleryPhotoPost'
import WidgetCardContentPost from './themeContentPost/widgetCardContentPost'
import ReviewBoxContentPost from './themeContentPost/reviewBoxContentPost'
import ReviewTableContentPost from './themeContentPost/reviewTableContentPost'

class ContentPost extends PureComponent {

    render() {
        const {widgetTheme} = this.props;
        return widgetTheme === 20 ? <ModernCardContentPost {...this.props} />
            : widgetTheme === 5 ? <ClassicCardContentPost {...this.props} />
                : widgetTheme === 3 ? <PolaroidContentPost {...this.props} />
                    : widgetTheme === 4 ? <SquareSpaceContentPost {...this.props} />
                        : widgetTheme === 50 ? <GalleryPhotoContentPost {...this.props} />
                            : widgetTheme === 19 ? <SnapCardContentPost {...this.props} />
                                : widgetTheme === 49 ? <WidgetCardContentPost {...this.props} />
                                    : widgetTheme === 52 ? <ReviewBoxContentPost {...this.props} />
                                        : widgetTheme === 53 ? <ReviewTableContentPost {...this.props} />
                                            : null
    }
}

export default ContentPost;