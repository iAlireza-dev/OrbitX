import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let authService: AuthService;

  const userService = {
    findByEmail: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    updateRefreshTokenHash: vi.fn(),
  };

  const jwtService = {
    signAsync: vi.fn(),
    verifyAsync: vi.fn(),
  };

  const configService = {
    get: vi.fn(),
    getOrThrow: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    authService = new AuthService(
      userService as any,
      jwtService as any,
      configService as any,
    );
  });

  it('should reject registration when email already exists', async () => {
    userService.findByEmail.mockResolvedValue({
      id: 'user-1',
      email: 'ali@orbitx.com',
    });

    await expect(
      authService.register({
        email: 'ali@orbitx.com',
        password: 'OrbitX123!',
      }),
    ).rejects.toThrow('Email is already registered');
  });
});