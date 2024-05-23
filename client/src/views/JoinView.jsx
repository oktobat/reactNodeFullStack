import React from 'react';
import Title from '@/components/layout/Title'
import JoinSection from '@/components/member/JoinSection'

const JoinView = () => {
    return (
        <div className="row">
            <Title title="Join" />
            <JoinSection />
        </div>
    );
};

export default JoinView;