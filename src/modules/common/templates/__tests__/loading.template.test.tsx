import { render, screen } from '@app/testing';

import LoadingTemplate from '../loading.template';

describe('LoadingTemplate', () => {
  it('should render correctly', () => {
    render(<LoadingTemplate />);
    expect(screen.getByTestId('loading-template')).toBeInTheDocument();
  });
});
