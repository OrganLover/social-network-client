import { UserCard as UserCardBase } from '@entities';
import { UserCardProps } from './user-card.interface';

const UserCard = ({ id }: UserCardProps) => {
  return <UserCardBase id={id} />;
};

export default UserCard;
