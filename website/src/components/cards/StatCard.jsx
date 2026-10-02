import { useCountUp } from '../../hooks/useReveal';
import { formatNumber } from '../../utils/format';

export default function StatCard({ value, label, style }) {
  const ref = useCountUp(typeof value === 'number' ? value : null);
  return (
    <div className="stat" style={style} data-reveal>
      <strong className="stat__value" ref={ref}>{typeof value === 'number' ? formatNumber(value) : value}</strong>
      <span className="stat__label">{label}</span>
    </div>
  );
}
