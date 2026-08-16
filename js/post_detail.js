(function () {
    "use strict";

    const scriptUrl = document.currentScript && document.currentScript.src;
    const rootUrl = new URL("../", scriptUrl || window.location.href);

    const workTitles = [
        "빌딩 방역하러 다녀왔습니다~!",
        "학교 에어컨 청소하러 왔습니다.",
        "화강석 바닥 세척 작업",
        "마트 푸드코트 청소 작업 현장",
        "건물 비둘기 문제, 이렇게 해결했습니다!",
        "기름때·찌든때 제거, 식당 바닥 클리닝 작업현장!",
        "(주)그린죤 외벽세척 청소 현장 기록",
        "산업현장 바닥청소, 그린죤이 책임집니다!",
        "학교 창틀 청소작업!!",
        "학교 연못 청소 다녀왔습니다~!",
        "계단 청소 다녀왔습니다~!",
        "운동장 청소 작업 다녀왔습니다~!",
        "생산 설비 주변에 쌓인 분진 제거 작업",
        "건물 저수조 내부 세척 및 위생관리 현장",
        "공연장 카펫 오염 제거와 바닥 정리 작업",
        "상가 외벽 묵은 때와 빗물 자국 세척 현장"
    ];

    const videoTitles = [
        "학교 방역하러 다녀왔습니다~!",
        "(주)그린죤 카페트청소 작업",
        "비둘기 퇴치 작업 다녀왔습니다~!",
        "식당 후드 청소 다녀왔습니다!",
        "공장 바닥 청소 작업",
        "공장 설비 청소 작업",
        "저수조 내부 청소 작업",
        "외벽 세척 작업",
        "바닥 왁스 코팅 작업",
        "카펫 청소 작업",
        "시설물 세척 작업",
        "행사장 청소 작업",
        "공장 라인 가동 전 정밀 세척 과정",
        "사무실 바닥 세척과 왁스 코팅 과정",
        "건물 유리창과 창틀 세척 작업",
        "배관 주변 기름때 제거 작업"
    ];

    const galleryEventTitles = [
        "2025년 국제청소위생방역산업전, 대상수상",
        "전국 건물위생관리 기능경진대회 최우수상 수상",
        "그린죤 2022 회식3",
        "그린죤 장노년 일자리 한마당 부스 참가",
        "그린죤 직원 간담회",
        "그린죤 2022년 회식",
        "하루 일과를 마친 후 뒤풀이^^~",
        "공중위생관리책임자 위생교육 다녀왔습니다.",
        "그린죤 워크샵",
        "한국자활연수원 교육 다녀왔습니다.",
        "2016 세계건물관리연맹 동경대회",
        "그린죤 행사 소식",
        "현장 안전관리 교육에 참여했습니다.",
        "청소 장비 실무교육 현장",
        "그린죤 임직원 정기 간담회",
        "지역 환경정화 활동에 함께했습니다."
    ];

    const noticeTitles = [
        "2025년 전국 건물위생관리 기능경진대회에서 대상을 수상 하였습니다.",
        "시설물관리(기계)용역 입찰하였습니다.",
        "2026년도 수원국토사무소 관내 졸음쉼터 청소-관리용역 입찰하였습니다.",
        "2026년도 중앙보훈병원 방역·소독 위탁관리용역 입찰하였습니다.",
        "2026 학교 저수조 청소 용역 (4권역) 낙찰 되었습니다.",
        "2026년 경북 김천경찰서 지역경찰관서 청소용역 공고 입찰 하였습니다.",
        "봄철 외벽 세척 및 시설물 청소 상담 안내",
        "공장 정기청소 현장 방문견적 신청 방법",
        "청소 작업 전 현장 사진 전달 시 유의사항",
        "설 연휴 고객상담 운영시간 안내",
        "2023년 전국 건물위생관리 기능경진대회 최우수상 수상"
    ];

    const communityEventTitles = [
        "돌아온 피톤치드 이벤트!",
        "피톤치드 이벤트",
        "홈케어서비스 이벤트",
        "봄맞이 사무실 바닥청소 상담 이벤트",
        "공장 정기청소 방문견적 안내",
        "카펫·패브릭 집중관리 상담 이벤트"
    ];

    const informationTitles = [
        "겨울철 실내공기유지하기",
        "주방 청소 꿀팁 4가지, 이것만 알아도 관리가 쉬워집니다",
        "가습기 청소",
        "집먼지 진드기 알레르기, 원인 예방법 꼼꼼하게 알려드릴게요",
        "먼지 방지하는 청소 방법",
        "미세먼지 심할 때 환기, 올바른 환기 방법이 있어요!",
        "전자레인지 냄새 제거 꿀팁, 이 방법이 가장 확실해요!",
        "새집증후군 예방 위한 효과적인 방법 총정리!",
        "카펫에 음료를 쏟았을 때 바로 해야 할 응급조치",
        "공장 바닥 기름때가 다시 생기는 이유와 관리 방법",
        "저수조 청소 전 미리 확인해야 할 사항",
        "외벽 세척 시기와 오염 상태 확인하는 방법"
    ];

    const reviewTitles = [
        "프레스 판 녹제거",
        "공장 천장 비둘기퇴치",
        "바닥청소",
        "공장 바닥청소 후기",
        "미화원 파견문의",
        "바닥왁스 후기",
        "사무실 카펫 청소 후기가 늦었습니다",
        "공장 바닥 기름때가 깨끗하게 정리됐어요",
        "외벽 세척 방문견적과 작업 후기",
        "행사장 철거 후 청소를 맡겼습니다"
    ];

    const workImages = [
        "img/mainimgs/building_wall_cleaning_ing.jpg",
        "img/sub_page/cleaning_carpet_ing_3.jpg",
        "img/sub_page/factory_floor_ing_3.jpg",
        "img/mainimgs/cleaning_carpet_ing.jpg",
        "img/mainimgs/bird_spike_ing.jpg",
        "img/sub_page/Wax_job_4.jpg",
        "img/sub_page/wall_cleaning.jpg",
        "img/mainimgs/factory_cleane_ing.jpg",
        "img/sub_page/building_wall_ing_1.jpg",
        "img/mainimgs/Pond_ing.jpg",
        "img/sub_page/factory_floor_2_1_After.jpg",
        "img/sub_page/factory_floor_ing_2.jpg",
        "img/sub_page/factory_equipment_ing_2.jpg",
        "img/sub_page/water_tank_ing_3.jpg",
        "img/mainimgs/cleaning_carpet_ing.jpg",
        "img/sub_page/building_wall_ing_3.jpg"
    ];

    const videoImages = [
        "img/sub_page/Disinfection_1.jpg",
        "img/sub_page/cleaning_carpet_ing_3.jpg",
        "img/mainimgs/bird_spike_ing.jpg",
        "img/sub_page/factory_equipment_ing_2.jpg",
        "img/sub_page/factory_floor_ing.jpg",
        "img/sub_page/factory_equipment_ing.jpg",
        "img/sub_page/water_tank_ing_2.jpg",
        "img/sub_page/building_wall_ing_1.jpg",
        "img/sub_page/wax_ing_2.jpg",
        "img/mainimgs/cleaning_carpet_ing.jpg",
        "img/sub_page/statue_cleaning_ing_1.jpg",
        "img/mainimgs/cleaning_event_ing.png",
        "img/sub_page/factory_line_ing_4.jpg",
        "img/sub_page/Wax_job_2.jpg",
        "img/mainimgs/building_wall_cleaning_ing.jpg",
        "img/sub_page/factory_equipment_ing_3.jpg"
    ];

    const galleryEventImages = [
        "img/sub_page/news_Competition_victory_2025.jpg",
        "img/mainimgs/Community_victory_2025.jpg",
        "img/mainimgs/Community_viciory_2023.jpg",
        "img/sub_page/news_event_2.jpg",
        "img/sub_page/news_event_3.jpg",
        "img/sub_page/news_event.jpg",
        "img/sub_page/news_Dining_together.jpg",
        "img/sub_page/Dispatch_janitor_1.jpg",
        "img/sub_page/Dispatch_janitor_2.jpg",
        "img/sub_page/news_Competition_victory_2023.jpg",
        "img/sub_page/news_Competition_victory_2025.jpg",
        "img/sub_page/news_nall.jpg",
        "img/sub_page/news_event.jpg",
        "img/sub_page/news_event_2.jpg",
        "img/sub_page/news_event_3.jpg",
        "img/sub_page/news_Dining_together.jpg"
    ];

    const noticeImages = [
        "img/mainimgs/Community_victory_2025.jpg",
        "img/sub_page/factory_equipment_ing.jpg",
        "img/mainimgs/dispatch_sanitation_ing.jpg",
        "img/sub_page/Disinfection_3.jpg",
        "img/mainimgs/water_tank_ing.jpg",
        "img/sub_page/Dispatch_janitor_1.jpg",
        "img/sub_page/building_wall_ing_1.jpg",
        "img/mainimgs/factory_cleane_ing.jpg",
        "img/sub_page/factory_floor_ing.jpg",
        "img/mainimgs/Event_2.jpg",
        "img/mainimgs/Community_viciory_2023.jpg"
    ];

    const communityEventImages = [
        "img/mainimgs/Event_2.jpg",
        "img/mainimgs/Event_1.jpg",
        "img/mainimgs/Event_3.jpg",
        "img/sub_page/Wax_job_4.jpg",
        "img/mainimgs/factory_cleane_ing.jpg",
        "img/sub_page/cleaning_carpet_ing_3.jpg"
    ];

    const informationImages = [
        "img/mainimgs/Community_Information.jpg",
        "img/sub_page/Wax_job_4.jpg",
        "img/sub_page/Disinfection_2.jpg",
        "img/sub_page/cleaning_carpet_ing_2.jpg",
        "img/mainimgs/factory_cleane_ing.jpg",
        "img/sub_page/building_wall_ing_1.jpg",
        "img/sub_page/quarantine_2.jpg",
        "img/sub_page/Disinfection_4.jpg",
        "img/sub_page/cleaning_carpet_Before_2.jpg",
        "img/sub_page/factory_floor_ing_3.jpg",
        "img/sub_page/water_tank_ing_2.jpg",
        "img/sub_page/building_wall_Before_3.jpg"
    ];

    const reviewImages = [
        "img/sub_page/rust_removal_ing.jpg",
        "img/mainimgs/bird_spike_ing.jpg",
        "img/sub_page/factory_floor_ing.jpg",
        "img/sub_page/factory_floor_After.jpg",
        "img/sub_page/Dispatch_janitor_1.jpg",
        "img/sub_page/wax_After_2.jpg",
        "img/sub_page/cleaning_carpet_After_2.jpg",
        "img/sub_page/factory_floor_2_1_After.jpg",
        "img/sub_page/building_wall_After_3.jpg",
        "img/mainimgs/cleaning_event_ing.png"
    ];

    const dates = [
        "2026.04.01", "2026.03.24", "2026.03.18", "2026.03.12",
        "2026.03.06", "2026.03.02", "2026.02.26", "2026.02.19",
        "2026.02.12", "2026.02.05", "2026.01.29", "2026.01.22",
        "2026.01.15", "2026.01.08", "2025.12.29", "2025.12.22"
    ];

    function asset(path) {
        return path ? new URL(path, rootUrl).href : "";
    }

    function makePosts(type, titles, images, label) {
        return titles.map(function (title, index) {
            return {
                id: index,
                type: type,
                label: label,
                title: title,
                date: dates[index] || dates[dates.length - 1],
                image: images[index] || "",
                images: images[index] ? [images[index]] : []
            };
        });
    }

    const posts = {
        work: makePosts("work", workTitles, workImages, "작업 갤러리"),
        video: makePosts("video", videoTitles, videoImages, "작업 동영상"),
        galleryEvent: makePosts("galleryEvent", galleryEventTitles, galleryEventImages, "행사 사진"),
        notice: makePosts("notice", noticeTitles, noticeImages, "공지사항"),
        event: makePosts("event", communityEventTitles, communityEventImages, "이벤트"),
        information: makePosts("information", informationTitles, informationImages, "정보공유"),
        review: makePosts("review", reviewTitles, reviewImages, "이용후기")
    };

    posts.work[0].images = [
        "img/sub_page/Disinfection_3.jpg",
        "img/sub_page/Disinfection_4.jpg",
        "img/sub_page/Disinfection_5.jpg"
    ];

    const informationCopy = [
        ["겨울철에는 난방으로 실내가 건조해지고 창문을 닫아두는 시간이 길어져 공기가 쉽게 탁해집니다.", "하루 두세 번 5분에서 10분 정도 맞통풍하고, 환기 전에는 먼지가 날리지 않도록 바닥과 가구 표면을 먼저 닦아주세요.", "필터가 있는 공기청정기와 환기장치는 교체 주기를 확인하고, 실내 습도는 40~60%로 유지하면 쾌적한 환경을 만드는 데 도움이 됩니다."],
        ["주방은 조리 중 발생한 기름과 수증기가 함께 달라붙어 오염이 빠르게 쌓이는 공간입니다.", "사용 직후 미지근한 물로 표면을 닦고, 후드 필터는 충분히 불린 뒤 세척하면 오래된 기름때를 줄일 수 있습니다.", "세제는 표면 재질에 맞게 사용하고 마지막에는 깨끗한 물걸레로 잔여 성분을 제거해 주세요."],
        ["가습기는 물이 닿는 부품을 자주 세척하지 않으면 물때와 미생물이 생기기 쉽습니다.", "남은 물은 매일 버리고 물통과 진동자는 부드러운 솔로 닦은 뒤 완전히 건조해 주세요.", "제품 설명서에서 허용한 세척제만 사용하고, 필터형 제품은 권장 교체 주기를 지키는 것이 중요합니다."],
        ["집먼지진드기는 침구와 카펫처럼 따뜻하고 습한 섬유에 머무르기 쉽습니다.", "침구는 정기적으로 세탁하고 완전히 건조하며, 카펫은 천천히 여러 방향으로 흡입 청소해 주세요.", "실내 습도를 낮추고 먼지가 쌓이는 물건을 줄이면 알레르기 유발 물질 관리에 도움이 됩니다."],
        ["먼지는 높은 곳에서 낮은 곳으로 떨어지므로 조명과 선반부터 닦고 마지막에 바닥을 청소하는 순서가 효율적입니다.", "마른 먼지털이보다 살짝 젖은 극세사 천을 사용하면 먼지가 다시 날리는 것을 줄일 수 있습니다.", "출입구 매트와 환기 필터를 함께 관리하면 실내로 들어오는 먼지의 양도 줄어듭니다."],
        ["미세먼지가 심한 날에도 실내 이산화탄소와 생활 오염물질을 빼기 위한 짧은 환기는 필요합니다.", "대기질이 비교적 나은 시간에 창문을 넓게 열어 짧게 환기하고, 환기 후에는 창틀과 바닥을 물걸레로 닦아주세요.", "조리할 때는 외부 농도와 관계없이 후드를 작동하고 조리 후에도 잠시 더 켜두는 것이 좋습니다."],
        ["전자레인지 냄새는 음식물이 튄 채로 다시 가열되면서 심해집니다.", "물 한 컵에 레몬 조각을 넣어 짧게 가열한 뒤 문을 닫아 수증기를 충분히 퍼뜨려 주세요.", "내부가 식으면 부드러운 천으로 닦고 문을 열어 완전히 건조하면 냄새와 잔여 오염을 함께 줄일 수 있습니다."],
        ["새 가구와 마감재에서 나오는 물질은 충분한 환기와 시간에 따라 점차 줄어듭니다.", "입주 전후로 맞통풍을 반복하고 수납장 문과 서랍도 열어 내부 공기를 함께 바꿔주세요.", "표면 먼지를 닦고 필터를 관리하되 향이 강한 제품으로 냄새를 덮는 방식은 피하는 것이 좋습니다."],
        ["카펫에 음료를 쏟았다면 문지르지 말고 마른 천으로 눌러 액체를 먼저 흡수해 주세요.", "오염 가장자리에서 안쪽으로 처리해야 얼룩이 넓어지는 것을 막을 수 있습니다.", "색 빠짐이 걱정되는 카펫은 눈에 띄지 않는 곳에 세제를 시험하고, 넓은 오염은 전문 장비로 세척하는 것이 안전합니다."],
        ["공장 바닥의 기름때는 누유 지점과 작업 동선을 해결하지 않으면 세척 뒤에도 다시 생깁니다.", "오염 종류와 바닥 재질을 확인한 뒤 맞는 약품과 장비를 사용하고, 세척수와 잔여 세제를 완전히 회수해야 합니다.", "작업 후에는 누유 점검과 흡착 매트 교체 주기를 정해 재오염을 줄여주세요."],
        ["저수조 청소 전에는 단수 시간과 급수 재개 시점을 이용자에게 먼저 안내해야 합니다.", "배수 상태, 내부 균열과 부식, 사다리와 환기 상태를 확인한 뒤 안전장비를 갖추고 작업을 시작합니다.", "세척과 소독 후에는 잔여물을 제거하고 수질과 설비 상태를 확인한 뒤 급수를 재개합니다."],
        ["외벽 세척 시기는 오염 정도뿐 아니라 건물 재질, 주변 통행량, 날씨와 고소 작업 조건을 함께 살펴야 합니다.", "유리, 석재, 금속 패널은 같은 약품과 압력으로 작업할 수 없으므로 작은 구간에서 먼저 시험합니다.", "균열이나 도장 손상이 보이면 세척 전에 보수 여부를 확인해야 추가 손상을 예방할 수 있습니다."]
    ];

    function copyFor(post) {
        if (post.type === "information") {
            return informationCopy[post.id] || informationCopy[0];
        }

        if (post.type === "notice") {
            if (post.id === 0) {
                return [
                    "2025년 국제청소위생방역산업전에서 열린 전국 건물위생관리 기능경진대회에서 (주)그린죤이 대상을 수상했습니다.",
                    "현장 안전수칙과 작업 순서를 준수하면서 오염 상태에 맞는 장비와 약품을 선택한 점을 높게 평가받았습니다.",
                    "앞으로도 체계적인 매뉴얼과 숙련된 인력을 바탕으로 믿고 맡길 수 있는 청소 서비스를 제공하겠습니다."
                ];
            }
            return [
                post.title,
                "해당 업무의 작업 범위와 현장 조건을 검토해 안전관리 계획과 인력 운영안을 준비했습니다.",
                "진행 상황과 추가 안내 사항은 확정되는 대로 공지하겠습니다. 문의는 대표번호 1899-1367로 연락해 주세요."
            ];
        }

        if (post.type === "event") {
            return [
                post.id === 0 ? "신년 감사 이벤트로 입주청소를 신청하는 고객분께 피톤치드 서비스를 제공해 드립니다." : post.title + "를 진행합니다.",
                "현장 상태와 작업 범위에 따라 제공 내용이 달라질 수 있으므로 신청 전에 상담을 부탁드립니다.",
                "많은 관심과 성원에 감사드리며 더 좋은 서비스로 보답하는 그린죤이 되겠습니다."
            ];
        }

        if (post.type === "review") {
            return [
                post.title + " 작업을 맡겼는데 상담부터 현장 확인까지 친절하게 안내해 주셨습니다.",
                "작업 전 오염 상태와 진행 과정을 설명해 주셔서 안심할 수 있었고, 마무리 후 달라진 상태도 함께 확인했습니다.",
                "다음 관리 시기와 평소 관리 방법까지 알려주셔서 만족했습니다."
            ];
        }

        if (post.type === "galleryEvent") {
            return [
                post.title + " 현장의 모습을 사진으로 전해드립니다.",
                "그린죤 임직원이 함께 참여해 현장 경험과 정보를 나누고 안전하고 체계적인 작업 방법을 다시 확인했습니다.",
                "앞으로도 교육과 교류를 이어가며 더 나은 서비스를 제공하겠습니다."
            ];
        }

        if (post.type === "video") {
            return [
                post.title + "의 준비 과정부터 마무리까지 영상으로 기록했습니다.",
                "오염 상태를 먼저 확인한 뒤 작업 구역을 나누고 현장에 맞는 장비와 약품으로 청소를 진행했습니다.",
                "영상에서 실제 작업 순서와 청소 전후의 변화를 확인하실 수 있습니다."
            ];
        }

        return [
            post.title + " 현장에 방문해 오염 상태와 작업 범위를 먼저 확인했습니다.",
            "주변 시설을 보호한 뒤 현장 재질에 맞는 장비와 약품을 사용해 오염물을 단계적으로 제거했습니다.",
            "작업 후 남은 오염과 안전 상태를 다시 점검하고, 관리가 필요한 부분을 안내해 드렸습니다."
        ];
    }

    function postUrl(type, id) {
        const folder = ["work", "video", "galleryEvent"].includes(type) ? "Gallery" : "Community";
        return new URL("sub_page/" + folder + "/Post.html?type=" + type + "&id=" + id, rootUrl).href;
    }

    function linkCards(selector, type) {
        document.querySelectorAll(selector).forEach(function (card, index) {
            if (posts[type] && posts[type][index]) {
                card.href = postUrl(type, index);
            }
        });
    }

    function bindListLinks() {
        linkCards(".gallery_page:not([data-post-page]) .gallery_card", document.title.includes("동영상") ? "video" : document.title.includes("행사") ? "galleryEvent" : "work");
        linkCards('[data-community-page="event"] .event_card', "event");
        linkCards(".information_card", "information");
        linkCards(".notice_feature", "notice");
        linkCards(".notice_list .board_row", "notice");
        linkCards(".review_board .board_row", "review");

        document.querySelectorAll(".mobile_gallery_box").forEach(function (card, index) {
            card.href = postUrl("work", index % posts.work.length);
        });

        document.querySelectorAll(".video_card").forEach(function (card, index) {
            card.href = postUrl("video", index % posts.video.length);
        });

        document.querySelectorAll("a.box_in_wrap, .mobile_event_box").forEach(function (card) {
            const text = card.textContent.replace(/\s+/g, " ").trim();
            if (text.includes("2025년 전국 건물위생관리")) card.href = postUrl("notice", 0);
            else if (text.includes("2023년 전국 건물위생관리")) card.href = postUrl("notice", 10);
            else if (text.includes("빌딩 방역")) card.href = postUrl("work", 0);
            else if (text.includes("견적금액")) card.href = new URL("sub_page/Community/FAQ.html", rootUrl).href;
            else if (text.includes("겨울철") || text.includes("실내공기")) card.href = postUrl("information", 0);
            else if (text.includes("돌아온 피톤치드")) card.href = postUrl("event", 0);
            else if (text.includes("피톤치드")) card.href = postUrl("event", 1);
        });
    }

    function mediaMarkup(post) {
        const images = post.images.length ? post.images : [""];

        if (post.type === "video") {
            const image = images[0];
            return '<div class="post_media post_video">' +
                (image ? '<img src="' + asset(image) + '" alt="' + post.title + '">' : '<span class="empty_image">영상 이미지 연결</span>') +
                '<span class="gallery_play" aria-hidden="true">▶</span></div>';
        }

        return images.map(function (image, index) {
            return '<figure class="post_media">' +
                (image ? '<img src="' + asset(image) + '" alt="' + post.title + ' ' + (index + 1) + '">' : '<span class="empty_image">이미지 연결</span>') +
                '<figcaption>' + post.title + (index ? " 작업 과정" : " 현장") + '</figcaption></figure>';
        }).join("");
    }

    function relatedMarkup(post, list) {
        const cards = list.map(function (item) {
            return '<a class="post_card" href="' + postUrl(item.type, item.id) + '">' +
                (item.image ? '<img src="' + asset(item.image) + '" alt="' + item.title + '">' : '<span class="empty_image">이미지 연결</span>') +
                '<strong>' + item.title + '</strong><time>' + item.date + '</time></a>';
        }).join("");

        return '<div class="post_related"><h2>' + (post.type === "event" ? "다른 이벤트" : post.type === "notice" ? "전체 공지사항" : "다른 게시글") + '</h2>' +
            '<div class="post_slider" data-post-slider><button class="post_arrow arrow left_arrow_2 prev" type="button" aria-label="이전 게시글"></button>' +
            '<div class="post_view"><div class="post_track">' + cards + '</div></div>' +
            '<button class="post_arrow arrow right_arrow_2 next" type="button" aria-label="다음 게시글"></button></div><div class="post_dots" aria-label="게시글 슬라이드 위치"></div></div>';
    }

    function renderPost() {
        const target = document.querySelector("[data-post]");
        if (!target) return;

        const params = new URLSearchParams(window.location.search);
        const type = posts[params.get("type")] ? params.get("type") : document.body.dataset.postPage === "gallery" ? "work" : "notice";
        const list = posts[type];
        const id = Math.min(Math.max(parseInt(params.get("id"), 10) || 0, 0), list.length - 1);
        const post = list[id];
        const copy = copyFor(post);
        document.body.dataset.postType = type;
        document.body.dataset.postId = post.id;

        document.title = "그린죤 - " + post.title;
        const path = document.querySelector("[data-post-path]");
        if (path) path.textContent = post.label;

        document.querySelectorAll(".sub_category a").forEach(function (link) {
            if (link.textContent.trim() === post.label) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });

        const copyMarkup = '<div class="post_copy">' + copy.map(function (paragraph) {
            return "<p>" + paragraph + "</p>";
        }).join("") + "</div>";

        const reviewReply = post.type === "review" ? '<div class="post_reply"><h2>관리자 답글</h2><p>고객님, 소중한 후기 감사합니다. 앞으로도 현장 상태에 맞는 작업과 꼼꼼한 마무리로 만족하실 수 있도록 최선을 다하겠습니다.</p></div>' : "";
        const related = list.filter(function (item) { return item.id !== post.id; }).slice(0, 6);

        const split = ["notice", "event", "information"].includes(type) ? " split" : "";

        target.innerHTML = '<header class="post_head"><h1>' + post.title + '</h1><div class="post_meta"><span>' + post.label + '</span><time>' + post.date + '</time><span>작성자 관리자</span></div></header>' +
            '<div class="post_body' + split + '">' + mediaMarkup(post) + copyMarkup + '</div>' + reviewReply + relatedMarkup(post, related);

        initPostSlider();
    }

    function initPostSlider() {
        document.querySelectorAll("[data-post-slider]").forEach(function (slider) {
            const view = slider.querySelector(".post_view");
            const track = slider.querySelector(".post_track");
            const cards = Array.from(track.children);
            const dots = slider.parentElement.querySelector(".post_dots");
            let index = 0;
            let pageCount = 1;
            let startX = 0;
            let startY = 0;
            let startScroll = 0;
            let dragX = 0;
            let dragging = false;
            let dragged = false;
            let dragDirection = null;

            function visibleCount() {
                if (window.innerWidth <= 768) return 1;
                return 2;
            }

            function drawDots() {
                dots.innerHTML = "";
                for (let i = 0; i < pageCount; i += 1) {
                    const dot = document.createElement("button");
                    dot.type = "button";
                    dot.className = "slide_dot";
                    dot.setAttribute("aria-label", (i + 1) + "번째 게시글 보기");
                    dot.addEventListener("click", function () { show(i); });
                    dots.appendChild(dot);
                }
            }

            function show(next, useAnimation) {
                index = (next + pageCount) % pageCount;
                const firstCard = cards[index * visibleCount()];
                const offset = firstCard ? firstCard.offsetLeft - cards[0].offsetLeft : 0;
                view.style.scrollBehavior = useAnimation === false ? "auto" : "smooth";
                view.scrollLeft = offset;
                dots.querySelectorAll(".slide_dot").forEach(function (dot, dotIndex) {
                    dot.classList.toggle("active", dotIndex === index);
                });
            }

            function resize() {
                pageCount = Math.max(1, Math.ceil(cards.length / visibleCount()));
                if (index >= pageCount) index = pageCount - 1;
                drawDots();
                show(index, false);
            }

            slider.querySelector(".prev").addEventListener("click", function () { show(index - 1); });
            slider.querySelector(".next").addEventListener("click", function () { show(index + 1); });

            function dragStart(event) {
                const point = event.touches ? event.touches[0] : event;
                dragging = true;
                dragged = false;
                dragDirection = null;
                startX = point.clientX;
                startY = point.clientY;
                startScroll = view.scrollLeft;
                dragX = 0;
                view.style.scrollBehavior = "auto";
            }

            function dragMove(event) {
                if (!dragging) return;

                const point = event.touches ? event.touches[0] : event;
                dragX = point.clientX - startX;
                const dragY = point.clientY - startY;

                if (!dragDirection && (Math.abs(dragX) > 5 || Math.abs(dragY) > 5)) {
                    dragDirection = Math.abs(dragX) > Math.abs(dragY) ? "horizontal" : "vertical";
                }

                if (dragDirection !== "horizontal") return;

                if (Math.abs(dragX) > 8) {
                    dragged = true;
                    view.scrollLeft = startScroll - dragX;
                }

                if (event.cancelable) event.preventDefault();
            }

            function dragEnd() {
                if (!dragging) return;
                dragging = false;
                if (dragDirection === "horizontal" && Math.abs(dragX) >= 45) show(index + (dragX < 0 ? 1 : -1));
                else show(index);

                dragDirection = null;
                dragX = 0;
            }

            view.style.touchAction = "pan-y";
            view.addEventListener("mousedown", dragStart);
            window.addEventListener("mousemove", dragMove);
            window.addEventListener("mouseup", dragEnd);
            view.addEventListener("touchstart", dragStart, { passive: true });
            view.addEventListener("touchmove", dragMove, { passive: false });
            view.addEventListener("touchend", dragEnd, { passive: true });
            view.addEventListener("touchcancel", dragEnd, { passive: true });
            view.addEventListener("click", function (event) {
                if (dragged) {
                    event.preventDefault();
                    dragged = false;
                }
            }, true);

            view.addEventListener("dragstart", function (event) {
                event.preventDefault();
            });

            window.addEventListener("resize", resize);
            resize();
        });
    }

    bindListLinks();
    renderPost();
})();
