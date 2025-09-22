export default {
    common: {
        cancel: '취소',
        ok: 'OK',
        page_title: 'Temi Web',
        no_options: '비어 있는',
        table: {
            total: (total: number) => {
                return `총 ${total}개 항목`;
            },
        },
    },
    auth: {
        loginButton: 'Login',
    },
    home: {
        hot: {
            title: '핫 토픽',
        },
        latest: {
            title: '최근 뉴스',
        },
    },
    news: {
        comment: '논평',
        most_interested: '가장 관심 있는',
        latest: '최신',
        sign_in_to_comment: '댓글을 달려면 로그인하세요.',
    },
};
