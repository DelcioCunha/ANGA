import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import RecordCard from '../../components/cards/RecordCard';
import Button from '../../components/common/Button';
import { getRecords } from '../../services/contentService';

export default function Records() {
  const ref = useReveal();
  const records = getRecords();
  const cats = ['Todos', ...new Set(records.map((r) => r.category))];
  const [cat, setCat] = useState('Todos');
  const list = cat === 'Todos' ? records : records.filter((r) => r.category === cat);
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Recordes dos Monarcas" title="As marcas mais altas da Aliança" text="Abates, Booyahs, dano e pontos. Só os registos confirmados pela administração entram aqui." icon="crown">
        <div className="row" style={{ marginTop: 8 }}>
          <Button whatsapp="Olá! Quero submeter um recorde para os Recordes dos Monarcas." variant="gold" icon="whatsapp">Submeter recorde</Button>
        </div>
      </PageHeader>
      <section className="section section--tight">
        <div className="container">
          <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
            {cats.map((c) => <button key={c} role="tab" className="tab" aria-selected={c === cat} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="grid grid-3" key={cat}>
            {list.map((r, i) => <RecordCard key={r.id} record={r} index={records.indexOf(r)} style={{ '--d': `${(i % 3) * 80}ms` }} />)}
          </div>
          <p className="notice" style={{ marginTop: 32 }}>Para validar um recorde envia o print do ecrã final da partida à administração. Recordes sem prova não são registados.</p>
        </div>
      </section>
    </div>
  );
}
