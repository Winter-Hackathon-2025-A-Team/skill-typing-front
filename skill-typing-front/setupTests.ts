import "@testing-library/jest-dom";
import { server } from "./app/mocks/server";
import { afterAll, afterEach, beforeAll } from "vitest";
import type { AuthContextProps } from "react-oidc-context";
import type { Logger, UserManagerEvents } from "oidc-client-ts";

const dummyLogger = {
  debug: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  throw: (err: Error): never => {
    throw err;
  },
  create: () => dummyLogger,
} as unknown as Logger;

const dummyEvents: UserManagerEvents = {
  addAccessTokenExpiring: vi.fn(() => vi.fn()),
  addUserLoaded: vi.fn(() => vi.fn()),
  addSilentRenewError: vi.fn(() => vi.fn()),
  removeAccessTokenExpiring: vi.fn(),
  removeUserLoaded: vi.fn(),
  removeSilentRenewError: vi.fn(),
  load: vi.fn(),
} as unknown as UserManagerEvents;

const defaultMockAuthState: AuthContextProps = {
  isLoading: false,
  error: undefined,
  isAuthenticated: false,
  user: null,
  signinRedirect: vi.fn(),
  signoutRedirect: vi.fn(),
  removeUser: vi.fn(),
  signinPopup: vi.fn(),
  signinSilent: vi.fn(),
  signinResourceOwnerCredentials: vi.fn(),
  signoutPopup: vi.fn(),
  signoutSilent: vi.fn(),
  querySessionStatus: vi.fn(),
  revokeTokens: vi.fn(),
  startSilentRenew: vi.fn(),
  stopSilentRenew: vi.fn(),
  settings: {
    authority: "https://example.com",
    client_id: "dummy-client-id",
    redirect_uri: "https://example.com/callback",
  },
  events: dummyEvents,
  clearStaleState: vi.fn(),
};

let mockAuthState: AuthContextProps = defaultMockAuthState;

export function setMockAuthState(state: Partial<typeof mockAuthState>) {
  mockAuthState = { ...mockAuthState, ...state };
}

vi.mock(
  "react-oidc-context",
  (): Partial<typeof import("react-oidc-context")> => ({
    useAuth: () => mockAuthState,
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
