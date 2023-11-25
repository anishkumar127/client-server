
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const Provider = ({ children }: { children: any }) => {
    return (
        <FluentProvider theme={teamsLightTheme}>
            {children}
        </FluentProvider>
    )
}

export default Provider