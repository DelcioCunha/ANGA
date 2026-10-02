import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import { ImageGrid } from '../../components/common/Lightbox';
import { getGallery } from '../../services/contentService';

export default function Gallery() {
  const ref = useReveal();
  const albums = getGallery();
  const [tab, setTab] = useState(albums[0]?.id);
  const album = albums.find((a) => a.id === tab) || albums[0];
  const total = albums.reduce((n, a) => n + a.items.length, 0);
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Galeria" title="A Aliança em imagens" text={`${total} imagens oficiais: cartazes da Liga, a comunidade e o Mercado. Toca numa imagem para a ver em grande e desliza para passar à seguinte.`} icon="star" />
      <section className="section section--tight">
        <div className="container">
          <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
            {albums.map((a) => (
              <button key={a.id} role="tab" className="tab" aria-selected={a.id === album.id} onClick={() => setTab(a.id)}>
                {a.title} ({a.items.length})
              </button>
            ))}
          </div>
          <ImageGrid key={album.id} items={album.items} variant="poster" />
        </div>
      </section>
    </div>
  );
}
