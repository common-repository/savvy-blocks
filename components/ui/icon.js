import { IconSelected } from '/components/editor'

const Icon = ( props ) => {
    const {
        icon,
        size,
    } = props;

    const IconSvg = IconSelected( icon?.name );

    const style = size && size !== undefined ? ({
        fontSize : `${ size }px`
    }) : ({});

    return (
        <>
            {
                icon && 
                (icon?.type === 'font' 
                    ? (
                        <span 
                            className={ `icon-${ icon?.name }` } 
                            style = { style }
                        >
                            { icon?.name === undefined ? 'Select Icon' : ''}
                        </span>
                    ) : (
                        <IconSvg />
                    )
                )
            }
        </>
    )
}

export default Icon;
