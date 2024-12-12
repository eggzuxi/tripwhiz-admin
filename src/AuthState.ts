import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  admin: {
    name: string | null;
    id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  };
  storeowner: {
    name: string | null;
    id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  };
  setAdmin: (name: string, id: string, accessToken: string, refreshToken: string) => void;
  setStoreowner: (name: string, id: string, accessToken: string, refreshToken: string) => void;
  logoutAdmin: () => void;
  logoutStoreowner: () => void;
  initStoreowner: () => void;
  initAdmin: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      admin: {
        name: null,
        id: null,
        accessToken: null,
        refreshToken: null,
      },
      storeowner: {
        name: null,
        id: null,
        accessToken: null,
        refreshToken: null,
      },

      setAdmin: (name, id, accessToken, refreshToken) => {
        // 점주 상태 초기화
        set(() => ({
          storeowner: {
            name: null,
            id: null,
            accessToken: null,
            refreshToken: null,
          },
        }));

        // 관리자 상태 업데이트
        localStorage.setItem('adminName', name);
        localStorage.setItem('adminId', id);
        localStorage.setItem('adminAccessToken', accessToken);
        localStorage.setItem('adminRefreshToken', refreshToken);

        set(() => ({
          admin: { name, id, accessToken, refreshToken },
        }));
      },

      setStoreowner: (name, id, accessToken, refreshToken) => {
        // 관리자 상태 초기화
        set(() => ({
          admin: {
            name: null,
            id: null,
            accessToken: null,
            refreshToken: null,
          },
        }));

        // 점주 상태 업데이트
        localStorage.setItem('storeownerName', name);
        localStorage.setItem('storeownerId', id);
        localStorage.setItem('storeownerAccessToken', accessToken);
        localStorage.setItem('storeownerRefreshToken', refreshToken);

        set(() => ({
          storeowner: { name, id, accessToken, refreshToken },
        }));
      },

      logoutAdmin: () => {
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');

        // auth-storage 초기화
        localStorage.removeItem('auth-storage');

        set(() => ({
          admin: {
            name: null,
            id: null,
            accessToken: null,
            refreshToken: null,
          },
        }));
      },

      logoutStoreowner: () => {
        localStorage.removeItem('storeownerName');
        localStorage.removeItem('storeownerId');
        localStorage.removeItem('storeownerAccessToken');
        localStorage.removeItem('storeownerRefreshToken');

        // auth-storage 초기화
        localStorage.removeItem('auth-storage');

        set(() => ({
          storeowner: {
            name: null,
            id: null,
            accessToken: null,
            refreshToken: null,
          },
        }));
      },

      initStoreowner: () => {
        set(() => ({
          storeowner: {
            name: localStorage.getItem('storeownerName') || null,
            id: localStorage.getItem('storeownerId') || null,
            accessToken: localStorage.getItem('storeownerAccessToken') || null,
            refreshToken: localStorage.getItem('storeownerRefreshToken') || null,
          },
        }));
      },

      initAdmin: () => {
        set(() => ({
          admin: {
            name: localStorage.getItem('adminName') || null,
            id: localStorage.getItem('adminId') || null,
            accessToken: localStorage.getItem('adminAccessToken') || null,
            refreshToken: localStorage.getItem('adminRefreshToken') || null,
          },
        }));
      },
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);

export default useAuthStore;
