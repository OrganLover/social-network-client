import { Post as PostBase } from '@entities';
import { PostActions, PostRating } from '@features';
import { PostProps } from './post.interface';
import { useMainStore } from '@shared/providers';

const UserPost = ({ id }: PostProps) => {
  const { owner } = useMainStore();

  return (
    <PostBase
      id={id}
      features={{
        rating: <PostRating id={id} />,
        actions: owner.isOwner ? <PostActions id={id} /> : null,
      }}
    />
  );
};

export default UserPost;
