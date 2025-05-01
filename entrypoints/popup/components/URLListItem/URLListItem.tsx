import { FC, PropsWithChildren } from 'react';
import { Card, IconButton, Text } from '@adara-cs/ui-kit-web';
import styles from './style.module.css'

export interface URLListItemProps {
  onRemove?: () => void;
}

export const URLListItem: FC<PropsWithChildren<URLListItemProps>> = ({ onRemove, children }) => {
  return (
    <li>
      <Card className={styles.sideCard} size='small'>
        <Text className={styles.sideCardText}>{children}</Text>
        <IconButton name='minus' size='small' onClick={onRemove} />
      </Card>
    </li>
  )
}