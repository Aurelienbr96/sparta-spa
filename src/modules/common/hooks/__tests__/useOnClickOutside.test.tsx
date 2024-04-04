import { useRef } from 'react';
import { render, screen } from '@app/testing';

import { useOnClickOutside } from '../useOnClickOutside';

type Props = {
  handler: () => void;
};

function MockComponent(props: Props) {
  const { handler } = props;

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    handler();
  });

  return (
    <div>
      <div ref={ref} data-testid="inside" />
      <div data-testid="outside" />
    </div>
  );
}

describe('useOnClickOutside', () => {
  it('Should call handler when clicking outside component', async () => {
    const mockHandler = jest.fn();
    const { user } = render(<MockComponent handler={mockHandler} />);

    await user.click(screen.getByTestId('outside'));

    expect(mockHandler).toHaveBeenCalled();
  });

  it('Should not call handler when clicking inside component', async () => {
    const mockHandler = jest.fn();
    const { user } = render(<MockComponent handler={mockHandler} />);

    await user.click(screen.getByTestId('inside'));

    expect(mockHandler).not.toHaveBeenCalled();
  });
});
