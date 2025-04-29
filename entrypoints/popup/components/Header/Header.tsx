import {
    Icon,
    SegmentedControl,
    SegmentedControlItem,
    Heading,
} from '@adara-cs/ui-kit-web';
import styles from './Header.module.css'
import {useAppTheme} from "@/entrypoints/popup/hooks/useAppTheme.ts";

export const Header = () => {
    const [theme, toggleTheme] = useAppTheme()

    return (
        <header className={styles.header}>
            <Heading size='3'>CanCopy</Heading>
            <SegmentedControl
                onChange={toggleTheme}
                variant="secondary"
                value={theme}
                size='small'
            >
                <SegmentedControlItem value='light'>
                    <Icon name='sun'/>
                </SegmentedControlItem>
                <SegmentedControlItem value='dark'>
                    <Icon name='moon'/>
                </SegmentedControlItem>
            </SegmentedControl>
        </header>
    )
}
