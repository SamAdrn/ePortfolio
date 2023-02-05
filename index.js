let curPage = 1,
    curEdu = "umd";
let content, socialsBar, navbarContent, navBarCollapse;

const pages = {
    1: "#home-page",
    2: "#about",
    3: "#education",
    4: "#experience",
    5: "#projects",
};

const delays = {
    1: 1000,
    2: 2800,
    3: 1000,
    4: 1000,
    5: 1000,
};

const bp = {
    sm: 576,
    md: 768,
    lg: 992,
};

$(document).ready(() => {
    content = $("#content-div");
    socialsBar = $("#socials-bar");
    navbarContent = $("#navbarSupportedContent");

    if (jQuery(window).width() >= bp.lg) {
        // Initiate Tooltips if breakpoint is > lg
        const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (triggerElt) => new bootstrap.Tooltip(triggerElt)
        );
    } else {
        // Don't allow scaling transformations when breakpoint is < lg
        $(".hover-card").each(function () {
            $(this).addClass("no-hover");
        });
    }

    $(pages[curPage]).fadeIn(3000);

    // Actions for smaller than large viewports
    if (jQuery(window).width() < bp.lg) {
        // Retrieve control navbar collapse
        navBarCollapse = new bootstrap.Collapse(navbarContent);

        // Disable top socials bar on viewports less than large size
        $("#socials-bar").click(false);
    }

    $(".nav-link").click((e) => switchpage(+e.target.dataset.page));

    // Switch Education Info Cards
    $(".edu-card").click(function () {
        let edu = $(this).data("edu");

        if (edu !== curEdu && jQuery(window).width() >= bp.lg) {
            $(`body`).stop(true, true);

            $(".edu-card").css("pointer-events", "none");

            $(".edu-card").each(function () {
                $(this).removeClass("active");
            });
            $(this).addClass("active");

            $(`#${curEdu}`).fadeOut(2000);
            $(`#${curEdu}`).addClass("d-none");
            $(`#${curEdu}-indicator`).removeClass("d-lg-block");

            $(`#${edu}`).fadeIn(1000);
            $(`#${edu}`).removeClass("d-none");
            $(`#${edu}-indicator`).addClass("d-lg-block");

            curEdu = edu;

            refreshScrollSpy();

            $(".edu-card")
                .delay(2000)
                .queue((n) => {
                    $(".edu-card").css("pointer-events", "");
                    n();
                });
        }
    });
});

function refreshScrollSpy() {
    const dataSpyList = document.querySelectorAll('[data-bs-spy="scroll"]')
    dataSpyList.forEach(dataSpyEl => {
      bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh()
    })
}

function switchpage(page) {
    if (page !== curPage) {
        if (jQuery(window).width() < bp.lg && navbarContent.hasClass("show")) {
            navBarCollapse.toggle();
        }

        $(".nav-link").css("pointer-events", "none");

        $(`#nav-${curPage}`).removeClass("cur-page");
        $(pages[curPage]).fadeOut(1000);
        $(pages[curPage])
            .removeClass(["d-flex", "flex-column"])
            .addClass("d-none");

        curPage = page;
        $(`#nav-${curPage}`).addClass("cur-page");
        $(pages[curPage]).fadeIn(1000);
        $(pages[curPage])
            .removeClass("d-none")
            .addClass(["d-flex", "flex-column"]);

        if (curPage === 1) {
            socialsBar.fadeOut(1000).removeClass("d-md-flex");
        } else {
            socialsBar.fadeIn(1000).addClass("d-md-flex");
        }

        // Animations for page 2
        if (curPage === 2) {
            $(".skill-bar").each(function () {
                $(this)
                    .delay(800)
                    .animate(
                        {
                            width: $(this).attr("data-percent"),
                        },
                        2000
                    );
            });
        } else {
            $(".skill-bar").css("width", "calc(5.5rem + 0.390625vw)");
        }

        $(".nav-link")
            .delay(delays[curPage])
            .queue((n) => {
                $(".nav-link").css("pointer-events", "");
                n();
            });
    }
}
