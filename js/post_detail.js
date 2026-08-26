(function () {
    "use strict";

    const scriptUrl = document.currentScript && document.currentScript.src;
    const rootUrl = new URL("../", scriptUrl || window.location.href);

    const workTitles = [
        "실내 소독·방역 작업",
        "카펫 오염 제거 작업",
        "도장 바닥 오염 세척 작업",
        "카펫 바닥 세척 작업",
        "비둘기 유입 방지 시설 설치 작업",
        "실내 바닥 기름때 세척 작업",
        "외벽 표면 오염 고압 세척 작업",
        "산업시설 바닥 세척 작업",
        "외벽 묵은 때 제거 작업",
        "연못 내부 오염 제거 작업",
        "도장 바닥 세척 후 정리 작업",
        "체육시설 바닥 세척 작업",
        "생산 설비 주변 분진 제거 작업",
        "저수조 내부 세척 및 위생관리 작업",
        "카펫 얼룩 제거와 바닥 정리 작업",
        "외벽 빗물 자국 제거 작업"
    ];

    const galleryEventTitles = [
        "2025년 전국 건물위생관리 기능경진대회 대상 수상",
        "2023년 전국 건물위생관리 기능경진대회 최우수상 수상",
        "그린죤 2022 회식3",
        "그린죤 2022년 회식2",
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
        "img/sub_page/Disinfection_3.jpg",
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

    const workCopy = [
        ["보호복과 보호 장비를 착용한 뒤 실내 소독이 필요한 구역을 확인했습니다.", "분무 장비를 사용해 공용 공간과 주요 접촉면을 중심으로 소독·방역 작업을 진행했습니다.", "작업 후 환기와 잔여 약제 상태를 확인하고 안전하게 마무리했습니다."],
        ["카펫 섬유 사이에 쌓인 먼지와 얼룩을 확인하고 세척 작업을 진행했습니다.", "오염 부위를 먼저 처리한 뒤 전용 장비로 세정과 오염수 회수를 반복했습니다.", "섬유 결을 정리하고 충분히 건조될 수 있도록 마무리 상태를 점검했습니다."],
        ["도장 바닥의 오염과 작업 흔적을 확인한 뒤 세척 범위를 나누었습니다.", "바닥 재질에 맞는 장비와 세정제를 사용해 표면 오염을 단계적으로 제거했습니다.", "세척수를 회수하고 미끄럼이나 잔여 오염이 없는지 확인했습니다."],
        ["카펫 바닥에 남은 먼지와 눌린 오염을 확인하고 집중 세척했습니다.", "전용 세척 장비로 오염을 풀어낸 뒤 남은 수분과 세정 성분을 회수했습니다.", "작업 후 카펫 결을 정돈하고 얼룩이 남은 부분을 다시 확인했습니다."],
        ["비둘기 유입 흔적과 이동 경로를 확인해 방지 시설을 설치했습니다.", "구조물에 맞춰 설치 위치를 정하고 주변 설비에 영향을 주지 않도록 고정했습니다.", "설치 후 틈과 고정 상태를 점검해 유입 가능성을 줄였습니다."],
        ["실내 바닥에 쌓인 기름때와 찌든 오염을 확인하고 세척 작업을 진행했습니다.", "오염을 충분히 불린 뒤 바닥 세척 장비로 반복 작업하고 오염수를 회수했습니다.", "작업 후 바닥의 미끄럼과 잔여 세제 여부를 점검했습니다."],
        ["외벽에 남은 얼룩과 먼지를 확인한 뒤 구간별로 고압 세척했습니다.", "표면 손상을 줄이기 위해 오염 정도에 맞춰 분사 거리와 압력을 조절했습니다.", "세척 후 벽면 상태와 주변 배수 상태를 함께 확인했습니다."],
        ["산업시설 바닥에 쌓인 먼지와 오염을 제거하기 위해 세척 작업을 진행했습니다.", "설비 주변과 작업 동선을 구분하고 바닥 재질에 맞는 장비를 사용했습니다.", "오염수와 잔여물을 회수한 뒤 바닥 상태를 최종 점검했습니다."],
        ["외벽 표면에 오래 쌓인 묵은 때를 확인하고 고압 세척을 진행했습니다.", "벽돌과 줄눈 상태를 살피며 손상이 생기지 않도록 작업 압력을 조절했습니다.", "세척 전후의 색상과 오염 잔여 여부를 비교해 마무리했습니다."],
        ["연못 내부에 쌓인 이물질과 바닥 오염을 제거하는 작업을 진행했습니다.", "배수 후 바닥과 벽면의 오염을 걷어내고 세척이 필요한 구간을 정리했습니다.", "작업 후 남은 이물질과 배수 상태를 확인했습니다."],
        ["도장 바닥 세척을 마친 뒤 남은 오염과 물기를 정리했습니다.", "설비 주변과 바닥 경계 부분까지 확인하며 잔여물을 제거했습니다.", "바닥 표면의 손상과 미끄럼 위험이 없는지 최종 점검했습니다."],
        ["넓은 체육시설 바닥의 먼지와 사용 흔적을 제거하는 세척 작업을 진행했습니다.", "바닥 선과 표면 코팅을 보호하도록 장비의 속도와 세정 강도를 조절했습니다.", "작업 후 물기와 잔여 오염을 확인하고 바닥을 정돈했습니다."],
        ["생산 설비와 주변 바닥에 쌓인 분진과 이물질을 제거했습니다.", "설비 가동 부위를 보호하고 좁은 틈과 하부 공간을 구분해 세척했습니다.", "작업 후 설비 주변의 잔여 수분과 오염 상태를 점검했습니다."],
        ["저수조 내부의 침전물과 벽면 오염을 제거하는 세척 작업을 진행했습니다.", "내부 안전 상태를 확인한 뒤 바닥과 벽면을 순서대로 세척하고 잔여물을 회수했습니다.", "세척 후 내부 청결 상태와 배수 상태를 최종 확인했습니다."],
        ["카펫에 남은 얼룩과 미세먼지를 확인하고 오염 부위를 집중 세척했습니다.", "섬유 손상을 줄이도록 전용 약품과 장비를 사용해 오염을 제거했습니다.", "세척 후 바닥을 정리하고 건조 상태와 얼룩 잔여 여부를 점검했습니다."],
        ["외벽에 남은 빗물 자국과 표면 오염을 확인하고 세척했습니다.", "오염이 심한 부분을 먼저 처리한 뒤 벽면 전체의 색상이 고르게 보이도록 작업했습니다.", "세척 후 줄눈과 벽면 상태를 확인해 작업을 마무리했습니다."]
    ];

    const galleryEventImages = [
        "img/sub_page/awards/award_2025_cover.jpg",
        "img/sub_page/awards/award_2023_cover.jpg",
        "img/sub_page/gallery/event/gallery_event_03.png",
        "img/sub_page/gallery/event/gallery_event_04.png",
        "img/sub_page/gallery/event/gallery_event_05.png",
        "",
        "img/sub_page/news_event.jpg",
        "", "", "", "",
        "img/sub_page/gallery/event/gallery_event_08.png",
        "", "", "", "", ""
    ];

    /* 공지·입찰 게시글에는 현장과 무관한 이미지를 연결하지 않는다. */
    const noticeImages = [];

    const communityEventImages = [
        "img/mainimgs/Event_2.jpg",
        "img/mainimgs/Event_1.jpg",
        "img/mainimgs/Event_3.jpg",
        "img/sub_page/community/event/event_office_cleaning.jpg",
        "img/sub_page/community/event/event_factory_cleaning.jpg",
        "img/sub_page/community/event/event_fabric_cleaning.jpg"
    ];

    const informationImages = [
        "img/mainimgs/Community_Information.jpg",
        "img/sub_page/community/info/info_02.webp",
        "img/sub_page/community/info/info_03.webp",
        "img/sub_page/community/info/info_04.webp",
        "img/sub_page/community/info/info_05.webp",
        "img/sub_page/community/info/info_06.webp",
        "img/sub_page/community/info/info_07.webp",
        "img/sub_page/community/info/info_08.webp"
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
        "img/mainimgs/cleaning_event_ing.webp"
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

    const videoPosts = [
        { id: 0, title: "미화원 정기교육 영상", date: "2026.04.01", image: "img/sub_page/dispatch_gallery.jpg", videoUrl: "https://www.youtube.com/shorts/sx0b62bCz_g" },
        { id: 1, title: "카펫 청소 작업", date: "2026.01.02", image: "img/sub_page/Carpet_cleaning_vdo_img.jpg", videoUrl: "https://www.youtube.com/shorts/vkOGynDESmk" },
        { id: 2, title: "비둘기 퇴치 작업 다녀왔습니다~!", date: "2026.04.01", image: "img/mainimgs/bird_spike_ing.jpg", videoUrl: "https://www.youtube.com/watch?v=0UKCmXB9Fn4" },
        { id: 14, title: "기계·설비 청소 작업 영상", date: "2026.08.26", image: "img/sub_page/factory_equipment_ing_2_2.jpg", videoUrl: "https://www.youtube.com/shorts/Ms05de4-1wU" },
        { id: 15, title: "학교 연못 청소 작업 영상", date: "2026.03.20", image: "img/sub_page/Pond_ing_3.jpg", videoUrl: "https://www.youtube.com/watch?v=zRq8Ji7RddY" },
        { id: 16, title: "사무실 바닥 청소 및 왁스", date: "2026.08.25", image: "https://i.ytimg.com/vi/QeB5DOs5E8Y/hqdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=QeB5DOs5E8Y" },
        { id: 17, title: "공장 청소 작업 영상", date: "2026.08.25", image: "img/slide/factory_cleane_slide_2.jpg", videoUrl: "https://www.youtube.com/watch?v=i27HAUUJFOU" },
        { id: 18, title: "공장 바닥 청소 작업 영상", date: "2026.08.25", image: "img/sub_page/factory_floor_3_1_ing.jpg", videoUrl: "https://www.youtube.com/shorts/xHZDlb5w_10" },
        { id: 19, title: "소독·방역 작업 영상", date: "2026.08.26", image: "img/mainimgs/Disinfection_ing.jpg", videoUrl: "https://www.youtube.com/shorts/AY12rwHZauM" },
        { id: 20, title: "매트·패브릭 청소 작업 영상", date: "2026.08.26", image: "img/sub_page/Fabric_cleaning_ing_3.jpg", videoUrl: "https://www.youtube.com/shorts/aVER6UoKCNs" },
        { id: 21, title: "대형 저수조 청소 작업 영상", date: "2026.08.26", image: "img/sub_page/water_tank_ing_3.jpg", videoUrl: "https://www.youtube.com/shorts/1cbOF6uwlV0" },
        { id: 22, title: "건물 외벽 청소 작업 영상", date: "2026.08.26", image: "img/sub_page/building_wall_ing_3.jpg", videoUrl: "https://www.youtube.com/shorts/HWKBh3nwBAk" },
        { id: 23, title: "공장 외벽 청소 작업 영상", date: "2026.08.26", image: "img/sub_page/factory_wall_ing.jpg", videoUrl: "https://www.youtube.com/shorts/Qa2dcR8k9So" }
    ].map(function (post) {
        return Object.assign({ type: "video", label: "작업 동영상", images: [post.image] }, post);
    });

    const posts = {
        work: makePosts("work", workTitles, workImages, "작업 갤러리"),
        video: videoPosts,
        galleryEvent: makePosts("galleryEvent", galleryEventTitles, galleryEventImages, "행사 사진"),
        notice: makePosts("notice", noticeTitles, noticeImages, "공지사항"),
        event: makePosts("event", communityEventTitles, communityEventImages, "이벤트"),
        information: makePosts("information", informationTitles, informationImages, "정보공유"),
        review: makePosts("review", reviewTitles, reviewImages, "이용후기")
    };

    posts.notice[0].date = "2025.06.23";
    posts.notice[10].date = "2023.06.13";
    posts.galleryEvent[0].date = "2025.06.23";
    posts.galleryEvent[1].date = "2023.06.13";
    posts.notice.forEach(function (post) {
        post.image = "";
        post.images = [];
    });

    posts.galleryEvent[1].images = [
        "img/sub_page/awards/award_2023_cover.jpg",
        "img/sub_page/awards/award_2023_venue.jpg",
        "img/sub_page/awards/award_2023_competition.jpg",
        "img/sub_page/awards/award_2023_presentation.jpg",
        "img/sub_page/awards/award_2023_winners.jpg",
        "img/sub_page/awards/award_2023_certificates.jpg"
    ];

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
        if (post.type === "work") {
            return workCopy[post.id] || workCopy[0];
        }

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
            if (post.id === 10) {
                return [
                    "2023년 전국 건물위생관리 기능경진대회 바닥세정 부문에서 그린죤 임직원 2명이 최우수상을 수상했습니다.",
                    "대회 현장에서 안전수칙과 작업 순서를 지키며 전문 장비를 운용하고, 실제 작업 역량을 평가받았습니다.",
                    "그린죤은 수상 경험을 현장 서비스와 작업자 교육에 이어가며 안전하고 체계적인 청소를 제공하겠습니다."
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

    function findPost(type, id) {
        return posts[type] && posts[type].find(function (post) {
            return post.id === id;
        });
    }

    function linkCards(selector, type) {
        document.querySelectorAll(selector).forEach(function (card, index) {
            if (card.dataset.customReview === "true") return;
            if (card.dataset.customLink === "true") return;
            const fixedId = Number(card.dataset.postId);
            const postId = Number.isInteger(fixedId) && card.dataset.postId !== undefined ? fixedId : index;

            if (findPost(type, postId)) {
                card.href = postUrl(type, postId);
            }
        });
    }

    function bindListLinks() {
        document.querySelectorAll(".gallery_play_icon").forEach(function (icon) {
            icon.classList.remove("play");
            icon.classList.add("play_Block");
        });

        linkCards(".gallery_page:not([data-post-page]) .gallery_card", document.title.includes("동영상") ? "video" : document.title.includes("행사") ? "galleryEvent" : "work");
        linkCards('[data-community-page="event"] .event_card', "event");
        linkCards(".information_card", "information");
        linkCards(".notice_feature", "notice");
        linkCards(".notice_list .board_row", "notice");
        linkCards(".review_board .board_row", "review");

        document.querySelectorAll(".notice_list .board_row").forEach(function (row) {
            const title = row.querySelector(".board_title");
            const text = title ? title.textContent.trim() : "";
            if (text.includes("2025년 전국 건물위생관리")) row.href = new URL("sub_page/Introduction/Awards.html", rootUrl).href;
            if (text.includes("2023년 전국 건물위생관리")) row.href = postUrl("notice", 10);
        });

        document.querySelectorAll(".mobile_gallery_box").forEach(function (card, index) {
            card.href = postUrl("work", index % posts.work.length);
        });

        document.querySelectorAll(".video_card").forEach(function (card, index) {
            const fixedId = Number(card.dataset.postId);
            const postId = Number.isInteger(fixedId) && findPost("video", fixedId)
                ? fixedId
                : posts.video[index % posts.video.length].id;

            card.href = postUrl("video", postId);
            card.removeAttribute("target");
            card.removeAttribute("rel");
        });

        document.querySelectorAll("a.box_in_wrap, .mobile_event_box").forEach(function (card) {
            const text = card.textContent.replace(/\s+/g, " ").trim();
            if (text.includes("2025년 전국 건물위생관리")) card.href = new URL("sub_page/Introduction/Awards.html", rootUrl).href;
            else if (text.includes("2023년 전국 건물위생관리")) card.href = postUrl("notice", 10);
            else if (text.includes("빌딩 방역")) card.href = postUrl("work", 0);
            else if (text.includes("견적금액")) card.href = new URL("sub_page/Community/FAQ.html", rootUrl).href;
            else if (text.includes("겨울철") || text.includes("실내공기")) card.href = postUrl("information", 0);
            else if (text.includes("돌아온 피톤치드")) card.href = postUrl("event", 0);
            else if (text.includes("피톤치드")) card.href = postUrl("event", 1);
        });
    }

    function initListPagination() {
        document.querySelectorAll(".content_paging").forEach(function (paging) {
            const scope = paging.parentElement;
            const list = scope.querySelector(".gallery_cards, .event_cards, .information_cards, .board");
            if (!list) return;

            let items;
            let perPage;

            if (list.classList.contains("board")) {
                items = Array.from(list.querySelectorAll(":scope > .board_row"));
                perPage = list.closest(".notice_list") ? 6 : 5;
            } else {
                items = Array.from(list.children);
                perPage = 8;
            }

            if (!items.length) return;

            let filteredItems = items.slice();
            let pageCount = Math.max(1, Math.ceil(filteredItems.length / perPage));
            let currentPage = 0;

            const previous = document.createElement("button");
            previous.type = "button";
            previous.className = "page_arrow arrow left_arrow_2";
            previous.setAttribute("aria-label", "이전 페이지");

            const next = document.createElement("button");
            next.type = "button";
            next.className = "page_arrow arrow right_arrow_2";
            next.setAttribute("aria-label", "다음 페이지");

            const numbers = document.createElement("span");
            numbers.className = "page_numbers";

            paging.replaceChildren(previous, numbers, next);

            function renderNumbers() {
                numbers.replaceChildren();

                for (let page = 0; page < pageCount; page += 1) {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.textContent = page + 1;
                    button.addEventListener("click", function () {
                        showPage(page);
                    });
                    numbers.appendChild(button);
                }
            }

            function showPage(page) {
                currentPage = Math.min(Math.max(page, 0), pageCount - 1);
                const start = currentPage * perPage;
                const end = start + perPage;

                items.forEach(function (item) {
                    item.hidden = true;
                });

                filteredItems.forEach(function (item, index) {
                    item.hidden = index < start || index >= end;
                });

                numbers.querySelectorAll("button").forEach(function (button, index) {
                    const active = index === currentPage;
                    button.toggleAttribute("aria-current", active);
                    button.setAttribute("aria-label", (index + 1) + "페이지" + (active ? ", 현재 페이지" : ""));
                });

                previous.disabled = currentPage === 0;
                next.disabled = currentPage === pageCount - 1;
                paging.hidden = filteredItems.length === 0;
            }

            previous.addEventListener("click", function () {
                showPage(currentPage - 1);
            });

            next.addEventListener("click", function () {
                showPage(currentPage + 1);
            });

            list.addEventListener("list-filter-change", function (event) {
                const visible = event.detail && event.detail.items;
                filteredItems = Array.isArray(visible) ? visible : items.slice();
                pageCount = Math.max(1, Math.ceil(filteredItems.length / perPage));
                renderNumbers();
                showPage(0);
            });

            renderNumbers();
            showPage(0);
        });
    }

    function initListSearch() {
        document.querySelectorAll(".content_search").forEach(function (form) {
            const scope = form.closest(".gallery_list, .community_body, .notice_list, .review_board") || form.parentElement;
            const list = scope && scope.querySelector(".gallery_cards, .event_cards, .information_cards, .board, .faq_list");
            const input = form.querySelector('input[type="search"]');
            const filterButton = form.querySelector("button");
            if (!list || !input) return;

            const itemSelector = list.classList.contains("board") ? ":scope > .board_row" : list.classList.contains("faq_list") ? ":scope > details" : ":scope > a";
            const items = Array.from(list.querySelectorAll(itemSelector));

            function apply() {
                const keyword = input.value.trim().toLocaleLowerCase("ko");
                const category = list.dataset.activeCategory || "전체";
                const matched = items.filter(function (item) {
                    const matchesKeyword = !keyword || item.textContent.toLocaleLowerCase("ko").includes(keyword);
                    const matchesCategory = category === "전체" || item.dataset.category === category;
                    return matchesKeyword && matchesCategory;
                });

                if (list.classList.contains("faq_list")) {
                    items.forEach(function (item) { item.hidden = !matched.includes(item); });
                } else {
                    list.dispatchEvent(new CustomEvent("list-filter-change", { detail: { items: matched } }));
                }
            }

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                apply();
            });
            input.addEventListener("input", apply);
            if (filterButton) {
                filterButton.addEventListener("click", function () {
                    if (input.value) {
                        input.value = "";
                        apply();
                    }
                    input.focus();
                });
            }

            const requestedKeyword = new URLSearchParams(window.location.search).get("search");
            if (requestedKeyword && list.classList.contains("information_cards")) {
                input.value = requestedKeyword;
                apply();
            }
        });
    }

    function initInformationFilter() {
        const nav = document.querySelector(".information_filter");
        const list = document.querySelector(".information_cards");
        if (!nav || !list) return;

        const cards = Array.from(list.querySelectorAll(".information_card"));
        const searchInput = document.querySelector('.content_search input[type="search"]');

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const category = link.textContent.trim();
                nav.querySelectorAll("a").forEach(function (item) { item.removeAttribute("aria-current"); });
                link.setAttribute("aria-current", "page");
                list.dataset.activeCategory = category;
                const keyword = searchInput ? searchInput.value.trim().toLocaleLowerCase("ko") : "";
                const matched = cards.filter(function (card) {
                    const matchesKeyword = !keyword || card.textContent.toLocaleLowerCase("ko").includes(keyword);
                    return matchesKeyword && (category === "전체" || card.dataset.category === category);
                });
                list.dispatchEvent(new CustomEvent("list-filter-change", { detail: { items: matched } }));
            });
        });
    }

    function initEventFilter() {
        const nav = document.querySelector(".community_filter");
        const list = document.querySelector(".event_cards");
        if (!nav || !list) return;

        const cards = Array.from(list.querySelectorAll(".event_card"));
        cards.forEach(function (card) {
            const status = card.dataset.eventStatus;
            const badge = card.querySelector(".event_status");
            if (badge && (status === "진행중" || status === "종료")) {
                badge.textContent = status;
                badge.dataset.status = status;
            }
        });

        nav.querySelectorAll("button").forEach(function (button) {
            button.addEventListener("click", function () {
                const status = button.textContent.trim();
                nav.querySelectorAll("button").forEach(function (item) {
                    item.removeAttribute("aria-current");
                });
                button.setAttribute("aria-current", "page");

                const matched = cards.filter(function (card) {
                    return status === "전체" || card.dataset.eventStatus === status;
                });
                list.dispatchEvent(new CustomEvent("list-filter-change", { detail: { items: matched } }));
                list.toggleAttribute("data-empty", matched.length === 0);
            });
        });
    }

    function initFaqState() {
        document.querySelectorAll(".faq_list details").forEach(function (details) {
            const toggleText = details.querySelector(".faq_toggle_text");
            function sync() {
                if (toggleText) toggleText.textContent = details.open ? "답변 닫기" : "답변 확인하기";
            }
            details.addEventListener("toggle", sync);
            sync();
        });
    }

    function initScheduleCalendar() {
        const calendar = document.querySelector(".calendar");
        const head = document.querySelector(".calendar_head");
        if (!calendar || !head) return;

        const yearText = head.querySelector(".calendar_year");
        const monthText = head.querySelector(".calendar_month");
        const caption = head.querySelector(".calendar_caption");
        const yearSelect = head.querySelector(".calendar_year_select");
        const monthSelect = head.querySelector(".calendar_month_select");
        const previous = head.querySelector('button[aria-label="이전 달"]');
        const next = head.querySelector('button[aria-label="다음 달"]');
        const body = calendar.tBodies[0];
        const todayCard = document.querySelector(".today_card");
        let viewed = new Date(2026, 2, 1);
        let selectedDate = new URLSearchParams(window.location.search).get("date") || "2026-03-10";
        const initialParts = selectedDate.split("-").map(Number);
        if (initialParts.length === 3 && initialParts.every(Number.isFinite)) {
            viewed = new Date(initialParts[0], initialParts[1] - 1, 1);
        }

        const scheduleData = {
            "2026-03-01": "삼일절",
            "2026-03-02": "공장청소",
            "2026-03-03": "공장 기계 세척",
            "2026-03-04": "물탱크 청소",
            "2026-03-05": "호텔 카펫 청소",
            "2026-03-06": "공장 바닥 청소",
            "2026-03-07": "새해맞이 학교 청소",
            "2026-03-08": "공장청소",
            "2026-03-09": "식품공장 청소",
            "2026-03-10": "목욕탕 곰팡이 청소",
            "2026-03-11": "김해 공장 전체 청소",
            "2026-03-12": "김해 새학년 맞이 대청소",
            "2026-03-13": "공장 물탱크 청소",
            "2026-03-14": "부산 물탱크 청소",
            "2026-03-15": "호텔 바닥 청소",
            "2026-03-16": "식품공장 청소",
            "2026-03-17": "공장청소",
            "2026-03-18": "김해 공장 전체 청소",
            "2026-03-19": "공장 설비 청소",
            "2026-03-20": "외벽 청소",
            "2026-03-21": "행사 청소",
            "2026-03-22": "공장청소",
            "2026-03-23": "본사 외벽 청소",
            "2026-03-24": "공장청소",
            "2026-03-25": "공장청소",
            "2026-03-26": "호텔 바닥 청소",
            "2026-03-27": "공장 기계 청소",
            "2026-03-28": "학교 청소",
            "2026-03-29": "공장청소",
            "2026-03-30": "외벽 청소",
            "2026-03-31": "공장청소"
        };

        function dateKey(year, month, day) {
            return year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
        }

        function updateTodayCard(key) {
            if (!todayCard) return;

            const parts = key.split("-").map(Number);
            const job = scheduleData[key];
            const title = todayCard.querySelector("strong");
            const description = todayCard.querySelector("span");

            if (title) title.textContent = job || "예정된 작업이 없습니다";
            if (description) description.textContent = parts[1] + "월 " + parts[2] + "일 예정 작업";
        }

        function select(cell, key) {
            body.querySelectorAll("td").forEach(function (item) {
                item.classList.remove("selected");
                item.removeAttribute("aria-selected");
            });

            cell.classList.add("selected");
            cell.setAttribute("aria-selected", "true");
            selectedDate = key;
            updateTodayCard(key);
        }

        function render() {
            const year = viewed.getFullYear();
            const month = viewed.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();
            if (yearText) yearText.textContent = year + "년";
            if (monthText) monthText.textContent = (month + 1) + "월";
            if (yearSelect) yearSelect.value = String(year);
            if (monthSelect) monthSelect.value = String(month);
            if (caption) caption.textContent = year + "년 " + (month + 1) + "월";
            calendar.setAttribute("aria-label", year + "년 " + (month + 1) + "월 작업 일정");
            body.replaceChildren();

            let day = 1;
            for (let rowIndex = 0; rowIndex < 6 && day <= lastDate; rowIndex += 1) {
                const row = document.createElement("tr");
                for (let column = 0; column < 7; column += 1) {
                    const cell = document.createElement("td");
                    if ((rowIndex > 0 || column >= firstDay) && day <= lastDate) {
                        const key = dateKey(year, month, day);
                        const job = scheduleData[key] || "";
                        cell.innerHTML = "<span>" + day + "</span>" + (job ? "<small>" + job + "</small>" : "");
                        cell.dataset.date = key;
                        cell.tabIndex = 0;
                        cell.setAttribute("role", "button");
                        cell.setAttribute("aria-label", key + (job ? " " + job : " 예정 작업 없음"));
                        cell.addEventListener("click", function () { select(cell, key); });
                        cell.addEventListener("keydown", function (event) {
                            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(cell, key); }
                        });
                        if (key === selectedDate) {
                            cell.classList.add("selected");
                            cell.setAttribute("aria-selected", "true");
                        }
                        day += 1;
                    } else {
                        cell.classList.add("is-empty");
                        cell.setAttribute("aria-hidden", "true");
                    }
                    row.appendChild(cell);
                }
                body.appendChild(row);
            }
        }

        function changeMonth(amount) {
            viewed = new Date(viewed.getFullYear(), viewed.getMonth() + amount, 1);
            render();
        }

        previous?.addEventListener("click", function () { changeMonth(-1); });
        next?.addEventListener("click", function () { changeMonth(1); });

        function chooseMonth() {
            const year = Number(yearSelect?.value || viewed.getFullYear());
            const month = Number(monthSelect?.value ?? viewed.getMonth());
            const selectedDay = Number(selectedDate.split("-")[2]) || 1;
            const lastDay = new Date(year, month + 1, 0).getDate();
            const day = Math.min(selectedDay, lastDay);

            viewed = new Date(year, month, 1);
            selectedDate = dateKey(year, month, day);
            render();

            const selectedCell = body.querySelector('[data-date="' + selectedDate + '"]');
            if (selectedCell) select(selectedCell, selectedDate);
        }

        yearSelect?.addEventListener("change", chooseMonth);
        monthSelect?.addEventListener("change", chooseMonth);

        render();
        updateTodayCard(selectedDate);
    }

    function initReviewWrite() {
        const storageKey = "greenzone-user-reviews";
        const draftKey = "greenzone-review-draft";
        const form = document.querySelector("[data-review-form]");
        const reviewBoard = document.querySelector(".review_board .board");
        const loginLink = document.querySelector("[data-review-login]");

        if (loginLink && window.GreenZoneAuth) {
            loginLink.href = window.GreenZoneAuth.loginUrl(
                new URL("ReviewWrite.html", window.location.href).href
            );
        }

        if (reviewBoard) {
            let saved = [];
            try { saved = JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (_) { saved = []; }
            const firstRow = reviewBoard.querySelector(".board_head");
            saved.slice().reverse().forEach(function (review) {
                const row = document.createElement("a");
                row.className = "board_row";
                row.dataset.customReview = "true";
                row.href = "ReviewWrite.html#saved-review";
                row.innerHTML = '<span class="board_title"></span><time class="board_date"></time><span class="board_writer"></span><span class="board_view">0</span>';
                row.querySelector(".board_title").textContent = review.title;
                row.querySelector(".board_date").textContent = review.date;
                row.querySelector(".board_writer").textContent = review.author;
                firstRow.after(row);
            });
        }

        if (!form) return;
        const message = form.querySelector("[data-review-message]");
        const draftButton = form.querySelector("[data-review-draft]");
        const imageInput = form.querySelector("[data-review-images]");
        const imageDrop = form.querySelector("[data-review-upload]");

        function getReviewDraft() {
            const data = new FormData(form);
            return {
                author: String(data.get("author") || "").trim(),
                title: String(data.get("title") || "").trim(),
                content: String(data.get("content") || "").trim()
            };
        }

        try {
            const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
            if (draft) {
                ["author", "title", "content"].forEach(function (name) {
                    if (form.elements[name] && typeof draft[name] === "string") {
                        form.elements[name].value = draft[name];
                    }
                });
                if (message) message.textContent = "로그인 전에 작성한 후기 내용을 자동으로 복구했습니다.";
            }
        } catch (_) {
            localStorage.removeItem(draftKey);
        }

        draftButton?.addEventListener("click", function () {
            localStorage.setItem(draftKey, JSON.stringify(getReviewDraft()));
            if (message) message.textContent = "작성 중인 후기를 임시 저장했습니다. 첨부 이미지는 저장되지 않습니다.";
        });

        imageInput?.addEventListener("change", function () {
            if (!message) return;
            const count = imageInput.files.length;
            message.textContent = count ? "이미지 " + count + "장을 선택했습니다." : "";
        });

        ["dragenter", "dragover"].forEach(function (type) {
            imageDrop?.addEventListener(type, function (event) {
                event.preventDefault();
                imageDrop.classList.add("is_dragging");
            });
        });

        ["dragleave", "drop"].forEach(function (type) {
            imageDrop?.addEventListener(type, function (event) {
                event.preventDefault();
                imageDrop.classList.remove("is_dragging");
            });
        });

        imageDrop?.addEventListener("drop", function (event) {
            const files = event.dataTransfer?.files;
            if (!files?.length || !imageInput) return;
            imageInput.files = files;
            imageInput.dispatchEvent(new Event("change", { bubbles: true }));
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const draft = getReviewDraft();

            if (!window.GreenZoneAuth?.isLoggedIn()) {
                localStorage.setItem(draftKey, JSON.stringify(draft));
                window.location.assign(window.GreenZoneAuth
                    ? window.GreenZoneAuth.loginUrl(window.location.href)
                    : "../../user_page/Login.html?returnTo=" + encodeURIComponent(window.location.href));
                return;
            }

            let saved = [];
            try { saved = JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (_) { saved = []; }
            saved.push({
                author: draft.author || window.GreenZoneAuth.getUser()?.name || "이용자",
                title: draft.title || "이용 후기",
                content: draft.content,
                date: new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).replace(/\. /g, ".").replace(/\.$/, "")
            });
            localStorage.setItem(storageKey, JSON.stringify(saved));
            localStorage.removeItem(draftKey);
            window.location.href = "Reviews.html";
        });
    }

    function mediaMarkup(post) {
        if (post.type === "notice") {
            return "";
        }

        const images = post.images.filter(Boolean);

        if (!images.length) {
            return "";
        }

        if (post.type === "video") {
            const image = images[0];
            const media = '<div class="post_media post_video">' +
                '<img src="' + asset(image) + '" alt="' + post.title + '">' +
                '<span class="gallery_play" aria-hidden="true"><span class="icon play_Block gallery_play_icon"></span></span></div>';

            if (post.videoUrl) {
                return '<a href="' + post.videoUrl + '" target="_blank" rel="noopener noreferrer" aria-label="' + post.title + ' 재생">' + media + '</a>';
            }

            return media;
        }

        return images.map(function (image, index) {
            return '<figure class="post_media">' +
                '<img src="' + asset(image) + '" alt="' + post.title + ' ' + (index + 1) + '">' +
                '<figcaption>' + post.title + (index ? " 작업 과정" : " 현장") + '</figcaption></figure>';
        }).join("");
    }

    function relatedMarkup(post, list) {
        const visibleList = list.filter(function (item) {
            return item.type === "notice" || Boolean(item.image);
        });

        const cards = visibleList.map(function (item) {
            return '<a class="post_card" href="' + postUrl(item.type, item.id) + '">' +
                (item.image ? '<img src="' + asset(item.image) + '" alt="' + item.title + '">' : "") +
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
        const requestedId = parseInt(params.get("id"), 10) || 0;
        const post = findPost(type, requestedId) || list[0];
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
                if (window.innerWidth <= 768) return 2;
                if (window.innerWidth <= 1500) return 3;
                return 4;
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

    initReviewWrite();
    bindListLinks();
    initListPagination();
    initListSearch();
    initInformationFilter();
    initEventFilter();
    initFaqState();
    initScheduleCalendar();
    renderPost();
})();
