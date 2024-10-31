import {
    RichText,
} from '@wordpress/block-editor';

const Paragraph = (props) => {
    const {
        id,
        className,
        text,
    } = props;

    return <RichText.Content id={ id } className={ className } tagName="p" value={ text } />;
}

export default Paragraph;
