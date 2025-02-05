import PropTypes from 'prop-types';
import styles from './Post.module.css';
import anon from '../../assets/icons/incognito.svg';
import { AudioWrapper } from '../AudioWrapper/AudioWrapper';
import { VideoWrapper } from '../VideoWrapper/VideoWrapper';

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

      {post.segments.length === 1 &&
      post.segments[0].author.uname === post.author.uname
        ? (post.segments[0].post_type === 'text' && (
            <div className={styles.post__contentWrapper}>
              <p className={styles.post__text}>{post.segments[0].content}</p>
            </div>
          )) ||
          (post.segments[0].post_type === 'photo' && (
            <img
              className={styles.post__img}
              src={post.segments[0].content}
              alt=""
            />
          )) ||
          (post.segments[0].post_type === 'quote' && (
            <div className={styles.post__contentWrapper}>
              <p className={styles.post__quote}>{post.segments[0].content}</p>
            </div>
          )) ||
          (post.segments[0].post_type === 'link' && (
            <div className={styles.post__contentWrapper}>
              <a
                target="_blank"
                rel="noreferrer"
                href={post.segments[0].content}
              >
                {post.segments[0].content}
              </a>
            </div>
          )) ||
          (post.segments[0].post_type === 'chat' && (
            <div className={styles.post__contentWrapper}>
              <p className={styles.post__chat}>{post.segments[0].content}</p>
            </div>
          )) ||
          (post.segments[0].post_type === 'audio' && (
            <AudioWrapper audioURL={post.segments[0].content} />
          )) ||
          (post.segments[0].post_type === 'video' && (
            <VideoWrapper videoURL={post.segments[0].content} />
          ))
        : post.segments.map((segment) => (
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

              {segment.post_type === 'text' && (
                <div className={styles.post__contentWrapper}>
                  <p className={styles.post__text}>{segment.content}</p>
                </div>
              )}
              {segment.post_type === 'photo' && (
                <img
                  className={styles.post__img}
                  src={segment.content}
                  alt=""
                />
              )}
              {segment.post_type === 'quote' && (
                <div className={styles.post__contentWrapper}>
                  <p className={styles.post__quote}>{segment.content}</p>
                </div>
              )}
              {segment.post_type === 'link' && (
                <div className={styles.post__contentWrapper}>
                  <a target="_blank" rel="noreferrer" href={segment.content}>
                    {segment.content}
                  </a>
                </div>
              )}
              {segment.post_type === 'chat' && (
                <div>
                  <p className={styles.post__chat}>{segment.content}</p>
                </div>
              )}
              {segment.post_type === 'audio' && (
                <AudioWrapper audioURL={segment.content} />
              )}
              {segment.post_type === 'video' && (
                <VideoWrapper videoURL={segment.content} />
              )}
            </div>
          ))}

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
        <p className={styles.testOnly}>Insert other svgs here</p>
      </footer>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
