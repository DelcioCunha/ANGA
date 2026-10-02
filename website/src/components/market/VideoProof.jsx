import { asset } from '../../utils/format';

export default function VideoProof({ video }) {
  if (!video) return null;
  return (
    <figure className="video-proof card" data-reveal>
      <video controls playsInline preload="none" poster={asset(video.poster)}>
        <source src={asset(video.src)} type="video/mp4" />
      </video>
      <figcaption>
        <strong>{video.title}</strong>
        <span className="muted small">{video.text}</span>
      </figcaption>
    </figure>
  );
}
