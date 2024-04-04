import { render, screen, waitFor } from '@app/testing';
import { generateStore } from '@app/app';

import { UpdateUserForm } from '../UpdateUserForm';
import { nullUser } from '../../types';

describe('UpdateUserForm', () => {
  it('Should display loader when updating', () => {
    render(<UpdateUserForm onUpdate={jest.fn()} isLoading />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('Should call onUpdate with input values', async () => {
    const mockOnUpdate = jest.fn();
    const { user } = render(<UpdateUserForm onUpdate={mockOnUpdate} isLoading={false} />);

    await user.type(screen.getByTestId('update-user-form-firstname'), 'firstname');
    await user.type(screen.getByTestId('update-user-form-lastname'), 'lastname');
    await user.click(screen.getByTestId('update-user-form-submit'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({ firstname: 'firstname', lastname: 'lastname' });
    });
  });

  describe('Firstname', () => {
    it('Should have connected user firstname as default value', () => {
      const store = generateStore({ login: { user: { ...nullUser, firstname: 'firstname' } } });
      render(<UpdateUserForm onUpdate={jest.fn()} isLoading={false} />, { providers: { store } });
      const field = screen.getByTestId('update-user-form-firstname');
      expect(field).toHaveValue('firstname');
    });

    it('Should have error if value is empty', async () => {
      const { user } = render(<UpdateUserForm onUpdate={jest.fn()} isLoading={false} />);
      const field = screen.getByTestId('update-user-form-firstname');
      await user.type(field, 'firstname');
      await user.clear(field);
      await waitFor(() => {
        expect(field).toHaveClass('border-danger-300');
      });
    });
  });
  describe('Lastname', () => {
    it('Should have connected user firstname as default value', () => {
      const store = generateStore({ login: { user: { ...nullUser, lastname: 'lastname' } } });
      render(<UpdateUserForm onUpdate={jest.fn()} isLoading={false} />, { providers: { store } });
      const field = screen.getByTestId('update-user-form-lastname');
      expect(field).toHaveValue('lastname');
    });

    it('Should have error if value is empty', async () => {
      const { user } = render(<UpdateUserForm onUpdate={jest.fn()} isLoading={false} />);
      const field = screen.getByTestId('update-user-form-lastname');
      await user.type(field, 'lastname');
      await user.clear(field);
      await waitFor(() => {
        expect(field).toHaveClass('border-danger-300');
      });
    });
  });
});
