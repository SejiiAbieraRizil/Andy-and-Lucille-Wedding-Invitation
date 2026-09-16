document.addEventListener("DOMContentLoaded", function () {

    const openInvitation = document.getElementById("openInvitation");
    const details = document.getElementById("details");
    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpSuccess = document.getElementById("rsvpSuccess");
    const successTitle = document.getElementById("successTitle");
    const successMessage = document.getElementById("successMessage");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");
    const guestCountGroup = document.getElementById("guestCountGroup");
    const guestCount = document.getElementById("guestCount");
    const attendanceOptions = document.querySelectorAll('input[name="attendance"]');
    const music = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");

    let isPlaying = false;

    function updateMusicButton() {
        if (!musicButton) return;

        musicButton.innerHTML = isPlaying
            ? '<i class="fa-solid fa-music"></i>'
            : '<i class="fa-solid fa-volume-xmark"></i>';
    }

    function setMusicState(play) {
        if (!music) return;

        if (play) {
            music.play()
                .then(() => {
                    isPlaying = true;
                    updateMusicButton();
                })
                .catch(() => {
                    isPlaying = false;
                    updateMusicButton();
                });
        } else {
            music.pause();
            isPlaying = false;
            updateMusicButton();
        }
    }

    if (musicButton) {
        musicButton.addEventListener("click", function () {
            setMusicState(!isPlaying);
        });
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });
    }

    // =========================
    // OPEN INVITATION BUTTON
    // =========================

    if (openInvitation && details) {
        openInvitation.addEventListener("click", function () {
            setMusicState(true);
            details.scrollIntoView({ behavior: "smooth" });
        });
    }

    // =========================
// GUEST COUNT VISIBILITY
// =========================

function updateGuestCount() {

    const selectedAttendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        );

    if (!selectedAttendance) {
        return;
    }


    if (selectedAttendance.value === "yes") {

        guestCountGroup.style.display = "block";

        guestCount.required = true;

    } else {

        guestCountGroup.style.display = "none";

        guestCount.required = false;

        guestCount.value = "";

    }

}


attendanceOptions.forEach(function (option) {

    option.addEventListener(
        "change",
        updateGuestCount
    );

});

guestCountGroup.style.display = "none";


    // =========================
    // RSVP FORM
    // =========================

    if (rsvpForm) {

        rsvpForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            const submitButton =
                rsvpForm.querySelector(".rsvp-button");

            submitButton.disabled = true;
            submitButton.textContent = "SENDING...";


            const formData = {

                guestName:
                    document.getElementById("guestName").value,

                guestEmail:
                    document.getElementById("guestEmail").value,

                attendance:
                    document.querySelector(
                        'input[name="attendance"]:checked'
                    ).value,

                guestCount:
                    document.getElementById("guestCount").value,

                guestMessage:
                    document.getElementById("guestMessage").value

            };


            try {

                await fetch(
                    "https://script.google.com/macros/s/AKfycbzzpXaBjci2-ofCdIPEWwlTq8UX2k-dEqG9VO7Fzr7bsLignr_KChgAkvrBIiIeMVQo/exec",
                    {
                        method: "POST",
                        body: JSON.stringify(formData)
                    }
                );

                const guestName =
    document.getElementById("guestName").value;

const selectedAttendance =
    document.querySelector(
        'input[name="attendance"]:checked'
    );

if (selectedAttendance.value === "yes") {

    successTitle.textContent =
        `Thank you, ${guestName}!`;

    successMessage.textContent =
        "We're so excited to celebrate this special day with you! Your RSVP has been received, and we look forward to seeing you at the wedding.";

} else {

    successTitle.textContent =
        `Thank you, ${guestName}!`;

    successMessage.textContent =
        "We're sorry you won't be able to join us, but we truly appreciate you taking the time to let us know. You will be missed on our special day.";
}


                rsvpForm.reset();

                rsvpForm.style.display = "none";

                rsvpSuccess.style.display = "block";

                submitButton.disabled = false;
                submitButton.textContent = "SEND RSVP";


            } catch (error) {

                console.error(error);

                alert(
                    "Something went wrong. Please try again."
                );

                submitButton.disabled = false;
                submitButton.textContent = "SEND RSVP";

            }

        });

    }

});

    updateMusicButton();

    if (musicButton && music) {
        musicButton.addEventListener("click", () => {
            if (isPlaying) {
                setMusicState(false);
            } else {
                setMusicState(true);
            }
        });
    }
