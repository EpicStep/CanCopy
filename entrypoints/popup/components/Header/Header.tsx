import {
    Icon,
    SegmentedControl,
    SegmentedControlItem,
    Heading,
} from '@vega-ui/react';
import styles from './style.module.css'
import { useTheme } from '@/entrypoints/popup/hooks';
import { MoonIcon, SunIcon } from '@vega-ui/icons';

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
                  <Icon><SunIcon /></Icon>
                </SegmentedControlItem>
                <SegmentedControlItem value='dark'>
                  <Icon><MoonIcon /></Icon>
                </SegmentedControlItem>
            </SegmentedControl>
        </header>
    )
}
