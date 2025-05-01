import { FC, PropsWithChildren } from 'react';
import { Card, IconButton, Text } from '@adara-cs/ui-kit-web';

export interface URLListItemProps {
  onRemove?: () => void;
}

export const URLListItem: FC<PropsWithChildren<URLListItemProps>> = ({ onRemove, children }) => {
  return (
    <li>
      <Card className='side-card' size='small'>
        <Text className='side-card-text'>{children}</Text>
        <IconButton name='minus' size='small' onClick={onRemove} />
      </Card>
    </li>
  )
}