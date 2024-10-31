import { RichText } from '@wordpress/block-editor';

const Heading = ( props ) => {

    const {
        id,
        className,
        headingText,
        headingType,
        style
    } = props;
    const HeadingTag = headingType;

    return <HeadingTag id={ id } className={ className } style={style}><RichText.Content value={ headingText } /></HeadingTag>;
}

export default Heading;
