import { 
    useEffect, 
    useState 
} from '@wordpress/element';
import { useSetting } from '@wordpress/block-editor';
import { isUnmodifiedBlock } from '@wordpress/blocks';
import { Controls } from '/components/editor';
import { mergeArrOfObj } from '/utils';

const getSettings = async () => {
    return svSettings;
}
export default getSettings;


export const useDefault = (clientId, setAttributes) => {
    /** get default values from savvy-setting.json & set attributes in current block when the block inserts for first time */
    const [ settings, setSettings ] = useState( );

    useEffect( ( ) => {
        getSettings().then((data) => {
            setSettings(data)
        })
    }, [] );

    const currentBlock = wp.data.select( 'core/block-editor' ).getBlock(clientId);
    if (currentBlock) {
        const blockName = currentBlock.name;
        const blockSettings = settings?.blocks?.[blockName];
    
        /** defautType <String> : includes slug of blockType. defaultType || first item in blockTypes */
        // const firstTypeName = blockSettings && blockSettings?.blockTypes ? Object.keys(blockSettings?.blockTypes)[0] : ''
        // const defaultType = blockSettings?.defaultType || firstTypeName;
        const defaultType = blockSettings?.defaultType || 'custom';
        const defaultSetting = blockSettings?.blockTypes?.[defaultType];
        isUnmodifiedBlock(currentBlock) && !currentBlock.originalContent  && setAttributes(defaultSetting)
    }
}

export const useSettings = () => {
    const [ settings, setSettings ] = useState(  );
    useEffect( ( ) => {
        getSettings().then((data) => {
            setSettings(data)
        });
    }, [  ] );
    
    return settings;
}

const { createHigherOrderComponent } = wp.compose;
import { FeatureFlagsProvider, SettingProvider } from '/components/context';

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        return (
            <>
                {/* <Controls  { ...props } /> */}
                <SettingProvider>
                    <FeatureFlagsProvider>
                        <BlockEdit { ...props } />
                    </FeatureFlagsProvider>
                </SettingProvider>
                
            </>
        );
    };
}, 'withInspectorControl' );

wp.hooks.addFilter( 'editor.BlockEdit', 'savvy-blocks', withInspectorControls );


export const getAllColors = () => {
    const themePalette = useSetting('color.palette.theme') || [];
    const userPalette = useSetting('color.palette.custom') || [];
    return mergeArrOfObj(userPalette, themePalette);
}