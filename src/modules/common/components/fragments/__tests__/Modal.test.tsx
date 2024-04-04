import { render, screen } from '@app/testing';

import { Modal } from '../Modal';

describe('Modal', () => {
  it('Should render children', () => {
    render(<Modal show={true}>children</Modal>);
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
