import React from 'react';
import { getUsername } from '../auth/keycloakService';

const Home: React.FC = () => {
    const username = getUsername();
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {username} 👋</h1>
            <p>Organize your tasks efficiently and stay productive!</p>
        </div>
    );
};

export default Home;