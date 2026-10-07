import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Text } from '@acme/components';
import { useAuth } from '../features/auth/useAuth';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/users');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-card stack" onSubmit={handleSubmit}>
      <Text as="h1" variant="display">Log in</Text>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          invalid={Boolean(error)}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          invalid={Boolean(error)}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <div role="alert">
          <Text tone="danger">{error}</Text>
        </div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Log in'}
      </Button>
      <Text>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </Text>
    </form>
  );
}
