import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Text } from '@acme/components';
import { useAuth } from '../features/auth/useAuth';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await register(name, email, password);
      navigate('/users');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-card stack" onSubmit={handleSubmit}>
      <Text as="h1" variant="display">Create account</Text>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          autoComplete="name"
          required
          value={name}
          invalid={Boolean(error)}
          onChange={(event) => setName(event.target.value)}
          autoFocus
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          invalid={Boolean(error)}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          invalid={Boolean(error)}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && (
        <div role="alert">
          <Text tone="danger">{error}</Text>
        </div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account…' : 'Sign up'}
      </Button>
      <Text>
        Already have an account? <Link to="/login">Log in</Link>
      </Text>
    </form>
  );
}
