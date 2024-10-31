import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
    __experimentalDivider as Divider,
    __experimentalUnitControl as UnitControl,
    Flex,
    FlexBlock,
    CheckboxControl,
    Notice,
    BaseControl
} from '@wordpress/components'
import { 
    BorderSetting, 
    IconSelector, 
    GeneralIconSetting, 
    GeneralSetting 
} from "./inspector/";
import { 
    SpacingSetting, 
    DisplayTypeTabs,
    Overlay, 
    MediaSelector 
} from "/components/editor";
import { 
    Settings
 } from '/components/context';

const Inspector = (props) => {
    const {
        attributes: {
            source,
            videoSize,
            url,
            poster,
            mediaSettings,
            icon,
            modal,
            media,
            overlay,
            border,
            padding,
            elementStates
        },
        attributes,
        setAttributes,
    } = props;

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
    ]
    const showNotification = !mediaSettings?.control && !mediaSettings?.autoplay && source !== 'audio';

    const { settings } = useContext( Settings )

    return (
        <InspectorControls>
            <Panel>
                <PanelBody title={ __( 'Source', 'savvy-blocks' ) } initialOpen={ open }>
                    <GeneralSetting
                        url={ url }
                        setAttributes={ setAttributes }
                        source = { source }
                        poster = { poster }
                    />
                    { (source == 'audio' || source == 'video') &&
                        <MediaSelector
                            media={{ 
                                id: media?.id, 
                                url: media?.url 
                            }}
                            onSelectMedia={
                                ( value ) => {
                                    setAttributes( { 
                                        media: { 
                                            id: value.id, 
                                            url: value.url 
                                    } } )
                                }
                            }
                        />
                    }
                </PanelBody>

                { source !== 'audio' &&
                    <>
                        <PanelBody
                            title={__("Overlay Thumbnail", "savvy-blocks")}
                            initialOpen={false}
                        >
                                <Overlay
                                    overlay={ overlay || 100}
                                    onChange={(value) => {
                                        setAttributes({ overlay: value });
                                    }}
                                />
                        </PanelBody>
                        <PanelBody title={ __( 'Video Size', 'savvy-blocks' ) } initialOpen={ false }>
                            <Flex>
                                <FlexBlock>
                                    <UnitControl
                                        label={ __('Width', 'savvy-blocks') }
                                        labelPostion={ 'edge' }
                                        units={ units }
                                        value={ videoSize?.width }
                                        onChange={ (unit) => setAttributes({ videoSize: { ...videoSize, width: unit } }) }
                                    />
                                </FlexBlock>
                                <FlexBlock>
                                    <UnitControl
                                        label={ __('Height', 'savvy-blocks') }
                                        labelPostion={ 'edge' }
                                        units={ units }
                                        value={ videoSize?.height }
                                        onChange={ (unit) => setAttributes({ videoSize: { ...videoSize, height: unit } }) }
                                    />
                                </FlexBlock>
                            </Flex>
                        </PanelBody>
                        <PanelBody title={ __('Icon', 'savvy-blocks') } initialOpen={ false }>
                            <IconSelector
                                icon={ icon }
                                // blockType = { blockType }
                                setAttributes={ setAttributes }
                                settings = { settings }
                            />
                        </PanelBody>
                        <PanelBody title={ __('Icon Setting', 'savvy-blocks') } initialOpen={ false }>
                            <GeneralIconSetting
                                icon={ icon }
                                // blockType = { blockType }
                                attributes= { attributes}
                                setAttributes={ setAttributes }
                                settings = { settings }
                            />
                            <BaseControl label={ __('Outline Border', 'savvy-blocks') }>
                                <DisplayTypeTabs>
                                    <BorderSetting
                                        border={ border }
                                        elementStates = { elementStates }
                                        setAttributes={ setAttributes }
                                        supports = { ['radius', 'width','color', 'style'] }
                                    />
                                </DisplayTypeTabs>
                            </BaseControl>
                            <BaseControl label={ __('Outline Spacing', 'savvy-blocks') }>
                                <SpacingSetting
                                    padding={ padding }
                                    setAttributes={ setAttributes }
                                />
                            </BaseControl>
                        </PanelBody>
                        <PanelBody title={ __( 'Controls', 'savvy-blocks' ) } initialOpen={ false }>
                            { (source === 'video') &&
                                <>
                                    <CheckboxControl
                                        label="Show Play Button"
                                        checked={ mediaSettings?.play }
                                        onChange={ (data) => setAttributes({ 
                                            mediaSettings: { 
                                                ...mediaSettings, 
                                                play: data
                                            } }) }
                                    />
                                    <CheckboxControl
                                        label="Show Volume"
                                        checked={ mediaSettings?.volume }
                                        onChange={ (data) => setAttributes({ 
                                            mediaSettings: { 
                                                ...mediaSettings, 
                                                volume: data
                                            } }) }
                                    />
                                    <CheckboxControl
                                        label="Show Progress"
                                        checked={ mediaSettings?.progress }
                                        onChange={ (data) => setAttributes({ 
                                            mediaSettings: { 
                                                ...mediaSettings, 
                                                progress: data
                                            } }) }
                                    />
                                    <CheckboxControl
                                        label="Show Remaining Time"
                                        checked={ mediaSettings?.remainingTime }
                                        onChange={ (data) => setAttributes({ 
                                            mediaSettings: { 
                                                ...mediaSettings, 
                                                remainingTime: data
                                            } }) }
                                    />
                                    <CheckboxControl
                                        label="Show Fullscreen Button"
                                        checked={ mediaSettings?.fullScreen }
                                        onChange={ (data) => setAttributes({ 
                                            mediaSettings: { 
                                                ...mediaSettings, 
                                                fullScreen: data
                                            } }) }
                                    />
                                    <Divider />
                                </>
                            }
                            { source === 'video' &&
                                <>
                                    <CheckboxControl
                                        label={ __( 'Fluid', 'savvy-blocks' ) }
                                        checked={ mediaSettings?.fluid }
                                        onChange={ (data) => setAttributes({ mediaSettings: { ...mediaSettings , fluid: data } }) }
                                    />
                                    <CheckboxControl
                                        label={ __( 'autoplay', 'savvy-blocks' ) }
                                        checked={ mediaSettings?.autoplay }
                                        onChange={ (data) => {
                                            setAttributes({
                                                mediaSettings: {
                                                    ...mediaSettings,
                                                    autoplay: data,
                                                    muted: data ? true : false
                                                }
                                            });
                                        } }
                                    />

                                    <CheckboxControl
                                        label={ __( 'Muted', 'savvy-blocks' ) }
                                        checked={ mediaSettings?.muted }
                                        disabled={ mediaSettings?.autoplay }
                                        onChange={ (data) => setAttributes({ mediaSettings: { ...mediaSettings, muted: data } }) }
                                    />
                                    <CheckboxControl
                                        label={ __( 'Loop', 'savvy-blocks' ) }
                                        checked={ mediaSettings?.loop }
                                        onChange={ (data) => setAttributes({ mediaSettings: { ...mediaSettings , loop: data } }) }
                                    />
                                </>
                            }
                            { source !== 'audio' &&
                                <CheckboxControl
                                    label={ __( 'Modal', 'savvy-blocks' ) }
                                    checked={ modal }
                                    onChange={ (data) => setAttributes({ modal: data }) }
                                />
                            }
                        </PanelBody>
                    </>
                }
            </Panel>
        </InspectorControls>
    );
}

export default Inspector;
