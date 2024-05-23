import React, {useEffect} from 'react';
import Title from '@/components/layout/Title'
import MemberModifySection from '@/components/member/MemberModifySection'

const MemberModifyView = () => {
    return (
        <div className="row">
            <Title title="Member Modify" />
            <MemberModifySection />
        </div>
    );
};

export default MemberModifyView;