import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function PostList() {
  const posts = useSelector((state: RootState) => state.posts);
  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}
