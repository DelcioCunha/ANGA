import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <PageHeader eyebrow="Erro 404" title="Saíste da zona segura" text="Esta página não existe ou foi movida. Volta ao início antes que a zona feche.">
      <div className="row"><Button to="/" variant="primary" icon="back">Voltar ao início</Button></div>
    </PageHeader>
  );
}
