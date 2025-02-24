import React, { useEffect, useState } from 'react';
import { useFormStore } from './store/formStore';
import AddressForm from './components/AddressForm';
import InventoryReview from './components/InventoryReview';
import InventoryEdit from './components/InventoryEdit';
import AuthForm from './components/AuthForm';
import { supabase } from './lib/supabase';
import { LogOut } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  const step = useFormStore((state) => state.step);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1510906594845-bc082582c8cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2044&q=80')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      {isAuthenticated && (
        <div className="relative z-10 flex justify-end p-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/80 hover:bg-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
      <div className="relative max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {!isAuthenticated ? (
            <AuthForm onSuccess={() => setIsAuthenticated(true)} />
          ) : (
            <>
              {step === 1 && <AddressForm />}
              {step === 2 && <InventoryReview />}
              {step === 3 && <InventoryEdit />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;