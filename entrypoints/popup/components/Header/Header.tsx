import {
    Icon,
    SegmentedControl,
    SegmentedControlItem,
    Heading,
} from '@adara-cs/ui-kit-web';
import styles from './Header.module.css'
import { useTheme } from '@/entrypoints/popup/hooks';

export const Header = () => {
    const { theme, toggle: toggleTheme } = useTheme()

    return (
        <header className={styles.header}>
            <Heading fontWeight={500} as='h1' size={5}>CanCopy</Heading>
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
