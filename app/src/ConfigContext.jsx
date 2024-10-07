// ConfigContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [userConfig, setUserConfig] = useState(() => {
        // Try to get userConfig from localStorage on initial load
        const storedConfig = localStorage.getItem('userConfig');
        return storedConfig ? JSON.parse(storedConfig) : null;
    });

    useEffect(() => {
        // Save userConfig to localStorage whenever it changes
        if (userConfig) {
            localStorage.setItem('userConfig', JSON.stringify(userConfig));
        }
    }, [userConfig]);


    const setConfig = (newConfig) => {
        setUserConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
    };

    const updateConfig = (updateFn) => {
        setUserConfig((prevConfig) => ({ ...prevConfig, ...updateFn(prevConfig) }));
    };

    const clearConfig = () => {
        // Clear userConfig from state and localStorage
        setUserConfig(null);
        localStorage.removeItem('userConfig');
    };

    return (
        <ConfigContext.Provider value={{ userConfig, setConfig, updateConfig, clearConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
