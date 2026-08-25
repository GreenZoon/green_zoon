(function () {
    "use strict";

    const form = document.getElementById("cleaning_application");

    if (!form) {
        return;
    }

    const DRAFT_KEY = "greenZoneCleaningApplicationDraft";
    const services = [
        {
            id: "factory",
            name: "공장 청소",
            summaryName: "공장청소",
            iconClass: "factory",
            imageRequired: true,
            tip: "바닥, 기계설비, 도색, 사무실 등 공장청소와 관련된 내용을 작성해 주세요.",
            fields: [
                { name: "work", label: "작업내용", type: "textarea", placeholder: "예시) 기계설비 도색 및 공장 바닥 200평", required: true }
            ]
        },
        {
            id: "disinfection",
            name: "소독/방역",
            iconClass: "doctor",
            imageRequired: true,
            tip: "소독과 방역이 필요한 공간 및 작업 범위를 작성해 주세요.",
            fields: [
                { name: "work", label: "작업내용", type: "textarea", placeholder: "예시) 사무실 전체 소독 및 정기 방역", required: true }
            ]
        },
        {
            id: "water_tank",
            name: "물탱크",
            summaryName: "물탱크 청소",
            iconClass: "water_tower",
            tip: "물탱크 용량과 개수 및 필요한 작업 내용을 작성해 주세요.",
            fields: [
                { name: "capacity", label: "물탱크 용량", placeholder: "예시) 80T", required: true },
                { name: "count", label: "물탱크 개수", type: "number", min: 1, placeholder: "예시) 2", required: true },
                { name: "detail", label: "추가 작업내용", type: "textarea", placeholder: "예시) 저수조 내부 청소 및 소독", wide: true }
            ]
        },
        {
            id: "pigeon",
            name: "비둘기 퇴치",
            iconClass: "bird_spike",
            tip: "비둘기 피해 위치와 필요한 퇴치 작업을 작성해 주세요.",
            fields: [
                { name: "work", label: "작업내용", type: "textarea", placeholder: "예시) 실외기 주변 비둘기 퇴치 및 차단", required: true }
            ]
        },
        {
            id: "facility",
            name: "시설물",
            iconClass: "greek",
            imageRequired: true,
            tip: "시설물 종류와 필요한 청소 내용을 작성해 주세요.",
            fields: [
                { name: "kind", label: "시설물 종류", placeholder: "예시) 교각, 터널, 조형물", required: true },
                { name: "work", label: "작업내용", type: "textarea", placeholder: "예시) 시설물 외부 오염 제거", wide: true, required: true }
            ]
        },
        {
            id: "carpet",
            name: "카펫/패브릭",
            iconClass: "carpet",
            tip: "작업 면적과 카펫 또는 패브릭 종류를 작성해 주세요.",
            fields: [
                { name: "area", label: "작업 면적", placeholder: "예시) 120평", required: true },
                { name: "material", label: "소재/종류", placeholder: "예시) 사무실 타일 카펫", required: true },
                { name: "detail", label: "추가 작업내용", type: "textarea", placeholder: "예시) 오염 상태 및 추가 요청사항", wide: true }
            ]
        },
        {
            id: "ship",
            name: "선박/유람선",
            iconClass: "ship",
            tip: "선박 내부에서 청소가 필요한 구역과 내용을 작성해 주세요.",
            fields: [
                { name: "work", label: "작업내용", type: "textarea", placeholder: "예시) 선내 카펫 및 객실 전체 청소", required: true }
            ]
        },
        {
            id: "exterior",
            name: "건물 외벽",
            iconClass: "brick_wall",
            imageRequired: true,
            tip: "건물 종류와 외벽 규모 및 오염 상태를 작성해 주세요.",
            fields: [
                { name: "building", label: "건물 종류", placeholder: "예시) 상가, 사무실, 공장", required: true },
                { name: "floors", label: "건물 규모", placeholder: "예시) 지상 5층", required: true },
                { name: "detail", label: "추가 작업내용", type: "textarea", placeholder: "예시) 외벽 재질 및 오염 상태", wide: true }
            ]
        },
        {
            id: "wax",
            name: "왁스 코팅",
            summaryName: "왁스바닥",
            iconClass: "soap_ottle",
            imageRequired: true,
            tip: "바닥 면적과 재질 및 기존 왁스 상태를 작성해 주세요.",
            fields: [
                { name: "area", label: "바닥 면적", placeholder: "예시) 200평", required: true },
                { name: "material", label: "바닥 재질", placeholder: "예시) 데코타일", required: true },
                { name: "detail", label: "추가 작업내용", type: "textarea", placeholder: "예시) 기존 왁스 상태 및 추가사항", wide: true }
            ]
        },
        {
            id: "dispatch",
            name: "미화원 파견",
            iconClass: "cleaner",
            tip: "필요 인원과 청소 구역 및 근무 조건을 작성해 주세요.",
            fields: [
                { name: "people", label: "필요 인원", type: "number", min: 1, placeholder: "예시) 2명", required: true },
                { name: "area", label: "청소 구역", placeholder: "예시) 사무실 전체", required: true },
                { name: "detail", label: "근무 조건/추가사항", type: "textarea", placeholder: "예시) 평일 오전 9시부터 오후 6시", wide: true }
            ]
        }
    ];

    const selectedServices = new Set();
    const serviceFiles = new Map();
    const visitSlots = [];
    let selectedTime = "";
    let toastTimer = 0;

    const selector = document.getElementById("service_selector");
    const details = document.getElementById("service_details");
    const summary = document.getElementById("application_summary");
    const visitList = document.getElementById("visit_slots");
    const visitConfirm = document.getElementById("visit_confirm");
    const visitModal = document.getElementById("visit_modal");
    const successModal = document.getElementById("success_modal");
    const privacyAgree = document.getElementById("privacy_agree");
    const privacyError = document.getElementById("privacy_error");

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function getService(id) {
        return services.find((service) => service.id === id);
    }

    function renderSelector() {
        selector.innerHTML = services.map((service) => `
            <button class="service_option" type="button" data-service="${service.id}" aria-pressed="false">
                <div class="service_option_inner">
                    <span class="icon ${service.iconClass}" aria-hidden="true"></span>
                    <p>${service.name}</p>
                </div>
            </button>
        `).join("");
    }

    function createFieldMarkup(service, field) {
        const fieldName = `${service.id}_${field.name}`;
        const required = field.required ? "required" : "";
        const wide = field.wide || field.type === "textarea" ? " is_wide" : "";

        if (field.type === "textarea") {
            return `
                <div class="detail_label${wide}">
                    <label for="${fieldName}">${field.label}${field.required ? " *" : ""}</label>
                    <textarea id="${fieldName}" class="detail_textarea" name="${fieldName}" rows="4" placeholder="${escapeHtml(field.placeholder)}" ${required}></textarea>
                </div>
            `;
        }

        return `
            <div class="detail_label${wide}">
                <label for="${fieldName}">${field.label}${field.required ? " *" : ""}</label>
                <input id="${fieldName}" class="detail_control" type="${field.type || "text"}" name="${fieldName}" ${field.min ? `min="${field.min}"` : ""} placeholder="${escapeHtml(field.placeholder)}" ${required}>
            </div>
        `;
    }

    function addServiceDetail(service) {
        if (document.querySelector(`[data-service-detail="${service.id}"]`)) {
            return;
        }

        const section = document.createElement("section");
        section.className = "service_detail";
        section.dataset.serviceDetail = service.id;
        section.innerHTML = `
            <div class="detail_header">
                <div class="detail_intro">
                    <div class="detail_title_wrap">
                        <span class="icon ${service.iconClass}" aria-hidden="true"></span>
                        <h2>${service.name}</h2>
                    </div>
                    <p class="detail_tip"><span class="icon info application_note_icon" aria-hidden="true"></span>${escapeHtml(service.tip)}</p>
                </div>
                <button type="button" class="detail_remove" data-remove-service="${service.id}" aria-label="${service.name} 선택 해제"><span class="icon cancel" aria-hidden="true"></span></button>
            </div>
            <div class="detail_body">
                <div class="detail_fields">
                    ${service.fields.map((field) => createFieldMarkup(service, field)).join("")}
                </div>
                <div class="upload_area" data-upload-service="${service.id}">
                    <div class="upload_heading">
                        <strong>현장 이미지${service.imageRequired ? " *" : " (선택)"}</strong>
                    </div>
                    <div class="upload_grid">
                        <label class="upload_slot">
                            <span class="icon picture upload_icon" aria-hidden="true"></span>
                            <p>이미지 첨부</p>
                            <input type="file" accept="image/*" multiple data-file-input="${service.id}">
                        </label>
                    </div>
                    <div class="upload_tip">
                        <p><span class="icon info application_note_icon" aria-hidden="true"></span>${service.imageRequired ? "가견적 및 현장 오염도를 확인하기 위해 작업구역 이미지가 반드시 필요합니다." : "가견적 및 현장 오염도를 확인하기 위해 작업구역 이미지를 첨부할 수 있습니다."}</p>
                        <p>작업 예정인 현장의 전체, 일부, 가까이에서 촬영한 이미지 최소 3장 첨부를 권고드립니다.</p>
                    </div>
                    <p class="field_error" data-file-error="${service.id}" role="alert"></p>
                </div>
            </div>
        `;

        details.append(section);
        serviceFiles.set(service.id, []);
    }

    function toggleService(id, shouldSelect) {
        const service = getService(id);
        const button = selector.querySelector(`[data-service="${id}"]`);

        if (!service || !button) {
            return;
        }

        if (shouldSelect) {
            selectedServices.add(id);
            button.classList.add("is_selected");
            button.setAttribute("aria-pressed", "true");
            addServiceDetail(service);
        } else {
            selectedServices.delete(id);
            button.classList.remove("is_selected");
            button.setAttribute("aria-pressed", "false");
            document.querySelector(`[data-service-detail="${id}"]`)?.remove();
            serviceFiles.delete(id);
        }

        document.getElementById("service_error").textContent = "";
        updateSummary();
    }

    function renderFilePreviews(serviceId) {
        const uploadArea = document.querySelector(`[data-upload-service="${serviceId}"]`);
        const grid = uploadArea?.querySelector(".upload_grid");
        const files = serviceFiles.get(serviceId) || [];

        if (!grid) {
            return;
        }

        grid.querySelectorAll(".image_preview").forEach((preview) => preview.remove());

        files.forEach((file, index) => {
            const preview = document.createElement("div");
            preview.className = "image_preview";
            preview.innerHTML = `
                <img src="${file.url}" alt="첨부 이미지 ${index + 1}">
                <button type="button" class="preview_remove" data-service="${serviceId}" data-file-index="${index}" aria-label="첨부 이미지 삭제">×</button>
            `;
            grid.insertBefore(preview, grid.querySelector(".upload_slot"));
        });

        const uploadSlot = grid.querySelector(".upload_slot");
        uploadSlot.hidden = files.length >= 3;
        uploadArea.querySelector(`[data-file-error="${serviceId}"]`).textContent = "";
        updateSummary();
    }

    function addFiles(serviceId, fileList) {
        const files = serviceFiles.get(serviceId) || [];
        const available = 3 - files.length;
        const images = Array.from(fileList).filter((file) => file.type.startsWith("image/")).slice(0, available);

        images.forEach((file) => {
            files.push({ file, name: file.name, url: URL.createObjectURL(file) });
        });

        serviceFiles.set(serviceId, files);
        renderFilePreviews(serviceId);

        if (fileList.length > available) {
            showToast("이미지는 작업종류마다 최대 3장까지 첨부할 수 있습니다.");
        }
    }

    function removeFile(serviceId, index) {
        const files = serviceFiles.get(serviceId) || [];
        const removed = files.splice(index, 1)[0];

        if (removed?.url) {
            URL.revokeObjectURL(removed.url);
        }

        renderFilePreviews(serviceId);
    }

    function collectServiceValues(service) {
        const values = [];

        service.fields.forEach((field) => {
            const element = form.elements[`${service.id}_${field.name}`];
            const value = element?.value.trim();

            if (value) {
                let summaryValue = value;

                if (service.id === "water_tank" && field.name === "capacity" && !/t$/i.test(value)) {
                    summaryValue = `${value}T`;
                } else if (service.id === "water_tank" && field.name === "count" && !/개$/.test(value)) {
                    summaryValue = `${value}개`;
                } else if (service.id === "dispatch" && field.name === "people" && !/명$/.test(value)) {
                    summaryValue = `${value}명`;
                } else if (["wax", "carpet"].includes(service.id) && field.name === "area" && !/평$/.test(value)) {
                    summaryValue = `${value}평`;
                }

                values.push(summaryValue);
            }
        });

        return values;
    }

    function updateSummary() {
        if (!selectedServices.size) {
            summary.innerHTML = '<p class="empty_message">작업종류를 선택하면 신청 내용이 표시됩니다.</p>';
            return;
        }

        summary.innerHTML = Array.from(selectedServices).map((id) => {
            const service = getService(id);
            const values = collectServiceValues(service);
            const fileCount = (serviceFiles.get(id) || []).length;
            return `
                <div class="summary_item">
                    <div class="summary_item_info">
                        <div class="summary_service">
                            <span class="icon ${service.iconClass} summary_icon" aria-hidden="true"></span>
                            <strong>${service.summaryName || service.name}</strong>
                        </div>
                        <div class="summary_detail">
                            <span class="icon contract summary_mark" aria-hidden="true"></span>
                            <p>${escapeHtml(values.slice(0, 2).join("/") || "상세 내용을 작성해 주세요")}</p>
                        </div>
                        <div class="summary_file">
                            ${fileCount ? '<span class="icon picture summary_mark" aria-hidden="true"></span><p>이미지 첨부 완료</p>' : ""}
                        </div>
                    </div>
                    <button type="button" class="slot_remove" data-remove-service="${id}" aria-label="${service.name} 선택 해제"><span class="icon cancel" aria-hidden="true"></span></button>
                </div>
            `;
        }).join("");
    }

    function getTomorrow() {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().slice(0, 10);
    }

    function renderTimeOptions() {
        const times = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00"];
        document.getElementById("time_options").innerHTML = times.map((time) => `
            <button type="button" class="time_option" data-time="${time}">${time}</button>
        `).join("");
    }

    function openModal(modal) {
        modal.hidden = false;
        document.body.classList.add("modal_open");
        window.setTimeout(() => modal.querySelector("button, input")?.focus(), 0);
    }

    function closeModal(modal) {
        modal.hidden = true;
        document.body.classList.remove("modal_open");
    }

    function renderVisitSlots() {
        if (!visitSlots.length) {
            visitConfirm.hidden = true;
            visitList.innerHTML = '<p class="empty_message">선택된 방문 일정이 없습니다.</p>';
            return;
        }

        visitConfirm.hidden = false;
        visitList.innerHTML = visitSlots.map((slot, index) => {
            const date = new Date(`${slot.date}T00:00:00`);
            const formatted = `${date.getMonth() + 1}/${date.getDate()}`;
            return `
                <div class="visit_slot">
                    <div class="visit_slot_info">
                        <div class="visit_time">
                            <span class="icon calendar visit_icon" aria-hidden="true"></span>
                            <p>${formatted}</p>
                        </div>
                        <div class="visit_time">
                            <span class="icon clock visit_icon" aria-hidden="true"></span>
                            <p>${slot.time}</p>
                        </div>
                    </div>
                    <button type="button" class="slot_remove" data-slot-index="${index}" aria-label="방문 일정 삭제"><span class="icon cancel" aria-hidden="true"></span></button>
                </div>
            `;
        }).join("");
    }

    function addVisitSlot() {
        const date = document.getElementById("visit_date").value;

        if (!date || !selectedTime) {
            showToast("방문 날짜와 시간을 모두 선택해 주세요.");
            return;
        }

        if (visitSlots.some((slot) => slot.date === date && slot.time === selectedTime)) {
            showToast("이미 선택한 방문 일정입니다.");
            return;
        }

        visitSlots.push({ date, time: selectedTime });
        visitSlots.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
        renderVisitSlots();
        closeModal(visitModal);
        showToast("방문견적 희망 일정이 추가되었습니다.");
    }

    function getDraft() {
        const fields = {};

        form.querySelectorAll("input:not([type='file']), textarea").forEach((element) => {
            if (!element.name) return;
            fields[element.name] = element.type === "checkbox" ? element.checked : element.value;
        });

        return {
            fields,
            services: Array.from(selectedServices),
            visits: visitSlots
        };
    }

    function saveDraft(options = {}) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(getDraft()));
        if (!options.silent) {
            showToast("신청서가 임시저장되었습니다. 첨부 이미지는 보안상 저장되지 않습니다.");
        }
    }

    function restoreDraft() {
        const raw = localStorage.getItem(DRAFT_KEY);

        if (!raw) {
            return;
        }

        try {
            const draft = JSON.parse(raw);
            (draft.services || []).forEach((id) => toggleService(id, true));

            Object.entries(draft.fields || {}).forEach(([name, value]) => {
                const element = form.elements[name];
                if (!element) return;
                if (element.type === "checkbox") element.checked = Boolean(value);
                else element.value = value;
            });

            (draft.visits || []).forEach((slot) => visitSlots.push(slot));
            renderVisitSlots();
            updateSummary();
            showToast("임시저장된 신청서를 불러왔습니다.");
        } catch (error) {
            localStorage.removeItem(DRAFT_KEY);
        }
    }

    function validateForm() {
        let firstInvalid = null;
        let valid = true;

        privacyError.textContent = "";

        form.querySelectorAll("[required]").forEach((element) => {
            element.classList.add("is_touched");
            if (!element.checkValidity()) {
                valid = false;
                firstInvalid ||= element;
            }
        });

        if (!selectedServices.size) {
            valid = false;
            document.getElementById("service_error").textContent = "작업종류를 하나 이상 선택해 주세요.";
            firstInvalid ||= selector.querySelector("button");
        }

        if (!privacyAgree.checked) {
            valid = false;
            privacyError.textContent = "개인정보 수집 및 이용에 동의해 주세요.";
            firstInvalid ||= privacyAgree;
        }

        selectedServices.forEach((id) => {
            const service = getService(id);
            if (service.imageRequired && !(serviceFiles.get(id) || []).length) {
                valid = false;
                const error = document.querySelector(`[data-file-error="${id}"]`);
                error.textContent = "현장 이미지를 한 장 이상 첨부해 주세요.";
                firstInvalid ||= document.querySelector(`[data-file-input="${id}"]`)?.closest(".upload_slot");
            }
        });

        if (!valid && firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            window.setTimeout(() => firstInvalid.focus?.(), 350);
            showToast("필수 입력 항목을 확인해 주세요.");
        }

        return valid;
    }

    function resetApplication() {
        serviceFiles.forEach((files) => files.forEach((file) => URL.revokeObjectURL(file.url)));
        form.reset();
        selectedServices.clear();
        serviceFiles.clear();
        visitSlots.splice(0);
        details.innerHTML = "";
        selector.querySelectorAll(".service_option").forEach((button) => {
            button.classList.remove("is_selected");
            button.setAttribute("aria-pressed", "false");
        });
        renderVisitSlots();
        updateSummary();
        localStorage.removeItem(DRAFT_KEY);
    }

    function showToast(message) {
        const toast = document.getElementById("application_toast");
        toast.textContent = message;
        toast.classList.add("is_visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("is_visible"), 3200);
    }

    selector.addEventListener("click", (event) => {
        const button = event.target.closest("[data-service]");
        if (!button) return;
        const id = button.dataset.service;
        toggleService(id, !selectedServices.has(id));
    });

    details.addEventListener("click", (event) => {
        const removeService = event.target.closest("[data-remove-service]");
        const removePreview = event.target.closest("[data-file-index]");

        if (removeService) {
            toggleService(removeService.dataset.removeService, false);
        } else if (removePreview) {
            removeFile(removePreview.dataset.service, Number(removePreview.dataset.fileIndex));
        }
    });

    details.addEventListener("change", (event) => {
        const input = event.target.closest("[data-file-input]");
        if (!input) return;
        addFiles(input.dataset.fileInput, input.files);
        input.value = "";
    });

    form.addEventListener("input", (event) => {
        event.target.classList.remove("is_invalid");

        if (event.target.name === "phone") {
            const numbers = event.target.value.replace(/\D/g, "").slice(0, 11);
            event.target.value = numbers
                .replace(/^(\d{3})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join("-"));
        }

        updateSummary();
    });

    privacyAgree.addEventListener("change", function () {
        privacyError.textContent = privacyAgree.checked
            ? ""
            : "개인정보 수집 및 이용에 동의해 주세요.";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!window.GreenZoneAuth?.isLoggedIn()) {
            saveDraft({ silent: true });
            showToast("작성 내용을 임시저장했습니다. 로그인 후 신청을 계속할 수 있습니다.");
            window.setTimeout(() => {
                window.location.assign(window.GreenZoneAuth.loginUrl(window.location.href));
            }, 450);
            return;
        }

        if (!validateForm()) return;
        openModal(successModal);
    });

    summary.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-service]");
        if (button) toggleService(button.dataset.removeService, false);
    });

    visitList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-slot-index]");
        if (!button) return;
        visitSlots.splice(Number(button.dataset.slotIndex), 1);
        renderVisitSlots();
    });

    document.getElementById("visit_open").addEventListener("click", () => openModal(visitModal));
    document.getElementById("visit_add").addEventListener("click", addVisitSlot);
    document.getElementById("draft_save").addEventListener("click", saveDraft);

    document.getElementById("time_options").addEventListener("click", (event) => {
        const button = event.target.closest("[data-time]");
        if (!button) return;
        selectedTime = button.dataset.time;
        document.querySelectorAll(".time_option").forEach((item) => item.classList.toggle("is_selected", item === button));
    });

    document.querySelectorAll("[data-close-modal]").forEach((button) => {
        button.addEventListener("click", () => closeModal(visitModal));
    });

    document.getElementById("success_confirm").addEventListener("click", () => {
        closeModal(successModal);
        resetApplication();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !visitModal.hidden) closeModal(visitModal);
    });

    renderSelector();
    renderTimeOptions();
    document.getElementById("visit_date").min = getTomorrow();
    document.getElementById("visit_date").value = getTomorrow();
    restoreDraft();

    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService && getService(requestedService) && !selectedServices.has(requestedService)) {
        toggleService(requestedService, true);
    }
})();
