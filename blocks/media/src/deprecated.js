import { useBlockProps } from '@wordpress/block-editor';

const v1 = {
    attributes:{
        url: {
            type: "string"
        },
        size: {
            type: "object"
        },
        source: {
            type: "string"
        },
        poster: {
            type: "object"
        },
        settings: {
            type: "object"
        }
    },
    save( props ) {
        const {
            attributes: {
                url,
                source,
                size,
                poster,
                settings
            }
        } = props;

        const SourceType = source;

        const mediaAttributes = {
            width: size?.width,
            height: size?.height,
            ...(source !== 'iframe' && {
                autoPlay: settings?.autoplay,
                controls: settings?.control,
                muted: settings?.muted,
            })
        };
    
        const blockProps = useBlockProps.save();
    
        return (
            <div className="savvy-media">
                { (source !== 'video' || source !== 'iframe') && poster?.url && <img className="savvy-media-poster" src={poster?.url}/> }
                <SourceType src={source === 'iframe' ? url : undefined} {...mediaAttributes} { ...blockProps }>
                    {source !== 'iframe' && <source src={url} />}
                </SourceType>
            </div>
        );
    }
}

export default [ v1 ];

