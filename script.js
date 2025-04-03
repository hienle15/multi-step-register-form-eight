document.addEventListener("DOMContentLoaded", function () {
    const step1Form = document.querySelector(".step-1-form");
    const step2Form = document.querySelector(".step-2-form");
    const step3Form = document.querySelector(".step-3-form");

    const steps = [step1Form, step2Form, step3Form];
    const circles = document.querySelectorAll(".stepper__circle"); // Lấy tất cả vòng tròn
    const stepText = document.querySelector(".stepper_step"); // Chữ "Step x of 3"

    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((form, index) => {
            form.style.display = index === stepIndex ? "block" : "none";
        });

        // Cập nhật trạng thái vòng tròn
        circles.forEach((circle, index) => {
            if (index <= stepIndex) {
                circle.classList.add("stepper__circle--active"); // Đã hoàn thành
                circle.classList.add("stepper__circle--current"); // Đang ở step hiện tại
            } else {
                circle.classList.remove("stepper__circle--active", "stepper__circle--current"); // Reset
            }
        });

        // Cập nhật chữ "Step x of 3"
        stepText.textContent = `${stepIndex + 1} of 3`;

        currentStep = stepIndex;
    }

    // Ẩn tất cả form trừ form 1 ban đầu
    showStep(0);

    // Xử lý Form 1
    step1Form.addEventListener("submit", function (event) {
        let nameInput = document.getElementById("name").value.trim();
        let emailInput = document.getElementById("email").value.trim();

        if (nameInput === "" || emailInput === "") {
            event.preventDefault();
        } else {
            event.preventDefault();
            showStep(1);
        }
    });

    // Xử lý Form 2
    step2Form.addEventListener("submit", function (event) {
        let topics = document.querySelectorAll(".step-2-form__input:checked");// kiểm tra người dùng có chọn ít nhát một chủ đề hay không
        if (topics.length === 0) {
            event.preventDefault();
            alert("Please select at least one topic!");
        } else {
            event.preventDefault();
            showStep(2);

            // Hiển thị dữ liệu lên Form 3
            document.querySelector(".step-3-form__name").textContent = document.getElementById("name").value;
            document.querySelector(".step-3-form__email").textContent = document.getElementById("email").value;

            let topicList = document.querySelector(".step-3-form__list");
            topicList.innerHTML = "";
            topics.forEach(topic => {
                let li = document.createElement("li");
                li.textContent = topic.value;
                topicList.appendChild(li);
            });
        }
    });

    // Xử lý Form 3 (Hoàn thành)
    document.querySelector(".step-3-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("✅ Success");
        showStep(0); // Quay lại bước 1 nhưng vẫn giữ thông tin
    });
});
