const createUser = ({id, description, url, likes, comments}) => ({
  id: id,
  description: description,
  likes: likes,
  comments: comments,
  url: url,
});

export { createUser };
