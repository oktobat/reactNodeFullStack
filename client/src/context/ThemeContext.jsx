import React, { createContext } from 'react';

// Context 생성
const ThemeContext = createContext();

// Context 생성후 공유할 변수나, 함수를 생산하여 value 프롭스에 저장하면 children 들이 소비할 수 있음
// <ThemeContext.Provider value={{ 변수, 함수 }}
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = ()=>{
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export {ThemeContext, ThemeProvider};