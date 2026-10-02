import SectionHeader from '../common/SectionHeader';
import TrophyCard from '../cards/TrophyCard';
import RecordCard from '../cards/RecordCard';
import { getTrophies, getRecords } from '../../services/contentService';

export default function HallSection() {
  const records = getRecords().filter((r) => !r.vacant).slice(0, 3);
  const trophies = getTrophies().slice(0, 3);
  return (
    <section className="section hall">
      <div className="hall__bg" aria-hidden="true" />
      <div className="container">
        <SectionHeader eyebrow="Recordes dos Monarcas" title="Marcas para bater" text="Os números mais altos da Temporada 1 da Liga Aliança, tirados da tabela oficial." link="/recordes" linkLabel="Todos os recordes" />
        <div className="grid grid-3">
          {records.map((r, i) => <RecordCard key={r.id} record={r} index={i} style={{ '--d': `${i * 80}ms` }} />)}
        </div>

        <div style={{ height: 'clamp(56px, 8vw, 96px)' }} />

        <SectionHeader eyebrow="Salão de Troféus" title={<>Glória <span className="gold-text">por conquistar</span></>} text="Os troféus da Temporada 1 são entregues no fim da Rodada 25." link="/trofeus" linkLabel="Salão de Troféus" />
        <div className="grid grid-3">
          {trophies.map((t, i) => <TrophyCard key={t.id} trophy={t} style={{ '--d': `${i * 80}ms` }} />)}
        </div>
      </div>
    </section>
  );
}
