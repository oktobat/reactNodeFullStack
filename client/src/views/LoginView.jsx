import React from 'react';
import Title from '@/components/layout/Title'
import LoginSection from '@/components/member/LoginSection'

const LoginView = () => {

    return (
        <div className="row">
            <Title title="Login" />
            <LoginSection />
        </div>
    );
};

export default LoginView;