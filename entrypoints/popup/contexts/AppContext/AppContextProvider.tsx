const Context = React.createContext(null);

export const AppContextProvider = ({ children, ...props }) => {
    const context = useCreateAppContext(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useCreateAppContext = function(props) {
    const [test, setTest] = useState(props.test || 'Hello world');

    const toggleTest = useCallback(() => {
        setTest(_test => (_test === 'Hi' ? 'You are awesome' : 'Hi'));
    });

    return {
        test,
        toggleTest,
    };
}
