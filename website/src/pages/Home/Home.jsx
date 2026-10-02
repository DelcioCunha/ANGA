import { useReveal } from '../../hooks/useReveal';
import Hero from '../../components/sections/Hero';
import Marquee from '../../components/effects/Marquee';
import Intro from '../../components/sections/Intro';
import LeagueSection from '../../components/sections/LeagueSection';
import MarketSection from '../../components/sections/MarketSection';
import GuildsSection from '../../components/sections/GuildsSection';
import CommunitySection from '../../components/sections/CommunitySection';
import ActivitiesSection from '../../components/sections/ActivitiesSection';
import HallSection from '../../components/sections/HallSection';
import NewsSection from '../../components/sections/NewsSection';
import JoinCTA from '../../components/sections/JoinCTA';
import { getGuildsByStanding, getSite } from '../../services/contentService';

export default function Home() {
  const ref = useReveal();
  const marquee = [...(getSite().slogans || []), ...getGuildsByStanding().map((g) => g.name)];
  return (
    <div ref={ref}>
      <Hero />
      <Marquee items={marquee} />
      <Intro />
      <LeagueSection />
      <MarketSection />
      <GuildsSection />
      <CommunitySection />
      <ActivitiesSection />
      <HallSection />
      <NewsSection />
      <JoinCTA />
    </div>
  );
}
