const bp = {
    md: 768,
    lg: 992,
};

$(document).ready(() => {
    if (jQuery(window).width() >= bp.lg) {
        // *** Initializations for when screen is >= lg breakpoint ***

        // Initialize Tooltips if breakpoint is >= lg
        const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (triggerElt) => new bootstrap.Tooltip(triggerElt)
        );

        // Change position of Navbar to top
        $("nav").removeClass("fixed-bottom").addClass("sticky-top");
    }

    // Handle dark mode switching for dark mode anchor tag in social bar
    $(".a-dark-mode").on("click", () => $("#btn-dark-mode").click());

    // Switching to Dark Mode
    $("#btn-dark-mode").on("click", function () {
        if ($(this).is(":checked")) {
            $("body").addClass("dark");
            $(".icon-dark-mode").removeClass("fa-sun").addClass("fa-moon");
            $(".dark-mode-status").html("Light")
        } else {
            $("body").removeClass("dark");
            $(".icon-dark-mode").removeClass("fa-moon").addClass("fa-sun");
            $(".dark-mode-status").html("Dark")
        }
    });

    // Handle Response when screen resizes
    $(window).on("resize", function () {
        if (jQuery(window).width() >= bp.lg) {
            // *** Responses for when screen is >= lg breakpoint ***

            // Change position of Navbar to top
            $("nav").removeClass("fixed-bottom").addClass("sticky-top");
        } else if (jQuery(window).width() >= bp.md) {
            // *** Responses for when screen is >= md breakpoint ***

            // Change position of Navbar to bottom
            $("nav").addClass("fixed-bottom").removeClass("sticky-top");
        } else {
            // *** Responses for when small screens ***

            // Change position of Navbar to bottom
            $("nav").addClass("fixed-bottom").removeClass("sticky-top");
        }
    });

    // $("#btn-dark-mode").click();
});
