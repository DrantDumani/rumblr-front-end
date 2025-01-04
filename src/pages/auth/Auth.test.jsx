import { Auth } from './Auth';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../../components/Login/Login', () => ({
  Login: () => <h1>Login Form</h1>,
}));

vi.mock('../../components/Register/Register', () => ({
  Register: () => <h1>Register Form</h1>,
}));

describe('Auth page', () => {
  it('Display login form', () => {
    render(<Auth />);
    expect(
      screen.getByRole('heading', { name: 'Login Form' })
    ).toBeInTheDocument();
  });

  it('Toggles login and register form on button click', async () => {
    render(<Auth />);

    const user = userEvent.setup();
    const toggleBtn = screen.getByRole('button', { name: 'Sign Up' });
    const loginForm = screen.getByRole('heading', { name: 'Login Form' });

    await user.click(toggleBtn);
    const registerForm = screen.getByRole('heading', {
      name: 'Register Form',
    });
    expect(loginForm).not.toBeInTheDocument();
    expect(registerForm).toBeInTheDocument();

    const toggleBackBtn = screen.getByRole('button', { name: 'Log In' });
    await user.click(toggleBackBtn);

    expect(
      screen.queryByRole('heading', { name: 'Login Form' })
    ).toBeInTheDocument();
    expect(registerForm).not.toBeInTheDocument();
  });
});
