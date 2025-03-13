import React, { useEffect } from 'react';
import { useIdentify } from '@veltdev/react';
import { useAuth } from '../../context/AuthContext';

const VeltAuth = () => {
  const { user } = useAuth(); // Get the authenticated user from your Supabase auth context
  
  // Create a random color for the user if not provided
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Create the Velt user object from Supabase user data if user exists
  const veltUser = user ? {
    userId: user.id,
    organizationId: 'default-org', // Replace with your organization ID or use a dynamic value
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous User',
    email: user.email,
    photoUrl: user.user_metadata?.avatar_url || '',
    color: getRandomColor(), // Generate a random color for the user avatar
    textColor: '#FFFFFF' // White text color for contrast
  } : null;

  // Call useIdentify at the top level with the user object or null
  useIdentify(veltUser);
  
  useEffect(() => {
    if (user && veltUser) {
      console.log('User authenticated with Velt:', veltUser.name);
    }
  }, [user, veltUser]);

  return null; // This component doesn't render anything
};

export default VeltAuth; 