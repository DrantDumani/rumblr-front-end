import PropTypes from 'prop-types';
import styles from './Post.module.css';
import anon from '../../assets/icons/incognito.svg';

// top bar should contain user pfp, username, a follow / unfollow button
// if user doesn't have an img, just use the generic static image from the server. It doesn't exist yet tho
// replace respective divs with header and footer. And hell, the posts can be article tags too, since they link to different blogs!

export function Post({ post }) {
  const notes = post.parent
    ? post.parent._count.likes +
      post.parent._count.children +
      post.parent._count.replies
    : post._count.likes + post._count.children + post._count.replies;
  return (
    <article className={styles.post}>
      <header className={styles.post__header}>
        {/* replace with properly styled img later */}
        <a className={styles.post__blogLink} href="">
          <img
            src={post.author.pfp || anon}
            className={styles.post__author_pfp}
          />
          {post.previous ? (
            <>
              <span className={styles.post__authorName}>
                {post.author.uname}
              </span>{' '}
              reblogged{' '}
              <span className={styles.post__authorName}>
                {post.previous.author.uname}
              </span>
            </>
          ) : (
            <span className={styles.post__authorName}>{post.author.uname}</span>
          )}
        </a>
      </header>

      {/* loop through post segments and render each one */}
      {/* if only one segment AND the author is the post author, you don't render the header at all */}
      {/* remember to cover the different types of posts too */}
      {post.segments.length === 1 &&
      post.segments[0].author.uname === post.author.uname ? (
        <div className={styles.post__contentWrapper}>
          <p>{post.segments[0].content}</p>
        </div>
      ) : (
        post.segments.map((segment) => (
          <div key={segment.id}>
            <div className={styles.post__segmentHeader}>
              <a className={styles.post__blogLink} href="">
                <img
                  src={segment.author.pfp || anon}
                  className={styles.post__author_pfp}
                />
                <span className={styles.post__authorName}>
                  {segment.author.uname}
                </span>
              </a>
            </div>

            {/* just text for now */}
            <div className={styles.post__contentWrapper}>
              <p>{segment.content}</p>
            </div>
          </div>
        ))
      )}

      {/* then the tags */}
      <div className={styles.post__tagWrapper}>
        {post.tags.map((tag) => (
          <a key={tag.id} href="" className={styles.post__tag}>
            #{tag.content}
          </a>
        ))}
      </div>

      {/* finally, the post footer */}
      <footer className={styles.post__footer}>
        <button className={styles.post__notesBtn}>
          <span className={styles.post__notesNum}>{notes}</span>{' '}
          {notes === 1 ? 'note' : 'notes'}
        </button>
        <p>Insert other svgs here</p>
      </footer>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
