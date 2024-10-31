import { 
    createContext, 
} from '@wordpress/element';
import { useSettings } from '/utils/settings';

export const Settings = createContext({});
export const SettingsProvider = ({ children }) => {  
      
    const settings = useSettings();

    return (
        <Settings.Provider value={{ settings: settings !== undefined ? settings : undefined }}>
            { children }
        </Settings.Provider>
    );
};
export default SettingsProvider;
