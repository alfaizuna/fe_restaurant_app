import { useEffect } from 'react';
import { useAuthStore } from '@/shared/store';

/**
 * Hook untuk inisialisasi auth state saat aplikasi startup
 * Akan mengambil profile user jika token tersedia
 */
export const useAuthInit = () => {
  const { token, user, getProfile, isLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      // Jika ada token tapi tidak ada user data, fetch profile
      if (token && !user && !isLoading) {
        try {
          await getProfile();
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          // Jika gagal fetch profile, mungkin token sudah expired
          // Bisa redirect ke login atau clear token
        }
      }
    };

    initializeAuth();
  }, [token, user, getProfile, isLoading]);

  return {
    isInitialized: !token || !!user, // Initialized jika tidak ada token atau sudah ada user data
    isLoading
  };
};
