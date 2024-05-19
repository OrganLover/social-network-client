const getAvatarUrl = (fileName: string) => {
  return `${import.meta.env._URL_TO_AVATARS}/${fileName}`;
};

export default getAvatarUrl;
