$(function () {
    const checked = {};

    $("input[type='checkbox']").on("change", function () {
        if ($(this).is(":checked"))
            checked[$(this).attr("data-id")] = $(this).attr("data-name");
        else delete checked[$(this).attr("data-id")];

        if (Object.values(checked).length > 3) {
            $(".amenities h4").html(
                Object.values(checked).slice(0, 3).join(", ") + ",..."
            );
        } else $(".amenities h4").html(Object.values(checked).join(", "));
    });
});
