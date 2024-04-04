import { render, screen } from '@app/testing';

import { AppParameters } from '../AppParameters';

describe('AppParameters', () => {
  it('Should render title', () => {
    render(<AppParameters />);
    expect(screen.getByText('app.page.profile.parameters')).toBeInTheDocument();
  });
});
