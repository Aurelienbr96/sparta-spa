import { render, screen } from '@app/testing';

import NotFoundTemplate from '../not-found.template';

describe('LoadingTemplateNotFoundTemplate', () => {
  it('should render correctly', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByTestId('not-found-screen')).toBeInTheDocument();
  });
});
