import { describe, expect, it } from 'vitest';
import { Register } from './Register';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { userEvent } from '@testing-library/user-event';

const mockRoute = [{ path: '/', element: <Register /> }];

describe('Register component', () => {
  it('Displays email, password, confirm password, and username input fields', () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.queryByLabelText('Email')).toBeInTheDocument();
    expect(screen.queryByLabelText('Password')).toBeInTheDocument();
    expect(screen.queryByLabelText('Username')).toBeInTheDocument();
    expect(screen.queryByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('Displays invalid input errors when user shifts focus away.', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const emailInput = screen.getByLabelText('Email');
    const pwInput = screen.getByLabelText('Password');
    const nameInput = screen.getByLabelText('Username');
    const confirmPwInput = screen.getByLabelText('Confirm Password');

    await user.click(emailInput);
    await user.click(pwInput);
    await user.click(nameInput);
    await user.click(confirmPwInput);

    await user.tab();
    expect(
      screen.queryByText('Please enter a valid email')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Username must be between 1 and 20 characters')
    ).toBeInTheDocument();
    expect(screen.queryByText('Please enter a password')).toBeInTheDocument();
    expect(screen.queryByText('Passwords must match')).toBeInTheDocument();
  });
});
