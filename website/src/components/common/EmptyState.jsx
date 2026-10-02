import Icon from './Icon';
export default function EmptyState({ icon = 'star', title, text, children }) {
  return (
    <div className="empty card">
      <div className="icon-tile"><Icon name={icon} /></div>
      <h3 className="h3">{title}</h3>
      {text && <p className="muted">{text}</p>}
      {children}
    </div>
  );
}
