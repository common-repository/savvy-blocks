import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalGrid as Grid } from '@wordpress/components';

import { Settings } from '/components/context';
import { Icons } from '/blocks-assets/icons'

const IconSelector = (props) => {
    const {
        selectedIcon,
        onClick,
        blockName
    } = props;

    const { settings } = useContext( Settings )

    const IconItems = [];
    // for ( const iconItem in settings?.icons ) {
    //     const IconItem = settings?.icons[iconItem];
    //     IconItems.push(
    //         <span 
    //             className={ ( selectedIcon?.type === 'svg' && iconItem === selectedIcon.name ) ? 'icon-item is-selected' : 'icon-item' } 
    //             onClick = { () => onClick(iconItem, 'svg') } 
    //         >
    //             <IconItem width={ 32 } height={ 32 }/>
    //         </span>
    //     )
    // }

    const blockIcons = settings?.blockIcons?.[ blockName ];
    const fontIcons = blockIcons ? (
        settings?.fontIcons.filter( (font) => blockIcons.some( ( blockIcon ) => {
            return blockIcon === font.slug
        } ))
    ) : (
        settings?.fontIcons
    );

    for (const iconIndex in fontIcons) {

        const fontIcon = fontIcons[iconIndex]
        IconItems.push(
            <span className={ (selectedIcon?.type === 'font' && fontIcon.slug === selectedIcon?.name) ? `icon-item is-selected` : `icon-item` }>
                <span 
                    className={ `icon-${ fontIcon.slug }` } 
                    style={{fontSize: `32px`}} 
                    onClick = {
                        () => onClick( fontIcon.slug !== selectedIcon?.name ? fontIcon.slug : '', 'font')
                    }
                />
            </span>
        )
    }
    
    return (
        <>
            <Grid className='editor-styles-wrapper icon-list' alignment='bottom' columns={ 3 }>
                { IconItems }
            </Grid>
        </>
    )
}

const IconSelected = ( icon ) => {
    const Icon = Icons[icon];
    return Icon;
}

export {
    IconSelector as default,
    IconSelected
};