import SpartaLogo from '../assets/sparta-logo.png';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

export function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="w-full font-montserrat  flex-none h-screen bg-white">
      <div
        className="flex 
      flex-col md:flex-row flex-grow-1 h-full w-full"
      >
        <div className="flex p-12 flex-col items-center text-center lg:items-start lg:text-left bg-gradient-to-b from-green-light to-green-dark text-white">
          <img src={SpartaLogo} alt="sparta logo" height={256} width={206} />
          <h1 className="text-title-2xl font-bold">{t('app.layout.auth.title').toUpperCase()}</h1>
          <h1 className="text-title-xl mt-4 lg:w-[405px] hidden lg:block text-wrap">{t('app.layout.auth.content')}</h1>
        </div>
        <div className="flex flex-grow-2 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
