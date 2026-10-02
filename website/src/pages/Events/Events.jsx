import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import EventCard from '../../components/cards/EventCard';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { getUpcomingEvents, getPastEvents } from '../../services/contentService';

export default function Events() {
  const ref = useReveal();
  const [tab, setTab] = useState('upcoming');
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const list = tab === 'upcoming' ? upcoming : past;
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Agenda" title="Eventos da Aliança" text="Torneios, jornadas da Liga e noites de comunidade. Os detalhes e salas são partilhados no grupo oficial." icon="calendar" />
      <section className="section section--tight">
        <div className="container">
          <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
            <button role="tab" className="tab" aria-selected={tab === 'upcoming'} onClick={() => setTab('upcoming')}>Próximos ({upcoming.length})</button>
            <button role="tab" className="tab" aria-selected={tab === 'past'} onClick={() => setTab('past')}>Realizados ({past.length})</button>
          </div>
          {list.length ? (
            <div className="grid grid-3" key={tab}>
              {list.map((e, i) => <EventCard key={e.id} event={e} style={{ '--d': `${(i % 3) * 80}ms` }} />)}
            </div>
          ) : (
            <EmptyState icon="calendar" title={tab === 'upcoming' ? 'Sem eventos agendados' : 'Ainda sem eventos realizados'} text="Novos eventos são anunciados primeiro no grupo oficial.">
              <Button whatsapp="join" variant="whatsapp" icon="whatsapp" size="sm">Entrar no grupo</Button>
            </EmptyState>
          )}
        </div>
      </section>
    </div>
  );
}
