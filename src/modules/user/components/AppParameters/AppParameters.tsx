import { Card } from 'react-breeze';
import { useTranslation } from '@app/modules/translation';

import './app-parameters.scss';

export function AppParameters() {
  const { t } = useTranslation();

  return (
    <Card className="m-2">
      <Card.Title>{t('app.page.profile.parameters')}</Card.Title>
      <ul>
        <li className="emphasis">title : {t('app.title')}</li>
        <li>description : {t('app.description')}</li>
      </ul>
    </Card>
  );
}
