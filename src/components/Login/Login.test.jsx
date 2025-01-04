import { describe, expect, it } from 'vitest';
import { Login } from './Login';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { userEvent } from '@testing-library/user-event';

const mockRoute = [{ path: '/', element: <Login /> }];

describe('Login component', () => {
  it('Displays email and password input fields', () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.queryByLabelText('Email')).toBeInTheDocument();
    expect(screen.queryByLabelText('Password')).toBeInTheDocument();
  });

  it('Displays invalid input errors when user shifts focus away from them', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const emailInput = screen.getByLabelText('Email');
    const pwInput = screen.getByLabelText('Password');

    await user.click(emailInput);
    await user.click(pwInput);

    await user.tab();
    expect(
      screen.queryByText('Please enter a valid email')
    ).toBeInTheDocument();
    expect(screen.queryByText('Please enter a password')).toBeInTheDocument();
  });

  it('Remove invalid input errors on correct input', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const emailInput = screen.getByLabelText('Email');
    const pwInput = screen.getByLabelText('Password');

    await user.click(emailInput);
    await user.click(pwInput);
    await user.tab();

    await user.type(emailInput, 'test@mail.com');
    await user.type(pwInput, '123');

    expect(
      screen.queryByText('Please enter a valid email')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Please enter a password')
    ).not.toBeInTheDocument();
  });
});
