import { invoke } from '@tauri-apps/api';

export interface LoginResult {
  raw: string;
}

export async function login(username: string, password: string): Promise<string> {
  return invoke('login', { username, password }) as Promise<string>;
}

export async function query(name: string): Promise<string> {
  return invoke('query', { name }) as Promise<string>;
}

export async function logout(): Promise<string> {
  return invoke('logout', {}) as Promise<string>;
}

export async function updated(): Promise<string> {
  return invoke('updated', {}) as Promise<string>;
}
