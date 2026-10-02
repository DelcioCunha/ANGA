import SectionHeader from '../common/SectionHeader';
import EventCard from '../cards/EventCard';
import EmptyState from '../common/EmptyState';
import { getUpcomingEvents, getPastEvents } from '../../services/contentService';

export default function ActivitiesSection() {
  const upcoming = getUpcomingEvents();
  const list = (upcoming.length ? upcoming : getPastEvents()).slice(0, 3);
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Atividades" title="Próximos eventos" text="Liga, torneios e noites de comunidade. Marca na agenda e prepara a tua squad." link="/eventos" linkLabel="Todos os eventos" />
        {list.length ? (
          <div className="grid grid-3">
            {list.map((e, i) => <EventCard key={e.id} event={e} style={{ '--d': `${i * 80}ms` }} />)}
          </div>
        ) : (
          <EmptyState icon="calendar" title="Novos eventos em breve" text="Fica atento ao grupo oficial." />
        )}
      </div>
    </section>
  );
}
