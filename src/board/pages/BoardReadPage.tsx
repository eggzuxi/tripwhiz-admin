import React from 'react';
import BoardReadComponent from '../component/BoardReadComponent';

function BoardReadPage() {
    return (
        <div style={{ textAlign: 'center' }}> {/* 텍스트 가운데 정렬 */}
            <h1>공지사항</h1> {/* 제목을 공지사항으로 설정 */}
            <BoardReadComponent />
        </div>
    );
}

export default BoardReadPage;