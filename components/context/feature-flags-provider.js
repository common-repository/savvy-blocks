import { 
    createContext, 
    useContext, 
} from '@wordpress/element';
import { Settings } from './settings-provider';

export const FeatureFlags = createContext({});
export const FeatureFlagsProvider = ({ children }) => {
    const { settings } = useContext( Settings)

    return (
        <FeatureFlags.Provider 
            value={{ features: settings !== undefined ? settings?.['blocks']?.[ children.props.name ]?.editorSettings?.features : {} }}            
        >
            { children }
        </FeatureFlags.Provider>
    );
};
export default FeatureFlagsProvider;
