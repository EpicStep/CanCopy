import { FC, PropsWithChildren } from 'react';
import { Card, IconButton, Text } from '@adara-cs/ui-kit-web';
import styles from './style.module.css'
import {MinusIcon} from "@adara-cs/icons";

export interface URLListItemProps {
  onRemove?: () => void;
}

export const URLListItem: FC<PropsWithChildren<URLListItemProps>> = ({ onRemove, children }) => {
  return (
    <li>
      <Card className={styles.sideCard} size='small'>
        <Text className={styles.sideCardText}>{children}</Text>
        <IconButton size='small' onClick={onRemove}><MinusIcon/></IconButton>
      </Card>
    </li>
  )
}